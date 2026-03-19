// ============================================
// AI SECURITY SIMULATOR - ПРЕМИУМ ВЕРСИЯ
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

// ===== ВСЕ УГРОЗЫ ИЗ ДИПЛОМА =====
const threats = {
    T1_1: { id: "T1.1", name: "Отравление данных (Data Poisoning)", table: "Таблица 1.1, стр. 13", risk: "Высокий", desc: "Злоумышленник внес искаженные данные в обучающую выборку" },
    T1_4: { id: "T1.4", name: "Нарушение конфиденциальности при сборе", table: "Таблица 1.1, стр. 13", risk: "Средний", desc: "Сбор данных без согласия субъектов, юридические риски" },
    T1_3: { id: "T1.3", name: "Несанкционированная модификация разметки", table: "Таблица 1.1, стр. 13", risk: "Средний", desc: "Изменение меток классов в размеченных данных" },
    T2_1: { id: "T2.1", name: "Кража модели (Model Extraction)", table: "Таблица 1.2, стр. 14", risk: "Критический", desc: "Восстановление логики модели через API" },
    T2_3: { id: "T2.3", name: "Компрометация кода обучения", table: "Таблица 1.2, стр. 14", risk: "Высокий", desc: "Внесение изменений в скрипты обучения" },
    T3_1: { id: "T3.1", name: "Подмена тестовых данных", table: "Таблица 1.3, стр. 15", risk: "Высокий", desc: "Замена тестовой выборки для сокрытия недостатков" },
    T3_3: { id: "T3.3", name: "Сокрытие уязвимостей", table: "Таблица 1.3, стр. 15", risk: "Критический", desc: "Отсутствие тестирования на устойчивость к атакам" },
    T4_1: { id: "T4.1", name: "Подмена модели", table: "Таблица 1.4, стр. 15", risk: "Критический", desc: "Замена легитимной модели на вредоносную" },
    T4_2: { id: "T4.2", name: "Небезопасная конфигурация API", table: "Таблица 1.4, стр. 15", risk: "Высокий", desc: "Отсутствие аутентификации и ограничений" },
    T5_1: { id: "T5.1", name: "Состязательные атаки", table: "Таблица 1.5, стр. 16", risk: "Высокий", desc: "Подача специально сформированных входных данных" },
    T5_2: { id: "T5.2", name: "Промпт-инъекции", table: "Таблица 1.5, стр. 16", risk: "Критический", desc: "Запросы, заставляющие ИИ игнорировать инструкции" },
    T6_1: { id: "T6.1", name: "Откат к уязвимой версии", table: "Таблица 1.6, стр. 17", risk: "Высокий", desc: "Возврат к старой версии с известными уязвимостями" },
    T6_2: { id: "T6.2", name: "Компрометация пайплайна", table: "Таблица 1.6, стр. 17", risk: "Критический", desc: "Внедрение вредоносных изменений в процесс дообучения" }
};

