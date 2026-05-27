// ============================================
// AI SECURITY SIMULATOR
// по методике аудита ИБ ИИ-систем
// МГЛУ, 2026 | Воробьева А.А.
// ============================================

// ===== ПЕРЕВОДЫ =====
const translations = {
    ru: {
        authorName: "Воробьева Александра Александровна",
        subtitle: "по методике аудита ИБ ИИ-систем",
        badgeYear: "МГЛУ, 2026",
        badgeAuthor: "Воробьева А.А.",
        university: "Московский государственный лингвистический университет",
        act: "АКТ",
        table: "ТАБЛИЦА",
        vulnerability: "УЯЗВИМОСТЬ",
        budget: "БЮДЖЕТ",
        security: "БЕЗОПАСНОСТЬ",
        time: "ВРЕМЯ",
        restart: "Начать заново",
        diplomaLink: "Связь с дипломом",
        allThreats: "Все 27 угроз",
        gameOver: "❌ ПРОЕКТ ПРОВАЛЕН",
        victory: "🏆 ПОБЕДА! NeuroGen УСПЕШНО ЗАВЕРШЕН! 🏆",
        finalReport: "📊 ИТОГОВЫЙ ОТЧЕТ ПО АУДИТУ",
        accuracy: "Точность",
        riskAssessment: "📋 ОЦЕНКА РИСКОВ ПО ДИПЛОМУ",
        riskLevel: "Уровень риска",
        correctAnswers: "Правильных ответов",
        threatsIdentified: "Угроз из диплома",
        recommendations: "Рекомендации",
        diplomaRef: "🎓 Дипломная работа Воробьевой А.А., МГЛУ, 2026",
        diplomaTopic: "Тема: Разработка методики аудита ИБ систем с ИИ",
        playAgain: "🏆 ПРОЙТИ ЗАНОВО 🏆",
        close: "Закрыть",
        aboutTitle: "О ДИПЛОМНОЙ РАБОТЕ",
        threatsTitle: "ВСЕ УГРОЗЫ",
        stats: "📊 СТАТИСТИКА",
        backToGame: "⬅️ НАЗАД К ИГРЕ",
        continue: "➡️ ПРОДОЛЖИТЬ",
        warningCorrect: "✓ Правильный выбор!",
        warningError: "✗ Ошибка! Анализируйте последствия.",
        low: "Низкий",
        medium: "Средний",
        high: "Высокий",
        threat: "УГРОЗА",
        methodology: "ПОЯСНЕНИЕ ПО МЕТОДИКЕ",
        resourceChanges: "ИЗМЕНЕНИЕ РЕСУРСОВ",
        correctChoice: "✓ ПРАВИЛЬНЫЙ ВЫБОР",
        wrongChoice: "✗ ОШИБКА",
        stage: "Этап",
        accordingTo: "По данным параграфа 3.3,",
        projectsHave: "проектов имеют уязвимости на этом этапе",
        diplomaReference: "СВЯЗЬ С ДИПЛОМОМ",
        chooseSolution: "ВЫБЕРИТЕ РЕШЕНИЕ",
        currentStage: "Текущий этап",
        gameOverMessages: {
            budget: "💰 Бюджет исчерпан. Стартап обанкротился.",
            security: "🔒 Критическая утечка данных. Компания закрыта.",
            timeTooHigh: "⏱️ Время вышло. Конкуренты заняли рынок.",
            timeTooLow: "⏱️ Слишком быстро! Качество пострадало."
        },
        allThreatsTable: "ВСЕ 27 УГРОЗ (ПО ТАБЛИЦАМ ДИПЛОМА)",
        totalThreats: "ВСЕГО: 27 УГРОЗ",
        diplomaCompliance: "СООТВЕТСТВИЕ ДИПЛОМУ:",
        tables: "Таблицы 1.1-1.6",
        section33: "Параграф 3.3",
        chapter2: "Глава 2",
        appendixL: "Приложение Л",
        gameComplies: "Игра полностью соответствует диплому!",
        closeModal: "Закрыть"
    },
    en: {
        authorName: "VOROBEVA ALEKSANDRA",
        subtitle: "according to the AI security audit methodology",
        badgeYear: "MSLU, 2026",
        badgeAuthor: "VOROBEVA A.A.",
        university: "Moscow State Linguistic University",
        act: "ACT",
        table: "TABLE",
        vulnerability: "VULNERABILITY",
        budget: "BUDGET",
        security: "SECURITY",
        time: "TIME",
        restart: "Restart",
        diplomaLink: "About Diploma",
        allThreats: "All 27 Threats",
        gameOver: "❌ PROJECT FAILED",
        victory: "🏆 VICTORY! NeuroGen SUCCESSFULLY COMPLETED! 🏆",
        finalReport: "📊 FINAL AUDIT REPORT",
        accuracy: "Accuracy",
        riskAssessment: "📋 RISK ASSESSMENT (Diploma)",
        riskLevel: "Risk Level",
        correctAnswers: "Correct answers",
        threatsIdentified: "Threats from diploma",
        recommendations: "Recommendations",
        diplomaRef: "🎓 Diploma: VOROBEVA ALEKSANDRA, MSLU, 2026",
        diplomaTopic: "Topic: AI Security Audit Methodology Development",
        playAgain: "🏆 PLAY AGAIN 🏆",
        close: "Close",
        aboutTitle: "ABOUT THE DIPLOMA",
        threatsTitle: "ALL THREATS",
        stats: "📊 STATISTICS",
        backToGame: "⬅️ BACK TO GAME",
        continue: "➡️ CONTINUE",
        warningCorrect: "✓ Correct choice!",
        warningError: "✗ Error! Analyze the consequences.",
        low: "Low",
        medium: "Medium",
        high: "High",
        threat: "THREAT",
        methodology: "METHODOLOGY EXPLANATION",
        resourceChanges: "RESOURCE CHANGES",
        correctChoice: "✓ CORRECT CHOICE",
        wrongChoice: "✗ WRONG CHOICE",
        stage: "Stage",
        accordingTo: "According to section 3.3,",
        projectsHave: "of projects have vulnerabilities at this stage",
        diplomaReference: "DIPLOMA REFERENCE",
        chooseSolution: "CHOOSE SOLUTION",
        currentStage: "Current stage",
        gameOverMessages: {
            budget: "💰 Budget exhausted. Startup bankrupt.",
            security: "🔒 Critical data breach. Company closed.",
            timeTooHigh: "⏱️ Time ran out. Competitors took the market.",
            timeTooLow: "⏱️ Too fast! Quality suffered."
        },
        allThreatsTable: "ALL 27 THREATS (DIPLOMA TABLES)",
        totalThreats: "TOTAL: 27 THREATS",
        diplomaCompliance: "DIPLOMA COMPLIANCE:",
        tables: "Tables 1.1-1.6",
        section33: "Section 3.3",
        chapter2: "Chapter 2",
        appendixL: "Appendix L",
        gameComplies: "The game fully complies with the diploma!",
        closeModal: "Close"
    },
    zh: {
        authorName: "VOROBEVA ALEKSANDRA",
        subtitle: "根据人工智能安全审计方法",
        badgeYear: "莫斯科国立语言大学，2026",
        badgeAuthor: "VOROBEVA A.A.",
        university: "莫斯科国立语言大学",
        act: "阶段",
        table: "表",
        vulnerability: "漏洞率",
        budget: "预算",
        security: "安全",
        time: "时间",
        restart: "重新开始",
        diplomaLink: "关于论文",
        allThreats: "全部27种威胁",
        gameOver: "❌ 项目失败",
        victory: "🏆 胜利！NeuroGen 成功完成！🏆",
        finalReport: "📊 最终审计报告",
        accuracy: "准确率",
        riskAssessment: "📋 风险评估（论文）",
        riskLevel: "风险等级",
        correctAnswers: "正确答案数",
        threatsIdentified: "论文中的威胁",
        recommendations: "建议",
        diplomaRef: "🎓 毕业论文：VOROBEVA ALEKSANDRA，莫斯科国立语言大学，2026",
        diplomaTopic: "主题：人工智能系统信息安全审计方法开发",
        playAgain: "🏆 再玩一次 🏆",
        close: "关闭",
        aboutTitle: "关于毕业论文",
        threatsTitle: "全部威胁",
        stats: "📊 统计",
        backToGame: "⬅️ 返回游戏",
        continue: "➡️ 继续",
        warningCorrect: "✓ 选择正确！",
        warningError: "✗ 错误！分析后果。",
        low: "低",
        medium: "中",
        high: "高",
        threat: "威胁",
        methodology: "方法说明",
        resourceChanges: "资源变化",
        correctChoice: "✓ 正确选择",
        wrongChoice: "✗ 错误选择",
        stage: "阶段",
        accordingTo: "根据第3.3节，",
        projectsHave: "的项目在此阶段存在漏洞",
        diplomaReference: "论文参考",
        chooseSolution: "选择解决方案",
        currentStage: "当前阶段",
        gameOverMessages: {
            budget: "💰 预算耗尽。创业公司破产。",
            security: "🔒 关键数据泄露。公司关闭。",
            timeTooHigh: "⏱️ 时间耗尽。竞争对手占领市场。",
            timeTooLow: "⏱️ 太快了！质量受损。"
        },
        allThreatsTable: "全部27种威胁（论文表格）",
        totalThreats: "总计：27种威胁",
        diplomaCompliance: "论文符合性：",
        tables: "表1.1-1.6",
        section33: "第3.3节",
        chapter2: "第2章",
        appendixL: "附录L",
        gameComplies: "游戏完全符合论文要求！",
        closeModal: "关闭"
    }
};

