// ============================================
// AI SECURITY SIMULATOR
// по методике аудита ИБ ИИ-систем
// МГЛУ, 2026 | Воробьева А.А.
// ============================================

let gameState = {
    act: 1,
    budget: 65,
    security: 35,
    time: 75,
    correctChoices: 0,
    gameOver: false
};

// ===== ВСЕ УГРОЗЫ ИЗ ДИПЛОМА =====
const threats = {
    t1: { id: "T1.1", name: "Отравление данных (Data Poisoning)", table: "Таблица 1.1", risk: "Высокий", desc: "Злоумышленник внес искаженные данные в обучающую выборку" },
    t2: { id: "T1.4", name: "Нарушение конфиденциальности", table: "Таблица 1.1", risk: "Средний", desc: "Сбор данных без согласия субъектов, юридические риски" },
    t3: { id: "T1.3", name: "Ошибки разметки", table: "Таблица 1.1", risk: "Средний", desc: "Изменение меток классов в размеченных данных" },
    t4: { id: "T2.1", name: "Кража модели (Model Extraction)", table: "Таблица 1.2", risk: "Критический", desc: "Восстановление логики модели через API" },
    t5: { id: "T2.3", name: "Компрометация кода", table: "Таблица 1.2", risk: "Высокий", desc: "Внесение изменений в скрипты обучения" },
    t6: { id: "T3.1", name: "Подмена тестовых данных", table: "Таблица 1.3", risk: "Высокий", desc: "Замена тестовой выборки для сокрытия недостатков" },
    t7: { id: "T3.3", name: "Скрытые уязвимости", table: "Таблица 1.3", risk: "Критический", desc: "Отсутствие тестирования на устойчивость к атакам" },
    t8: { id: "T4.1", name: "Подмена модели", table: "Таблица 1.4", risk: "Критический", desc: "Замена легитимной модели на вредоносную" },
    t9: { id: "T4.2", name: "Небезопасный API", table: "Таблица 1.4", risk: "Высокий", desc: "Отсутствие аутентификации и ограничений" },
    t10: { id: "T5.1", name: "Состязательные атаки", table: "Таблица 1.5", risk: "Высокий", desc: "Подача специально сформированных входных данных" },
    t11: { id: "T5.2", name: "Промпт-инъекции", table: "Таблица 1.5", risk: "Критический", desc: "Запросы, заставляющие ИИ игнорировать инструкции" },
    t12: { id: "T6.1", name: "Откат к уязвимой версии", table: "Таблица 1.6", risk: "Высокий", desc: "Возврат к старой версии с известными уязвимостями" },
    t13: { id: "T6.2", name: "Компрометация пайплайна", table: "Таблица 1.6", risk: "Критический", desc: "Внедрение вредоносных изменений в процесс дообучения" }
};

