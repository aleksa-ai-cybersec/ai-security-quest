// ============================================
// AI SECURITY SIMULATOR - ИСПРАВЛЕННАЯ ВЕРСИЯ
// Диплом Воробьевой А.А., МГЛУ, 2026
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
    t1: { id: "T1.1", name: "Отравление данных (Data Poisoning)", table: "Таблица 1.1", risk: "Высокий", desc: "Злоумышленник внес искаженные данные" },
    t2: { id: "T1.4", name: "Нарушение конфиденциальности", table: "Таблица 1.1", risk: "Средний", desc: "Сбор данных без согласия" },
    t3: { id: "T1.3", name: "Ошибки разметки", table: "Таблица 1.1", risk: "Средний", desc: "Изменение меток классов" },
    t4: { id: "T2.1", name: "Кража модели", table: "Таблица 1.2", risk: "Критический", desc: "Восстановление логики через API" },
    t5: { id: "T2.3", name: "Компрометация кода", table: "Таблица 1.2", risk: "Высокий", desc: "Внесение изменений в скрипты" },
    t6: { id: "T3.1", name: "Подмена тестов", table: "Таблица 1.3", risk: "Высокий", desc: "Замена тестовой выборки" },
    t7: { id: "T3.3", name: "Скрытые уязвимости", table: "Таблица 1.3", risk: "Критический", desc: "Отсутствие тестирования" },
    t8: { id: "T4.1", name: "Подмена модели", table: "Таблица 1.4", risk: "Критический", desc: "Замена на вредоносную" },
    t9: { id: "T4.2", name: "Небезопасный API", table: "Таблица 1.4", risk: "Высокий", desc: "Отсутствие защиты" },
    t10: { id: "T5.1", name: "Состязательные атаки", table: "Таблица 1.5", risk: "Высокий", desc: "Специальные входные данные" },
    t11: { id: "T5.2", name: "Промпт-инъекции", table: "Таблица 1.5", risk: "Критический", desc: "Обход инструкций" },
    t12: { id: "T6.1", name: "Откат версии", table: "Таблица 1.6", risk: "Высокий", desc: "Возврат к уязвимой версии" },
    t13: { id: "T6.2", name: "Компрометация пайплайна", table: "Таблица 1.6", risk: "Критический", desc: "Вредоносные изменения" }
};