let currentLang = 'ru';

// ===== СОСТОЯНИЕ ИГРЫ =====
let gameState = {
    act: 1,
    budget: 70,
    security: 40,
    time: 60,
    correctChoices: 0,
    totalChoices: 0,
    gameOver: false,
    victory: false,
    history: [],
    gameOverMsg: ""
};

// ===== УГРОЗЫ (РИСКИ ИСПРАВЛЕНЫ ПО ТАБЛИЦЕ 3.2) =====
const threats = {
    t1: { id: "T1.1", nameRu: "Отравление данных", nameEn: "Data Poisoning", nameZh: "数据投毒", descRu: "Внесение искаженных данных в обучающую выборку", descEn: "Insertion of distorted data into the training set", descZh: "向训练集中插入扭曲数据", table: "1.1", risk: "Высокий" },
    t2: { id: "T1.4", nameRu: "Нарушение конфиденциальности", nameEn: "Privacy Violation", nameZh: "隐私侵犯", descRu: "Сбор данных без согласия субъектов", descEn: "Data collection without consent", descZh: "未经同意收集数据", table: "1.1", risk: "Высокий" },
    t3: { id: "T1.3", nameRu: "Ошибки разметки", nameEn: "Labeling Errors", nameZh: "标注错误", descRu: "Некачественная разметка данных", descEn: "Poor quality data labeling", descZh: "低质量数据标注", table: "1.1", risk: "Высокий" },
    t4: { id: "T2.1", nameRu: "Кража модели", nameEn: "Model Theft", nameZh: "模型盗窃", descRu: "Извлечение модели через API", descEn: "Model extraction via API", descZh: "通过API提取模型", table: "1.2", risk: "Критический" },
    t5: { id: "T2.3", nameRu: "Компрометация кода", nameEn: "Code Compromise", nameZh: "代码入侵", descRu: "Взлом серверов и внедрение бэкдоров", descEn: "Server hacking and backdoor injection", descZh: "服务器黑客攻击和后门注入", table: "1.2", risk: "Критический" },
    t6: { id: "T3.1", nameRu: "Подмена тестовых данных", nameEn: "Test Data Replacement", nameZh: "测试数据替换", descRu: "Манипуляция с тестовой выборкой", descEn: "Test set manipulation", descZh: "测试集操纵", table: "1.3", risk: "Критический" },
    t7: { id: "T3.3", nameRu: "Скрытые уязвимости", nameEn: "Hidden Vulnerabilities", nameZh: "隐藏漏洞", descRu: "Непроверенные сценарии работы модели", descEn: "Untested model scenarios", descZh: "未测试的模型场景", table: "1.3", risk: "Критический" },
    t8: { id: "T4.1", nameRu: "Подмена модели", nameEn: "Model Replacement", nameZh: "模型替换", descRu: "Замена легитимной модели на вредоносную", descEn: "Replacing legitimate model with malicious one", descZh: "用恶意模型替换合法模型", table: "1.4", risk: "Критический" },
    t9: { id: "T4.2", nameRu: "Небезопасный API", nameEn: "Insecure API", nameZh: "不安全API", descRu: "Отсутствие защиты API от атак", descEn: "Lack of API protection", descZh: "缺乏API保护", table: "1.4", risk: "Высокий" },
    t10: { id: "T5.1", nameRu: "Состязательные атаки", nameEn: "Adversarial Attacks", nameZh: "对抗攻击", descRu: "Специально сформированные входные данные", descEn: "Specially crafted input data", descZh: "特制输入数据", table: "1.5", risk: "Высокий" },
    t11: { id: "T5.2", nameRu: "Промпт-инъекции", nameEn: "Prompt Injections", nameZh: "提示注入", descRu: "Обход инструкций модели", descEn: "Bypassing model instructions", descZh: "绕过模型指令", table: "1.5", risk: "Низкий" },
    t12: { id: "T6.1", nameRu: "Откат к уязвимой версии", nameEn: "Rollback to Vulnerable Version", nameZh: "回滚到有漏洞版本", descRu: "Возврат к старой версии с уязвимостями", descEn: "Reverting to old vulnerable version", descZh: "回滚到旧的有漏洞版本", table: "1.6", risk: "Критический" },
    t13: { id: "T6.2", nameRu: "Компрометация пайплайна", nameEn: "Pipeline Compromise", nameZh: "流水线入侵", descRu: "Внедрение вредоносного кода в обновление", descEn: "Malicious code injection into update", descZh: "向更新中注入恶意代码", table: "1.6", risk: "Критический" }
};

function getThreatName(threat) {
    if (currentLang === 'ru') return threat.nameRu;
    if (currentLang === 'en') return threat.nameEn;
    return threat.nameZh;
}

function getThreatDesc(threat) {
    if (currentLang === 'ru') return threat.descRu;
    if (currentLang === 'en') return threat.descEn;
    return threat.descZh;
}

function getRiskText(risk) {
    if (currentLang === 'ru') return risk;
    if (currentLang === 'en') {
        if (risk === 'Критический') return 'Critical';
        if (risk === 'Высокий') return 'High';
        if (risk === 'Средний') return 'Medium';
        if (risk === 'Низкий') return 'Low';
        return risk;
    }
    if (currentLang === 'zh') {
        if (risk === 'Критический') return '严重';
        if (risk === 'Высокий') return '高危';
        if (risk === 'Средний') return '中危';
        if (risk === 'Низкий') return '低危';
        return risk;
    }
    return risk;
}

