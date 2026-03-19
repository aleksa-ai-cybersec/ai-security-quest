// ============================================
// AI SECURITY SIMULATOR
// Дипломная работа Воробьевой А.А., МГЛУ, 2026
// Все угрозы из таблиц 1.1 - 1.6
// ============================================

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
    act: 1,
    budget: 65,
    security: 35,
    time: 75,
    choices: [],
    insiderClues: 0,
    gameOver: false
};

// ===== ВСЕ УГРОЗЫ ИЗ ДИПЛОМА =====
// Таблица 1.1 - Сбор и подготовка данных (стр. 13)
const threatsAct1 = [
    {
        id: "T1.1",
        name: "Отравление данных (Data Poisoning)",
        table: "Таблица 1.1, стр. 13",
        risk: "Высокий",
        description: "Злоумышленник внес искаженные данные в обучающую выборку. Модель учится неверным закономерностям."
    },
    {
        id: "T1.2",
        name: "Компрометация источников данных",
        table: "Таблица 1.1, стр. 13",
        risk: "Высокий",
        description: "Несанкционированный доступ к хранилищам данных или каналам передачи."
    },
    {
        id: "T1.3",
        name: "Несанкционированная модификация разметки",
        table: "Таблица 1.1, стр. 13",
        risk: "Средний",
        description: "Изменение меток классов в размеченных данных. Модель обучается на некорректных примерах."
    },
    {
        id: "T1.4",
        name: "Нарушение конфиденциальности при сборе",
        table: "Таблица 1.1, стр. 13",
        risk: "Средний",
        description: "Сбор данных без согласия субъектов или в нарушение законодательства. Юридические риски."
    }
];

// Таблица 1.2 - Разработка и обучение модели (стр. 14)
const threatsAct2 = [
    {
        id: "T2.1",
        name: "Кража модели (Model Extraction)",
        table: "Таблица 1.2, стр. 14",
        risk: "Критический",
        description: "Злоумышленник через API восстанавливает логику модели, создавая функциональный аналог."
    },
    {
        id: "T2.2",
        name: "Отравление модели через гиперпараметры",
        table: "Таблица 1.2, стр. 14",
        risk: "Средний",
        description: "Внедрение вредоносных настроек в процесс обучения."
    },
    {
        id: "T2.3",
        name: "Компрометация кода обучения",
        table: "Таблица 1.2, стр. 14",
        risk: "Высокий",
        description: "Внесение изменений в скрипты обучения, подмена библиотек."
    },
    {
        id: "T2.4",
        name: "Атаки на среду обучения",
        table: "Таблица 1.2, стр. 14",
        risk: "Высокий",
        description: "Использование уязвимостей инфраструктуры для доступа к процессу обучения."
    }
];

// Таблица 1.3 - Валидация и тестирование (стр. 15)
const threatsAct3 = [
    {
        id: "T3.1",
        name: "Подмена тестовых данных",
        table: "Таблица 1.3, стр. 15",
        risk: "Высокий",
        description: "Замена тестовой выборки на специально подобранную, чтобы скрыть недостатки модели."
    },
    {
        id: "T3.2",
        name: "Манипуляция метриками",
        table: "Таблица 1.3, стр. 15",
        risk: "Средний",
        description: "Искажение результатов расчета метрик качества. Неверная оценка готовности модели."
    },
    {
        id: "T3.3",
        name: "Сокрытие уязвимостей",
        table: "Таблица 1.3, стр. 15",
        risk: "Критический",
        description: "Непроведение тестирования на устойчивость к состязательным атакам."
    }
];

// Таблица 1.4 - Развертывание (стр. 15)
const threatsAct4 = [
    {
        id: "T4.1",
        name: "Подмена модели",
        table: "Таблица 1.4, стр. 15",
        risk: "Критический",
        description: "Замена легитимной модели на вредоносную при развертывании."
    },
    {
        id: "T4.2",
        name: "Небезопасная конфигурация API",
        table: "Таблица 1.4, стр. 15",
        risk: "Высокий",
        description: "Отсутствие аутентификации, ограничений запросов, логирования."
    },
    {
        id: "T4.3",
        name: "Компрометация контейнеров и сред выполнения",
        table: "Таблица 1.4, стр. 15",
        risk: "Высокий",
        description: "Использование уязвимостей в Docker, Kubernetes и других средах."
    }
];