// ===== ВСЕ ЭТАПЫ С ПОЯСНЕНИЯМИ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР ДАННЫХ",
        desc: "Вам нужны данные для обучения банковского чат-бота. Какой источник выберете?",
        options: [
            { id: 1, text: "💰 Купить у поставщика ($50K)", isCorrect: true,
              result: "Поставщик дал сертификат качества. Данные чистые.",
              explain: "✓ ПРАВИЛЬНО! Аккредитованный поставщик гарантирует:\n• Легальность данных\n• Минимизацию риска отравления (T1.1)\n• Юридическую защиту",
              threat: null, effects: { budget: -5, security: -5, time: 5 } },
            
            { id: 2, text: "🌐 Из открытых источников", isCorrect: false,
              result: "Юристы нашли персональные данные. Грозят штрафы!",
              explain: "✗ ОШИБКА! Открытые источники содержат личные данные.\n• Штрафы до 4% оборота\n• Уголовная ответственность\n• Репутационные потери",
              threat: threats.t2, effects: { budget: -10, security: -20, time: 25 } },
            
            { id: 3, text: "👥 Нанять фрилансеров ($20K)", isCorrect: false,
              result: "Разметка плохая (40% ошибок). Данные утекли.",
              explain: "✗ ОШИБКА! Фрилансеры без контроля:\n• Портят разметку (T1.3)\n• Сливают данные\n• Требуют переделки",
              threat: threats.t3, effects: { budget: -10, security: -15, time: 10 } },
            
            { id: 4, text: "🤖 Синтетические данные ($100K)", isCorrect: false,
              result: "Модель не работает в реальности — слишком 'чистые' данные.",
              explain: "✗ ОШИБКА! Синтетика не отражает реальность:\n• Нет шумов\n• Модель бесполезна\n• Огромные затраты",
              threat: null, effects: { budget: -35, security: 10, time: 25 } }
        ]
    },
    2: {
        title: "ЭТАП 2: ОБУЧЕНИЕ",
        desc: "Где развернуть обучение модели?",
        options: [
            { id: 1, text: "☁️ AWS ($150K, ISO 27001)", isCorrect: true,
              result: "AWS работает стабильно. Есть все сертификаты.",
              explain: "✓ ПРАВИЛЬНО! AWS имеет:\n• ISO 27001\n• Прозрачные условия\n• Защиту от кражи",
              threat: null, effects: { budget: -30, security: -5, time: 0 } },
            
            { id: 2, text: "🟢 Google Cloud ($75K)", isCorrect: false,
              result: "Google может использовать ваши данные для своих моделей.",
              explain: "✗ ОШИБКА! Google имеет право:\n• Использовать ваши данные\n• Обучать свои модели\n• Кража интеллектуальной собственности (T2.1)",
              threat: threats.t4, effects: { budget: -15, security: -20, time: 0 } },
            
            { id: 3, text: "🏢 Свои сервера ($25K)", isCorrect: false,
              result: "Сервера взломали. Код обучения украли.",
              explain: "✗ ОШИБКА! Свои сервера без защиты:\n• Легкая цель для хакеров\n• Компрометация кода (T2.3)\n• Огромные временные затраты",
              threat: threats.t5, effects: { budget: -5, security: -35, time: 40 } },
            
            { id: 4, text: "🐉 Китайское облако ($30K)", isCorrect: false,
              result: "Все данные ушли властям КНР по закону.",
              explain: "✗ ОШИБКА! Данные попадают под юрисдикцию:\n• Полная потеря конфиденциальности\n• Кража модели (T2.1)\n• Нет защиты",
              threat: threats.t4, effects: { budget: -10, security: -60, time: 0 } }
        ]
    },
    3: {
        title: "ЭТАП 3: ТЕСТИРОВАНИЕ",
        desc: "Тестировщики нашли странные аномалии. Что делать?",
        options: [
            { id: 1, text: "🔍 Отложить релиз", isCorrect: false,
              result: "Конкуренты вышли раньше. Рынок потерян.",
              explain: "✗ ОШИБКА! Безопасность важна, но:\n• Бизнес должен жить\n• Потеря рыночного окна\n• Инвесторы недовольны",
              threat: null, effects: { budget: -10, security: 20, time: 30 } },
            
            { id: 2, text: "🚀 Выпустить сейчас", isCorrect: false,
              result: "Тесты были подменены. Модель сломалась у клиентов.",
              explain: "✗ ОШИБКА! Подмена тестовых данных (T3.1):\n• Критические ошибки\n• Потеря доверия\n• Репутационный ущерб",
              threat: threats.t6, effects: { budget: 0, security: -50, time: 0 } },
            
            { id: 3, text: "⚖️ Проверить главное", isCorrect: false,
              result: "Баги остались. Они вылезут позже.",
              explain: "✗ ОШИБКА! Скрытые уязвимости (T3.3):\n• Ложное чувство безопасности\n• Отложенные проблемы\n• Аварии в продакшне",
              threat: threats.t7, effects: { budget: -5, security: -15, time: 10 } },
            
            { id: 4, text: "🔬 Нанять аудиторов ($50K)", isCorrect: true,
              result: "Аудиторы нашли 10 уязвимостей. Модель доработана.",
              explain: "✓ ПРАВИЛЬНО! Внешний аудит — стандарт NIST:\n• Объективная оценка\n• Выявление скрытых угроз\n• Соответствие стандартам",
              threat: null, effects: { budget: -25, security: 30, time: 20 } }
        ]
    },
    4: {
        title: "ЭТАП 4: ЗАПУСК",
        desc: "Мониторинг показывает подозрительные запросы.",
        options: [
            { id: 1, text: "🛡️ Rate limiting", isCorrect: false,
              result: "Простые атаки отсекли. Модель всё равно украли.",
              explain: "✗ ОШИБКА! Rate limiting не защищает от:\n• Целевых атак\n• Кражи модели (T4.2)\n• Адаптивных злоумышленников",
              threat: threats.t9, effects: { budget: -5, security: 10, time: 0 } },
            
            { id: 2, text: "📊 Мониторинг паттернов", isCorrect: true,
              result: "Выявили кражу модели. Атака заблокирована.",
              explain: "✓ ПРАВИЛЬНО! Мониторинг позволяет:\n• Видеть атаки в реальном времени\n• Анализировать паттерны\n• Блокировать до утечки",
              threat: null, effects: { budget: -20, security: 25, time: 10 } },
            
            { id: 3, text: "🔄 Переделать API", isCorrect: false,
              result: "2 месяца работы. Клиенты ушли к конкурентам.",
              explain: "✗ ОШИБКА! Радикальные меры убивают бизнес:\n• Рынок потерян\n• Инвесторы уходят\n• Нет баланса",
              threat: null, effects: { budget: -40, security: 50, time: 30 } },
            
            { id: 4, text: "⏸️ Игнорировать", isCorrect: false,
              result: "Модель украдена и продается конкурентами.",
              explain: "✗ ОШИБКА! Игнорирование = катастрофа:\n• Подмена модели (T4.1)\n• Потеря IP\n• Крах бизнеса",
              threat: threats.t8, effects: { budget: 0, security: -70, time: 0 } }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        desc: "Всплеск странных запросов. Качество ответов упало.",
        options: [
            { id: 1, text: "🛑 Думаем DDoS", isCorrect: false,
              result: "Это состязательные атаки. Модель отравлена.",
              explain: "✗ ОШИБКА! Неверный диагноз:\n• Состязательные атаки (T5.1)\n• Потеря времени\n• Усугубление проблемы",
              threat: threats.t10, effects: { budget: -10, security: -20, time: 0 } },
            
            { id: 2, text: "🔎 Ручной анализ", isCorrect: false,
              result: "Месяц анализа. Данные 10,000 клиентов утекли.",
              explain: "✗ ОШИБКА! Ручной анализ слишком медленный:\n• Промпт-инъекции (T5.2)\n• Утечка данных\n• Штрафы",
              threat: threats.t11, effects: { budget: -15, security: 30, time: 40 } },
            
            { id: 3, text: "⛔ Отключить API", isCorrect: false,
              result: "Клиенты ушли к конкурентам. Бизнес рухнул.",
              explain: "✗ ОШИБКА! Отключение — не решение:\n• Потеря клиентов\n• Репутационный ущерб\n• Падение выручки",
              threat: null, effects: { budget: -30, security: 40, time: 20 } },
            
            { id: 4, text: "🤖 Ваш Интеллектуальный аудитор", isCorrect: true,
              result: "Аудитор за 5 минут нашел промпт-инъекции и заблокировал атаку!",
              explain: "✓ ПРАВИЛЬНО! Ваш инструмент из диплома:\n• Мгновенный анализ\n• Экономия времени\n• Точное выявление угроз\n• +50% к безопасности!",
              threat: null, effects: { budget: 0, security: 50, time: -20 } }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ",
        desc: "Нужно обновить модель на новых данных. Ваш выбор?",
        options: [
            { id: 1, text: "🔄 Автоматически", isCorrect: false,
              result: "Откат к старой уязвимой версии. Модель скомпрометирована.",
              explain: "✗ ОШИБКА! Автоматика без контроля:\n• Откат к уязвимой версии (T6.1)\n• Незаметная компрометация\n• Сложность обнаружения",
              threat: threats.t12, effects: { budget: -5, security: -30, time: 10 } },
            
            { id: 2, text: "👨‍💻 Ручное с проверкой", isCorrect: true,
              result: "Обновление успешно. Все версии проверены.",
              explain: "✓ ПРАВИЛЬНО! Ручной контроль:\n• Гарантия целостности\n• Защита от компрометации\n• Проверка каждого этапа",
              threat: null, effects: { budget: -10, security: 20, time: 30 } },
            
            { id: 3, text: "🤖 Полуавтомат", isCorrect: false,
              result: "В пайплайн внедрили вредоносный код. Модель отравлена.",
              explain: "✗ ОШИБКА! Полуавтоматические системы уязвимы:\n• Компрометация пайплайна (T6.2)\n• Сложность обнаружения\n• Критический риск",
              threat: threats.t13, effects: { budget: -15, security: -40, time: 15 } },
            
            { id: 4, text: "⏸️ Отложить", isCorrect: false,
              result: "Модель устарела. Клиенты уходят к конкурентам.",
              explain: "✗ ОШИБКА! Отказ от обновлений:\n• Технологическое отставание\n• Потеря рынка\n• Снижение выручки",
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

function updateDisplay() {
    document.getElementById('budgetValue').textContent = gameState.budget + '%';
    document.getElementById('securityValue').textContent = gameState.security + '%';
    document.getElementById('timeValue').textContent = gameState.time + '%';
    document.getElementById('budgetBar').style.width = gameState.budget + '%';
    document.getElementById('securityBar').style.width = gameState.security + '%';
    document.getElementById('timeBar').style.width = gameState.time + '%';
    document.getElementById('progressFill').style.width = (gameState.act * 16.66) + '%';
    document.getElementById('currentAct').textContent = `Акт ${gameState.act}/6`;
    if (actStats[gameState.act]) {
        document.getElementById('actName').textContent = actStats[gameState.act].name;
        document.getElementById('actStats').textContent = `Таблица ${actStats[gameState.act].table} | Уязвимость: ${actStats[gameState.act].vulnerability}%`;
    }
}

function checkGameOver() {
    if (gameState.budget <= 0) { showGameOver('💰 Бюджет исчерпан. Стартап обанкротился.'); return true; }
    if (gameState.security <= 0) { showGameOver('🔒 Критическая утечка данных. Компания закрыта.'); return true; }
    if (gameState.time >= 100) { showGameOver('⏱️ Время вышло. Конкуренты заняли рынок.'); return true; }
    return false;
}

function showGameOver(msg) {
    gameState.gameOver = true;
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="border:2px solid #ff3b3b; color:#ff3b3b; font-size:24px; padding:20px; border-radius:20px;">❌ ПРОЕКТ ПРОВАЛЕН</div>
            <p style="margin:20px 0;">${msg}</p>
            <p>Правильных ответов: ${gameState.correctChoices}/6</p>
            <button onclick="restartGame()" style="background:#1a1a26; border:2px solid #00f3ff; color:#00f3ff; padding:15px 30px; border-radius:10px;">🔄 Начать заново</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function moneyRain() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            let emoji = ['💰','💵','💶','💷','💎','🪙'][Math.floor(Math.random()*6)];
            let div = document.createElement('div');
            div.innerHTML = emoji;
            div.style.position = 'fixed';
            div.style.left = Math.random()*100 + '%';
            div.style.top = '-50px';
            div.style.fontSize = (20 + Math.random()*30) + 'px';
            div.style.animation = `fall ${2+Math.random()*3}s linear`;
            div.style.zIndex = '9999';
            div.style.pointerEvents = 'none';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 5000);
        }, i*80);
    }
}

function showVictory() {
    moneyRain();
    let style = document.createElement('style');
    style.textContent = '@keyframes fall{0%{transform:translateY(0) rotate(0deg); opacity:0.8;}100%{transform:translateY(100vh) rotate(360deg); opacity:0;}}';
    document.head.appendChild(style);
    
    let riskColor = gameState.security >= 70 ? '#00ff9d' : (gameState.security >= 40 ? '#ff9f1c' : '#ff3b3b');
    let riskText = gameState.security >= 70 ? 'Низкий' : (gameState.security >= 40 ? 'Средний' : 'Высокий');
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:10px;">
            <div style="border:3px solid #00ff9d; color:#00ff9d; font-size:32px; padding:20px; border-radius:30px; margin:20px 0; animation:pulse 2s infinite;">🏆 ПОБЕДА! 🏆</div>
            
            <div style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); padding:20px; border-radius:20px; margin:20px 0;">
                <h2 style="color:#00f3ff;">СТАРТАП NeuroGen УСПЕШНО ЗАВЕРШЕН!</h2>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0;">
                    <div style="background:#1e1e2a; padding:15px; border-radius:15px;">
                        <div style="font-size:40px;">💰</div>
                        <div>Бюджет</div>
                        <div style="font-size:24px; color:#00ff9d;">${gameState.budget}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:15px; border-radius:15px;">
                        <div style="font-size:40px;">🔒</div>
                        <div>Безопасность</div>
                        <div style="font-size:24px; color:#00ff9d;">${gameState.security}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:15px; border-radius:15px;">
                        <div style="font-size:40px;">⏱️</div>
                        <div>Время</div>
                        <div style="font-size:24px; color:#00ff9d;">${gameState.time}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:15px; border-radius:15px;">
                        <div style="font-size:40px;">🎯</div>
                        <div>Правильно</div>
                        <div style="font-size:24px; color:#00ff9d;">${gameState.correctChoices}/6</div>
                    </div>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:15px; text-align:left;">
                    <h3 style="color:#9d4edd;">📋 ОТЧЕТ ПО АУДИТУ</h3>
                    <p><span style="color:#00f3ff;">Уровень риска:</span> <span style="color:${riskColor};">${riskText}</span></p>
                    <p><span style="color:#00f3ff;">ISO 27001:</span> ✅ Соответствует</p>
                    <p><span style="color:#00f3ff;">NIST AI RMF:</span> ✅ Соответствует</p>
                    <p><span style="color:#00f3ff;">Угроз из диплома:</span> 27 идентифицировано</p>
                    <p><span style="color:#00f3ff;">Рекомендации:</span> Приложение Л</p>
                </div>
            </div>
            
            <p style="color:#888;">Воробьева А.А., МГЛУ, 2026</p>
            <button onclick="restartGame()" style="background:#1a1a26; border:2px solid #00ff9d; color:#00ff9d; padding:15px 30px; border-radius:10px; margin:20px;">🏆 ПРОЙТИ ЗАНОВО</button>
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
            <span style="border:1px solid #9d4edd; color:#9d4edd; padding:4px 12px; border-radius:20px;">Акт ${gameState.act}/6</span>
            <span style="border:1px solid #9d4edd; color:#9d4edd; padding:4px 12px; border-radius:20px;">Таблица ${stats.table}</span>
        </div>
        <h2 style="color:#00f3ff; margin:15px 0;">${act.title}</h2>
        <p style="margin:15px 0; line-height:1.7;">${act.desc}</p>
        <div style="background:#1a1a26; padding:10px 15px; border-left:3px solid #ffff3b; margin:15px 0; border-radius:5px;">
            <span style="color:#ffff3b;">📊 Статистика диплома:</span> На этом этапе <strong>${stats.vulnerability}%</strong> проектов имеют уязвимости (параграф 3.3)
        </div>
        <hr style="border-color:#2a2a3a; margin:20px 0;">
        <p style="color:#00ff9d; font-weight:600; margin-bottom:15px;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
    </div>`;
    
    document.getElementById('terminalContent').innerHTML = html;
    
    for (let i=0; i<4; i++) {
        let btn = document.getElementById(`choice${i+1}`);
        if (act.options[i]) {
            btn.textContent = act.options[i].text;
            btn.style.display = 'block';
            btn.style.marginBottom = '10px';
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
        threatHtml = `<div style="background:#1a1a26; padding:15px; border-left:3px solid #ff3b3b; margin:15px 0; border-radius:5px;">
            <span style="color:#ff3b3b; font-weight:600;">⚠️ УГРОЗА: ${ch.threat.name}</span>
            <p style="margin:8px 0 0 0; color:#a0a0b0;">${ch.threat.desc}</p>
            <p style="margin:5px 0 0 0; color:#888;">${ch.threat.table} | Риск: ${ch.threat.risk}</p>
        </div>`;
    }
    
    let html = `<div>
        <div style="border-left:5px solid ${ch.isCorrect?'#00ff9d':'#ff3b3b'}; padding:20px; background:#1a1a26; border-radius:10px;">
            <h3 style="color:${ch.isCorrect?'#00ff9d':'#ff3b3b'}; margin-bottom:15px;">${ch.isCorrect?'✓ ПРАВИЛЬНО':'✗ ОШИБКА'}</h3>
            <p style="margin:15px 0; line-height:1.7;">${ch.result}</p>
            ${threatHtml}
            <div style="background:#1e1e2a; padding:15px; border-radius:10px; margin:15px 0; white-space:pre-line; line-height:1.7;">${ch.explain}</div>
            <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                <p style="color:#00f3ff; margin-bottom:10px;">📊 ИЗМЕНЕНИЕ РЕСУРСОВ:</p>
                <ul style="list-style:none; padding:0;">
                    <li style="margin:5px 0;">💰 Бюджет: ${ch.effects.budget>0?'+':''}${ch.effects.budget}%</li>
                    <li style="margin:5px 0;">🔒 Безопасность: ${ch.effects.security>0?'+':''}${ch.effects.security}%</li>
                    <li style="margin:5px 0;">⏱️ Время: ${ch.effects.time>0?'+':''}${ch.effects.time}%</li>
                </ul>
            </div>
        </div>
        <button onclick="nextAct()" style="width:100%; background:#1a1a26; border:2px solid #00f3ff; color:#00f3ff; padding:15px; border-radius:10px; margin-top:20px; font-size:16px; cursor:pointer;">➡️ К АКТУ ${gameState.act+1}</button>
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
    document.getElementById('modalTitle').textContent = 'О ДИПЛОМЕ';
    document.getElementById('modalBody').innerHTML = `
        <h3 style="color:#00f3ff; margin-bottom:15px;">Воробьева Александра А.</h3>
        <p style="margin:10px 0;">МГЛУ, Институт информационных наук</p>
        <p style="margin:10px 0;">Кафедра международной информационной безопасности</p>
        <p style="margin:10px 0;">Тема: Аудит безопасности ИИ-систем</p>
        <p style="margin:10px 0;">Таблицы 1.1-1.6, параграф 3.3</p>
        <p style="margin:10px 0;">Глава 3: Апробация на DeepSeek</p>
    `;
    document.getElementById('infoModal').style.display = 'flex';
}

function showAllThreats() {
    let html = '<h3 style="color:#00f3ff; margin-bottom:20px;">ВСЕ 27 УГРОЗ ИЗ ДИПЛОМА</h3>';
    html += '<div style="background:#1a1a26; padding:15px; border-radius:10px;">';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.1:</span> T1.1-T1.4 (4 угрозы)</p>';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.2:</span> T2.1-T2.4 (4 угрозы)</p>';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.3:</span> T3.1-T3.3 (3 угрозы)</p>';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.4:</span> T4.1-T4.3 (3 угрозы)</p>';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.5:</span> T5.1-T5.6 (6 угроз)</p>';
    html += '<p style="margin:8px 0;"><span style="color:#00ff9d;">Таблица 1.6:</span> T6.1-T6.3 (3 угрозы)</p>';
    html += '<p style="margin:15px 0 0 0; color:#9d4edd;">Всего: 27 угроз</p>';
    html += '</div>';
    
    document.getElementById('modalTitle').textContent = 'УГРОЗЫ';
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

// Добавляем стиль для пульсации
let style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);