// ===== СЦЕНАРИИ С ПОЛНЫМИ ПОЯСНЕНИЯМИ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        description: "Вы — CISO стартапа NeuroGen. Вам нужны данные для обучения банковского чат-бота. Какой источник выберете?",
        options: [
            {
                id: 1,
                text: "💰 Купить готовый датасет у аккредитованного поставщика ($50K)",
                result: "Поставщик предоставил сертификат происхождения данных и лицензию на использование.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Аккредитованный поставщик гарантирует легальность данных\n• Минимизирован риск отравления данных (Data Poisoning)\n• Есть юридическая защита\n\nСсылка: Таблица 1.1 - угроза T1.1",
                effects: { budget: -5, security: -5, time: 5 }
            },
            {
                id: 2,
                text: "🌐 Собрать данные из открытых источников (бесплатно)",
                result: "Юристы нашли в данных персональную информацию клиентов банка. Грозят многомиллионные штрафы.",
                isCorrect: false,
                threat: threats.T1_4,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Нарушение конфиденциальности при сборе (T1.4)\n\nПоследствия:\n• Штрафы до 4% от годового оборота\n• Уголовная ответственность\n• Репутационные потери\n\nВ дипломе: Таблица 1.1, стр. 13",
                effects: { budget: -10, security: -20, time: 25 }
            },
            {
                id: 3,
                text: "👥 Нанять фрилансеров для разметки ($20K)",
                result: "Качество разметки ужасное: 40% меток неверные. Часть данных утекла в открытый доступ.",
                isCorrect: false,
                threat: threats.T1_3,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Несанкционированная модификация разметки (T1.3)\n\nПоследствия:\n• Модель учится на неправильных примерах\n• Утечка данных через подрядчиков\n• Необходимость полной переделки\n\nВ дипломе: Таблица 1.1, стр. 13",
                effects: { budget: -10, security: -15, time: 10 }
            },
            {
                id: 4,
                text: "🤖 Создать синтетические данные ($100K)",
                result: "Данные идеальны с точки зрения безопасности. Но модель отказывается работать в реальности — слишком 'чистые' данные.",
                isCorrect: false,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Отрыв от реальности\n\nПоследствия:\n• Модель не распознает реальные шумы\n• Огромные затраты времени и денег\n• Продукт бесполезен для клиентов\n\nСсылка: параграф 1.1 о качестве данных",
                effects: { budget: -35, security: 10, time: 25 }
            }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        description: "Данные готовы. Где развернуть обучение модели?",
        options: [
            {
                id: 1,
                text: "☁️ AWS (Enterprise, $150K, ISO 27001, SOC 2)",
                result: "AWS предоставляет полный комплект сертификаций. Инфраструктура защищена на мировом уровне.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Сертификация ISO/IEC 27001 (параграф 1.3)\n• Прозрачные условия использования\n• Защита от кражи модели\n• Соответствие международным стандартам\n\nСсылка: параграф 1.3, стандарты безопасности",
                effects: { budget: -30, security: -5, time: 0 }
            },
            {
                id: 2,
                text: "🟢 Google Cloud (скидка стартапам, $75K)",
                result: "Данные уходят на сервера в США. В договоре мелкий шрифт: Google имеет право использовать ваши данные для обучения своих моделей.",
                isCorrect: false,
                threat: threats.T2_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Кража модели (T2.1)\n\nПоследствия:\n• Потеря интеллектуальной собственности\n• Конкуренты получают вашу модель\n• Нет защиты данных\n\nВ дипломе: Таблица 1.2, угроза T2.1",
                effects: { budget: -15, security: -20, time: 0 }
            },
            {
                id: 3,
                text: "🏢 Свои сервера в дата-центре ($25K)",
                result: "Сисадмин настроил доступ. Через месяц обнаружили, что код обучения скомпрометирован. Кто-то оставил бэкдор.",
                isCorrect: false,
                threat: threats.T2_3,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Компрометация кода обучения (T2.3)\n\nПоследствия:\n• Внедрение вредоносного кода\n• Отсутствие экспертизы безопасности\n• Огромные временные затраты\n\nВ дипломе: Таблица 1.2, угроза T2.3",
                effects: { budget: -5, security: -35, time: 40 }
            },
            {
                id: 4,
                text: "🐉 Китайское облако (очень дешево, $30K)",
                result: "По закону о национальной безопасности все данные автоматически передаются властям КНР. Модель скопирована.",
                isCorrect: false,
                threat: threats.T2_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Кража модели и данных (T2.1)\n\nПоследствия:\n• Полная потеря конфиденциальности\n• Доступ спецслужб к данным клиентов\n• Невозможность контролировать утечки\n\nВ дипломе: Таблица 1.2, угроза T2.1",
                effects: { budget: -10, security: -60, time: 0 }
            }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        description: "Модель готова. Тестировщики нашли странные аномалии в результатах. Ваши действия?",
        options: [
            {
                id: 1,
                text: "🔍 Отложить релиз, провести полное тестирование",
                result: "Потратили месяц на доп. тесты. Нашли 5 критических багов. Конкуренты выпустили продукт раньше.",
                isCorrect: false,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Бизнес-риски\n\nПоследствия:\n• Потеря рыночного окна\n• Конкуренты заняли нишу\n• Инвесторы недовольны\n\nВ бизнесе важен баланс безопасности и скорости",
                effects: { budget: -10, security: 20, time: 30 }
            },
            {
                id: 2,
                text: "🚀 Выпустить сейчас, фиксить в продакшне",
                result: "Модель в продакшне. Через день — сбой. Выяснилось: тестовые данные были подменены, чтобы скрыть недостатки.",
                isCorrect: false,
                threat: threats.T3_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Подмена тестовых данных (T3.1)\n\nПоследствия:\n• Критические ошибки у клиентов\n• Потеря доверия\n• Репутационный ущерб\n\nВ дипломе: Таблица 1.3, угроза T3.1",
                effects: { budget: 0, security: -50, time: 0 }
            },
            {
                id: 3,
                text: "⚖️ Проверить только критичные сценарии",
                result: "Часть багов пропустили. Они вылезут в самый неподходящий момент, когда модель уже в эксплуатации.",
                isCorrect: false,
                threat: threats.T3_3,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Сокрытие уязвимостей (T3.3)\n\nПоследствия:\n• Ложное чувство безопасности\n• Отложенные проблемы\n• Аварийные ситуации\n\nВ дипломе: Таблица 1.3, угроза T3.3",
                effects: { budget: -5, security: -15, time: 10 }
            },
            {
                id: 4,
                text: "🔬 Нанять внешних аудиторов ($50K)",
                result: "Аудиторы нашли 10 уязвимостей, включая подмену тестовых данных и сокрытие багов. Модель доработана.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Независимый аудит — золотой стандарт NIST AI RMF\n• Объективная оценка безопасности\n• Выявление скрытых угроз\n• Соответствие международным стандартам\n\nСсылка: параграф 1.3, NIST AI RMF",
                effects: { budget: -25, security: 30, time: 20 }
            }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        description: "Модель в продакшне. Система мониторинга показывает подозрительную активность: множество запросов с одинаковой структурой.",
        options: [
            {
                id: 1,
                text: "🛡️ Внедрить rate limiting (ограничение запросов)",
                result: "Простые атаки отсечены. Но целевые атаки на кражу модели продолжаются. Злоумышленники адаптируются.",
                isCorrect: false,
                threat: threats.T4_2,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Недостаточная защита API (T4.2)\n\nПоследствия:\n• Rate limiting не защищает от кражи модели\n• Атакующие обходят ограничения\n• Нужен более глубокий анализ\n\nВ дипломе: Таблица 1.4, угроза T4.2",
                effects: { budget: -5, security: 10, time: 0 }
            },
            {
                id: 2,
                text: "📊 Внедрить мониторинг и анализ паттернов",
                result: "Система выявила попытку кражи модели. Атака заблокирована. Паттерны запросов проанализированы.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Соответствие MLOps практике (параграф 2.1)\n• Выявление аномалий в реальном времени\n• Проактивная защита\n• Анализ поведения злоумышленников\n\nСсылка: параграф 2.1, этапы аудита",
                effects: { budget: -20, security: 25, time: 10 }
            },
            {
                id: 3,
                text: "🔄 Полностью переделать архитектуру API",
                result: "2 месяца разработки. Бюджет почти нулевой. За это время конкуренты выпустили три обновления и заняли рынок.",
                isCorrect: false,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Радикальные меры без учета бизнеса\n\nПоследствия:\n• Потеря рыночной позиции\n• Инвесторы отказывают в новом финансировании\n• Безопасность ради безопасности не имеет смысла\n\nНужен баланс",
                effects: { budget: -40, security: 50, time: 30 }
            },
            {
                id: 4,
                text: "⏸️ Игнорировать — само пройдет",
                result: "Через месяц модель полностью скопирована и продается конкурирующим стартапом. Инвесторы в ярости.",
                isCorrect: false,
                threat: threats.T4_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Подмена модели (T4.1)\n\nПоследствия:\n• Полная потеря интеллектуальной собственности\n• Конкуренты зарабатывают на вашей разработке\n• Крах бизнеса\n\nВ дипломе: Таблица 1.4, угроза T4.1",
                effects: { budget: 0, security: -70, time: 0 }
            }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ И МОНИТОРИНГ",
        description: "Модель работает полгода. Вдруг резкий всплеск странных запросов и падение качества ответов. Клиенты жалуются.",
        options: [
            {
                id: 1,
                text: "🛑 Думаем это DDoS, ставим Cloudflare",
                result: "Защиту поставили. Но запросы были не DDoS, а состязательные атаки. Модель уже отравлена и дает сбои.",
                isCorrect: false,
                threat: threats.T5_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Состязательные атаки (T5.1)\n\nПоследствия:\n• Неверный диагноз проблемы\n• Потеря времени\n• Модель продолжает деградировать\n\nВ дипломе: Таблица 1.5, угроза T5.1",
                effects: { budget: -10, security: -20, time: 0 }
            },
            {
                id: 2,
                text: "🔎 Анализировать запросы вручную",
                result: "Потратили месяц на анализ. Поняли, что это промпт-инъекции. Но за месяц утекли данные 10,000 клиентов.",
                isCorrect: false,
                threat: threats.T5_2,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Промпт-инъекции (T5.2)\n\nПоследствия:\n• Критическая утечка данных\n• Ручной анализ слишком медленный\n• Штрафы за утечку персональных данных\n\nВ дипломе: Таблица 1.5, угроза T5.2",
                effects: { budget: -15, security: 30, time: 40 }
            },
            {
                id: 3,
                text: "⛔ Временно отключить API на неделю",
                result: "Безопасность спасена. Но клиенты ушли к конкурентам. Бизнес теряет миллионы.",
                isCorrect: false,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Бизнес-катастрофа\n\nПоследствия:\n• Потеря лояльности клиентов\n• Репутационный ущерб\n• Падение выручки\n\nОтключение — крайняя мера, когда всё плохо",
                effects: { budget: -30, security: 40, time: 20 }
            },
            {
                id: 4,
                text: "🤖 Использовать 'Интеллектуальный аудитор'",
                result: "Ваш инструмент за 5 минут проанализировал трафик, нашел промпт-инъекции и предложил точечные меры защиты. Уязвимости устранены за день.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Прямая практическая значимость диплома\n• Автоматизация анализа\n• Экономия времени (-20%!)\n• Точное выявление угроз\n\nСсылка: Глава 3, параграф 3.2",
                effects: { budget: 0, security: 50, time: -20 }
            }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ И ПЕРЕОБУЧЕНИЕ",
        description: "Прошел год. Нужно обновить модель на новых данных. Система автоматического обновления запущена. Ваш выбор?",
        options: [
            {
                id: 1,
                text: "🔄 Полностью автоматическое обновление",
                result: "Обновление прошло. Через месяц заметили, что модель стала хуже работать. Оказывается, система откатилась к старой уязвимой версии.",
                isCorrect: false,
                threat: threats.T6_1,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Откат к уязвимой версии (T6.1)\n\nПоследствия:\n• Старые уязвимости снова активны\n• Незаметная компрометация\n• Сложность обнаружения\n\nВ дипломе: Таблица 1.6, угроза T6.1",
                effects: { budget: -5, security: -30, time: 10 }
            },
            {
                id: 2,
                text: "👨‍💻 Ручное обновление с проверкой каждого этапа",
                result: "Обновление прошло успешно. Каждая версия проверена, целостность подтверждена. Модель работает стабильно.",
                isCorrect: true,
                explanation: "✓ ЭТО ПРАВИЛЬНЫЙ ВЫБОР!\n\nПочему:\n• Полный контроль целостности\n• Защита от компрометации\n• Проверка каждой версии\n• Соответствие MLOps практике\n\nСсылка: параграф 2.1, управление жизненным циклом",
                effects: { budget: -10, security: 20, time: 30 }
            },
            {
                id: 3,
                text: "🤖 Полуавтоматическое с мониторингом",
                result: "Настроили пайплайн. Через 2 недели заметили, что в процесс дообучения кто-то внедрил вредоносный код. Модель отравлена.",
                isCorrect: false,
                threat: threats.T6_2,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Компрометация пайплайна (T6.2)\n\nПоследствия:\n• Внедрение бэкдоров\n• Сложность обнаружения\n• Критический риск\n\nВ дипломе: Таблица 1.6, угроза T6.2",
                effects: { budget: -15, security: -40, time: 15 }
            },
            {
                id: 4,
                text: "⏸️ Отложить обновление на полгода",
                result: "Модель устаревает. Клиенты жалуются на качество. Конкуренты переманивают пользователей более новыми моделями.",
                isCorrect: false,
                explanation: "✗ ПОЧЕМУ ЭТО НЕПРАВИЛЬНО:\n\nПроблема: Технологическое отставание\n\nПоследствия:\n• Потеря конкурентного преимущества\n• Уход клиентов\n• Снижение выручки\n\nВ IT нельзя останавливаться",
                effects: { budget: -20, security: -10, time: 20 }
            }
        ]
    }
};

// ===== СТАТИСТИКА ЭТАПОВ =====
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
        showGameOver('🔒 Критическая утечка данных. Компания закрыта регуляторами.');
        return true;
    }
    if (gameState.time >= 100) {
        showGameOver('⏱️ Время вышло. Конкуренты заняли рынок. Инвесторы ушли.');
        return true;
    }
    return false;
}

function showGameOver(message) {
    gameState.gameOver = true;
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <div style="border: 2px solid #ff3b3b; color: #ff3b3b; font-size: 24px; padding: 20px; border-radius: 20px; margin-bottom: 30px;">
                ❌ ПРОЕКТ ПРОВАЛЕН
            </div>
            <p style="font-size: 18px; margin: 30px 0;">${message}</p>
            <p style="color: #888; margin: 20px 0;">Правильных ответов: ${gameState.correctChoices} из 6</p>
            <button onclick="restartGame()" style="background:#1a1a26; border:1px solid #00f3ff; color:#00f3ff; padding:15px 30px; font-size:16px; border-radius:10px; cursor:pointer;">🔄 Начать заново</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

// ===== ЭФФЕКТ ДОЖДЯ ИЗ ДЕНЕГ =====
function createMoneyRain() {
    const container = document.querySelector('.game-container');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const money = document.createElement('div');
            money.innerHTML = ['💰', '💵', '💶', '💷', '💎'][Math.floor(Math.random() * 5)];
            money.style.position = 'fixed';
            money.style.left = Math.random() * 100 + '%';
            money.style.top = '-50px';
            money.style.fontSize = (30 + Math.random() * 30) + 'px';
            money.style.opacity = '0.8';
            money.style.animation = `fall ${2 + Math.random() * 3}s linear`;
            money.style.pointerEvents = 'none';
            money.style.zIndex = '9999';
            document.body.appendChild(money);
            
            setTimeout(() => {
                money.remove();
            }, 5000);
        }, i * 100);
    }
}