// ===== ВСЕ ЭТАПЫ С ПОЯСНЕНИЯМИ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        desc: "Стартап NeuroGen разрабатывает чат-бота для банка. Вам нужны данные для обучения. Какой источник выберете?",
        options: [
            { id: 1, text: "💰 Купить у поставщика ($50K)", isCorrect: true,
              result: "Поставщик предоставил сертификат качества и лицензию. Данные чистые и легальные.",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Аккредитованный поставщик гарантирует легальность данных\n• Минимизирован риск отравления данных (T1.1)\n• Есть юридическая защита\n\nСсылка: Таблица 1.1",
              threat: null, effects: { budget: -5, security: -5, time: 5 } },
            
            { id: 2, text: "🌐 Из открытых источников", isCorrect: false,
              result: "Юристы нашли в данных персональную информацию клиентов. Грозят многомиллионные штрафы!",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Нарушение конфиденциальности (T1.4)\n\nПоследствия:\n• Штрафы до 4% от оборота\n• Уголовная ответственность\n• Репутационные потери\n\nВ дипломе: Таблица 1.1",
              threat: threats.t2, effects: { budget: -10, security: -20, time: 25 } },
            
            { id: 3, text: "👥 Нанять фрилансеров ($20K)", isCorrect: false,
              result: "Качество разметки ужасное (40% ошибок). Часть данных утекла в открытый доступ.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Ошибки разметки (T1.3)\n\nПоследствия:\n• Модель учится на неправильных примерах\n• Утечка данных через подрядчиков\n• Необходимость полной переделки\n\nВ дипломе: Таблица 1.1",
              threat: threats.t3, effects: { budget: -10, security: -15, time: 10 } },
            
            { id: 4, text: "🤖 Синтетические данные ($100K)", isCorrect: false,
              result: "Данные безопасны, но модель не работает в реальности — слишком 'чистые' данные.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Отрыв от реальности\n\nПоследствия:\n• Модель не распознает реальные шумы\n• Огромные затраты времени и денег\n• Продукт бесполезен\n\nСсылка: параграф 1.1",
              threat: null, effects: { budget: -35, security: 10, time: 25 } }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        desc: "Данные готовы. Где развернуть обучение модели?",
        options: [
            { id: 1, text: "☁️ AWS (Enterprise, $150K)", isCorrect: true,
              result: "AWS предоставляет полный комплект сертификаций ISO 27001. Инфраструктура защищена.",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Сертификация ISO/IEC 27001\n• Прозрачные условия использования\n• Защита от кражи модели\n\nСсылка: параграф 1.3",
              threat: null, effects: { budget: -30, security: -5, time: 0 } },
            
            { id: 2, text: "🟢 Google Cloud (скидка, $75K)", isCorrect: false,
              result: "Данные уходят на сервера в США. В договоре: Google может использовать ваши данные.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Кража модели (T2.1)\n\nПоследствия:\n• Потеря интеллектуальной собственности\n• Конкуренты получают вашу модель\n• Нет защиты данных\n\nВ дипломе: Таблица 1.2",
              threat: threats.t4, effects: { budget: -15, security: -20, time: 0 } },
            
            { id: 3, text: "🏢 Свои сервера ($25K)", isCorrect: false,
              result: "Сервера взломали. Код обучения скомпрометирован, кто-то оставил бэкдор.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Компрометация кода (T2.3)\n\nПоследствия:\n• Внедрение вредоносного кода\n• Отсутствие экспертизы безопасности\n• Огромные временные затраты\n\nВ дипломе: Таблица 1.2",
              threat: threats.t5, effects: { budget: -5, security: -35, time: 40 } },
            
            { id: 4, text: "🐉 Китайское облако ($30K)", isCorrect: false,
              result: "По закону о безопасности все данные передаются властям КНР. Модель скопирована.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Кража модели (T2.1)\n\nПоследствия:\n• Полная потеря конфиденциальности\n• Доступ спецслужб к данным\n• Нет защиты\n\nВ дипломе: Таблица 1.2",
              threat: threats.t4, effects: { budget: -10, security: -60, time: 0 } }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        desc: "Модель готова. Тестировщики нашли странные аномалии в результатах. Ваши действия?",
        options: [
            { id: 1, text: "🔍 Отложить релиз, провести полное тестирование", isCorrect: false,
              result: "Потратили месяц на доп. тесты. Нашли 5 багов. Конкуренты выпустили продукт раньше.",
              explain: "✗ НЕПРАВИЛЬНО, НО НЕ КРИТИЧНО!\n\nПроблема: Бизнес-риски\n\nПоследствия:\n• Потеря рыночного окна\n• Конкуренты заняли нишу\n\nНО вы хотя бы нашли баги!",
              threat: null, effects: { budget: -15, security: 15, time: 15 } }, // ИСПРАВЛЕНО: time +15 (было +30)
            
            { id: 2, text: "🚀 Выпустить сейчас, фиксить потом", isCorrect: false,
              result: "Модель в продакшне. Через день — сбой. Тестовые данные были подменены.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Подмена тестовых данных (T3.1)\n\nПоследствия:\n• Критические ошибки у клиентов\n• Потеря доверия\n• Репутационный ущерб\n\nВ дипломе: Таблица 1.3",
              threat: threats.t6, effects: { budget: -10, security: -25, time: 5 } }, // ИСПРАВЛЕНО: было -50 security
            
            { id: 3, text: "⚖️ Проверить только критичные сценарии", isCorrect: false,
              result: "Часть багов пропустили. Они вылезут позже, когда модель уже в эксплуатации.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Скрытые уязвимости (T3.3)\n\nПоследствия:\n• Ложное чувство безопасности\n• Отложенные проблемы\n• Аварийные ситуации\n\nВ дипломе: Таблица 1.3",
              threat: threats.t7, effects: { budget: -5, security: -10, time: 5 } }, // ИСПРАВЛЕНО: было -15, time 10
            
            { id: 4, text: "🔬 Нанять внешних аудиторов ($50K)", isCorrect: true,
              result: "Аудиторы нашли 10 уязвимостей, включая подмену тестовых данных. Модель доработана.",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Независимый аудит — золотой стандарт NIST AI RMF\n• Объективная оценка безопасности\n• Выявление скрытых угроз\n\nСсылка: параграф 1.3, NIST",
              threat: null, effects: { budget: -25, security: 30, time: 20 } }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        desc: "Модель в продакшне. Система мониторинга показывает подозрительную активность: множество одинаковых запросов.",
        options: [
            { id: 1, text: "🛡️ Rate limiting", isCorrect: false,
              result: "Простые атаки отсекли. Но сложные атаки на кражу модели продолжаются.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Недостаточная защита API (T4.2)\n\nПоследствия:\n• Rate limiting не защищает от кражи модели\n• Атакующие адаптируются\n\nВ дипломе: Таблица 1.4",
              threat: threats.t9, effects: { budget: -5, security: 10, time: 0 } },
            
            { id: 2, text: "📊 Мониторинг и анализ паттернов", isCorrect: true,
              result: "Система выявила попытку кражи модели. Атака заблокирована.",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Выявление аномалий в реальном времени\n• Проактивная защита\n• Анализ поведения злоумышленников\n\nСсылка: параграф 2.1",
              threat: null, effects: { budget: -20, security: 25, time: 10 } },
            
            { id: 3, text: "🔄 Полностью переделать API", isCorrect: false,
              result: "2 месяца разработки. Бюджет почти нулевой. Клиенты ушли к конкурентам.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Радикальные меры\n\nПоследствия:\n• Потеря рыночной позиции\n• Инвесторы отказывают в финансировании\n\nНужен баланс",
              threat: null, effects: { budget: -40, security: 50, time: 30 } },
            
            { id: 4, text: "⏸️ Игнорировать", isCorrect: false,
              result: "Через месяц модель полностью скопирована и продается конкурентами.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Подмена модели (T4.1)\n\nПоследствия:\n• Полная потеря интеллектуальной собственности\n• Крах бизнеса\n\nВ дипломе: Таблица 1.4",
              threat: threats.t8, effects: { budget: 0, security: -70, time: 0 } }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        desc: "Модель работает полгода. Вдруг резкий всплеск странных запросов и падение качества ответов.",
        options: [
            { id: 1, text: "🛑 Думаем это DDoS, ставим защиту", isCorrect: false,
              result: "Это были не DDoS, а состязательные атаки. Модель уже отравлена.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Состязательные атаки (T5.1)\n\nПоследствия:\n• Неверный диагноз\n• Потеря времени\n• Модель деградирует\n\nВ дипломе: Таблица 1.5",
              threat: threats.t10, effects: { budget: -10, security: -20, time: 0 } },
            
            { id: 2, text: "🔎 Анализировать вручную", isCorrect: false,
              result: "Потратили месяц на анализ. За это время утекли данные клиентов.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Промпт-инъекции (T5.2)\n\nПоследствия:\n• Утечка данных\n• Ручной анализ слишком медленный\n\nВ дипломе: Таблица 1.5",
              threat: threats.t11, effects: { budget: -15, security: 30, time: 40 } },
            
            { id: 3, text: "⛔ Отключить API на неделю", isCorrect: false,
              result: "Безопасность спасена. Но клиенты ушли к конкурентам.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Бизнес-катастрофа\n\nПоследствия:\n• Потеря клиентов\n• Падение выручки\n\nОтключение — крайняя мера",
              threat: null, effects: { budget: -30, security: 40, time: 20 } },
            
            { id: 4, text: "🤖 Использовать Интеллектуальный аудитор", isCorrect: true,
              result: "Ваш инструмент за 5 минут нашел промпт-инъекции и заблокировал атаку!",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Практическая значимость диплома\n• Автоматизация анализа\n• Экономия времени\n\nСсылка: Глава 3",
              threat: null, effects: { budget: 0, security: 50, time: -20 } }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ",
        desc: "Прошел год. Нужно обновить модель на новых данных. Как организовать процесс?",
        options: [
            { id: 1, text: "🔄 Полностью автоматически", isCorrect: false,
              result: "Система откатилась к старой уязвимой версии. Модель скомпрометирована.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Откат к уязвимой версии (T6.1)\n\nПоследствия:\n• Старые уязвимости снова активны\n• Незаметная компрометация\n\nВ дипломе: Таблица 1.6",
              threat: threats.t12, effects: { budget: -5, security: -30, time: 10 } },
            
            { id: 2, text: "👨‍💻 Ручное с проверкой", isCorrect: true,
              result: "Обновление успешно. Каждая версия проверена, целостность подтверждена.",
              explain: "✓ ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Полный контроль целостности\n• Защита от компрометации\n• Проверка каждой версии\n\nСсылка: параграф 2.1",
              threat: null, effects: { budget: -10, security: 20, time: 30 } },
            
            { id: 3, text: "🤖 Полуавтоматическое", isCorrect: false,
              result: "В пайплайн внедрили вредоносный код. Модель отравлена.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Компрометация пайплайна (T6.2)\n\nПоследствия:\n• Внедрение бэкдоров\n• Критический риск\n\nВ дипломе: Таблица 1.6",
              threat: threats.t13, effects: { budget: -15, security: -40, time: 15 } },
            
            { id: 4, text: "⏸️ Отложить", isCorrect: false,
              result: "Модель устарела. Клиенты уходят к конкурентам.",
              explain: "✗ НЕПРАВИЛЬНО!\n\nПроблема: Технологическое отставание\n\nПоследствия:\n• Потеря конкурентного преимущества\n• Уход клиентов\n\nВ IT нельзя останавливаться",
              threat: null, effects: { budget: -20, security: -10, time: 20 } }
        ]
    }
};

// ===== СТАТИСТИКА ЭТАПОВ =====
const actStats = {
    1: { name: "Сбор данных", vulnerability: 33.3, table: "1.1" },
    2: { name: "Обучение", vulnerability: 71.4, table: "1.2" },
    3: { name: "Тестирование", vulnerability: 88.9, table: "1.3" },
    4: { name: "Запуск", vulnerability: 66.7, table: "1.4" },
    5: { name: "Эксплуатация", vulnerability: 12.9, table: "1.5" },
    6: { name: "Обновление", vulnerability: 77.8, table: "1.6" }
};

// Обновление интерфейса
function updateDisplay() {
    document.getElementById('budgetValue').textContent = gameState.budget + '%';
    document.getElementById('securityValue').textContent = gameState.security + '%';
    document.getElementById('timeValue').textContent = gameState.time + '%';
    document.getElementById('budgetBar').style.width = gameState.budget + '%';
    document.getElementById('securityBar').style.width = gameState.security + '%';
    document.getElementById('timeBar').style.width = gameState.time + '%';
    document.getElementById('progressFill').style.width = (gameState.act * 16.66) + '%';
    document.getElementById('currentAct').textContent = `АКТ ${gameState.act}/6`;
    if (actStats[gameState.act]) {
        document.getElementById('actName').textContent = actStats[gameState.act].name;
        document.getElementById('actStats').textContent = `Таблица ${actStats[gameState.act].table} | Уязвимость: ${actStats[gameState.act].vulnerability}%`;
    }
}

// Проверка на проигрыш с визуальными предупреждениями
function checkGameOver() {
    // Визуальные предупреждения на грани
    if (gameState.budget <= 15 && gameState.budget > 0) {
        showWarning('💰 Бюджет на исходе!');
    }
    if (gameState.security <= 15 && gameState.security > 0) {
        showWarning('🔒 Безопасность критически низкая!');
    }
    if (gameState.time >= 85 && gameState.time < 100) {
        showWarning('⏱️ Время на исходе!');
    }
    
    // Фактический проигрыш
    if (gameState.budget <= 0) { showGameOver('💰 Бюджет исчерпан. Стартап обанкротился.'); return true; }
    if (gameState.security <= 0) { showGameOver('🔒 Критическая утечка данных. Компания закрыта.'); return true; }
    if (gameState.time >= 100) { showGameOver('⏱️ Время вышло. Конкуренты заняли рынок.'); return true; }
    return false;
}

function showWarning(msg) {
    let warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff9f1c, #ff6b1c);
        color: #1a1a26;
        padding: 15px 25px;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.5s, pulse 1s infinite;
        box-shadow: 0 0 30px #ff9f1c;
        border: 2px solid #ffff3b;
        font-size: 18px;
    `;
    warningDiv.innerHTML = `⚠️ ${msg}`;
    document.body.appendChild(warningDiv);
    setTimeout(() => warningDiv.remove(), 3000);
}

function showGameOver(msg) {
    gameState.gameOver = true;
    
    // Эффект "сбоя" перед провалом
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:20px; animation: glitch 1s infinite;">
            <div style="border:3px solid #ff3b3b; color:#ff3b3b; font-size:32px; padding:30px; border-radius:30px; background:rgba(255,59,59,0.1); box-shadow:0 0 50px #ff3b3b;">
                ❌ ПРОЕКТ ПРОВАЛЕН
            </div>
            <p style="margin:30px 0; font-size:20px; color:#ff9f1c;">${msg}</p>
            <p style="margin:20px 0; font-size:18px;">Правильных ответов: ${gameState.correctChoices}/6</p>
            <button onclick="restartGame()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:20px 40px; border-radius:15px; margin:20px 0; font-size:20px; cursor:pointer; box-shadow:0 0 30px #00f3ff;">🔄 НАЧАТЬ ЗАНОВО</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

// Дождь из денег (усиленная версия)
function moneyRain() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            let emoji = ['💰','💵','💶','💷','💎','🪙','💸','🏆','⭐','✨'][Math.floor(Math.random()*10)];
            let div = document.createElement('div');
            div.innerHTML = emoji;
            div.style.position = 'fixed';
            div.style.left = Math.random()*100 + '%';
            div.style.top = '-50px';
            div.style.fontSize = (20 + Math.random()*40) + 'px';
            div.style.animation = `fall ${1.5+Math.random()*3}s linear`;
            div.style.zIndex = '9999';
            div.style.pointerEvents = 'none';
            div.style.filter = 'drop-shadow(0 0 15px gold)';
            div.style.textShadow = '0 0 20px rgba(255,215,0,0.8)';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 5000);
        }, i*40);
    }
}

function showVictory() {
    moneyRain();
    
    // Добавляем анимации, если их ещё нет
    if (!document.querySelector('#victoryStyles')) {
        let style = document.createElement('style');
        style.id = 'victoryStyles';
        style.textContent = `
            @keyframes fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    let riskColor = gameState.security >= 70 ? '#00ff9d' : (gameState.security >= 40 ? '#ff9f1c' : '#ff3b3b');
    let riskText = gameState.security >= 70 ? 'Низкий' : (gameState.security >= 40 ? 'Средний' : 'Высокий');
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:10px;">
            <div style="border:4px solid #00ff9d; color:#00ff9d; font-size:42px; padding:30px; border-radius:40px; margin:20px 0; animation:pulse 2s infinite; background:linear-gradient(135deg,#00ff9d10,#00f3ff10); box-shadow:0 0 70px #00ff9d;">
                🏆 ПОБЕДА! СТАРТАП NeuroGen УСПЕШНО ЗАВЕРШЕН! 🏆
            </div>
            
            <div style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); padding:30px; border-radius:30px; margin:30px 0; box-shadow:0 0 50px #00f3ff; border:2px solid #00f3ff;">
                <h2 style="color:#00f3ff; font-size:32px; margin-bottom:25px; text-shadow:0 0 15px #00f3ff;">📊 ИТОГОВЫЙ ОТЧЕТ ПО АУДИТУ</h2>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin:25px 0;">
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">💰</div>
                        <div style="color:#a0a0b0; margin:15px 0;">Бюджет</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.budget}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">🔒</div>
                        <div style="color:#a0a0b0; margin:15px 0;">Безопасность</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.security}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">⏱️</div>
                        <div style="color:#a0a0b0; margin:15px 0;">Время</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.time}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">🎯</div>
                        <div style="color:#a0a0b0; margin:15px 0;">Правильно</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.correctChoices}/6</div>
                    </div>
                </div>
                
                <div style="background:#1e1e2a; padding:25px; border-radius:20px; text-align:left; margin:25px 0; border:2px solid #9d4edd;">
                    <h3 style="color:#9d4edd; font-size:26px; margin-bottom:20px; text-shadow:0 0 10px #9d4edd;">📋 ОЦЕНКА РИСКОВ ПО ДИПЛОМУ</h3>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Уровень риска:</span> <span style="color:${riskColor}; font-weight:bold; font-size:22px;">${riskText}</span></p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Соответствие ISO 27001:</span> ✅ Сертифицировано</p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Соответствие NIST AI RMF:</span> ✅ Выполнено</p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Угроз из диплома:</span> ⚠️ 27 идентифицировано</p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Рекомендации:</span> 📌 Приложение Л</p>
                </div>
                
                <div style="background:#1e1e2a; padding:20px; border-radius:15px; margin-top:25px;">
                    <p style="color:#00f3ff; font-size:22px;">🎓 Дипломная работа Воробьевой А.А., МГЛУ, 2026</p>
                    <p style="color:#a0a0b0; font-size:18px;">Тема: Разработка методики аудита ИБ систем с ИИ</p>
                </div>
            </div>
            
            <button onclick="restartGame()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:4px solid #00ff9d; color:#00ff9d; padding:25px 50px; border-radius:20px; margin:40px 0; font-size:24px; cursor:pointer; box-shadow:0 0 40px #00ff9d; transition:0.3s;">🏆 ПРОЙТИ ЗАНОВО 🏆</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function showAct() {
    if (checkGameOver()) return;
    if (gameState.act > 6) { showVictory(); return; }
    
    let act = acts[gameState.act];
    let stats = actStats[gameState.act];
    
    let html = `<div style="margin-bottom:20px;">
        <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
            <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">Акт ${gameState.act}/6</span>
            <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">Таблица ${stats.table}</span>
        </div>
        <h2 style="color:#00f3ff; font-size:26px; margin:20px 0;">${act.title}</h2>
        <p style="margin:20px 0; line-height:1.8; font-size:16px;">${act.desc}</p>
        <div style="background:#1a1a26; padding:15px; border-left:4px solid #ffff3b; margin:20px 0; border-radius:5px;">
            <span style="color:#ffff3b; font-weight:bold;">📊 Статистика диплома:</span> На этом этапе <strong>${stats.vulnerability}%</strong> проектов имеют уязвимости (параграф 3.3)
        </div>
        <hr style="border-color:#2a2a3a; margin:25px 0;">
        <p style="color:#00ff9d; font-weight:bold; font-size:18px; margin-bottom:20px;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
    </div>`;
    
    document.getElementById('terminalContent').innerHTML = html;
    
    for (let i=0; i<4; i++) {
        let btn = document.getElementById(`choice${i+1}`);
        if (act.options[i]) {
            btn.textContent = act.options[i].text;
            btn.style.display = 'block';
            btn.style.marginBottom = '12px';
            btn.style.padding = '15px';
        } else {
            btn.style.display = 'none';
        }
    }
    document.getElementById('choicesGrid').style.display = 'grid';
}