// ===== СТАТИСТИКА ЭТАПОВ =====
const actStats = {
    1: { nameRu: "Сбор данных", nameEn: "Data Collection", nameZh: "数据收集", vulnerability: "33.3%", table: "1.1", color: "#ff9f1c" },
    2: { nameRu: "Обучение", nameEn: "Training", nameZh: "训练", vulnerability: "71.4%", table: "1.2", color: "#ff6b1c" },
    3: { nameRu: "Тестирование", nameEn: "Testing", nameZh: "测试", vulnerability: "88.9%", table: "1.3", color: "#ff3b3b" },
    4: { nameRu: "Запуск", nameEn: "Deployment", nameZh: "部署", vulnerability: "66.7%", table: "1.4", color: "#ff9f1c" },
    5: { nameRu: "Эксплуатация", nameEn: "Operation", nameZh: "运行", vulnerability: "12.9%", table: "1.5", color: "#00ff9d" },
    6: { nameRu: "Обновление", nameEn: "Update", nameZh: "更新", vulnerability: "77.8%", table: "1.6", color: "#ff6b1c" }
};

function getActName(actNum) {
    const stats = actStats[actNum];
    if (!stats) return "";
    if (currentLang === 'ru') return stats.nameRu;
    if (currentLang === 'en') return stats.nameEn;
    return stats.nameZh;
}

