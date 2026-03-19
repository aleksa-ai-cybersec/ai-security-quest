// ============================================
// AI SECURITY SIMULATOR - ИСПРАВЛЕННАЯ ВЕРСИЯ
// Диплом Воробьевой А.А., МГЛУ, 2026
// ============================================

let gameState = {
    act: 1,
    budget: 65,
    security: 35,
    time: 75,
    choices: [],
    correctChoices: 0,
    gameOver: false
};

const threats = {
    T1_1: { id: "T1.1", name: "Отравление данных (Data Poisoning)", table: "Таблица 1.1, стр. 13", risk: "Высокий" },
    T1_4: { id: "T1.4", name: "Нарушение конфиденциальности при сборе", table: "Таблица 1.1, стр. 13", risk: "Средний" },
    T1_3: { id: "T1.3", name: "Несанкционированная модификация разметки", table: "Таблица 1.1, стр. 13", risk: "Средний" },
    T2_1: { id: "T2.1", name: "Кража модели (Model Extraction)", table: "Таблица 1.2, стр. 14", risk: "Критический" },
    T2_3: { id: "T2.3", name: "Компрометация кода обучения", table: "Таблица 1.2, стр. 14", risk: "Высокий" },
    T3_1: { id: "T3.1", name: "Подмена тестовых данных", table: "Таблица 1.3, стр. 15", risk: "Высокий" },
    T3_3: { id: "T3.3", name: "Сокрытие уязвимостей", table: "Таблица 1.3, стр. 15", risk: "Критический" },
    T4_1: { id: "T4.1", name: "Подмена модели", table: "Таблица 1.4, стр. 15", risk: "Критический" },
    T4_2: { id: "T4.2", name: "Небезопасная конфигурация API", table: "Таблица 1.4, стр. 15", risk: "Высокий" },
    T5_1: { id: "T5.1", name: "Состязательные атаки", table: "Таблица 1.5, стр. 16", risk: "Высокий" },
    T5_2: { id: "T5.2", name: "Промпт-инъекции", table: "Таблица 1.5, стр. 16", risk: "Критический" },
    T6_1: { id: "T6.1", name: "Откат к уязвимой версии", table: "Таблица 1.6, стр. 17", risk: "Высокий" },
    T6_2: { id: "T6.2", name: "Компрометация пайплайна обновлений", table: "Таблица 1.6, стр. 17", risk: "Критический" }
};