function makeChoice(num) {
    if (gameState.gameOver || gameState.act > 6) return;
    
    let act = acts[gameState.act];
    let ch = act.options[num-1];
    if (!ch) return;
    
    if (ch.isCorrect) gameState.correctChoices++;
    
    gameState.budget = Math.min(100, Math.max(0, gameState.budget + ch.effects.budget));
    gameState.security = Math.min(100, Math.max(0, gameState.security + ch.effects.security));
    gameState.time = Math.min(100, Math.max(0, gameState.time + ch.effects.time));
    
    updateDisplay();
    if (checkGameOver()) return;
    
    let threatHtml = '';
    if (ch.threat) {
        threatHtml = `<div style="background:#1a1a26; padding:15px; border-left:4px solid #ff3b3b; margin:15px 0; border-radius:5px;">
            <span style="color:#ff3b3b; font-weight:bold;">⚠️ УГРОЗА: ${ch.threat.name}</span>
            <p style="margin:10px 0 0 0; color:#a0a0b0;">${ch.threat.desc}</p>
            <p style="margin:5px 0 0 0; color:#888;">${ch.threat.table} | Риск: ${ch.threat.risk}</p>
        </div>`;
    }
    
    let html = `<div>
        <div style="border-left:5px solid ${ch.isCorrect?'#00ff9d':'#ff3b3b'}; padding:20px; background:#1a1a26; border-radius:10px;">
            <h3 style="color:${ch.isCorrect?'#00ff9d':'#ff3b3b'}; font-size:22px; margin-bottom:15px;">${ch.isCorrect?'✓ ПРАВИЛЬНЫЙ ВЫБОР':'✗ НЕПРАВИЛЬНЫЙ ВЫБОР'}</h3>
            <p style="margin:15px 0; line-height:1.7; font-size:16px;">${ch.result}</p>
            ${threatHtml}
            <div style="background:#1e1e2a; padding:15px; border-radius:10px; margin:15px 0; white-space:pre-line; line-height:1.7; font-size:15px;">${ch.explain}</div>
            <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                <p style="color:#00f3ff; font-weight:bold; margin-bottom:10px;">📊 ИЗМЕНЕНИЕ РЕСУРСОВ:</p>
                <ul style="list-style:none; padding:0;">
                    <li style="margin:8px 0;">💰 Бюджет: ${ch.effects.budget>0?'+':''}${ch.effects.budget}%</li>
                    <li style="margin:8px 0;">🔒 Безопасность: ${ch.effects.security>0?'+':''}${ch.effects.security}%</li>
                    <li style="margin:8px 0;">⏱️ Время: ${ch.effects.time>0?'+':''}${ch.effects.time}%</li>
                </ul>
            </div>
        </div>
        <button onclick="nextAct()" style="width:100%; background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:15px; border-radius:10px; margin-top:20px; font-size:18px; cursor:pointer; transition:0.3s;">➡️ ПРОДОЛЖИТЬ (АКТ ${gameState.act+1})</button>
    </div>`;
    
    document.getElementById('terminalContent').innerHTML = html;
    document.getElementById('choicesGrid').style.display = 'none';
}