// ===== СЦЕНАРИИ ЭТАПОВ =====
const acts = {
    1: {
        titleRu: "ЭТАП 1: СБОР И ПОДГОТОВКА ДАННЫХ",
        titleEn: "STAGE 1: DATA COLLECTION",
        titleZh: "阶段 1：数据收集与准备",
        descRu: "NeuroGen разрабатывает ИИ для банка. Где взять данные для обучения?",
        descEn: "NeuroGen is developing AI for a bank. Where to get training data?",
        descZh: "NeuroGen正在为银行开发AI。从哪里获取训练数据？",
        options: [
            { id: 1, textRu: "💰 Аккредитованный поставщик", textEn: "💰 Accredited vendor", textZh: "💰 认证数据供应商", correct: true, threat: null,
              resultRu: "Поставщик предоставил сертификат качества и лицензию. Данные чистые и легальные.",
              resultEn: "The vendor provided quality certificate and license. Data is clean and legal.",
              resultZh: "供应商提供了质量证书和许可证。数据干净合法。",
              explainRu: "✓ ПРАВИЛЬНО! Аккредитованный поставщик гарантирует качество и легальность данных.",
              explainEn: "✓ CORRECT! An accredited vendor guarantees data quality and legality.",
              explainZh: "✓ 正确！认证供应商保证数据质量和合法性。",
              effects: { budget: -10, security: +5, time: +5 } },
            { id: 2, textRu: "🌐 Открытые источники", textEn: "🌐 Open sources", textZh: "🌐 公开数据源", correct: false, threat: threats.t2,
              resultRu: "Юристы нашли персональные данные клиентов. Грозят многомиллионные штрафы!",
              resultEn: "Lawyers found personal client data. Multimillion-dollar fines!",
              resultZh: "律师发现了客户个人数据。面临数百万罚款！",
              explainRu: "✗ ОШИБКА! Нарушение конфиденциальности (T1.4).",
              explainEn: "✗ ERROR! Privacy violation (T1.4).",
              explainZh: "✗ 错误！隐私侵犯 (T1.4)。",
              effects: { budget: -15, security: -15, time: +10 } },
            { id: 3, textRu: "👥 Фрилансеры", textEn: "👥 Freelancers", textZh: "👥 众包标注", correct: false, threat: threats.t3,
              resultRu: "Качество разметки ужасное (40% ошибок). Часть данных утекла.",
              resultEn: "Poor labeling quality (40% errors). Data leaked.",
              resultZh: "标注质量差（40%错误）。数据泄露。",
              explainRu: "✗ ОШИБКА! Ошибки разметки (T1.3).",
              explainEn: "✗ ERROR! Labeling errors (T1.3).",
              explainZh: "✗ 错误！标注错误 (T1.3)。",
              effects: { budget: -5, security: -10, time: +15 } },
            { id: 4, textRu: "🤖 Синтетические данные", textEn: "🤖 Synthetic data", textZh: "🤖 合成数据", correct: false, threat: null,
              resultRu: "Данные безопасны, но модель не работает в реальности.",
              resultEn: "Data is safe, but model fails in reality.",
              resultZh: "数据安全，但模型在现实中失效。",
              explainRu: "✗ ОШИБКА! Отрыв от реальности.",
              explainEn: "✗ ERROR! Disconnected from reality.",
              explainZh: "✗ 错误！脱离现实。",
              effects: { budget: -20, security: +10, time: +20 } }
        ]
    },
    2: {
        titleRu: "ЭТАП 2: РАЗРАБОТКА И ОБУЧЕНИЕ",
        titleEn: "STAGE 2: DEVELOPMENT & TRAINING",
        titleZh: "阶段 2：开发与训练",
        descRu: "Данные готовы. Где развернуть обучение модели?",
        descEn: "Data is ready. Where to deploy model training?",
        descZh: "数据已准备就绪。在哪里部署模型训练？",
        options: [
            { id: 1, textRu: "☁️ AWS Enterprise", textEn: "☁️ AWS Enterprise", textZh: "☁️ AWS 企业版", correct: true, threat: null,
              resultRu: "AWS предоставляет сертификацию ISO 27001. Инфраструктура защищена.",
              resultEn: "AWS provides ISO 27001 certification. Infrastructure is secure.",
              resultZh: "AWS提供ISO 27001认证。基础设施安全。",
              explainRu: "✓ ПРАВИЛЬНО! AWS Enterprise с ISO 27001 обеспечивает базовую защиту.",
              explainEn: "✓ CORRECT! AWS Enterprise with ISO 27001 provides basic protection.",
              explainZh: "✓ 正确！具有ISO 27001的AWS企业版提供基本保护。",
              effects: { budget: -20, security: +10, time: 0 } },
            { id: 2, textRu: "🟢 Google Cloud", textEn: "🟢 Google Cloud", textZh: "🟢 谷歌云", correct: false, threat: threats.t4,
              resultRu: "Google может использовать ваши данные для обучения своих моделей.",
              resultEn: "Google may use your data to train their models.",
              resultZh: "谷歌可能使用您的数据训练其模型。",
              explainRu: "✗ ОШИБКА! Риск кражи модели (T2.1).",
              explainEn: "✗ ERROR! Model theft risk (T2.1).",
              explainZh: "✗ 错误！模型盗窃风险 (T2.1)。",
              effects: { budget: -10, security: -15, time: +5 } },
            { id: 3, textRu: "🏢 Свои сервера", textEn: "🏢 Own servers", textZh: "🏢 本地服务器", correct: false, threat: threats.t5,
              resultRu: "Сервера взломали. Код обучения скомпрометирован.",
              resultEn: "Servers hacked. Training code compromised.",
              resultZh: "服务器被入侵。训练代码被篡改。",
              explainRu: "✗ ОШИБКА! Компрометация кода (T2.3).",
              explainEn: "✗ ERROR! Code compromise (T2.3).",
              explainZh: "✗ 错误！代码入侵 (T2.3)。",
              effects: { budget: -5, security: -25, time: +20 } },
            { id: 4, textRu: "🐉 Китайское облако", textEn: "🐉 Chinese Cloud", textZh: "🐉 国内云平台", correct: false, threat: threats.t4,
              resultRu: "По местным законам все данные передаются властям. Модель скопирована.",
              resultEn: "By local laws, all data is transferred to authorities. Model copied.",
              resultZh: "根据当地法律，所有数据移交当局。模型被复制。",
              explainRu: "✗ ОШИБКА! Кража модели (T2.1).",
              explainEn: "✗ ERROR! Model theft (T2.1).",
              explainZh: "✗ 错误！模型盗窃 (T2.1)。",
              effects: { budget: -5, security: -30, time: 0 } }
        ]
    },
    3: {
        titleRu: "ЭТАП 3: ВАЛИДАЦИЯ И ТЕСТИРОВАНИЕ",
        titleEn: "STAGE 3: VALIDATION & TESTING",
        titleZh: "阶段 3：验证与测试",
        descRu: "Тестировщики нашли странные аномалии. Ваши действия?",
        descEn: "Testers found strange anomalies. Your actions?",
        descZh: "测试人员发现异常。您的行动？",
        options: [
            { id: 1, textRu: "🔍 Полное тестирование", textEn: "🔍 Full testing", textZh: "🔍 全面测试", correct: false, threat: null,
              resultRu: "Потратили месяц, нашли 5 багов, но конкуренты выпустили продукт раньше.",
              resultEn: "Spent a month, found 5 bugs, but competitors launched earlier.",
              resultZh: "耗时一个月，发现5个bug，但竞争对手提前发布。",
              explainRu: "✗ НЕ ОПТИМАЛЬНО! Бизнес-риски важны. Нужен баланс.",
              explainEn: "✗ NOT OPTIMAL! Business risks matter. Need balance.",
              explainZh: "✗ 不理想！业务风险重要。需要平衡。",
              effects: { budget: -10, security: +15, time: +15 } },
            { id: 2, textRu: "🚀 Выпустить сейчас", textEn: "🚀 Launch now", textZh: "🚀 立即发布", correct: false, threat: threats.t6,
              resultRu: "Модель в продакшне. Через день — критический сбой!",
              resultEn: "Model in production. Next day — critical failure!",
              resultZh: "模型上线。次日——严重故障！",
              explainRu: "✗ ОШИБКА! Подмена тестовых данных (T3.1).",
              explainEn: "✗ ERROR! Test data replacement (T3.1).",
              explainZh: "✗ 错误！测试数据替换 (T3.1)。",
              effects: { budget: -5, security: -30, time: -5 } },
            { id: 3, textRu: "⚖️ Только критичное", textEn: "⚖️ Only critical", textZh: "⚖️ 仅关键测试", correct: false, threat: threats.t7,
              resultRu: "Часть багов пропустили. Они вылезут в самый неподходящий момент.",
              resultEn: "Some bugs were missed. They'll surface at the worst time.",
              resultZh: "遗漏部分bug。它们会在最糟时出现。",
              explainRu: "✗ ОШИБКА! Скрытые уязвимости (T3.3).",
              explainEn: "✗ ERROR! Hidden vulnerabilities (T3.3).",
              explainZh: "✗ 错误！隐藏漏洞 (T3.3)。",
              effects: { budget: -5, security: -15, time: +5 } },
            { id: 4, textRu: "🔬 Нанять аудиторов", textEn: "🔬 Hire auditors", textZh: "🔬 聘请审计团队", correct: true, threat: null,
              resultRu: "Аудиторы нашли 10 уязвимостей! Модель доработана и безопасна.",
              resultEn: "Auditors found 10 vulnerabilities! Model is refined and secure.",
              resultZh: "审计团队发现10个漏洞！模型已优化且安全。",
              explainRu: "✓ ПРАВИЛЬНО! Независимый аудит — золотой стандарт.",
              explainEn: "✓ CORRECT! Independent audit is the gold standard.",
              explainZh: "✓ 正确！独立审计是黄金标准。",
              effects: { budget: -15, security: +25, time: +10 } }
        ]
    },
    4: {
        titleRu: "ЭТАП 4: РАЗВЕРТЫВАНИЕ",
        titleEn: "STAGE 4: DEPLOYMENT",
        titleZh: "阶段 4：部署",
        descRu: "Модель в продакшне. Система мониторинга показывает подозрительную активность.",
        descEn: "Model in production. Monitoring shows suspicious activity.",
        descZh: "模型已上线。监控显示可疑活动。",
        options: [
            { id: 1, textRu: "🛡️ Rate limiting", textEn: "🛡️ Rate limiting", textZh: "🛡️ 请求限流", correct: false, threat: threats.t9,
              resultRu: "Простые атаки отсекли, но сложные продолжаются.",
              resultEn: "Simple attacks blocked, but complex ones continue.",
              resultZh: "简单攻击被阻止，复杂攻击持续。",
              explainRu: "✗ НЕДОСТАТОЧНО! Rate limiting не защищает от кражи модели.",
              explainEn: "✗ INSUFFICIENT! Rate limiting doesn't prevent model theft.",
              explainZh: "✗ 不足！限流不能防止模型盗窃。",
              effects: { budget: -5, security: +5, time: 0 } },
            { id: 2, textRu: "📊 Мониторинг паттернов", textEn: "📊 Pattern monitoring", textZh: "📊 异常行为监控", correct: true, threat: null,
              resultRu: "Система выявила попытку кражи модели через API. Атака заблокирована!",
              resultEn: "System detected model theft attempt via API. Attack blocked!",
              resultZh: "系统检测到API模型盗窃企图。攻击被阻止！",
              explainRu: "✓ ПРАВИЛЬНО! Проактивный мониторинг — ключ к обнаружению атак.",
              explainEn: "✓ CORRECT! Proactive monitoring is key to detecting attacks.",
              explainZh: "✓ 正确！主动监控是检测攻击的关键。",
              effects: { budget: -10, security: +20, time: +5 } },
            { id: 3, textRu: "🔄 Переделать API", textEn: "🔄 Redesign API", textZh: "🔄 重新设计API", correct: false, threat: null,
              resultRu: "2 месяца разработки. Клиенты ушли к конкурентам.",
              resultEn: "2 months of development. Clients left to competitors.",
              resultZh: "开发2个月。客户流失给竞争对手。",
              explainRu: "✗ ОШИБКА! Радикальные меры без анализа — путь к провалу.",
              explainEn: "✗ ERROR! Radical measures without analysis lead to failure.",
              explainZh: "✗ 错误！未经分析的激进措施导致失败。",
              effects: { budget: -25, security: +30, time: +25 } },
            { id: 4, textRu: "⏸️ Игнорировать", textEn: "⏸️ Ignore", textZh: "⏸️ 忽略", correct: false, threat: threats.t8,
              resultRu: "Через месяц модель скопирована и продаётся конкурентами.",
              resultEn: "A month later, the model is copied and sold by competitors.",
              resultZh: "一个月后，模型被竞争对手复制并出售。",
              explainRu: "✗ КРИТИЧЕСКАЯ ОШИБКА! Подмена модели (T4.1).",
              explainEn: "✗ CRITICAL ERROR! Model replacement (T4.1).",
              explainZh: "✗ 严重错误！模型替换 (T4.1)。",
              effects: { budget: 0, security: -40, time: 0 } }
        ]
    },
    5: {
        titleRu: "ЭТАП 5: ЭКСПЛУАТАЦИЯ",
        titleEn: "STAGE 5: OPERATION",
        titleZh: "阶段 5：运行",
        descRu: "Резкий всплеск странных запросов и падение качества ответов. Что делать?",
        descEn: "Sharp spike in strange queries and drop in response quality. What to do?",
        descZh: "异常查询激增，响应质量下降。怎么办？",
        options: [
            { id: 1, textRu: "🛑 DDoS-защита", textEn: "🛑 DDoS protection", textZh: "🛑 DDoS防护", correct: false, threat: threats.t10,
              resultRu: "Это были не DDoS, а состязательные атаки. Время упущено.",
              resultEn: "It wasn't DDoS, but adversarial attacks. Time lost.",
              resultZh: "不是DDoS，是对抗攻击。时间浪费。",
              explainRu: "✗ ОШИБКА! Состязательные атаки (T5.1).",
              explainEn: "✗ ERROR! Adversarial attacks (T5.1).",
              explainZh: "✗ 错误！对抗攻击 (T5.1)。",
              effects: { budget: -10, security: -10, time: +5 } },
            { id: 2, textRu: "🔎 Ручной анализ", textEn: "🔎 Manual analysis", textZh: "🔎 手动分析", correct: false, threat: threats.t11,
              resultRu: "Месяц анализа. За это время утекли данные клиентов.",
              resultEn: "A month of analysis. Client data leaked.",
              resultZh: "分析一个月。期间客户数据泄露。",
              explainRu: "✗ ОШИБКА! Промпт-инъекции (T5.2).",
              explainEn: "✗ ERROR! Prompt injections (T5.2).",
              explainZh: "✗ 错误！提示注入 (T5.2)。",
              effects: { budget: -10, security: +15, time: +25 } },
            { id: 3, textRu: "⛔ Отключить API", textEn: "⛔ Disable API", textZh: "⛔ 禁用API", correct: false, threat: null,
              resultRu: "Безопасность спасена. Но и бизнес тоже — клиенты ушли.",
              resultEn: "Security saved. But so is business — clients left.",
              resultZh: "安全保住。但业务也完了——客户流失。",
              explainRu: "✗ ОШИБКА! Отключение сервиса — крайняя мера.",
              explainEn: "✗ ERROR! Disabling service is a last resort.",
              explainZh: "✗ 错误！禁用服务是最后手段。",
              effects: { budget: -20, security: +30, time: +15 } },
            { id: 4, textRu: "🤖 Интеллектуальный аудитор", textEn: "🤖 Intelligent Auditor", textZh: "🤖 智能审计系统", correct: true, threat: null,
              resultRu: "Ваш инструмент за 5 минут нашёл промпт-инъекции и заблокировал атаку!",
              resultEn: "Your tool found prompt injections in 5 minutes and blocked the attack!",
              resultZh: "您的工具5分钟内发现提示注入并阻止攻击！",
              explainRu: "✓ ПРАВИЛЬНО! Дипломная работа в действии — автоматизация спасает бизнес.",
              explainEn: "✓ CORRECT! Diploma work in action — automation saves business.",
              explainZh: "✓ 正确！论文成果在行动——自动化拯救业务。",
              effects: { budget: 0, security: +35, time: -10 } }
        ]
    },
    6: {
        titleRu: "ЭТАП 6: ОБНОВЛЕНИЕ",
        titleEn: "STAGE 6: UPDATE",
        titleZh: "阶段 6：更新",
        descRu: "Прошел год. Нужно обновить модель. Как организовать процесс?",
        descEn: "A year has passed. Need to update the model. How to organize the process?",
        descZh: "一年过去。需要更新模型。如何组织流程？",
        options: [
            { id: 1, textRu: "🔄 Полностью автоматически", textEn: "🔄 Fully automatic", textZh: "🔄 全自动更新", correct: false, threat: threats.t12,
              resultRu: "Система откатилась к старой уязвимой версии.",
              resultEn: "System rolled back to old vulnerable version.",
              resultZh: "系统回滚到旧的有漏洞版本。",
              explainRu: "✗ ОШИБКА! Откат к уязвимой версии (T6.1).",
              explainEn: "✗ ERROR! Rollback to vulnerable version (T6.1).",
              explainZh: "✗ 错误！回滚到有漏洞版本 (T6.1)。",
              effects: { budget: -5, security: -20, time: +5 } },
            { id: 2, textRu: "👨‍💻 Ручная проверка", textEn: "👨‍💻 Manual verification", textZh: "👨‍💻 人工审核", correct: true, threat: null,
              resultRu: "Каждая версия проверена, целостность подтверждена. Обновление успешно!",
              resultEn: "Each version verified, integrity confirmed. Update successful!",
              resultZh: "每个版本已验证，完整性确认。更新成功！",
              explainRu: "✓ ПРАВИЛЬНО! Контроль целостности — основа безопасности MLOps.",
              explainEn: "✓ CORRECT! Integrity control is the foundation of MLOps security.",
              explainZh: "✓ 正确！完整性控制是MLOps安全基础。",
              effects: { budget: -5, security: +15, time: +15 } },
            { id: 3, textRu: "🤖 Полуавтомат", textEn: "🤖 Semi-automatic", textZh: "🤖 半自动更新", correct: false, threat: threats.t13,
              resultRu: "В пайплайн внедрили вредоносный код. Модель отравлена.",
              resultEn: "Malicious code injected into pipeline. Model poisoned.",
              resultZh: "恶意代码注入流水线。模型被投毒。",
              explainRu: "✗ ОШИБКА! Компрометация пайплайна (T6.2).",
              explainEn: "✗ ERROR! Pipeline compromise (T6.2).",
              explainZh: "✗ 错误！流水线入侵 (T6.2)。",
              effects: { budget: -10, security: -25, time: +10 } },
            { id: 4, textRu: "⏸️ Отложить", textEn: "⏸️ Postpone", textZh: "⏸️ 推迟", correct: false, threat: null,
              resultRu: "Модель устарела. Клиенты уходят к конкурентам.",
              resultEn: "Model outdated. Clients leave to competitors.",
              resultZh: "模型过时。客户流失给竞争对手。",
              explainRu: "✗ ОШИБКА! Технологическое отставание убивает бизнес.",
              explainEn: "✗ ERROR! Technological lag kills business.",
              explainZh: "✗ 错误！技术落后扼杀业务。",
              effects: { budget: -15, security: -5, time: +20 } }
        ]
    }
};

