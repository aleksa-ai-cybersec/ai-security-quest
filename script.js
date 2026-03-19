// ============================================
// AI SECURITY SIMULATOR
// по методике аудита ИБ ИИ-систем
// МГЛУ, 2026 | Воробьева А.А.
// ============================================

// ===== ИНИЦИАЛИЗАЦИЯ СОСТОЯНИЯ =====
let gameState = {
    act: 1,
    budget: 70,
    security: 40,
    time: 60,
    correctChoices: 0,
    totalChoices: 0,
    gameOver: false,
    victory: false,
    history: []
};

// ===== ВСЕ УГРОЗЫ ИЗ ДИПЛОМА =====
const threats = {
    t1: { id: "T1.1", name: "Отравление данных", table: "1.1", risk: "Критический", 
          desc: "Внесение искаженных данных в обучающую выборку" },
    t2: { id: "T1.4", name: "Нарушение конфиденциальности", table: "1.1", risk: "Высокий",
          desc: "Сбор данных без согласия субъектов" },
    t3: { id: "T1.3", name: "Ошибки разметки", table: "1.1", risk: "Средний",
          desc: "Некачественная разметка данных фрилансерами" },
    t4: { id: "T2.1", name: "Кража модели", table: "1.2", risk: "Критический",
          desc: "Извлечение модели через API или утечка данных" },
    t5: { id: "T2.3", name: "Компрометация кода", table: "1.2", risk: "Критический",
          desc: "Взлом серверов и внедрение бэкдоров" },
    t6: { id: "T3.1", name: "Подмена тестовых данных", table: "1.3", risk: "Высокий",
          desc: "Манипуляция с тестовой выборкой" },
    t7: { id: "T3.3", name: "Скрытые уязвимости", table: "1.3", risk: "Высокий",
          desc: "Непроверенные сценарии работы модели" },
    t8: { id: "T4.1", name: "Подмена модели", table: "1.4", risk: "Критический",
          desc: "Замена легитимной модели на вредоносную" },
    t9: { id: "T4.2", name: "Небезопасный API", table: "1.4", risk: "Высокий",
          desc: "Отсутствие защиты API от атак" },
    t10: { id: "T5.1", name: "Состязательные атаки", table: "1.5", risk: "Высокий",
           desc: "Специально сформированные входные данные" },
    t11: { id: "T5.2", name: "Промпт-инъекции", table: "1.5", risk: "Критический",
           desc: "Обход инструкций модели" },
    t12: { id: "T6.1", name: "Откат к уязвимой версии", table: "1.6", risk: "Высокий",
           desc: "Возврат к старой версии с уязвимостями" },
    t13: { id: "T6.2", name: "Компрометация пайплайна", table: "1.6", risk: "Критический",
           desc: "Внедрение вредоносного кода в обновление" }
};

// ===== СТАТИСТИКА ЭТАПОВ ИЗ ДИПЛОМА =====
const actStats = {
    1: { name: "Сбор данных", vulnerability: "33.3%", table: "1.1", color: "#ff9f1c" },
    2: { name: "Обучение", vulnerability: "71.4%", table: "1.2", color: "#ff6b1c" },
    3: { name: "Тестирование", vulnerability: "88.9%", table: "1.3", color: "#ff3b3b" },
    4: { name: "Запуск", vulnerability: "66.7%", table: "1.4", color: "#ff9f1c" },
    5: { name: "Эксплуатация", vulnerability: "12.9%", table: "1.5", color: "#00ff9d" },
    6: { name: "Обновление", vulnerability: "77.8%", table: "1.6", color: "#ff6b1c" }
};