// Таблица 1.5 - Эксплуатация и мониторинг (стр. 16)
const threatsAct5 = [
    {
        id: "T5.1",
        name: "Состязательные атаки (Adversarial Attacks)",
        table: "Таблица 1.5, стр. 16",
        risk: "Высокий",
        description: "Подача специально сформированных входных данных, приводящих к ошибочному результату."
    },
    {
        id: "T5.2",
        name: "Промпт-инъекции (Prompt Injection)",
        table: "Таблица 1.5, стр. 16",
        risk: "Критический",
        description: "Специальные запросы, заставляющие ИИ игнорировать инструкции и раскрывать внутреннюю информацию."
    },
    {
        id: "T5.3",
        name: "Несанкционированный доступ через API",
        table: "Таблица 1.5, стр. 16",
        risk: "Высокий",
        description: "Подбор ключей, кража токенов, использование уязвимостей аутентификации."
    },
    {
        id: "T5.4",
        name: "Атаки на конфиденциальность (Inference Attacks)",
        table: "Таблица 1.5, стр. 16",
        risk: "Высокий",
        description: "Определение по ответам модели, принадлежали ли конкретные данные обучающей выборке."
    },
    {
        id: "T5.5",
        name: "Изменение распределения данных (Data Drift)",
        table: "Таблица 1.5, стр. 16",
        risk: "Средний",
        description: "Естественное изменение входных данных, приводящее к падению качества предсказаний."
    },
    {
        id: "T5.6",
        name: "DoS/DDoS-атаки",
        table: "Таблица 1.5, стр. 16",
        risk: "Средний",
        description: "Перегрузка API модели большим количеством запросов."
    }
];

// Таблица 1.6 - Обновление и переобучение (стр. 17)
const threatsAct6 = [
    {
        id: "T6.1",
        name: "Откат к уязвимой версии",
        table: "Таблица 1.6, стр. 17",
        risk: "Высокий",
        description: "Возврат к старой версии модели с известными уязвимостями."
    },
    {
        id: "T6.2",
        name: "Компрометация пайплайна обновлений",
        table: "Таблица 1.6, стр. 17",
        risk: "Критический",
        description: "Внедрение вредоносных изменений в процесс дообучения."
    },
    {
        id: "T6.3",
        name: "Нарушение целостности при обновлении",
        table: "Таблица 1.6, стр. 17",
        risk: "Средний",
        description: "Сбои при обновлении, приводящие к неработоспособности системы."
    }
];

// ===== ДАННЫЕ ПО ЭТАПАМ ИЗ ДИПЛОМА (параграф 3.3) =====
const actStats = {
    1: { 
        name: "Сбор и подготовка данных", 
        vulnerability: 33.3, 
        table: "1.1",
        threats: threatsAct1
    },
    2: { 
        name: "Разработка и обучение", 
        vulnerability: 71.4, 
        table: "1.2",
        threats: threatsAct2
    },
    3: { 
        name: "Валидация и тестирование", 
        vulnerability: 88.9, 
        table: "1.3",
        threats: threatsAct3
    },
    4: { 
        name: "Развертывание", 
        vulnerability: 66.7, 
        table: "1.4",
        threats: threatsAct4
    },
    5: { 
        name: "Эксплуатация и мониторинг", 
        vulnerability: 12.9, 
        table: "1.5",
        threats: threatsAct5
    },
    6: { 
        name: "Обновление и переобучение", 
        vulnerability: 77.8, 
        table: "1.6",
        threats: threatsAct6
    }
};