function getActTitle(act) {
    const a = acts[act];
    if (!a) return "";
    if (currentLang === 'ru') return a.titleRu;
    if (currentLang === 'en') return a.titleEn;
    return a.titleZh;
}

function getActDesc(act) {
    const a = acts[act];
    if (!a) return "";
    if (currentLang === 'ru') return a.descRu;
    if (currentLang === 'en') return a.descEn;
    return a.descZh;
}

function getOptionText(opt) {
    if (currentLang === 'ru') return opt.textRu;
    if (currentLang === 'en') return opt.textEn;
    return opt.textZh;
}

function getOptionResult(opt) {
    if (currentLang === 'ru') return opt.resultRu;
    if (currentLang === 'en') return opt.resultEn;
    return opt.resultZh;
}

function getOptionExplain(opt) {
    if (currentLang === 'ru') return opt.explainRu;
    if (currentLang === 'en') return opt.explainEn;
    return opt.explainZh;
}

// ===== ФУНКЦИИ ИНТЕРФЕЙСА =====
function updateAllStaticTexts() {
    // Шапка
    const subtitleText = document.getElementById('subtitleText');
    const badgeYear = document.getElementById('badgeYear');
    const badgeAuthor = document.getElementById('badgeAuthor');
    if (subtitleText) subtitleText.textContent = translations[currentLang].subtitle;
    if (badgeYear) badgeYear.textContent = translations[currentLang].badgeYear;
    if (badgeAuthor) badgeAuthor.textContent = translations[currentLang].badgeAuthor;
    
    // Ресурсы
    const budgetLabel = document.getElementById('budgetLabel');
    const securityLabel = document.getElementById('securityLabel');
    const timeLabel = document.getElementById('timeLabel');
    if (budgetLabel) budgetLabel.textContent = translations[currentLang].budget;
    if (securityLabel) securityLabel.textContent = translations[currentLang].security;
    if (timeLabel) timeLabel.textContent = translations[currentLang].time;
    
    // Кнопки управления
    const restartBtnText = document.getElementById('restartBtnText');
    const diplomaBtnText = document.getElementById('diplomaBtnText');
    const threatsBtnText = document.getElementById('threatsBtnText');
    if (restartBtnText) restartBtnText.textContent = translations[currentLang].restart;
    if (diplomaBtnText) diplomaBtnText.textContent = translations[currentLang].diplomaLink;
    if (threatsBtnText) threatsBtnText.textContent = translations[currentLang].allThreats;
    
    // Подвал
    const authorNameSpan = document.getElementById('authorName');
    const universityName = document.getElementById('universityName');
    if (authorNameSpan) authorNameSpan.textContent = translations[currentLang].authorName;
    if (universityName) universityName.textContent = translations[currentLang].university;
    
    const footerDiplomaLink = document.getElementById('footerDiplomaLink');
    const footerThreatsLink = document.getElementById('footerThreatsLink');
    if (footerDiplomaLink) footerDiplomaLink.textContent = translations[currentLang].diplomaLink;
    if (footerThreatsLink) footerThreatsLink.textContent = translations[currentLang].allThreats;
    
    // Модальное окно
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalCloseBtn) modalCloseBtn.textContent = translations[currentLang].close;
    
    // Кнопка закрытия в модальном окне
    const closeModalBtn = document.getElementById('modalCloseBtn');
    if (closeModalBtn) closeModalBtn.textContent = translations[currentLang].close;
}