const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        description: "Стартап NeuroGen разрабатывает чат-бота для банка. Где взять данные?",
        options: [
            {
                id: 1,
                text: "💰 Купить у поставщика ($50K)",
                result: "Данные получены. Поставщик дал сертификат происхождения.",
                isCorrect: true,
                threat: null,
                effects: { budget: -5, security: -5, time: 5 },
                explanation: "✓ ПРАВИЛЬНО! Аккредитованный поставщик минимизирует риск отравления данных (T1.1)."
            },
            {
                id: 2,
                text: "🌐 Из открытых источников",
                result: "Юристы нашли персональные данные. Грозят штрафы.",
                isCorrect: false,
                threat: threats.T1_4,
                effects: { budget: -10, security: -20, time: 25 },
                explanation: "✗ НЕПРАВИЛЬНО! Открытые источники часто содержат личные данные (T1.4). Штрафы до 4% оборота."
            },
            {
                id: 3,
                text: "👥 Нанять фрилансеров ($20K)",
                result: "Разметка плохая, часть данных утекла.",
                isCorrect: false,
                threat: threats.T1_3,
                effects: { budget: -10, security: -15, time: 10 },
                explanation: "✗ НЕПРАВИЛЬНО! Фрилансеры без контроля — риск утечки и ошибок разметки (T1.3)."
            },
            {
                id: 4,
                text: "🤖 Синтетические данные ($100K)",
                result: "Данные безопасны, но модель не работает в реальности.",
                isCorrect: false,
                threat: null,
                effects: { budget: -35, security: 10, time: 25 },
                explanation: "✗ НЕПРАВИЛЬНО! Синтетика не отражает реальные шумы — модель бесполезна."
            }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        description: "Где развернуть обучение модели?",
        options: [
            {
                id: 1,
                text: "☁️ AWS ($150K, сертифицировано)",
                result: "AWS работает стабильно. Есть ISO 27001.",
                isCorrect: true,
                threat: null,
                effects: { budget: -30, security: -5, time: 0 },
                explanation: "✓ ПРАВИЛЬНО! AWS имеет ISO 27001 — международный стандарт безопасности."
            },
            {
                id: 2,
                text: "🟢 Google Cloud ($75K, скидка)",
                result: "Данные уходят в США. Google может использовать их.",
                isCorrect: false,
                threat: threats.T2_1,
                effects: { budget: -15, security: -20, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Google может использовать ваши данные для обучения своих моделей (T2.1)."
            },
            {
                id: 3,
                text: "🏢 Свои сервера ($25K)",
                result: "Сисадмин оставил доступ открытым.",
                isCorrect: false,
                threat: threats.T2_3,
                effects: { budget: -5, security: -35, time: 40 },
                explanation: "✗ НЕПРАВИЛЬНО! Свои сервера без экспертизы — риск компрометации кода (T2.3)."
            },
            {
                id: 4,
                text: "🐉 Китайское облако ($30K)",
                result: "Все данные уходят властям КНР.",
                isCorrect: false,
                threat: threats.T2_1,
                effects: { budget: -10, security: -60, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Полная потеря конфиденциальности и риск кражи модели (T2.1)."
            }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        description: "Тестировщики нашли странности. Что делать?",
        options: [
            {
                id: 1,
                text: "🔍 Отложить релиз",
                result: "Нашли 5 багов. Конкуренты вышли раньше.",
                isCorrect: false,
                threat: null,
                effects: { budget: -10, security: 20, time: 30 },
                explanation: "✗ НЕПРАВИЛЬНО! Безопасно, но рынок потерян."
            },
            {
                id: 2,
                text: "🚀 Выпустить сейчас",
                result: "Модель сыпется. Тесты подменили.",
                isCorrect: false,
                threat: threats.T3_1,
                effects: { budget: 0, security: -50, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Подмена тестовых данных (T3.1) — критическая ошибка."
            },
            {
                id: 3,
                text: "⚖️ Проверить только главное",
                result: "Часть багов пропустили.",
                isCorrect: false,
                threat: threats.T3_3,
                effects: { budget: -5, security: -15, time: 10 },
                explanation: "✗ НЕПРАВИЛЬНО! Сокрытие уязвимостей (T3.3) — ложное чувство безопасности."
            },
            {
                id: 4,
                text: "🔬 Нанять аудиторов ($50K)",
                result: "Нашли 10 уязвимостей.",
                isCorrect: true,
                threat: null,
                effects: { budget: -25, security: 30, time: 20 },
                explanation: "✓ ПРАВИЛЬНО! Внешний аудит — золотой стандарт NIST AI RMF."
            }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        description: "Мониторинг показывает подозрительную активность.",
        options: [
            {
                id: 1,
                text: "🛡️ Rate limiting",
                result: "Простые атаки отсекли. Сложные идут.",
                isCorrect: false,
                threat: threats.T4_2,
                effects: { budget: -5, security: 10, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Rate limiting не защищает от кражи модели."
            },
            {
                id: 2,
                text: "📊 Мониторинг паттернов",
                result: "Выявили кражу модели. Атака заблокирована.",
                isCorrect: true,
                threat: null,
                effects: { budget: -20, security: 25, time: 10 },
                explanation: "✓ ПРАВИЛЬНО! Мониторинг позволяет выявить атаки в реальном времени."
            },
            {
                id: 3,
                text: "🔄 Переделать API",
                result: "2 месяца разработки. Клиенты ушли.",
                isCorrect: false,
                threat: null,
                effects: { budget: -40, security: 50, time: 30 },
                explanation: "✗ НЕПРАВИЛЬНО! Радикальные меры убивают бизнес."
            },
            {
                id: 4,
                text: "⏸️ Игнорировать",
                result: "Модель украдена конкурентами.",
                isCorrect: false,
                threat: threats.T4_1,
                effects: { budget: 0, security: -70, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Игнорирование = потеря модели (T4.1)."
            }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        description: "Резкий всплеск странных запросов.",
        options: [
            {
                id: 1,
                text: "🛑 Думаем DDoS",
                result: "Это были состязательные атаки.",
                isCorrect: false,
                threat: threats.T5_1,
                effects: { budget: -10, security: -20, time: 0 },
                explanation: "✗ НЕПРАВИЛЬНО! Диагноз неверный — состязательные атаки (T5.1)."
            },
            {
                id: 2,
                text: "🔎 Ручной анализ",
                result: "Месяц анализа. Данные утекли.",
                isCorrect: false,
                threat: threats.T5_2,
                effects: { budget: -15, security: 30, time: 40 },
                explanation: "✗ НЕПРАВИЛЬНО! Промпт-инъекции (T5.2) — нужна автоматизация."
            },
            {
                id: 3,
                text: "⛔ Отключить API",
                result: "Клиенты ушли к конкурентам.",
                isCorrect: false,
                threat: null,
                effects: { budget: -30, security: 40, time: 20 },
                explanation: "✗ НЕПРАВИЛЬНО! Отключение — не решение."
            },
            {
                id: 4,
                text: "🤖 Интеллектуальный аудитор",
                result: "Нашли промпт-инъекции за 5 минут.",
                isCorrect: true,
                threat: null,
                effects: { budget: 0, security: 50, time: -20 },
                explanation: "✓ ПРАВИЛЬНО! Ваш инструмент из диплома!"
            }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ",
        description: "Нужно обновить модель на новых данных.",
        options: [
            {
                id: 1,
                text: "🔄 Автоматически",
                result: "Откат к уязвимой версии.",
                isCorrect: false,
                threat: threats.T6_1,
                effects: { budget: -5, security: -30, time: 10 },
                explanation: "✗ НЕПРАВИЛЬНО! Откат к уязвимой версии (T6.1)."
            },
            {
                id: 2,
                text: "👨‍💻 Ручное с проверкой",
                result: "Обновление успешно.",
                isCorrect: true,
                threat: null,
                effects: { budget: -10, security: 20, time: 30 },
                explanation: "✓ ПРАВИЛЬНО! Ручной контроль гарантирует целостность."
            },
            {
                id: 3,
                text: "🤖 Полуавтомат",
                result: "В пайплайн внедрили вредоносный код.",
                isCorrect: false,
                threat: threats.T6_2,
                effects: { budget: -15, security: -40, time: 15 },
                explanation: "✗ НЕПРАВИЛЬНО! Компрометация пайплайна (T6.2)."
            },
            {
                id: 4,
                text: "⏸️ Отложить",
                result: "Модель устарела. Клиенты ушли.",
                isCorrect: false,
                threat: null,
                effects: { budget: -20, security: -10, time: 20 },
                explanation: "✗ НЕПРАВИЛЬНО! Отказ от обновлений — смерть продукта."
            }
        ]
    }
};

const actStats = {
    1: { name: "Сбор и подготовка данных", vulnerability: 33.3, table: "1.1" },
    2: { name: "Разработка и обучение", vulnerability: 71.4, table: "1.2" },
    3: { name: "Валидация и тестирование", vulnerability: 88.9, table: "1.3" },
    4: { name: "Развертывание", vulnerability: 66.7, table: "1.4" },
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
    
    const progressWidth = (gameState.act / 6) * 100;
    document.getElementById('progressFill').style.width = progressWidth + '%';
    document.getElementById('currentAct').textContent = `Акт ${gameState.act}/6`;
    
    if (actStats[gameState.act]) {
        document.getElementById('actName').textContent = actStats[gameState.act].name;
        document.getElementById('actStats').textContent = `Таблица ${actStats[gameState.act].table} | Уязвимость: ${actStats[gameState.act].vulnerability}%`;
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
    return false;
}

function showGameOver(message) {
    gameState.gameOver = true;
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <span style="background: rgba(255,59,59,0.2); border:1px solid #ff3b3b; color:#ff3b3b; padding:10px 20px; border-radius:20px;">❌ ПРОЕКТ ПРОВАЛЕН</span>
            <p style="margin: 30px 0; font-size: 18px;">${message}</p>
            <p>Правильных ответов: ${gameState.correctChoices} из 6</p>
            <button onclick="restartGame()" style="background:#1a1a26; border:1px solid #00f3ff; color:#00f3ff; padding:10px 20px; margin-top:20px;">🔄 Начать заново</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function checkVictory() {
    if (gameState.act > 6) {
        showVictory();
        return true;
    }
    return false;
}

function showVictory() {
    document.getElementById('terminalContent').innerHTML = `
        <div style="padding: 20px;">
            <span style="background:rgba(0,255,157,0.2); border:1px solid #00ff9d; color:#00ff9d; padding:10px 20px; border-radius:20px;">✅ ПРОЕКТ УСПЕШНО ЗАВЕРШЕН</span>
            <p style="margin: 25px 0;">Вы прошли все 6 этапов!</p>
            <div style="background:#1a1a26; padding:20px; border-radius:12px;">
                <p>Правильных ответов: ${gameState.correctChoices} из 6</p>
                <p>💰 Бюджет: ${gameState.budget}%</p>
                <p>🔒 Безопасность: ${gameState.security}%</p>
                <p>⏱️ Время: ${gameState.time}%</p>
            </div>
            <button onclick="restartGame()" style="background:#1a1a26; border:1px solid #00f3ff; color:#00f3ff; padding:10px 20px; margin-top:20px;">🔄 Пройти заново</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function showAct() {
    if (checkGameOver() || checkVictory()) return;
    
    const act = acts[gameState.act];
    const stats = actStats[gameState.act];
    
    let content = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <span style="border:1px solid #9d4edd; padding:4px 12px; border-radius:20px;">Этап ${gameState.act}/6</span>
                <span style="border:1px solid #9d4edd; padding:4px 12px; border-radius:20px;">Таблица ${stats.table}</span>
            </div>
            <h2 style="color: #00f3ff;">${act.title}</h2>
            <p style="margin: 15px 0;">${act.description}</p>
            <hr style="border-color: #2a2a3a;">
            <p style="color: #00ff9d;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = content;
    
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`choice${i+1}`);
        if (act.options[i]) {
            btn.textContent = act.options[i].text;
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    }
    
    document.getElementById('choicesGrid').style.display = 'grid';
}

function makeChoice(choiceNum) {
    if (gameState.gameOver || gameState.act > 6) return;
    
    const act = acts[gameState.act];
    const choice = act.options[choiceNum - 1];
    
    if (!choice) return;
    
    gameState.choices.push({
        act: gameState.act,
        choice: choiceNum,
        isCorrect: choice.isCorrect
    });
    
    if (choice.isCorrect) {
        gameState.correctChoices++;
    }
    
    // ПРИМЕНЯЕМ ЭФФЕКТЫ
    gameState.budget = gameState.budget + choice.effects.budget;
    gameState.security = gameState.security + choice.effects.security;
    gameState.time = gameState.time + choice.effects.time;
    
    gameState.budget = Math.min(100, Math.max(0, gameState.budget));
    gameState.security = Math.min(100, Math.max(0, gameState.security));
    gameState.time = Math.min(100, Math.max(0, gameState.time));
    
    updateDisplay();
    
    if (checkGameOver()) return;
    
    const correctnessColor = choice.isCorrect ? '#00ff9d' : '#ff3b3b';
    
    let resultHtml = `
        <div style="margin-bottom: 20px;">
            <span style="border:1px solid ${correctnessColor}; color:${correctnessColor}; padding:4px 12px; border-radius:20px;">
                ${choice.isCorrect ? '✓ ПРАВИЛЬНО' : '✗ НЕПРАВИЛЬНО'}
            </span>
            
            <h3 style="color: ${correctnessColor};">📌 РЕЗУЛЬТАТ</h3>
            <p>${choice.result}</p>
            
            <div style="background:${choice.isCorrect ? 'rgba(0,255,157,0.1)' : 'rgba(255,59,59,0.1)'}; border-left:3px solid ${correctnessColor}; padding:15px; margin:15px 0;">
                <p style="font-weight:600;">${choice.explanation}</p>
    `;
    
    if (choice.threat) {
        resultHtml += `
                <p style="margin-top:10px; color:#a0a0b0;">📚 ${choice.threat.table} | Риск: ${choice.threat.risk}</p>
        `;
    }
    
    resultHtml += `
            </div>
            
            <hr>
            
            <p>Изменение ресурсов:</p>
            <ul>
                <li>💰 Бюджет: ${choice.effects.budget > 0 ? '+' : ''}${choice.effects.budget}%</li>
                <li>🔒 Безопасность: ${choice.effects.security > 0 ? '+' : ''}${choice.effects.security}%</li>
                <li>⏱️ Время: ${choice.effects.time > 0 ? '+' : ''}${choice.effects.time}%</li>
            </ul>
            
            <button onclick="nextAct()" style="background:#1a1a26; border:1px solid #00f3ff; color:#00f3ff; padding:10px; width:100%; margin-top:20px;">
                ➡️ Продолжить (Акт ${gameState.act + 1})
            </button>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = resultHtml;
    document.getElementById('choicesGrid').style.display = 'none';
}

function nextAct() {
    gameState.act++;
    if (gameState.act <= 6) {
        showAct();
    } else {
        checkVictory();
    }
}

function restartGame() {
    gameState = {
        act: 1,
        budget: 65,
        security: 35,
        time: 75,
        choices: [],
        correctChoices: 0,
        gameOver: false
    };
    
    updateDisplay();
    showAct();
    closeModal();
}

function showAllThreats() {
    let html = '<h3>📚 ВСЕ УГРОЗЫ (27 шт.)</h3>';
    html += '<p>Таблицы 1.1-1.6 диплома</p>';
    document.getElementById('modalTitle').textContent = 'Угрозы';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function showDiplomaLinks() {
    let html = `
        <h3>📚 О ДИПЛОМЕ</h3>
        <p>Воробьева А.А., МГЛУ, 2026</p>
        <p>Тема: Аудит безопасности ИИ-систем</p>
    `;
    document.getElementById('modalTitle').textContent = 'Диплом';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

window.onload = function() {
    showAct();
    window.onclick = function(event) {
        const modal = document.getElementById('infoModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};