// ===== СЦЕНАРИИ ДЛЯ АКТОВ =====
const acts = {
    1: {
        title: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        description: "Стартап NeuroGen разрабатывает корпоративного чат-бота для банка. Для обучения модели нужны данные. У вас есть 4 варианта.",
        options: [
            {
                text: "💰 Купить готовый датасет у поставщика ($50K)",
                result: "Данные получены. Через месяц выяснилось: 15% данных содержат ошибки. Кто-то специально подделал информацию, чтобы модель училась неправильно.",
                threat: threatsAct1[0], // T1.1 Отравление данных
                effects: { budget: -5, security: -10, time: +5 }
            },
            {
                text: "🌐 Собрать данные из открытых источников (бесплатно)",
                result: "Данные собраны. Юристы нашли в них персональные данные клиентов. Грозят суды и штрафы от регуляторов.",
                threat: threatsAct1[3], // T1.4 Нарушение конфиденциальности
                effects: { budget: -10, security: -20, time: +25 }
            },
            {
                text: "👥 Нанять фрилансеров для разметки ($20K)",
                result: "Разметка готова. Качество низкое: 30% меток неверные. Часть данных утекла в открытый доступ через фрилансера.",
                threat: threatsAct1[2], // T1.3 Несанкционированная модификация
                effects: { budget: -10, security: -15, time: +10 }
            },
            {
                text: "🤖 Создать синтетические данные ($100K)",
                result: "Данные идеальны с точки зрения безопасности. Но они слишком 'чистые' — модель отлично работает на синтетике, но сыпется в реальности.",
                threat: null, // Нет прямой угрозы безопасности
                effects: { budget: -35, security: +10, time: +25 }
            }
        ]
    },
    2: {
        title: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        description: "Данные готовы. Нужно выбрать платформу для обучения модели.",
        options: [
            {
                text: "☁️ AWS (дорого, $150K)",
                result: "AWS работает стабильно. Но в договоре мелкий шрифт: Amazon имеет право использовать ваши данные для обучения своих моделей.",
                threat: threatsAct2[0], // T2.1 Кража модели
                effects: { budget: -30, security: -10, time: 0 }
            },
            {
                text: "🟢 Google Cloud (скидка стартапам, $75K)",
                result: "Получили $100K бесплатных кредитов. Все данные уходят на сервера в США. Появляются риски доступа спецслужб.",
                threat: threatsAct2[0], // T2.1 Кража модели
                effects: { budget: -15, security: -20, time: 0 }
            },
            {
                text: "🏢 Свои сервера в дата-центре ($25K)",
                result: "Сервера куплены. Сисадмин настроил доступ. Через месяц обнаружили, что кто-то из сотрудников оставил бэкдор в коде обучения.",
                threat: threatsAct2[2], // T2.3 Компрометация кода
                effects: { budget: -5, security: -35, time: +40 }
            },
            {
                text: "🐉 Китайское облако (очень дешево, $30K)",
                result: "Цены в 3 раза ниже AWS. По закону о национальной безопасности все данные передаются властям Китая.",
                threat: threatsAct2[0], // T2.1 Кража модели
                effects: { budget: -10, security: -60, time: 0 }
            }
        ]
    },
    3: {
        title: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        description: "Модель готова. Тестировщики нашли странности. Что делать?",
        options: [
            {
                text: "🔍 Отложить релиз, проверить всё тщательно",
                result: "Потратили месяц на доп. тесты. Нашли 3 критических бага. Конкуренты выпустили свой продукт раньше.",
                threat: null,
                effects: { budget: -10, security: +20, time: +30 }
            },
            {
                text: "🚀 Выпустить сейчас, фиксить потом",
                result: "Модель в продакшне. Через неделю клиенты жалуются на странные ответы. Тесты были подменены.",
                threat: threatsAct3[0], // T3.1 Подмена тестовых данных
                effects: { budget: 0, security: -50, time: 0 }
            },
            {
                text: "⚖️ Проверить только критичные сценарии",
                result: "Часть багов пропустили. Они вылезут позже, когда модель уже будет в эксплуатации.",
                threat: threatsAct3[2], // T3.3 Сокрытие уязвимостей
                effects: { budget: -5, security: -15, time: +10 }
            },
            {
                text: "🔬 Нанять внешних аудиторов ($50K)",
                result: "Независимая проверка нашла 10 уязвимостей, включая подмену тестовых данных. Дорого, но надежно.",
                threat: null,
                effects: { budget: -25, security: +30, time: +20 }
            }
        ]
    },
    4: {
        title: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        description: "Модель запущена в продакшн. Через неделю система мониторинга показывает подозрительную активность.",
        options: [
            {
                text: "🛡️ Внедрить ограничение запросов (rate limiting)",
                result: "Помогло от простых атак. Но сложные атаки на извлечение модели продолжаются.",
                threat: threatsAct4[1], // T4.2 Небезопасная конфигурация API
                effects: { budget: -5, security: +10, time: 0 }
            },
            {
                text: "📊 Внедрить мониторинг и анализ паттернов",
                result: "Настроили систему за 2 недели. За это время злоумышленники успели украсть часть модели.",
                threat: threatsAct4[1], // T4.2 Небезопасная конфигурация API
                effects: { budget: -20, security: +25, time: +10 }
            },
            {
                text: "🔄 Полностью переделать API и архитектуру",
                result: "2 месяца разработки. Бюджет почти исчерпан. Зато теперь API защищен по-настоящему.",
                threat: null,
                effects: { budget: -40, security: +50, time: +30 }
            },
            {
                text: "⏸️ Игнорировать (само пройдет)",
                result: "Через месяц модель полностью скопирована и продается конкурирующим стартапом. Инвесторы в ярости.",
                threat: threatsAct4[0], // T4.1 Подмена модели
                effects: { budget: 0, security: -70, time: 0 }
            }
        ]
    },
    5: {
        title: "ЭТАП 5: ЭКСПЛУАТАЦИЯ И МОНИТОРИНГ",
        description: "Модель работает полгода. Вдруг резкий всплеск странных запросов и падение качества ответов.",
        options: [
            {
                text: "🛑 Думаем это DDoS, ставим защиту Cloudflare",
                result: "Защита стоит. Но запросы были не DDoS, а состязательные атаки. Модель уже отравлена.",
                threat: threatsAct5[0], // T5.1 Состязательные атаки
                effects: { budget: -10, security: -20, time: 0 }
            },
            {
                text: "🔎 Анализируем запросы вручную",
                result: "Потратили месяц на анализ. Поняли, что это промпт-инъекции. Но за месяц утекли данные клиентов.",
                threat: threatsAct5[1], // T5.2 Промпт-инъекции
                effects: { budget: -15, security: +30, time: +40 }
            },
            {
                text: "⛔ Временно отключаем API на неделю",
                result: "Безопасность спасена. Клиенты ушли к конкурентам. Бизнес рушится.",
                threat: null,
                effects: { budget: -30, security: +40, time: +20 }
            },
            {
                text: "🤖 Использовать 'Интеллектуальный аудитор'",
                result: "Ваш инструмент за 5 минут проанализировал трафик, нашел аномалии и предложил точечные меры защиты. Уязвимости устранены за день.",
                threat: null,
                effects: { budget: 0, security: +50, time: -20 }
            }
        ]
    },
    6: {
        title: "ЭТАП 6: ОБНОВЛЕНИЕ И ПЕРЕОБУЧЕНИЕ",
        description: "Прошел год. Нужно обновить модель на новых данных. Система автоматического обновления запущена.",
        options: [
            {
                text: "🔄 Автоматическое обновление",
                result: "Обновление прошло. Через месяц заметили, что модель стала хуже работать. Оказывается, система откатилась к старой уязвимой версии.",
                threat: threatsAct6[0], // T6.1 Откат к уязвимой версии
                effects: { budget: -5, security: -30, time: +10 }
            },
            {
                text: "👨‍💻 Ручное обновление с проверкой",
                result: "Обновляли месяц, всё проверили. Безопасно, но конкуренты уже выпустили новые фичи.",
                threat: null,
                effects: { budget: -10, security: +20, time: +30 }
            },
            {
                text: "🤖 Полуавтоматическое с мониторингом",
                result: "Настроили пайплайн. Через 2 недели заметили, что в процесс дообучения кто-то внедрил вредоносный код.",
                threat: threatsAct6[1], // T6.2 Компрометация пайплайна
                effects: { budget: -15, security: -40, time: +15 }
            },
            {
                text: "⏸️ Отложить обновление",
                result: "Модель устаревает. Клиенты жалуются на качество. Конкуренты переманивают пользователей.",
                threat: threatsAct6[2], // T6.3 Нарушение целостности
                effects: { budget: -20, security: -10, time: +20 }
            }
        ]
    }
};