// ===== СЦЕНАРИИ ЭТАПОВ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        desc: "NeuroGen разрабатывает ИИ для банка. Где взять данные для обучения?",
        options: [
            { id: 1, text: "💰 Аккредитованный поставщик", 
              correct: true,
              threat: null,
              result: "Поставщик предоставил сертификат качества и лицензию. Данные чистые и легальные.",
              explain: "✓ ПРАВИЛЬНО! Аккредитованный поставщик гарантирует качество и легальность данных. Риск отравления данных (T1.1) минимален.",
              effects: { budget: -10, security: +5, time: +5 } },
            
            { id: 2, text: "🌐 Открытые источники", 
              correct: false,
              threat: threats.t2,
              result: "Юристы нашли персональные данные клиентов. Грозят многомиллионные штрафы!",
              explain: "✗ ОШИБКА! Нарушение конфиденциальности (T1.4). Открытые источники могут содержать персональные данные без согласия.",
              effects: { budget: -15, security: -15, time: +10 } },
            
            { id: 3, text: "👥 Фрилансеры", 
              correct: false,
              threat: threats.t3,
              result: "Качество разметки ужасное (40% ошибок). Часть данных утекла.",
              explain: "✗ ОШИБКА! Ошибки разметки (T1.3). Фрилансеры без контроля качества создают проблемы.",
              effects: { budget: -5, security: -10, time: +15 } },
            
            { id: 4, text: "🤖 Синтетические данные", 
              correct: false,
              threat: null,
              result: "Данные безопасны, но модель не работает в реальности — слишком 'чистые' данные.",
              explain: "✗ ОШИБКА! Отрыв от реальности. Модель не справится с реальными шумами и искажениями.",
              effects: { budget: -20, security: +10, time: +20 } }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        desc: "Данные готовы. Где развернуть обучение модели?",
        options: [
            { id: 1, text: "☁️ AWS Enterprise", 
              correct: true,
              threat: null,
              result: "AWS предоставляет сертификацию ISO 27001. Инфраструктура защищена.",
              explain: "✓ ПРАВИЛЬНО! AWS Enterprise с ISO 27001 обеспечивает базовую защиту инфраструктуры.",
              effects: { budget: -20, security: +10, time: 0 } },
            
            { id: 2, text: "🟢 Google Cloud", 
              correct: false,
              threat: threats.t4,
              result: "Google может использовать ваши данные для обучения своих моделей.",
              explain: "✗ ОШИБКА! Риск кражи модели (T2.1). Внимательно читайте лицензионные соглашения.",
              effects: { budget: -10, security: -15, time: +5 } },
            
            { id: 3, text: "🏢 Свои сервера", 
              correct: false,
              threat: threats.t5,
              result: "Сервера взломали. Код обучения скомпрометирован.",
              explain: "✗ ОШИБКА! Компрометация кода (T2.3). Своя инфраструктура требует экспертизы в безопасности.",
              effects: { budget: -5, security: -25, time: +20 } },
            
            { id: 4, text: "🐉 Китайское облако", 
              correct: false,
              threat: threats.t4,
              result: "По местным законам все данные передаются властям. Модель скопирована.",
              explain: "✗ ОШИБКА! Кража модели (T2.1) и потеря конфиденциальности из-за особенностей законодательства.",
              effects: { budget: -5, security: -30, time: 0 } }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        desc: "Тестировщики нашли странные аномалии. Ваши действия?",
        options: [
            { id: 1, text: "🔍 Полное тестирование", 
              correct: false,
              threat: null,
              result: "Потратили месяц, нашли 5 багов, но конкуренты выпустили продукт раньше.",
              explain: "✗ НЕ ОПТИМАЛЬНО! Бизнес-риски важны. Нужен баланс между качеством и скоростью.",
              effects: { budget: -10, security: +15, time: +15 } },
            
            { id: 2, text: "🚀 Выпустить сейчас", 
              correct: false,
              threat: threats.t6,
              result: "Модель в продакшне. Через день — критический сбой!",
              explain: "✗ ОШИБКА! Подмена тестовых данных (T3.1) осталась незамеченной. Катастрофа.",
              effects: { budget: -5, security: -30, time: -5 } },
            
            { id: 3, text: "⚖️ Только критичное", 
              correct: false,
              threat: threats.t7,
              result: "Часть багов пропустили. Они вылезут в самый неподходящий момент.",
              explain: "✗ ОШИБКА! Скрытые уязвимости (T3.3) — бомба замедленного действия.",
              effects: { budget: -5, security: -15, time: +5 } },
            
            { id: 4, text: "🔬 Нанять аудиторов", 
              correct: true,
              threat: null,
              result: "Аудиторы нашли 10 уязвимостей! Модель доработана и безопасна.",
              explain: "✓ ПРАВИЛЬНО! Независимый аудит — золотой стандарт NIST AI RMF. Выявлены скрытые угрозы.",
              effects: { budget: -15, security: +25, time: +10 } }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        desc: "Модель в продакшне. Система мониторинга показывает подозрительную активность.",
        options: [
            { id: 1, text: "🛡️ Rate limiting", 
              correct: false,
              threat: threats.t9,
              result: "Простые атаки отсекли, но сложные продолжаются.",
              explain: "✗ НЕДОСТАТОЧНО! Rate limiting не защищает от кражи модели (T4.2).",
              effects: { budget: -5, security: +5, time: 0 } },
            
            { id: 2, text: "📊 Мониторинг паттернов", 
              correct: true,
              threat: null,
              result: "Система выявила попытку кражи модели через API. Атака заблокирована!",
              explain: "✓ ПРАВИЛЬНО! Проактивный мониторинг — ключ к обнаружению сложных атак.",
              effects: { budget: -10, security: +20, time: +5 } },
            
            { id: 3, text: "🔄 Переделать API", 
              correct: false,
              threat: null,
              result: "2 месяца разработки. Клиенты ушли к конкурентам.",
              explain: "✗ ОШИБКА! Радикальные меры без анализа — путь к провалу.",
              effects: { budget: -25, security: +30, time: +25 } },
            
            { id: 4, text: "⏸️ Игнорировать", 
              correct: false,
              threat: threats.t8,
              result: "Через месяц модель скопирована и продаётся конкурентами.",
              explain: "✗ КРИТИЧЕСКАЯ ОШИБКА! Подмена модели (T4.1) — полная потеря интеллектуальной собственности.",
              effects: { budget: 0, security: -40, time: 0 } }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        desc: "Резкий всплеск странных запросов и падение качества ответов. Что делать?",
        options: [
            { id: 1, text: "🛑 DDoS-защита", 
              correct: false,
              threat: threats.t10,
              result: "Это были не DDoS, а состязательные атаки. Время упущено.",
              explain: "✗ ОШИБКА! Состязательные атаки (T5.1) маскируются под обычный трафик.",
              effects: { budget: -10, security: -10, time: +5 } },
            
            { id: 2, text: "🔎 Ручной анализ", 
              correct: false,
              threat: threats.t11,
              result: "Месяц анализа. За это время утекли данные клиентов.",
              explain: "✗ ОШИБКА! Промпт-инъекции (T5.2) требуют автоматизированного обнаружения.",
              effects: { budget: -10, security: +15, time: +25 } },
            
            { id: 3, text: "⛔ Отключить API", 
              correct: false,
              threat: null,
              result: "Безопасность спасена. Но и бизнес тоже — клиенты ушли.",
              explain: "✗ ОШИБКА! Отключение сервиса — крайняя мера, убивающая бизнес.",
              effects: { budget: -20, security: +30, time: +15 } },
            
            { id: 4, text: "🤖 Интеллектуальный аудитор", 
              correct: true,
              threat: null,
              result: "Ваш инструмент за 5 минут нашёл промпт-инъекции и заблокировал атаку!",
              explain: "✓ ПРАВИЛЬНО! Дипломная работа в действии — автоматизация спасает бизнес.",
              effects: { budget: 0, security: +35, time: -10 } }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ",
        desc: "Прошел год. Нужно обновить модель. Как организовать процесс?",
        options: [
            { id: 1, text: "🔄 Полностью автоматически", 
              correct: false,
              threat: threats.t12,
              result: "Система откатилась к старой уязвимой версии.",
              explain: "✗ ОШИБКА! Откат к уязвимой версии (T6.1) — критическая уязвимость.",
              effects: { budget: -5, security: -20, time: +5 } },
            
            { id: 2, text: "👨‍💻 Ручная проверка", 
              correct: true,
              threat: null,
              result: "Каждая версия проверена, целостность подтверждена. Обновление успешно!",
              explain: "✓ ПРАВИЛЬНО! Контроль целостности — основа безопасности MLOps.",
              effects: { budget: -5, security: +15, time: +15 } },
            
            { id: 3, text: "🤖 Полуавтомат", 
              correct: false,
              threat: threats.t13,
              result: "В пайплайн внедрили вредоносный код. Модель отравлена.",
              explain: "✗ ОШИБКА! Компрометация пайплайна (T6.2) — самый опасный вектор атаки.",
              effects: { budget: -10, security: -25, time: +10 } },
            
            { id: 4, text: "⏸️ Отложить", 
              correct: false,
              threat: null,
              result: "Модель устарела. Клиенты уходят к конкурентам.",
              explain: "✗ ОШИБКА! Технологическое отставание убивает бизнес быстрее любой атаки.",
              effects: { budget: -15, security: -5, time: +20 } }
        ]
    }
};

// ===== ФУНКЦИИ ИНТЕРФЕЙСА =====
function updateDisplay() {
    document.getElementById('budgetValue').textContent = gameState.budget + '%';
    document.getElementById('securityValue').textContent = gameState.security + '%';
    document.getElementById('timeValue').textContent = gameState.time + '%';
    
    document.getElementById('budgetBar').style.width = gameState.budget + '%';
    document.getElementById('securityBar').style.width = gameState.security + '%';
    document.getElementById('timeBar').style.width = gameState.time + '%';
    
    document.getElementById('progressFill').style.width = ((gameState.act - 1) * 16.66) + '%';
    document.getElementById('currentAct').textContent = `АКТ ${gameState.act}/6`;
    
    if (actStats[gameState.act]) {
        document.getElementById('actName').textContent = actStats[gameState.act].name;
        document.getElementById('actStats').innerHTML = `Таблица ${actStats[gameState.act].table} | <span style="color:${actStats[gameState.act].color};">Уязвимость: ${actStats[gameState.act].vulnerability}</span>`;
    }
}

function checkGameOver() {
    if (gameState.budget <= 0) {
        showGameOver('💰 Бюджет исчерпан. Стартап обанкротился.');
        return true;
    }
    if (gameState.security <= 0) {
        showGameOver('🔒 Критическая утечка данных. Компания закрыта.');
        return true;
    }
    if (gameState.time >= 100) {
        showGameOver('⏱️ Время вышло. Конкуренты заняли рынок.');
        return true;
    }
    if (gameState.time <= 0) {
        showGameOver('⏱️ Слишком быстро! Качество пострадало.');
        return true;
    }
    return false;
}

function showWarning(msg, type = 'warning') {
    let colors = {
        warning: { bg: '#ff9f1c', shadow: '#ff9f1c' },
        danger: { bg: '#ff3b3b', shadow: '#ff3b3b' },
        success: { bg: '#00ff9d', shadow: '#00ff9d' }
    };
    let color = colors[type] || colors.warning;
    
    let warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${color.bg}, ${color.bg}dd);
        color: #1a1a26;
        padding: 15px 25px;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.5s;
        box-shadow: 0 0 30px ${color.shadow};
        border: 2px solid #ffff3b;
        font-size: 18px;
    `;
    warningDiv.innerHTML = `⚠️ ${msg}`;
    document.body.appendChild(warningDiv);
    setTimeout(() => warningDiv.remove(), 3000);
}

function showGameOver(msg) {
    if (gameState.gameOver) return;
    gameState.gameOver = true;
    
    // Эффект "сбоя"
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
            <p style="margin:20px 0; font-size:18px;">Правильных ответов: ${gameState.correctChoices}/${gameState.totalChoices}</p>
            <p style="margin:10px 0; font-size:16px; color:#a0a0b0;">Точность: ${Math.round(gameState.correctChoices/gameState.totalChoices*100)}%</p>
            <button onclick="restartGame()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:20px 40px; border-radius:15px; margin:20px 0; font-size:20px; cursor:pointer; box-shadow:0 0 30px #00f3ff;">🔄 НАЧАТЬ ЗАНОВО</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function moneyRain() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            let emojis = ['💰','💵','💶','💷','💎','🪙','💸','🏆','⭐','✨','🎉','🎊'];
            let emoji = emojis[Math.floor(Math.random() * emojis.length)];
            let div = document.createElement('div');
            div.innerHTML = emoji;
            div.style.position = 'fixed';
            div.style.left = Math.random() * 100 + '%';
            div.style.top = '-50px';
            div.style.fontSize = (20 + Math.random() * 40) + 'px';
            div.style.animation = `fall ${1.5 + Math.random() * 3}s linear`;
            div.style.zIndex = '9999';
            div.style.pointerEvents = 'none';
            div.style.filter = 'drop-shadow(0 0 15px gold)';
            div.style.textShadow = '0 0 20px rgba(255,215,0,0.8)';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 5000);
        }, i * 30);
    }
}

function showVictory() {
    if (gameState.victory) return;
    gameState.victory = true;
    moneyRain();
    
    // Добавляем анимации
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
    
    let accuracy = Math.round(gameState.correctChoices / gameState.totalChoices * 100);
    let riskLevel = accuracy >= 80 ? 'Низкий' : (accuracy >= 50 ? 'Средний' : 'Высокий');
    let riskColor = accuracy >= 80 ? '#00ff9d' : (accuracy >= 50 ? '#ff9f1c' : '#ff3b3b');
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:10px;">
            <div style="border:4px solid #00ff9d; color:#00ff9d; font-size:42px; padding:30px; border-radius:40px; margin:20px 0; animation:pulse 2s infinite; background:linear-gradient(135deg,#00ff9d10,#00f3ff10); box-shadow:0 0 70px #00ff9d;">
                🏆 ПОБЕДА! NeuroGen УСПЕШНО ЗАВЕРШЕН! 🏆
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
                        <div style="color:#a0a0b0; margin:15px 0;">Точность</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${accuracy}%</div>
                    </div>
                </div>
                
                <div style="background:#1e1e2a; padding:25px; border-radius:20px; text-align:left; margin:25px 0; border:2px solid #9d4edd;">
                    <h3 style="color:#9d4edd; font-size:26px; margin-bottom:20px; text-shadow:0 0 10px #9d4edd;">📋 ОЦЕНКА РИСКОВ ПО ДИПЛОМУ</h3>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Уровень риска:</span> <span style="color:${riskColor}; font-weight:bold; font-size:22px;">${riskLevel}</span></p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">Правильных ответов:</span> ${gameState.correctChoices}/${gameState.totalChoices}</p>
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
    if (gameState.gameOver || gameState.victory) return;
    if (gameState.act > 6) {
        showVictory();
        return;
    }
    
    let act = acts[gameState.act];
    let stats = actStats[gameState.act];
    
    let html = `
        <div style="margin-bottom:20px;">
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">АКТ ${gameState.act}/6</span>
                <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">ТАБЛИЦА ${stats.table}</span>
                <span style="border:2px solid ${stats.color}; color:${stats.color}; padding:5px 15px; border-radius:25px; font-weight:bold;">УЯЗВИМОСТЬ: ${stats.vulnerability}</span>
            </div>
            
            <h2 style="color:#00f3ff; font-size:26px; margin:20px 0; text-shadow:0 0 10px #00f3ff;">${act.title}</h2>
            
            <div style="background:#1a1a26; padding:20px; border-radius:15px; margin:20px 0; border-left:4px solid #00f3ff;">
                <p style="margin:0; line-height:1.8; font-size:16px;">${act.desc}</p>
            </div>
            
            <div style="background:linear-gradient(135deg,#2a1a3a,#1a1a2a); padding:20px; border-radius:15px; margin:20px 0; border:2px solid #9d4edd;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <span style="font-size:24px;">📊</span>
                    <span style="color:#ffff3b; font-weight:bold; font-size:18px;">СВЯЗЬ С ДИПЛОМОМ:</span>
                </div>
                <p style="margin:5px 0; color:#a0a0b0;">Этап: <span style="color:#00ff9d;">${stats.name}</span> (Таблица ${stats.table})</p>
                <p style="margin:5px 0; color:#a0a0b0;">По данным параграфа 3.3, <span style="color:${stats.color};">${stats.vulnerability}</span> проектов имеют уязвимости на этом этапе</p>
                <p style="margin:5px 0; color:#a0a0b0;">Правильный выбор снижает риски согласно методике аудита</p>
            </div>
            
            <hr style="border-color:#2a2a3a; margin:25px 0;">
            <p style="color:#00ff9d; font-weight:bold; font-size:18px; margin-bottom:20px;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = html;
    
    for (let i = 0; i < 4; i++) {
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
    if (gameState.gameOver || gameState.victory || gameState.act > 6) return;
    
    let act = acts[gameState.act];
    let choice = act.options[num-1];
    if (!choice) return;
    
    // Обновляем статистику
    gameState.totalChoices++;
    if (choice.correct) {
        gameState.correctChoices++;
        showWarning('✓ Правильный выбор!', 'success');
    } else {
        showWarning('✗ Ошибка! Анализируйте последствия.', 'danger');
    }
    
    // Применяем эффекты
    gameState.budget = Math.min(100, Math.max(0, gameState.budget + (choice.effects.budget || 0)));
    gameState.security = Math.min(100, Math.max(0, gameState.security + (choice.effects.security || 0)));
    gameState.time = Math.min(100, Math.max(0, gameState.time + (choice.effects.time || 0)));
    
    // Сохраняем в историю
    gameState.history.push({
        act: gameState.act,
        choice: num,
        correct: choice.correct,
        threat: choice.threat
    });
    
    updateDisplay();
    
    // Проверяем game over после обновления
    if (checkGameOver()) return;
    
    // Формируем результат
    let threatHtml = '';
    if (choice.threat) {
        threatHtml = `
            <div style="background:#2a1a1a; padding:15px; border-left:4px solid #ff3b3b; margin:15px 0; border-radius:5px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <span style="font-size:24px;">⚠️</span>
                    <span style="color:#ff3b3b; font-weight:bold; font-size:18px;">УГРОЗА: ${choice.threat.name}</span>
                </div>
                <p style="margin:10px 0; color:#a0a0b0;">${choice.threat.desc}</p>
                <p style="margin:5px 0; color:#888;">Таблица ${choice.threat.table} | Риск: ${choice.threat.risk}</p>
            </div>
        `;
    }
    
    let html = `
        <div>
            <div style="border-left:5px solid ${choice.correct ? '#00ff9d' : '#ff3b3b'}; padding:20px; background:#1a1a26; border-radius:10px;">
                <h3 style="color:${choice.correct ? '#00ff9d' : '#ff3b3b'}; font-size:24px; margin-bottom:15px;">
                    ${choice.correct ? '✓ ПРАВИЛЬНЫЙ ВЫБОР' : '✗ ОШИБКА'}
                </h3>
                
                <div style="background:#1e1e2a; padding:20px; border-radius:10px; margin:15px 0;">
                    <p style="margin:0; line-height:1.7; font-size:16px;">${choice.result}</p>
                </div>
                
                ${threatHtml}
                
                <div style="background:linear-gradient(135deg,#1e2a1a,#1a1a26); padding:20px; border-radius:10px; margin:15px 0; border-left:4px solid #9d4edd;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <span style="font-size:24px;">📚</span>
                        <span style="color:#9d4edd; font-weight:bold; font-size:18px;">ПОЯСНЕНИЕ ПО МЕТОДИКЕ:</span>
                    </div>
                    <p style="margin:0; white-space:pre-line; line-height:1.7; font-size:15px; color:#a0a0b0;">${choice.explain}</p>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <p style="color:#00f3ff; font-weight:bold; margin-bottom:15px;">📊 ИЗМЕНЕНИЕ РЕСУРСОВ:</p>
                    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
                        <div style="text-align:center;">
                            <div style="font-size:24px;">💰</div>
                            <div style="color:${choice.effects.budget > 0 ? '#00ff9d' : (choice.effects.budget < 0 ? '#ff3b3b' : '#888')}; font-weight:bold;">
                                ${choice.effects.budget > 0 ? '+' : ''}${choice.effects.budget}%
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:24px;">🔒</div>
                            <div style="color:${choice.effects.security > 0 ? '#00ff9d' : (choice.effects.security < 0 ? '#ff3b3b' : '#888')}; font-weight:bold;">
                                ${choice.effects.security > 0 ? '+' : ''}${choice.effects.security}%
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:24px;">⏱️</div>
                            <div style="color:${choice.effects.time < 0 ? '#00ff9d' : (choice.effects.time > 0 ? '#ff3b3b' : '#888')}; font-weight:bold;">
                                ${choice.effects.time > 0 ? '+' : ''}${choice.effects.time}%
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <button onclick="continueGame()" style="flex:1; background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:15px; border-radius:10px; font-size:18px; cursor:pointer; transition:0.3s;">
                        ➡️ ПРОДОЛЖИТЬ (АКТ ${gameState.act + 1})
                    </button>
                    <button onclick="showStats()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #9d4edd; color:#9d4edd; padding:15px 25px; border-radius:10px; font-size:18px; cursor:pointer;">
                        📊
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = html;
    document.getElementById('choicesGrid').style.display = 'none';
}

function continueGame() {
    if (gameState.gameOver || gameState.victory) return;
    gameState.act++;
    showAct();
}

function showStats() {
    let accuracy = Math.round(gameState.correctChoices / gameState.totalChoices * 100) || 0;
    let html = `
        <div style="background:#1a1a26; padding:20px; border-radius:15px;">
            <h3 style="color:#00f3ff; font-size:24px; margin-bottom:20px;">📊 СТАТИСТИКА</h3>
            
            <div style="display:grid; gap:15px;">
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">Правильных ответов</div>
                    <div style="font-size:32px; color:#00ff9d;">${gameState.correctChoices}/${gameState.totalChoices}</div>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">Точность</div>
                    <div style="font-size:32px; color:#00f3ff;">${accuracy}%</div>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">Текущий этап</div>
                    <div style="font-size:32px; color:#9d4edd;">${gameState.act}/6</div>
                </div>
            </div>
            
            <button onclick="continueGame()" style="width:100%; background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:15px; border-radius:10px; margin-top:20px; font-size:18px; cursor:pointer;">
                ⬅️ НАЗАД К ИГРЕ
            </button>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = html;
    document.getElementById('choicesGrid').style.display = 'none';
}

function restartGame() {
    gameState = {
        act: 1,
        budget: 70,
        security: 40,
        time: 60,
        correctChoices: 0,
        totalChoices: 0,
        gameOver: false,
        victory: false,
        history: []
    };
    updateDisplay();
    showAct();
    closeModal();
}

function showDiplomaLinks() {
    document.getElementById('modalTitle').textContent = 'О ДИПЛОМНОЙ РАБОТЕ';
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align:center;">
            <h3 style="color:#00f3ff; font-size:28px; margin-bottom:20px;">Воробьева Александра Александровна</h3>
            <p style="margin:15px 0; font-size:18px;">🏛️ МГЛУ, Институт информационных наук</p>
            <p style="margin:15px 0; font-size:18px;">🔬 Кафедра международной информационной безопасности</p>
            <p style="margin:15px 0; font-size:18px;">📖 Тема: Разработка методики аудита ИБ систем с ИИ</p>
            
            <div style="background:#1e1e2a; padding:20px; border-radius:15px; margin:25px 0;">
                <h4 style="color:#9d4edd; font-size:20px; margin-bottom:15px;">📊 СООТВЕТСТВИЕ ДИПЛОМУ:</h4>
                <p style="margin:8px 0;">✅ Таблицы 1.1-1.6 — все 27 угроз</p>
                <p style="margin:8px 0;">✅ Параграф 3.3 — статистика уязвимостей</p>
                <p style="margin:8px 0;">✅ Глава 2 — методика аудита</p>
                <p style="margin:8px 0;">✅ Приложение Л — рекомендации</p>
            </div>
            
            <p style="color:#00ff9d; font-size:20px; margin:20px 0;">🎮 Игра полностью соответствует диплому!</p>
        </div>
    `;
    document.getElementById('infoModal').style.display = 'flex';
}

function showAllThreats() {
    let html = '<h3 style="color:#00f3ff; font-size:28px; margin-bottom:20px;">ВСЕ 27 УГРОЗ ИЗ ДИПЛОМА</h3>';
    html += '<div style="background:#1a1a26; padding:20px; border-radius:15px;">';
    
    let tables = {
        '1.1': ['T1.1 Отравление данных', 'T1.2 Компрометация источников', 'T1.3 Ошибки разметки', 'T1.4 Нарушение конфиденциальности'],
        '1.2': ['T2.1 Кража модели', 'T2.2 Отравление гиперпараметров', 'T2.3 Компрометация кода', 'T2.4 Атаки на среду обучения'],
        '1.3': ['T3.1 Подмена тестовых данных', 'T3.2 Манипуляция метриками', 'T3.3 Скрытые уязвимости'],
        '1.4': ['T4.1 Подмена модели', 'T4.2 Небезопасный API', 'T4.3 Компрометация контейнеров'],
        '1.5': ['T5.1 Состязательные атаки', 'T5.2 Промпт-инъекции', 'T5.3 Несанкционированный доступ', 'T5.4 Атаки на конфиденциальность', 'T5.5 Изменение распределения', 'T5.6 DoS-атаки'],
        '1.6': ['T6.1 Откат к уязвимой версии', 'T6.2 Компрометация пайплайна', 'T6.3 Нарушение целостности']
    };
    
    for (let [table, threats] of Object.entries(tables)) {
        html += `<p style="margin:15px 0 5px 0; color:#00ff9d; font-size:18px;">Таблица ${table}:</p>`;
        threats.forEach(t => {
            html += `<p style="margin:3px 0 3px 20px; color:#a0a0b0;">• ${t}</p>`;
        });
    }
    
    html += '<p style="margin:25px 0 0 0; color:#9d4edd; font-size:22px; text-align:center;">📌 ВСЕГО: 27 УГРОЗ</p>';
    html += '</div>';
    
    document.getElementById('modalTitle').textContent = 'ВСЕ УГРОЗЫ';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// Инициализация при загрузке
window.onload = function() {
    showAct();
    window.onclick = function(e) {
        if (e.target == document.getElementById('infoModal')) {
            closeModal();
        }
    };
};