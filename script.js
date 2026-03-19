// ============================================
// AI SECURITY SIMULATOR - ОБУЧАЮЩАЯ ВЕРСИЯ
// Дипломная работа Воробьевой А.А., МГЛУ, 2026
// Теперь с пояснениями и правильными ответами!
// ============================================

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
    act: 1,
    budget: 65,
    security: 35,
    time: 75,
    choices: [],
    correctChoices: 0,
    gameOver: false
};

// ===== ВСЕ УГРОЗЫ ИЗ ДИПЛОМА (ТАБЛИЦЫ 1.1-1.6) =====
const threats = {
    // Таблица 1.1
    T1_1: { id: "T1.1", name: "Отравление данных (Data Poisoning)", table: "Таблица 1.1, стр. 13", risk: "Высокий" },
    T1_2: { id: "T1.2", name: "Компрометация источников данных", table: "Таблица 1.1, стр. 13", risk: "Высокий" },
    T1_3: { id: "T1.3", name: "Несанкционированная модификация разметки", table: "Таблица 1.1, стр. 13", risk: "Средний" },
    T1_4: { id: "T1.4", name: "Нарушение конфиденциальности при сборе", table: "Таблица 1.1, стр. 13", risk: "Средний" },
    
    // Таблица 1.2
    T2_1: { id: "T2.1", name: "Кража модели (Model Extraction)", table: "Таблица 1.2, стр. 14", risk: "Критический" },
    T2_2: { id: "T2.2", name: "Отравление модели через гиперпараметры", table: "Таблица 1.2, стр. 14", risk: "Средний" },
    T2_3: { id: "T2.3", name: "Компрометация кода обучения", table: "Таблица 1.2, стр. 14", risk: "Высокий" },
    T2_4: { id: "T2.4", name: "Атаки на среду обучения", table: "Таблица 1.2, стр. 14", risk: "Высокий" },
    
    // Таблица 1.3
    T3_1: { id: "T3.1", name: "Подмена тестовых данных", table: "Таблица 1.3, стр. 15", risk: "Высокий" },
    T3_2: { id: "T3.2", name: "Манипуляция метриками", table: "Таблица 1.3, стр. 15", risk: "Средний" },
    T3_3: { id: "T3.3", name: "Сокрытие уязвимостей", table: "Таблица 1.3, стр. 15", risk: "Критический" },
    
    // Таблица 1.4
    T4_1: { id: "T4.1", name: "Подмена модели", table: "Таблица 1.4, стр. 15", risk: "Критический" },
    T4_2: { id: "T4.2", name: "Небезопасная конфигурация API", table: "Таблица 1.4, стр. 15", risk: "Высокий" },
    T4_3: { id: "T4.3", name: "Компрометация контейнеров", table: "Таблица 1.4, стр. 15", risk: "Высокий" },
    
    // Таблица 1.5
    T5_1: { id: "T5.1", name: "Состязательные атаки", table: "Таблица 1.5, стр. 16", risk: "Высокий" },
    T5_2: { id: "T5.2", name: "Промпт-инъекции", table: "Таблица 1.5, стр. 16", risk: "Критический" },
    T5_3: { id: "T5.3", name: "Несанкционированный доступ через API", table: "Таблица 1.5, стр. 16", risk: "Высокий" },
    T5_4: { id: "T5.4", name: "Атаки на конфиденциальность", table: "Таблица 1.5, стр. 16", risk: "Высокий" },
    T5_5: { id: "T5.5", name: "Изменение распределения данных", table: "Таблица 1.5, стр. 16", risk: "Средний" },
    T5_6: { id: "T5.6", name: "DoS/DDoS-атаки", table: "Таблица 1.5, стр. 16", risk: "Средний" },
    
    // Таблица 1.6
    T6_1: { id: "T6.1", name: "Откат к уязвимой версии", table: "Таблица 1.6, стр. 17", risk: "Высокий" },
    T6_2: { id: "T6.2", name: "Компрометация пайплайна обновлений", table: "Таблица 1.6, стр. 17", risk: "Критический" },
    T6_3: { id: "T6.3", name: "Нарушение целостности при обновлении", table: "Таблица 1.6, стр. 17", risk: "Средний" }
};