function updateDisplay() {
    document.getElementById('budgetValue').textContent = gameState.budget + '%';
    document.getElementById('securityValue').textContent = gameState.security + '%';
    document.getElementById('timeValue').textContent = gameState.time + '%';
    document.getElementById('budgetBar').style.width = gameState.budget + '%';
    document.getElementById('securityBar').style.width = gameState.security + '%';
    document.getElementById('timeBar').style.width = gameState.time + '%';
    
    document.getElementById('progressFill').style.width = ((gameState.act - 1) * 16.66) + '%';
    document.getElementById('currentAct').textContent = `${translations[currentLang].act} ${gameState.act}/6`;
    
    if (actStats[gameState.act]) {
        document.getElementById('actName').textContent = getActName(gameState.act);
        document.getElementById('actStats').innerHTML = `${translations[currentLang].table} ${actStats[gameState.act].table} | <span style="color:${actStats[gameState.act].color};">${translations[currentLang].vulnerability}: ${actStats[gameState.act].vulnerability}</span>`;
    }
}

function setLanguage(lang) {
    currentLang = lang;
    updateAllStaticTexts();
    updateDisplay();
    
    if (!gameState.gameOver && !gameState.victory && gameState.act <= 6) {
        showAct();
    } else if (gameState.victory) {
        showVictory();
    } else if (gameState.gameOver) {
        showGameOver(gameState.gameOverMsg);
    }
    
    const modal = document.getElementById('infoModal');
    if (modal && modal.style.display === 'flex') {
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle && (modalTitle.textContent === translations.ru.aboutTitle || 
            modalTitle.textContent === translations.en.aboutTitle ||
            modalTitle.textContent === translations.zh.aboutTitle)) {
            showDiplomaLinks();
        } else if (modalTitle && (modalTitle.textContent === translations.ru.threatsTitle ||
            modalTitle.textContent === translations.en.threatsTitle ||
            modalTitle.textContent === translations.zh.threatsTitle)) {
            showAllThreats();
        }
    }
}