function nextAct() {
    gameState.act++;
    if (gameState.act <= 6) {
        showAct();
    } else {
        showVictory();
    }
}

function restartGame() {
    gameState = {
        act: 1,
        budget: 65,
        security: 35,
        time: 75,
        correctChoices: 0,
        gameOver: false
    };
    updateDisplay();
    showAct();
    closeModal();
}

function showDiplomaLinks() {
    document.getElementById('modalTitle').textContent = 'О ДИПЛОМНОЙ РАБОТЕ';
    document.getElementById('modalBody').innerHTML = `
        <h3 style="color:#00f3ff; font-size:24px; margin-bottom:20px;">Воробьева Александра Александровна</h3>
        <p style="margin:15px 0; font-size:16px;">🏛️ МГЛУ, Институт информационных наук</p>
        <p style="margin:15px 0; font-size:16px;">🔬 Кафедра международной информационной безопасности</p>
        <p style="margin:15px 0; font-size:16px;">📖 Тема: Разработка методики аудита ИБ систем с ИИ</p>
        <p style="margin:15px 0; font-size:16px;">📊 Таблицы 1.1-1.6, параграф 3.3</p>
        <p style="margin:15px 0; font-size:16px;">🎮 Игра полностью соответствует диплому</p>
    `;
    document.getElementById('infoModal').style.display = 'flex';
}

function showAllThreats() {
    let html = '<h3 style="color:#00f3ff; font-size:24px; margin-bottom:20px;">ВСЕ 27 УГРОЗ ИЗ ДИПЛОМА</h3>';
    html += '<div style="background:#1a1a26; padding:20px; border-radius:15px;">';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.1:</span> T1.1-T1.4 (4 угрозы)</p>';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.2:</span> T2.1-T2.4 (4 угрозы)</p>';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.3:</span> T3.1-T3.3 (3 угрозы)</p>';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.4:</span> T4.1-T4.3 (3 угрозы)</p>';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.5:</span> T5.1-T5.6 (6 угроз)</p>';
    html += '<p style="margin:12px 0;"><span style="color:#00ff9d;">Таблица 1.6:</span> T6.1-T6.3 (3 угрозы)</p>';
    html += '<p style="margin:20px 0 0 0; color:#9d4edd; font-size:18px;">📌 Всего: 27 угроз</p>';
    html += '</div>';
    
    document.getElementById('modalTitle').textContent = 'ВСЕ УГРОЗЫ';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

window.onload = function() {
    showAct();
    window.onclick = function(e) {
        if (e.target == document.getElementById('infoModal')) {
            closeModal();
        }
    };
};