function showVictory() {
    createMoneyRain();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <div style="border: 2px solid #00ff9d; color: #00ff9d; font-size: 32px; padding: 30px; border-radius: 30px; margin-bottom: 30px; animation: pulse 2s infinite;">
                🎉 ПОБЕДА! 🎉
            </div>
            
            <p style="font-size: 24px; margin: 30px 0; color: #00ff9d;">СТАРТАП NeuroGen УСПЕШНО ЗАВЕРШЕН!</p>
            
            <div style="background: linear-gradient(135deg, #1a1a26, #2a2a3a); padding: 30px; border-radius: 20px; margin: 30px 0; border: 1px solid #00f3ff;">
                <h2 style="color: #00f3ff; margin-bottom: 20px;">📊 ИТОГОВЫЙ ОТЧЕТ</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div style="background: #1e1e2a; padding: 20px; border-radius: 15px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">💰</div>
                        <div style="color: #888;">Бюджет</div>
                        <div style="font-size: 28px; color: #00ff9d;">${gameState.budget}%</div>
                    </div>
                    <div style="background: #1e1e2a; padding: 20px; border-radius: 15px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">🔒</div>
                        <div style="color: #888;">Безопасность</div>
                        <div style="font-size: 28px; color: #00ff9d;">${gameState.security}%</div>
                    </div>
                    <div style="background: #1e1e2a; padding: 20px; border-radius: 15px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">⏱️</div>
                        <div style="color: #888;">Время</div>
                        <div style="font-size: 28px; color: #00ff9d;">${gameState.time}%</div>
                    </div>
                    <div style="background: #1e1e2a; padding: 20px; border-radius: 15px;">
                        <div style="font-size: 40px; margin-bottom: 10px;">🎯</div>
                        <div style="color: #888;">Правильных ответов</div>
                        <div style="font-size: 28px; color: #00ff9d;">${gameState.correctChoices}/6</div>
                    </div>
                </div>
                
                <div style="background: #1e1e2a; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <h3 style="color: #9d4edd; margin-bottom: 15px;">📋 ОЦЕНКА РИСКОВ</h3>
                    <p style="margin: 10px 0;"><span style="color: #00f3ff;">Уровень риска:</span> <span style="color: ${gameState.security >= 70 ? '#00ff9d' : (gameState.security >= 40 ? '#ff9f1c' : '#ff3b3b')}; font-weight: bold;">${gameState.security >= 70 ? 'Низкий' : (gameState.security >= 40 ? 'Средний' : 'Высокий')}</span></p>
                    <p style="margin: 10px 0;"><span style="color: #00f3ff;">Соответствие ISO 27001:</span> ✅</p>
                    <p style="margin: 10px 0;"><span style="color: #00f3ff;">Соответствие NIST AI RMF:</span> ✅</p>
                </div>
                
                <div style="background: #1e1e2a; padding: 20px; border-radius: 15px;">
                    <h3 style="color: #9d4edd; margin-bottom: 15px;">📌 РЕКОМЕНДАЦИИ (Приложение Л)</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 10px 0;">✓ Внедрить непрерывный мониторинг (Таблица 2.1)</li>
                        <li style="margin: 10px 0;">✓ Проводить аудит каждые 3 месяца</li>
                        <li style="margin: 10px 0;">✓ Обучить сотрудников основам AI security</li>
                    </ul>
                </div>
            </div>
            
            <p style="color: #888; margin: 20px 0;">Дипломная работа Воробьевой А.А., МГЛУ, 2026</p>
            
            <button onclick="restartGame()" style="background:#1a1a26; border:2px solid #00ff9d; color:#00ff9d; padding:20px 40px; font-size:20px; border-radius:15px; cursor:pointer; margin:20px 0;">
                🏆 ПРОЙТИ ЗАНОВО 🏆
            </button>
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
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <span style="border:1px solid #9d4edd; color:#9d4edd; padding:4px 12px; border-radius:20px;">Этап ${gameState.act}/6</span>
                <span style="border:1px solid #9d4edd; color:#9d4edd; padding:4px 12px; border-radius:20px;">Таблица ${stats.table}</span>
            </div>
            
            <h2 style="color: #00f3ff; font-size: 24px; margin: 20px 0;">${act.title}</h2>
            <p style="margin: 20px 0; line-height: 1.7; color: #e0e0e0;">${act.description}</p>
            
            <div style="background: #1a1a26; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 3px solid #ffff3b;">
                <span style="color: #ffff3b;">📊 Статистика диплома:</span> На этом этапе <strong>${stats.vulnerability}%</strong> проектов имеют уязвимости (параграф 3.3)
            </div>
            
            <hr style="border-color: #2a2a3a; margin: 25px 0;">
            
            <p style="color: #00ff9d; font-weight: 600; margin-bottom: 20px;">⚡ ВЫБЕРИТЕ ОДИН ВАРИАНТ:</p>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = content;
    
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`choice${i+1}`);
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
    
    gameState.budget = Math.min(100, Math.max(0, gameState.budget + choice.effects.budget));
    gameState.security = Math.min(100, Math.max(0, gameState.security + choice.effects.security));
    gameState.time = Math.min(100, Math.max(0, gameState.time + choice.effects.time));
    
    updateDisplay();
    
    if (checkGameOver()) return;
    
    let threatInfo = '';
    if (choice.threat) {
        threatInfo = `
            <div style="background: #1a1a26; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 3px solid #ff3b3b;">
                <span style="color: #ff3b3b; font-weight: 600;">⚠️ УГРОЗА: ${choice.threat.name}</span>
                <p style="margin: 10px 0 0 0; color: #a0a0b0;">${choice.threat.desc}</p>
                <p style="margin: 5px 0 0 0; color: #888;">${choice.threat.table} | Риск: ${choice.threat.risk}</p>
            </div>
        `;
    }
    
    const resultHtml = `
        <div style="margin-bottom: 20px;">
            <div style="border-left: 5px solid ${choice.isCorrect ? '#00ff9d' : '#ff3b3b'}; padding: 20px; background: #1a1a26;">
                <h3 style="color: ${choice.isCorrect ? '#00ff9d' : '#ff3b3b'}; margin-bottom: 15px;">
                    ${choice.isCorrect ? '✓ ПРАВИЛЬНЫЙ ВЫБОР' : '✗ НЕПРАВИЛЬНЫЙ ВЫБОР'}
                </h3>
                
                <p style="margin: 15px 0; line-height: 1.7;">${choice.result}</p>
                
                ${threatInfo}
                
                <div style="background: #1e1e2a; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <p style="white-space: pre-line; line-height: 1.7;">${choice.explanation}</p>
                </div>
                
                <div style="background: #1e1e2a; padding: 15px; border-radius: 10px; margin: 15px 0;">
                    <p style="color: #00f3ff; margin-bottom: 10px;">📊 ИЗМЕНЕНИЕ РЕСУРСОВ:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin: 8px 0;">💰 Бюджет: ${choice.effects.budget > 0 ? '+' : ''}${choice.effects.budget}%</li>
                        <li style="margin: 8px 0;">🔒 Безопасность: ${choice.effects.security > 0 ? '+' : ''}${choice.effects.security}%</li>
                        <li style="margin: 8px 0;">⏱️ Время: ${choice.effects.time > 0 ? '+' : ''}${choice.effects.time}%</li>
                    </ul>
                </div>
            </div>
            
            <button onclick="nextAct()" style="background:#1a1a26; border:2px solid #00f3ff; color:#00f3ff; padding:15px; width:100%; font-size:16px; border-radius:10px; cursor:pointer; margin-top:20px;">
                ➡️ ПРОДОЛЖИТЬ (Акт ${gameState.act + 1}/6)
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
    let html = '<h3 style="color: #00f3ff;">📚 ВСЕ 27 УГРОЗ ИЗ ДИПЛОМА</h3>';
    
    const stages = [
        { name: 'Сбор и подготовка (Табл.1.1)', threats: ['T1.1', 'T1.2', 'T1.3', 'T1.4'] },
        { name: 'Разработка (Табл.1.2)', threats: ['T2.1', 'T2.2', 'T2.3', 'T2.4'] },
        { name: 'Валидация (Табл.1.3)', threats: ['T3.1', 'T3.2', 'T3.3'] },
        { name: 'Развертывание (Табл.1.4)', threats: ['T4.1', 'T4.2', 'T4.3'] },
        { name: 'Эксплуатация (Табл.1.5)', threats: ['T5.1', 'T5.2', 'T5.3', 'T5.4', 'T5.5', 'T5.6'] },
        { name: 'Обновление (Табл.1.6)', threats: ['T6.1', 'T6.2', 'T6.3'] }
    ];
    
    stages.forEach(stage => {
        html += `<h4 style="color: #9d4edd; margin: 20px 0 10px 0;">${stage.name}</h4>`;
        html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
        
        stage.threats.forEach(id => {
            const threat = Object.values(threats).find(t => t.id === id);
            if (threat) {
                html += `<div style="background: #1a1a26; padding: 8px 15px; border-radius: 20px; border-left: 3px solid ${threat.risk === 'Критический' ? '#ff3b3b' : (threat.risk === 'Высокий' ? '#ff9f1c' : '#00ff9d')};">${threat.id} - ${threat.name}</div>`;
            }
        });
        
        html += '</div>';
    });
    
    document.getElementById('modalTitle').textContent = 'Угрозы';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function showDiplomaLinks() {
    const html = `
        <h3 style="color: #00f3ff;">📚 О ДИПЛОМНОЙ РАБОТЕ</h3>
        <div style="margin: 20px 0;">
            <p><span style="color: #00f3ff;">Автор:</span> Воробьева Александра Александровна</p>
            <p><span style="color: #00f3ff;">ВУЗ:</span> МГЛУ, Институт информационных наук</p>
            <p><span style="color: #00f3ff;">Кафедра:</span> Международной информационной безопасности</p>
            <p><span style="color: #00f3ff;">Год:</span> 2026</p>
            <p><span style="color: #00f3ff;">Тема:</span> Разработка методики аудита информационной безопасности систем, использующих технологии искусственного интеллекта</p>
        </div>
        <div style="background: #1a1a26; padding: 20px; border-radius: 10px;">
            <p style="color: #9d4edd;">Игра полностью соответствует таблицам 1.1-1.6 и параграфу 3.3 диплома</p>
        </div>
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