function showAct() {
    if (gameState.gameOver || gameState.victory) return;
    if (gameState.act > 6) {
        showVictory();
        return;
    }
    
    const act = acts[gameState.act];
    const stats = actStats[gameState.act];
    
    let html = `
        <div style="margin-bottom:20px;">
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">${translations[currentLang].act} ${gameState.act}/6</span>
                <span style="border:2px solid #9d4edd; color:#9d4edd; padding:5px 15px; border-radius:25px; font-weight:bold;">${translations[currentLang].table} ${stats.table}</span>
                <span style="border:2px solid ${stats.color}; color:${stats.color}; padding:5px 15px; border-radius:25px; font-weight:bold;">${translations[currentLang].vulnerability}: ${stats.vulnerability}</span>
            </div>
            
            <h2 style="color:#00f3ff; font-size:26px; margin:20px 0; text-shadow:0 0 10px #00f3ff;">${getActTitle(gameState.act)}</h2>
            
            <div style="background:#1a1a26; padding:20px; border-radius:15px; margin:20px 0; border-left:4px solid #00f3ff;">
                <p style="margin:0; line-height:1.8; font-size:16px;">${getActDesc(gameState.act)}</p>
            </div>
            
            <div style="background:linear-gradient(135deg,#2a1a3a,#1a1a2a); padding:20px; border-radius:15px; margin:20px 0; border:2px solid #9d4edd;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <span style="font-size:24px;">📊</span>
                    <span style="color:#ffff3b; font-weight:bold; font-size:18px;">${translations[currentLang].diplomaReference}:</span>
                </div>
                <p style="margin:5px 0; color:#a0a0b0;">${translations[currentLang].stage}: <span style="color:#00ff9d;">${getActName(gameState.act)}</span> (${translations[currentLang].table} ${stats.table})</p>
                <p style="margin:5px 0; color:#a0a0b0;">${translations[currentLang].accordingTo} <span style="color:${stats.color};">${stats.vulnerability}</span> ${translations[currentLang].projectsHave}</p>
            </div>
            
            <hr style="border-color:#2a2a3a; margin:25px 0;">
            <p style="color:#00ff9d; font-weight:bold; font-size:18px; margin-bottom:20px;">⚡ ${translations[currentLang].chooseSolution}</p>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = html;
    
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`choice${i+1}`);
        if (act.options[i]) {
            btn.textContent = getOptionText(act.options[i]);
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
    
    const act = acts[gameState.act];
    const choice = act.options[num-1];
    if (!choice) return;
    
    gameState.totalChoices++;
    if (choice.correct) {
        gameState.correctChoices++;
        showWarning(translations[currentLang].warningCorrect, 'success');
    } else {
        showWarning(translations[currentLang].warningError, 'danger');
    }
    
    gameState.budget = Math.min(100, Math.max(0, gameState.budget + (choice.effects.budget || 0)));
    gameState.security = Math.min(100, Math.max(0, gameState.security + (choice.effects.security || 0)));
    gameState.time = Math.min(100, Math.max(0, gameState.time + (choice.effects.time || 0)));
    
    gameState.history.push({
        act: gameState.act,
        choice: num,
        correct: choice.correct,
        threat: choice.threat
    });
    
    updateDisplay();
    
    if (checkGameOver()) return;
    
    let threatHtml = '';
    if (choice.threat) {
        threatHtml = `
            <div style="background:#2a1a1a; padding:15px; border-left:4px solid #ff3b3b; margin:15px 0; border-radius:5px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <span style="font-size:24px;">⚠️</span>
                    <span style="color:#ff3b3b; font-weight:bold; font-size:18px;">${translations[currentLang].threat}: ${getThreatName(choice.threat)}</span>
                </div>
                <p style="margin:10px 0; color:#a0a0b0;">${getThreatDesc(choice.threat)}</p>
                <p style="margin:5px 0; color:#888;">${translations[currentLang].table} ${choice.threat.table} | ${translations[currentLang].riskLevel}: ${getRiskText(choice.threat.risk)}</p>
            </div>
        `;
    }
    
    const html = `
        <div>
            <div style="border-left:5px solid ${choice.correct ? '#00ff9d' : '#ff3b3b'}; padding:20px; background:#1a1a26; border-radius:10px;">
                <h3 style="color:${choice.correct ? '#00ff9d' : '#ff3b3b'}; font-size:24px; margin-bottom:15px;">
                    ${choice.correct ? translations[currentLang].correctChoice : translations[currentLang].wrongChoice}
                </h3>
                
                <div style="background:#1e1e2a; padding:20px; border-radius:10px; margin:15px 0;">
                    <p style="margin:0; line-height:1.7; font-size:16px;">${getOptionResult(choice)}</p>
                </div>
                
                ${threatHtml}
                
                <div style="background:linear-gradient(135deg,#1e2a1a,#1a1a26); padding:20px; border-radius:10px; margin:15px 0; border-left:4px solid #9d4edd;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                        <span style="font-size:24px;">📚</span>
                        <span style="color:#9d4edd; font-weight:bold; font-size:18px;">${translations[currentLang].methodology}:</span>
                    </div>
                    <p style="margin:0; white-space:pre-line; line-height:1.7; font-size:15px; color:#a0a0b0;">${getOptionExplain(choice)}</p>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <p style="color:#00f3ff; font-weight:bold; margin-bottom:15px;">📊 ${translations[currentLang].resourceChanges}:</p>
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
                        ${translations[currentLang].continue} (${translations[currentLang].act} ${gameState.act + 1})
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
    const accuracy = Math.round(gameState.correctChoices / gameState.totalChoices * 100) || 0;
    const html = `
        <div style="background:#1a1a26; padding:20px; border-radius:15px;">
            <h3 style="color:#00f3ff; font-size:24px; margin-bottom:20px;">${translations[currentLang].stats}</h3>
            
            <div style="display:grid; gap:15px;">
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">${translations[currentLang].correctAnswers}</div>
                    <div style="font-size:32px; color:#00ff9d;">${gameState.correctChoices}/${gameState.totalChoices}</div>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">${translations[currentLang].accuracy}</div>
                    <div style="font-size:32px; color:#00f3ff;">${accuracy}%</div>
                </div>
                
                <div style="background:#1e1e2a; padding:15px; border-radius:10px;">
                    <div style="color:#888; margin-bottom:5px;">${translations[currentLang].currentStage}</div>
                    <div style="font-size:32px; color:#9d4edd;">${gameState.act}/6</div>
                </div>
            </div>
            
            <button onclick="continueGame()" style="width:100%; background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:15px; border-radius:10px; margin-top:20px; font-size:18px; cursor:pointer;">
                ⬅️ ${translations[currentLang].backToGame}
            </button>
        </div>
    `;
    
    document.getElementById('terminalContent').innerHTML = html;
    document.getElementById('choicesGrid').style.display = 'none';
}

function checkGameOver() {
    const msg = translations[currentLang].gameOverMessages;
    if (gameState.budget <= 0) {
        showGameOver(msg.budget);
        return true;
    }
    if (gameState.security <= 0) {
        showGameOver(msg.security);
        return true;
    }
    if (gameState.time >= 100) {
        showGameOver(msg.timeTooHigh);
        return true;
    }
    if (gameState.time <= 0) {
        showGameOver(msg.timeTooLow);
        return true;
    }
    return false;
}