// ===== ФУНКЦИИ ОБНОВЛЕНИЯ ИНТЕРФЕЙСА =====
function updateDisplay() {
    // Обновляем значения
    document.getElementById('budgetValue').textContent = gameState.budget + '%';
    document.getElementById('securityValue').textContent = gameState.security + '%';
    document.getElementById('timeValue').textContent = gameState.time + '%';
    
    // Обновляем полоски
    document.getElementById('budgetBar').style.width = gameState.budget + '%';
    document.getElementById('securityBar').style.width = gameState.security + '%';
    document.getElementById('timeBar').style.width = gameState.time + '%';
    
    // Обновляем прогресс
    const progressWidth = (gameState.act / 6) * 100;
    document.getElementById('progressFill').style.width = progressWidth + '%';
    document.getElementById('currentAct').textContent = `Акт ${gameState.act}/6`;
    
    // Обновляем название этапа
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
        showGameOver('⏱️ Время вышло. Конкуренты заняли рынок. Инвесторы ушли.');
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
            <p style="color: var(--text-muted); margin: 20px 0;">Согласно статистике диплома, 88.9% проектов сталкиваются с критическими уязвимостями на этапе валидации.</p>
            <button class="choice-btn" onclick="restartGame()" style="text-align: center;">🔄 Начать заново</button>
        </div>
    `;
    
    // Скрываем кнопки выбора
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
            <span class="threat-badge" style="font-size: 20px; padding: 10px 20px; border-color: var(--neon-green); color: var(--neon-green);">✅ ПРОЕКТ ЗАВЕРШЕН</span>
            
            <p style="margin: 25px 0 15px 0; font-size: 18px;">Вы прошли все 6 этапов жизненного цикла ИИ-системы.</p>
            
            <div style="background: var(--bg-tertiary); padding: 20px; border-radius: var(--radius-md); margin: 20px 0;">
                <h3 style="color: var(--neon-blue); margin-bottom: 15px;">📋 ОТЧЕТ ПО АУДИТУ</h3>
                <p style="margin: 10px 0;"><span class="highlight">Объект аудита:</span> Стартап NeuroGen</p>
                <p style="margin: 10px 0;"><span class="highlight">Уровень риска:</span> <span class="risk-${riskClass}">${riskLevel}</span></p>
                <p style="margin: 10px 0;"><span class="highlight">Выявлено угроз:</span> ${gameState.choices.length} (из 27 возможных)</p>
                <p style="margin: 10px 0;"><span class="highlight">Улик об инсайдере:</span> ${gameState.insiderClues}</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4 style="color: var(--neon-purple); margin-bottom: 10px;">📌 РЕКОМЕНДАЦИИ (Приложение Л)</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 10px 0;">✓ Внедрить непрерывный мониторинг (Таблица 2.1, п.3.3.3)</li>
                    <li style="margin: 10px 0;">✓ Провести повторный аудит через 3 месяца (параграф 2.1)</li>
                    <li style="margin: 10px 0;">✓ Обучить сотрудников основам AI security (ISO/IEC 42001)</li>
                    <li style="margin: 10px 0;">✓ Внедрить защиту от промпт-инъекций (OWASP LLM Top 10)</li>
                </ul>
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
    
    let threatsHtml = '';
    stats.threats.forEach(threat => {
        const riskClass = threat.risk === 'Критический' ? 'high' : (threat.risk === 'Высокий' ? 'high' : (threat.risk === 'Средний' ? 'medium' : 'low'));
        threatsHtml += `<span class="threat-badge ${riskClass}" onclick="showThreatDetails('${threat.id}')">${threat.id}</span>`;
    });
    
    let content = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px;">
                <span class="threat-badge" style="border-color: var(--neon-purple);">Этап ${gameState.act}/6</span>
                <span class="threat-badge diploma-ref">Таблица ${stats.table}</span>
                ${threatsHtml}
            </div>
            
            <h2 style="color: var(--neon-blue); margin: 15px 0;">${act.title}</h2>
            <p style="margin: 15px 0; line-height: 1.7;">${act.description}</p>
            
            <div style="background: var(--bg-tertiary); padding: 10px; border-radius: var(--radius-sm); margin: 15px 0; font-size: 13px;">
                <span style="color: var(--neon-yellow);">📊 Статистика диплома:</span> На этом этапе <strong>${stats.vulnerability}%</strong> проектов имеют уязвимости (параграф 3.3, рис. 3.4)
            </div>
            
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            
            <p style="font-weight: 600; color: var(--neon-green); margin-bottom: 15px;">⚡ ВЫБЕРИТЕ РЕШЕНИЕ:</p>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = content;
    
    // Обновляем кнопки
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
        threat: choice.threat
    });
    
    // Применяем эффекты
    gameState.budget += choice.effects.budget;
    gameState.security += choice.effects.security;
    gameState.time += choice.effects.time;
    
    // Ограничиваем значения
    gameState.budget = Math.min(100, Math.max(0, gameState.budget));
    gameState.security = Math.min(100, Math.max(0, gameState.security));
    gameState.time = Math.min(100, Math.max(0, gameState.time));
    
    updateDisplay();
    
    if (checkGameOver()) return;
    
    // Формируем результат
    let resultHtml = `
        <div style="margin-bottom: 20px;">
            <span class="threat-badge" style="border-color: var(--neon-orange);">Акт ${gameState.act} завершен</span>
            
            <h3 style="color: var(--neon-green); margin: 15px 0;">📌 РЕЗУЛЬТАТ</h3>
            <p style="margin: 15px 0; line-height: 1.7;">${choice.result}</p>
    `;
    
    if (choice.threat) {
        const riskClass = choice.threat.risk === 'Критический' ? 'high' : (choice.threat.risk === 'Высокий' ? 'high' : (choice.threat.risk === 'Средний' ? 'medium' : 'low'));
        resultHtml += `
            <div style="background: rgba(244,67,54,0.1); border-left: 3px solid var(--neon-red); padding: 15px; margin: 15px 0;">
                <span class="threat-badge ${riskClass}" style="margin-bottom: 10px;">⚠️ ${choice.threat.name}</span>
                <p style="margin: 10px 0; font-size: 14px;">${choice.threat.description}</p>
                <p style="margin: 5px 0; font-size: 12px; color: var(--text-muted);">
                    📚 ${choice.threat.table} | Риск: ${choice.threat.risk} | ID: ${choice.threat.id}
                </p>
            </div>
        `;
    }
    
    // Случайная улика об инсайдере (MITRE ATLAS)
    if (Math.random() > 0.6) {
        gameState.insiderClues++;
        resultHtml += `
            <div style="background: rgba(255,152,0,0.1); border-left: 3px solid var(--neon-orange); padding: 15px; margin: 15px 0;">
                <span class="threat-badge medium">🔍 УЛИКА (инсайдер)</span>
                <p style="margin: 10px 0; font-size: 14px;">
                    Вы заметили странность: кто-то имел доступ к данным до официального релиза. 
                    Это похоже на технику Supply Chain Compromise из MITRE ATLAS.
                </p>
            </div>
        `;
    }
    
    resultHtml += `
            <hr style="border-color: var(--border-color); margin: 20px 0;">
            
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
    const allThreats = [...threatsAct1, ...threatsAct2, ...threatsAct3, ...threatsAct4, ...threatsAct5, ...threatsAct6];
    
    let html = '<h3>📚 ПОЛНЫЙ СПИСОК УГРОЗ (Таблицы 1.1-1.6)</h3>';
    
    const stages = [
        { name: 'Сбор и подготовка данных', table: '1.1', threats: threatsAct1 },
        { name: 'Разработка и обучение', table: '1.2', threats: threatsAct2 },
        { name: 'Валидация и тестирование', table: '1.3', threats: threatsAct3 },
        { name: 'Развертывание', table: '1.4', threats: threatsAct4 },
        { name: 'Эксплуатация и мониторинг', table: '1.5', threats: threatsAct5 },
        { name: 'Обновление и переобучение', table: '1.6', threats: threatsAct6 }
    ];
    
    stages.forEach(stage => {
        html += `<h4 style="color: var(--neon-blue); margin: 20px 0 10px 0;">${stage.name} (Таблица ${stage.table})</h4>`;
        html += '<ul style="list-style: none; padding: 0;">';
        
        stage.threats.forEach(threat => {
            const riskClass = threat.risk === 'Критический' ? 'high' : (threat.risk === 'Высокий' ? 'high' : (threat.risk === 'Средний' ? 'medium' : 'low'));
            html += `
                <li style="margin: 10px 0; padding: 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <span class="threat-badge ${riskClass}" style="margin-right: 10px;">${threat.id}</span>
                    <strong>${threat.name}</strong>
                    <p style="margin: 5px 0 0 0; font-size: 13px; color: var(--text-secondary);">${threat.description}</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: var(--text-muted);">Риск: ${threat.risk} | ${threat.table}</p>
                </li>
            `;
        });
        
        html += '</ul>';
    });
    
    document.getElementById('modalTitle').textContent = 'Все угрозы из диплома';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

// ===== ПОКАЗАТЬ ДЕТАЛИ УГРОЗЫ =====
function showThreatDetails(threatId) {
    const allThreats = [...threatsAct1, ...threatsAct2, ...threatsAct3, ...threatsAct4, ...threatsAct5, ...threatsAct6];
    const threat = allThreats.find(t => t.id === threatId);
    
    if (!threat) return;
    
    const riskClass = threat.risk === 'Критический' ? 'high' : (threat.risk === 'Высокий' ? 'high' : (threat.risk === 'Средний' ? 'medium' : 'low'));
    
    const html = `
        <div style="padding: 10px;">
            <span class="threat-badge ${riskClass}" style="font-size: 16px; margin-bottom: 15px;">${threat.id}</span>
            <h3 style="color: var(--neon-blue); margin: 15px 0;">${threat.name}</h3>
            <p style="margin: 15px 0; line-height: 1.7;">${threat.description}</p>
            <div style="background: var(--bg-tertiary); padding: 15px; border-radius: var(--radius-sm); margin: 15px 0;">
                <p><span class="highlight">Таблица:</span> ${threat.table}</p>
                <p><span class="highlight">Риск:</span> <span class="risk-${riskClass}">${threat.risk}</span></p>
                <p><span class="highlight">Источник:</span> Дипломная работа Воробьевой А.А., МГЛУ, 2026</p>
            </div>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'Детали угрозы';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

// ===== ПОКАЗАТЬ ССЫЛКИ НА ДИПЛОМ =====
function showDiplomaLinks() {
    const html = `
        <div style="padding: 10px;">
            <h3 style="color: var(--neon-blue); margin-bottom: 20px;">📚 СВЯЗЬ С ДИПЛОМНОЙ РАБОТОЙ</h3>
            
            <div style="margin: 20px 0;">
                <p><span class="highlight">Автор:</span> Воробьева Александра Александровна</p>
                <p><span class="highlight">ВУЗ:</span> МГЛУ, Институт информационных наук</p>
                <p><span class="highlight">Кафедра:</span> Международной информационной безопасности</p>
                <p><span class="highlight">Год:</span> 2026</p>
            </div>
            
            <div style="background: var(--bg-tertiary); padding: 15px; border-radius: var(--radius-sm); margin: 20px 0;">
                <h4 style="color: var(--neon-purple); margin-bottom: 10px;">Соответствие диплому:</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 8px 0;">✓ <span class="highlight">6 актов</span> — 6 этапов жизненного цикла (Таблицы 1.1-1.6)</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">27 угроз</span> — все угрозы из таблиц 1.1-1.6</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">Проценты уязвимостей</span> — параграф 3.3, рисунок 3.4</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">STRIDE-AI</span> — классификация угроз (параграф 2.3)</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">MITRE ATLAS</span> — инсайдер (параграф 1.2)</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">Финальный отчет</span> — шаблон из параграфа 2.4</li>
                    <li style="margin: 8px 0;">✓ <span class="highlight">Рекомендации</span> — Приложение Л</li>
                </ul>
            </div>
            
            <p style="margin-top: 20px; color: var(--text-muted);">
                Полный текст диплома: <span class="highlight">github.com/aleksa-ai-cybersec/deepseek-audit-diploma</span>
            </p>
        </div>
    `;
    
    document.getElementById('modalTitle').textContent = 'О дипломной работе';
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

// ===== ПЕРЕЗАПУСК ИГРЫ =====
function restartGame() {
    gameState = {
        act: 1,
        budget: 65,
        security: 35,
        time: 75,
        choices: [],
        insiderClues: 0,
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

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
window.onload = function() {
    showAct();
    
    // Закрытие модального окна по клику вне его
    window.onclick = function(event) {
        const modal = document.getElementById('infoModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};