// ===== СЦЕНАРИИ С ПРАВИЛЬНЫМИ ОТВЕТАМИ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        description: "Стартап NeuroGen разрабатывает корпоративного чат-бота для банка. Вам нужны данные для обучения модели. Какой источник выбрать?",
        options: [
            {
                id: 1,
                text: "💰 Купить готовый датасет у аккредитованного поставщика ($50K)",
                result: "Данные получены. Поставщик предоставил сертификат происхождения данных.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! Аккредитованный поставщик гарантирует легальность данных и минимизирует риск отравления.",
                threat: null,
                effects: { budget: -5, security: -5, time: +5 },
                explanation: "Это лучший выбор, потому что:\n1. Данные проверены\n2. Есть юридическая защита\n3. Риск Data Poisoning минимален\n\nСсылка: Таблица 1.1 - угроза T1.1"
            },
            {
                id: 2,
                text: "🌐 Собрать данные из открытых источников (бесплатно)",
                result: "Юристы нашли в данных персональную информацию. Грозят многомиллионные штрафы.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Открытые источники часто содержат личные данные, что нарушает законодательство.",
                threat: threats.T1_4,
                effects: { budget: -10, security: -20, time: +25 },
                explanation: "Почему это плохо:\n1. Риск утечки персональных данных (T1.4)\n2. Штрафы до 4% от оборота\n3. Репутационные потери\n\nВ дипломе: Таблица 1.1, угроза T1.4"
            },
            {
                id: 3,
                text: "👥 Нанять фрилансеров для разметки ($20K)",
                result: "Качество разметки ужасное. Фрилансеры перепутали классы и слили часть данных.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Фрилансеры без NDA и контроля — главный риск утечки и ошибок.",
                threat: threats.T1_3,
                effects: { budget: -10, security: -15, time: +10 },
                explanation: "Почему это плохо:\n1. Нет контроля качества (T1.3)\n2. Риск утечки через подрядчиков\n3. Необходимость переделывать работу\n\nВ дипломе: Таблица 1.1, угроза T1.3"
            },
            {
                id: 4,
                text: "🤖 Создать синтетические данные ($100K)",
                result: "Данные безопасны, но модель не работает в реальности — слишком 'чистые' данные.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Синтетика не отражает реальные паттерны — модель будет бесполезна.",
                threat: null,
                effects: { budget: -35, security: +10, time: +25 },
                explanation: "Почему это плохо:\n1. Модель не работает с реальными шумами\n2. Огромные затраты\n3. Потеря времени\n\nСсылка: параграф 1.1 о качестве данных"
            }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        description: "Данные готовы. Где развернуть обучение модели?",
        options: [
            {
                id: 1,
                text: "☁️ AWS (дорого, $150K, но сертифицировано)",
                result: "AWS предоставляет полный комплект сертификаций безопасности.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! AWS имеет ISO 27001, SOC 2 и соответствует международным стандартам.",
                threat: null,
                effects: { budget: -30, security: -5, time: 0 },
                explanation: "Почему это правильно:\n1. Сертификация ISO/IEC 27001\n2. Прозрачность условий\n3. Защита от кражи модели\n\nСсылка: параграф 1.3, стандарты безопасности"
            },
            {
                id: 2,
                text: "🟢 Google Cloud (скидка стартапам, $75K)",
                result: "Данные уходят на сервера в США. В договоре — право Google использовать ваши данные.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Google может использовать ваши данные для обучения своих моделей.",
                threat: threats.T2_1,
                effects: { budget: -15, security: -20, time: 0 },
                explanation: "Почему это плохо:\n1. Риск кражи модели (T2.1)\n2. Потеря интеллектуальной собственности\n3. Юрисдикционные риски\n\nВ дипломе: Таблица 1.2, угроза T2.1"
            },
            {
                id: 3,
                text: "🏢 Свои сервера в дата-центре ($25K)",
                result: "Сисадмин оставил открытый доступ к серверам. Модель скомпрометирована.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Свои сервера требуют экспертизы в безопасности, которой у стартапа нет.",
                threat: threats.T2_3,
                effects: { budget: -5, security: -35, time: +40 },
                explanation: "Почему это плохо:\n1. Риск компрометации кода (T2.3)\n2. Отсутствие защиты от инсайдеров\n3. Огромные временные затраты\n\nВ дипломе: Таблица 1.2, угроза T2.3"
            },
            {
                id: 4,
                text: "🐉 Китайское облако (очень дешево, $30K)",
                result: "По закону о нацбезопасности все данные передаются властям КНР.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Данные попадают под юрисдикцию с непрозрачными законами.",
                threat: threats.T2_1,
                effects: { budget: -10, security: -60, time: 0 },
                explanation: "Почему это плохо:\n1. Полная потеря конфиденциальности\n2. Риск кражи модели (T2.1)\n3. Нет защиты интеллектуальной собственности\n\nВ дипломе: Таблица 1.2, угроза T2.1"
            }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        description: "Модель готова. Тестировщики нашли странности. Что делать?",
        options: [
            {
                id: 1,
                text: "🔍 Отложить релиз, провести полное тестирование",
                result: "Нашли 5 критических багов. Модель доработана.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Хотя это безопасно, конкуренты успевают выйти на рынок первыми.",
                threat: null,
                effects: { budget: -10, security: +20, time: +30 },
                explanation: "Почему это не оптимально:\n1. Потеря рыночного окна\n2. Конкуренты занимают нишу\n3. Бизнес-риски выше технических\n\nВ бизнесе важно соблюдать баланс"
            },
            {
                id: 2,
                text: "🚀 Выпустить сейчас, фиксить потом",
                result: "Модель в продакшне. Через день — сбой. Тесты были подменены.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Это классическая ошибка — релиз без проверки.",
                threat: threats.T3_1,
                effects: { budget: 0, security: -50, time: 0 },
                explanation: "Почему это плохо:\n1. Подмена тестовых данных (T3.1)\n2. Репутационные потери\n3. Потеря клиентов\n\nВ дипломе: Таблица 1.3, угроза T3.1"
            },
            {
                id: 3,
                text: "⚖️ Проверить только критичные сценарии",
                result: "Часть багов пропустили. Они вылезут в самый неподходящий момент.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Половина уязвимостей остается незамеченной.",
                threat: threats.T3_3,
                effects: { budget: -5, security: -15, time: +10 },
                explanation: "Почему это плохо:\n1. Сокрытие уязвимостей (T3.3)\n2. Ложное чувство безопасности\n3. Отложенные проблемы\n\nВ дипломе: Таблица 1.3, угроза T3.3"
            },
            {
                id: 4,
                text: "🔬 Нанять внешних аудиторов ($50K)",
                result: "Аудиторы нашли 10 уязвимостей, включая подмену тестовых данных.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! Независимый аудит — золотой стандарт по NIST AI RMF.",
                threat: null,
                effects: { budget: -25, security: +30, time: +20 },
                explanation: "Почему это правильно:\n1. Требование NIST AI RMF\n2. Объективная оценка\n3. Выявление скрытых угроз\n\nСсылка: параграф 1.3, NIST AI RMF"
            }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        description: "Модель в продакшне. Система мониторинга показывает подозрительную активность.",
        options: [
            {
                id: 1,
                text: "🛡️ Внедрить rate limiting",
                result: "Простые атаки отсечены. Сложные — продолжаются.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Rate limiting — это база, но не защита от целевых атак.",
                threat: threats.T4_2,
                effects: { budget: -5, security: +10, time: 0 },
                explanation: "Почему этого мало:\n1. Не защищает от кражи модели\n2. Не выявляет паттерны атак\n3. Только первый уровень защиты\n\nНужен мониторинг"
            },
            {
                id: 2,
                text: "📊 Внедрить мониторинг и анализ паттернов",
                result: "Система выявила попытку кражи модели. Атака заблокирована.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! Мониторинг позволяет выявить атаки в реальном времени.",
                threat: null,
                effects: { budget: -20, security: +25, time: +10 },
                explanation: "Почему это правильно:\n1. Соответствие MLOps практике\n2. Выявление аномалий\n3. Проактивная защита\n\nСсылка: параграф 2.1, этапы аудита"
            },
            {
                id: 3,
                text: "🔄 Полностью переделать API",
                result: "2 месяца разработки. Бюджет почти нулевой. Конкуренты выпустили продукт.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Радикальные меры убивают бизнес.",
                threat: null,
                effects: { budget: -40, security: +50, time: +30 },
                explanation: "Почему это плохо:\n1. Бизнес не выживет\n2. Рынок потерян\n3. Нет баланса\n\nБезопасность ради безопасности не имеет смысла"
            },
            {
                id: 4,
                text: "⏸️ Игнорировать",
                result: "Через месяц модель украдена и продается конкурентами.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Игнорирование угроз — гарантированная катастрофа.",
                threat: threats.T4_1,
                effects: { budget: 0, security: -70, time: 0 },
                explanation: "Почему это плохо:\n1. Подмена модели (T4.1)\n2. Потеря интеллектуальной собственности\n3. Крах бизнеса\n\nВ дипломе: Таблица 1.4, угроза T4.1"
            }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        description: "Модель работает полгода. Резкий всплеск странных запросов и падение качества.",
        options: [
            {
                id: 1,
                text: "🛑 Думаем это DDoS, ставим Cloudflare",
                result: "Это были не DDoS, а состязательные атаки. Модель отравлена.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Диагноз неверный — лечение бесполезно.",
                threat: threats.T5_1,
                effects: { budget: -10, security: -20, time: 0 },
                explanation: "Почему это плохо:\n1. Состязательные атаки (T5.1)\n2. Неверная диагностика\n3. Усугубление проблемы\n\nВ дипломе: Таблица 1.5, угроза T5.1"
            },
            {
                id: 2,
                text: "🔎 Анализируем запросы вручную",
                result: "Месяц анализа. За это время утекли данные клиентов.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Ручной анализ слишком медленный.",
                threat: threats.T5_2,
                effects: { budget: -15, security: +30, time: +40 },
                explanation: "Почему это плохо:\n1. Промпт-инъекции (T5.2)\n2. Критическое время\n3. Утечка данных\n\nНужна автоматизация"
            },
            {
                id: 3,
                text: "⛔ Временно отключаем API",
                result: "Безопасность спасена. Клиенты ушли к конкурентам.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Отключение — это не решение, а бегство.",
                threat: null,
                effects: { budget: -30, security: +40, time: +20 },
                explanation: "Почему это плохо:\n1. Потеря клиентов\n2. Репутационный ущерб\n3. Бизнес-провал\n\nКрайняя мера, когда все плохо"
            },
            {
                id: 4,
                text: "🤖 Использовать интеллектуальный аудитор",
                result: "Аудитор за 5 минут нашел промпт-инъекции и заблокировал атаку.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! Ваш инструмент — лучшее решение, созданное в дипломе.",
                threat: null,
                effects: { budget: 0, security: +50, time: -20 },
                explanation: "Почему это правильно:\n1. Практическая значимость диплома\n2. Автоматизация анализа\n3. Экономия времени\n\nСсылка: Глава 3, параграф 3.2"
            }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ И ПЕРЕОБУЧЕНИЕ",
        description: "Прошел год. Нужно обновить модель на новых данных. Как организовать процесс?",
        options: [
            {
                id: 1,
                text: "🔄 Полностью автоматическое обновление",
                result: "Система откатилась к старой уязвимой версии. Модель скомпрометирована.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Автоматика без контроля опасна.",
                threat: threats.T6_1,
                effects: { budget: -5, security: -30, time: +10 },
                explanation: "Почему это плохо:\n1. Откат к уязвимой версии (T6.1)\n2. Отсутствие контроля\n3. Незаметная компрометация\n\nВ дипломе: Таблица 1.6, угроза T6.1"
            },
            {
                id: 2,
                text: "👨‍💻 Ручное обновление с проверкой",
                result: "Обновление прошло успешно. Модель работает стабильно.",
                isCorrect: true,
                correctReason: "✓ ПРАВИЛЬНО! Ручной контроль гарантирует целостность.",
                threat: null,
                effects: { budget: -10, security: +20, time: +30 },
                explanation: "Почему это правильно:\n1. Контроль целостности\n2. Защита от компрометации\n3. Проверка каждого этапа\n\nСсылка: параграф 2.1, MLOps"
            },
            {
                id: 3,
                text: "🤖 Полуавтоматическое с мониторингом",
                result: "В пайплайн внедрили вредоносный код. Модель отравлена.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Полуавтоматические системы — цель для атак.",
                threat: threats.T6_2,
                effects: { budget: -15, security: -40, time: +15 },
                explanation: "Почему это плохо:\n1. Компрометация пайплайна (T6.2)\n2. Сложность обнаружения\n3. Критический риск\n\nВ дипломе: Таблица 1.6, угроза T6.2"
            },
            {
                id: 4,
                text: "⏸️ Отложить обновление",
                result: "Модель устарела. Клиенты уходят к конкурентам.",
                isCorrect: false,
                correctReason: "✗ НЕПРАВИЛЬНО! Отказ от обновлений — смерть для IT-продукта.",
                threat: threats.T6_3,
                effects: { budget: -20, security: -10, time: +20 },
                explanation: "Почему это плохо:\n1. Нарушение целостности (T6.3)\n2. Устаревание\n3. Потеря рынка\n\nВ дипломе: Таблица 1.6, угроза T6.3"
            }
        ]
    }
};

// ===== СТАТИСТИКА ЭТАПОВ ИЗ ДИПЛОМА =====
const actStats = {
    1: { name: "Сбор и подготовка данных", vulnerability: 33.3, table: "1.1" },
    2: { name: "Разработка и обучение", vulnerability: 71.4, table: "1.2" },
    3: { name: "Валидация и тестирование", vulnerability: 88.9, table: "1.3" },
    4: { name: "Развертывание", vulnerability: 66.7, table: "1.4" },
    5: { name: "Эксплуатация и мониторинг", vulnerability: 12.9, table: "1.5" },
    6: { name: "Обновление и переобучение", vulnerability: 77.8, table: "1.6" }
};

// ===== ФУНКЦИИ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА =====
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

// ===== ПРОВЕРКА НА ПОРАЖЕНИЕ =====
function checkGameOver() {
    if (gameState.budget <= 0) {
        showGameOver('💰 Бюджет исчерпан. Стартап обанкротился.');
        return true;
    }
    if (gameState.security <= 0) {
        showGameOver('🔒 Критическая утечка данных. Компания закрыта регуляторами.');
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
            <span class="threat-badge high" style="font-size: 20px; padding: 10px 20px;">❌ ПРОЕКТ ПРОВАЛЕН</span>
            <p style="margin: 30px 0; font-size: 18px;">${message}</p>
            <p style="color: #888; margin: 20px 0;">Правильных ответов: ${gameState.correctChoices} из 6</p>
            <button class="choice-btn" onclick="restartGame()" style="text-align: center;">🔄 Начать заново</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

// ===== ПРОВЕРКА НА ПОБЕДУ =====
function checkVictory() {
    if (gameState.act > 6) {
        showVictory();
        return true;
    }
    return false;
}

function showVictory() {
    const riskLevel = gameState.security >= 70 ? 'Низкий' : (gameState.security >= 40 ? 'Средний' : 'Высокий');
    const riskClass = riskLevel === 'Низкий' ? 'low' : (riskLevel === 'Средний' ? 'medium' : 'high');
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="padding: 20px;">
            <span class="threat-badge" style="font-size: 20px; padding: 10px 20px; border-color: #00ff9d; color: #00ff9d;">✅ ПРОЕКТ УСПЕШНО ЗАВЕРШЕН</span>
            
            <p style="margin: 25px 0 15px 0; font-size: 18px;">Вы прошли все 6 этапов жизненного цикла ИИ-системы.</p>
            
            <div style="background: #1a1a26; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h3 style="color: #00f3ff; margin-bottom: 15px;">📊 ИТОГОВАЯ СТАТИСТИКА</h3>
                <p style="margin: 10px 0;"><span class="highlight">Правильных ответов:</span> ${gameState.correctChoices} из 6</p>
                <p style="margin: 10px 0;"><span class="highlight">Финальный бюджет:</span> ${gameState.budget}%</p>
                <p style="margin: 10px 0;"><span class="highlight">Финальная безопасность:</span> ${gameState.security}%</p>
                <p style="margin: 10px 0;"><span class="highlight">Финальное время:</span> ${gameState.time}%</p>
                <p style="margin: 10px 0;"><span class="highlight">Уровень риска:</span> <span class="risk-${riskClass}">${riskLevel}</span></p>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 25px;">
                <button class="choice-btn" onclick="showAllThreats()" style="flex: 1;">📚 Все 27 угроз</button>
                <button class="choice-btn" onclick="restartGame()" style="flex: 1;">🔄 Пройти заново</button>
            </div>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

// ===== ПОКАЗАТЬ ТЕКУЩИЙ АКТ =====
function showAct() {
    if (checkGameOver() || checkVictory()) return;
    
    const act = acts[gameState.act];
    const stats = actStats[gameState.act];
    
    let content = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <span class="threat-badge" style="border-color: #9d4edd;">Этап ${gameState.act}/6</span>
                <span class="threat-badge diploma-ref">Таблица ${stats.table}</span>
            </div>
            
            <h2 style="color: #00f3ff; margin: 15px 0;">${act.title}</h2>
            <p style="margin: 15px 0; line-height: 1.7;">${act.description}</p>
            
            <div style="background: #1a1a26; padding: 10px; border-radius: 8px; margin: 15px 0; font-size: 13px; border-left: 3px solid #ffff3b;">
                <span style="color: #ffff3b;">💡 ПОДСКАЗКА:</span> Ищите вариант, который соответствует стандартам безопасности из диплома (ISO 27001, NIST, MLOps)
            </div>
            
            <hr style="border-color: #2a2a3a; margin: 20px 0;">
            
            <p style="font-weight: 600; color: #00ff9d; margin-bottom: 15px;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
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

// ===== ОБРАБОТКА ВЫБОРА =====
function makeChoice(choiceNum) {
    if (gameState.gameOver || gameState.act > 6) return;
    
    const act = acts[gameState.act];
    const choice = act.options[choiceNum - 1];
    
    if (!choice) return;
    
    // Сохраняем выбор
    gameState.choices.push({
        act: gameState.act,
        choice: choiceNum,
        isCorrect: choice.isCorrect
    });
    
    if (choice.isCorrect) {
        gameState.correctChoices++;
    }
    
    // Применяем эффекты
    gameState.budget += choice.effects.budget;
    gameState.security += choice.effects.security;
    gameState.time += choice.effects.time;
    
    gameState.budget = Math.min(100, Math.max(0, gameState.budget));
    gameState.security = Math.min(100, Math.max(0, gameState.security));
    gameState.time = Math.min(100, Math.max(0, gameState.time));
    
    updateDisplay();
    
    if (checkGameOver()) return;
    
    // Формируем результат с пояснениями
    const correctnessColor = choice.isCorrect ? '#00ff9d' : '#ff3b3b';
    const correctnessIcon = choice.isCorrect ? '✓' : '✗';
    
    let resultHtml = `
        <div style="margin-bottom: 20px;">
            <span class="threat-badge" style="border-color: ${correctnessColor}; color: ${correctnessColor};">
                ${correctnessIcon} ${choice.isCorrect ? 'ПРАВИЛЬНО' : 'НЕПРАВИЛЬНО'}
            </span>
            
            <h3 style="color: ${correctnessColor}; margin: 15px 0;">📌 РЕЗУЛЬТАТ</h3>
            <p style="margin: 15px 0; line-height: 1.7;">${choice.result}</p>
            
            <div style="background: ${choice.isCorrect ? 'rgba(0,255,157,0.1)' : 'rgba(255,59,59,0.1)'}; border-left: 3px solid ${correctnessColor}; padding: 15px; margin: 15px 0;">
                <p style="margin: 0 0 10px 0; font-weight: 600;">${choice.correctReason}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #a0a0b0; white-space: pre-line;">${choice.explanation}</p>
            </div>
    `;
    
    if (choice.threat) {
        resultHtml += `
            <div style="background: #1a1a26; padding: 15px; margin: 15px 0; border-radius: 8px;">
                <span class="threat-badge high">⚠️ УГРОЗА: ${choice.threat.name}</span>
                <p style="margin: 10px 0 0 0; font-size: 13px; color: #a0a0b0;">
                    📚 ${choice.threat.table} | Риск: ${choice.threat.risk}
                </p>
            </div>
        `;
    }
    
    resultHtml += `
            <hr style="border-color: #2a2a3a; margin: 20px 0;">
            
            <p><span class="highlight">Изменение ресурсов:</span></p>
            <ul style="list-style: none; padding: 0; margin: 10px 0;">
                <li style="margin: 5px 0;">💰 Бюджет: ${choice.effects.budget > 0 ? '+' : ''}${choice.effects.budget}%</li>
                <li style="margin: 5px 0;">🔒 Безопасность: ${choice.effects.security > 0 ? '+' : ''}${choice.effects.security}%</li>
                <li style="margin: 5px 0;">⏱️ Время: ${choice.effects.time > 0 ? '+' : ''}${choice.effects.time}%</li>
            </ul>
            
            <button class="choice-btn" onclick="nextAct()" style="margin-top: 20px; width: 100%; text-align: center;">
                ➡️ Продолжить (Акт ${gameState.act + 1})
            </button>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = resultHtml;
    document.getElementById('choicesGrid').style.display = 'none';
}

// ===== ПЕРЕХОД К СЛЕДУЮЩЕМУ АКТУ =====
function nextAct() {
    gameState.act++;
    if (gameState.act <= 6) {
        showAct();
    } else {
        checkVictory();
    }
}

// ===== ПОКАЗАТЬ ВСЕ УГРОЗЫ =====
function showAllThreats() {
    let html = '<h3>📚 ВСЕ 27 УГРОЗ ИЗ ДИПЛОМА</h3>';
    
    const stages = [
        { name: 'Сбор и подготовка данных (Табл. 1.1)', threats: ['T1.1', 'T1.2', 'T1.3', 'T1.4'] },
        { name: 'Разработка и обучение (Табл. 1.2)', threats: ['T2.1', 'T2.2', 'T2.3', 'T2.4'] },
        { name: 'Валидация и тестирование (Табл. 1.3)', threats: ['T3.1', 'T3.2', 'T3.3'] },
        { name: 'Развертывание (Табл. 1.4)', threats: ['T4.1', 'T4.2', 'T4.3'] },
        { name: 'Эксплуатация (Табл. 1.5)', threats: ['T5.1', 'T5.2', 'T5.3', 'T5.4', 'T5.5', 'T5.6'] },
        { name: 'Обновление (Табл. 1.6)', threats: ['T6.1', 'T6.2', 'T6.3'] }
    ];
    
    stages.forEach(stage => {
        html += `<h4 style="color: #00f3ff; margin: 20px 0 10px 0;">${stage.name}</h4>`;
        html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
        
        stage.threats.forEach(threatId => {
            const threat = Object.values(threats).find(t => t.id === threatId);
            if (threat) {
                const riskColor = threat.risk === 'Критический' ? '#ff3b3b' : (threat.risk === 'Высокий' ? '#ff9f1c' : '#00ff9d');
                html += `
                    <div style="background: #1a1a26; padding: 8px 12px; border-radius: 20px; border-left: 3px solid ${riskColor}; margin-bottom: 5px;">
                        <strong>${threat.id}</strong> ${threat.name}
                    </div>
                `;
            }
        });
        
        html += '</div>';
    });
    
    document.getElementById('modalTitle').textContent = 'Все угрозы из диплома';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

// ===== ПОКАЗАТЬ ССЫЛКИ НА ДИПЛОМ =====
function showDiplomaLinks() {
    const html = `
        <div style="padding: 10px;">
            <h3 style="color: #00f3ff; margin-bottom: 20px;">📚 СВЯЗЬ С ДИПЛОМНОЙ РАБОТОЙ</h3>
            
            <div style="margin: 20px 0;">
                <p><span class="highlight">Автор:</span> Воробьева Александра Александровна</p>
                <p><span class="highlight">ВУЗ:</span> МГЛУ, Институт информационных наук</p>
                <p><span class="highlight">Кафедра:</span> Международной информационной безопасности</p>
                <p><span class="highlight">Год:</span> 2026</p>
            </div>
            
            <div style="background: #1a1a26; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #9d4edd; margin-bottom: 10px;">Соответствие диплому:</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 8px 0;">✓ <span class="highlight">6 актов</span> — 6 этапов (Таблицы 1.1-1.6)</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">27 угроз</span> — все из таблиц 1.1-1.6</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">Проценты</span> — из параграфа 3.3</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">Правильные ответы</span> — по стандартам (ISO 27001, NIST)</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'О дипломной работе';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

// ===== ПЕРЕЗАПУСК =====
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

// ===== ЗАКРЫТЬ МОДАЛЬНОЕ ОКНО =====
function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
window.onload = function() {
    showAct();
    
    window.onclick = function(event) {
        const modal = document.getElementById('infoModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};