function showGameOver(msg) {
    if (gameState.gameOver) return;
    gameState.gameOver = true;
    gameState.gameOverMsg = msg;
    
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
    
    const accuracy = Math.round(gameState.correctChoices / gameState.totalChoices * 100) || 0;
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:20px; animation: glitch 1s infinite;">
            <div style="border:3px solid #ff3b3b; color:#ff3b3b; font-size:32px; padding:30px; border-radius:30px; background:rgba(255,59,59,0.1); box-shadow:0 0 50px #ff3b3b;">
                ${translations[currentLang].gameOver}
            </div>
            <p style="margin:30px 0; font-size:20px; color:#ff9f1c;">${msg}</p>
            <p style="margin:20px 0; font-size:18px;">${translations[currentLang].correctAnswers}: ${gameState.correctChoices}/${gameState.totalChoices}</p>
            <p style="margin:10px 0; font-size:16px; color:#a0a0b0;">${translations[currentLang].accuracy}: ${accuracy}%</p>
            <button onclick="restartGame()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:3px solid #00f3ff; color:#00f3ff; padding:20px 40px; border-radius:15px; margin:20px 0; font-size:20px; cursor:pointer; box-shadow:0 0 30px #00f3ff;">${translations[currentLang].restart}</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function showVictory() {
    if (gameState.victory) return;
    gameState.victory = true;
    moneyRain();
    
    if (!document.querySelector('#victoryStyles')) {
        const style = document.createElement('style');
        style.id = 'victoryStyles';
        style.textContent = `
            @keyframes fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
            @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
        `;
        document.head.appendChild(style);
    }
    
    const accuracy = Math.round(gameState.correctChoices / gameState.totalChoices * 100);
    const riskLevel = accuracy >= 80 ? translations[currentLang].low : (accuracy >= 50 ? translations[currentLang].medium : translations[currentLang].high);
    const riskColor = accuracy >= 80 ? '#00ff9d' : (accuracy >= 50 ? '#ff9f1c' : '#ff3b3b');
    
    document.getElementById('terminalContent').innerHTML = `
        <div style="text-align:center; padding:10px;">
            <div style="border:4px solid #00ff9d; color:#00ff9d; font-size:42px; padding:30px; border-radius:40px; margin:20px 0; animation:pulse 2s infinite; background:linear-gradient(135deg,#00ff9d10,#00f3ff10); box-shadow:0 0 70px #00ff9d;">
                ${translations[currentLang].victory}
            </div>
            
            <div style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); padding:30px; border-radius:30px; margin:30px 0; box-shadow:0 0 50px #00f3ff; border:2px solid #00f3ff;">
                <h2 style="color:#00f3ff; font-size:32px; margin-bottom:25px; text-shadow:0 0 15px #00f3ff;">${translations[currentLang].finalReport}</h2>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin:25px 0;">
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">💰</div>
                        <div style="color:#a0a0b0; margin:15px 0;">${translations[currentLang].budget}</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.budget}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">🔒</div>
                        <div style="color:#a0a0b0; margin:15px 0;">${translations[currentLang].security}</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.security}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">⏱️</div>
                        <div style="color:#a0a0b0; margin:15px 0;">${translations[currentLang].time}</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${gameState.time}%</div>
                    </div>
                    <div style="background:#1e1e2a; padding:25px; border-radius:20px; border:2px solid #00ff9d;">
                        <div style="font-size:60px;">🎯</div>
                        <div style="color:#a0a0b0; margin:15px 0;">${translations[currentLang].accuracy}</div>
                        <div style="font-size:40px; color:#00ff9d; font-weight:bold;">${accuracy}%</div>
                    </div>
                </div>
                
                <div style="background:#1e1e2a; padding:25px; border-radius:20px; text-align:left; margin:25px 0; border:2px solid #9d4edd;">
                    <h3 style="color:#9d4edd; font-size:26px; margin-bottom:20px; text-shadow:0 0 10px #9d4edd;">${translations[currentLang].riskAssessment}</h3>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">${translations[currentLang].riskLevel}:</span> <span style="color:${riskColor}; font-weight:bold; font-size:22px;">${riskLevel}</span></p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">${translations[currentLang].correctAnswers}:</span> ${gameState.correctChoices}/${gameState.totalChoices}</p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">${translations[currentLang].threatsIdentified}:</span> ⚠️ 27</p>
                    <p style="margin:15px 0; font-size:18px;"><span style="color:#00f3ff;">${translations[currentLang].recommendations}:</span> 📌 ${currentLang === 'ru' ? 'Приложение Л' : (currentLang === 'en' ? 'Appendix L' : '附录 L')}</p>
                </div>
                
                <div style="background:#1e1e2a; padding:20px; border-radius:15px; margin-top:25px;">
                    <p style="color:#00f3ff; font-size:22px;">${translations[currentLang].diplomaRef}</p>
                    <p style="color:#a0a0b0; font-size:18px;">${translations[currentLang].diplomaTopic}</p>
                </div>
            </div>
            
            <button onclick="restartGame()" style="background:linear-gradient(135deg,#1a1a26,#2a2a3a); border:4px solid #00ff9d; color:#00ff9d; padding:25px 50px; border-radius:20px; margin:40px 0; font-size:24px; cursor:pointer; box-shadow:0 0 40px #00ff9d; transition:0.3s;">${translations[currentLang].playAgain}</button>
        </div>
    `;
    document.getElementById('choicesGrid').style.display = 'none';
}

function showWarning(msg, type = 'warning') {
    const colors = {
        warning: { bg: '#ff9f1c', shadow: '#ff9f1c' },
        danger: { bg: '#ff3b3b', shadow: '#ff3b3b' },
        success: { bg: '#00ff9d', shadow: '#00ff9d' }
    };
    const color = colors[type] || colors.warning;
    
    const warningDiv = document.createElement('div');
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

function moneyRain() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const emojis = ['💰','💵','💶','💷','💎','🪙','💸','🏆','⭐','✨','🎉','🎊'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const div = document.createElement('div');
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
        history: [],
        gameOverMsg: ""
    };
    updateDisplay();
    showAct();
    closeModal();
}

function showDiplomaLinks() {
    document.getElementById('modalTitle').textContent = translations[currentLang].aboutTitle;
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align:center;">
            <h3 style="color:#00f3ff; font-size:28px; margin-bottom:20px;">${translations[currentLang].authorName}</h3>
            <p style="margin:15px 0; font-size:18px;">🏛️ ${currentLang === 'ru' ? 'МГЛУ, Институт информационных наук' : (currentLang === 'en' ? 'MSLU, Institute of Information Sciences' : '莫斯科国立语言大学，信息科学研究所')}</p>
            <p style="margin:15px 0; font-size:18px;">🔬 ${currentLang === 'ru' ? 'Кафедра международной информационной безопасности' : (currentLang === 'en' ? 'Department of International Information Security' : '国际信息安全系')}</p>
            <p style="margin:15px 0; font-size:18px;">📖 ${currentLang === 'ru' ? 'Тема: Разработка методики аудита ИБ систем с ИИ' : (currentLang === 'en' ? 'Topic: AI Security Audit Methodology Development' : '主题：人工智能系统信息安全审计方法开发')}</p>
            
            <div style="background:#1e1e2a; padding:20px; border-radius:15px; margin:25px 0;">
                <h4 style="color:#9d4edd; font-size:20px; margin-bottom:15px;">📊 ${translations[currentLang].diplomaCompliance}</h4>
                <p style="margin:8px 0;">✅ ${translations[currentLang].tables}</p>
                <p style="margin:8px 0;">✅ ${translations[currentLang].section33}</p>
                <p style="margin:8px 0;">✅ ${translations[currentLang].chapter2}</p>
                <p style="margin:8px 0;">✅ ${translations[currentLang].appendixL}</p>
            </div>
            
            <p style="color:#00ff9d; font-size:20px; margin:20px 0;">🎮 ${translations[currentLang].gameComplies}</p>
        </div>
    `;
    document.getElementById('infoModal').style.display = 'flex';
}

function showAllThreats() {
    let html = `<h3 style="color:#00f3ff; font-size:28px; margin-bottom:20px;">${translations[currentLang].allThreatsTable}</h3>`;
    html += '<div style="background:#1a1a26; padding:20px; border-radius:15px;">';
    
    const tables = {
        '1.1': ['T1.1', 'T1.2', 'T1.3', 'T1.4'],
        '1.2': ['T2.1', 'T2.2', 'T2.3', 'T2.4'],
        '1.3': ['T3.1', 'T3.2', 'T3.3'],
        '1.4': ['T4.1', 'T4.2', 'T4.3'],
        '1.5': ['T5.1', 'T5.2', 'T5.3', 'T5.4', 'T5.5', 'T5.6', 'T5.7', 'T5.8', 'T5.9', 'T5.10'],
        '1.6': ['T6.1', 'T6.2', 'T6.3']
    };
    
    for (const [table, ids] of Object.entries(tables)) {
        html += `<p style="margin:15px 0 5px 0; color:#00ff9d; font-size:18px;">${translations[currentLang].table} ${table}:</p>`;
        ids.forEach(id => {
            html += `<p style="margin:3px 0 3px 20px; color:#a0a0b0;">• ${id}</p>`;
        });
    }
    
    html += `<p style="margin:25px 0 0 0; color:#9d4edd; font-size:22px; text-align:center;">📌 ${translations[currentLang].totalThreats}</p>`;
    html += '</div>';
    
    document.getElementById('modalTitle').textContent = translations[currentLang].threatsTitle;
    document.getElementById('modalBody').innerHTML = html;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
window.onload = function() {
    const header = document.querySelector('.game-header');
    if (header && !document.querySelector('.lang-buttons')) {
        const langDiv = document.createElement('div');
        langDiv.className = 'lang-buttons';
        langDiv.style.cssText = 'display: flex; gap: 8px; margin-left: auto;';
        langDiv.innerHTML = `
            <button onclick="setLanguage('ru')" style="background: #1a1a26; border: 2px solid #00f3ff; color: #00f3ff; border-radius: 20px; padding: 5px 12px; cursor: pointer; font-weight: bold;">🇷🇺 RU</button>
            <button onclick="setLanguage('en')" style="background: #1a1a26; border: 2px solid #00f3ff; color: #00f3ff; border-radius: 20px; padding: 5px 12px; cursor: pointer; font-weight: bold;">🇬🇧 EN</button>
            <button onclick="setLanguage('zh')" style="background: #1a1a26; border: 2px solid #00f3ff; color: #00f3ff; border-radius: 20px; padding: 5px 12px; cursor: pointer; font-weight: bold;">🇨🇳 中文</button>
        `;
        header.appendChild(langDiv);
    }
    
    updateAllStaticTexts();
    updateDisplay();
    showAct();
    
    window.onclick = function(e) {
        if (e.target == document.getElementById('infoModal')) {
            closeModal();
        }
    };
}