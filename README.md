# AI Security Simulator 🎮

Интерактивный симулятор аудита безопасности систем искусственного интеллекта.

## 📚 О проекте

Данный симулятор создан в рамках дипломной работы **Воробьевой Александры Александровны** (МГЛУ, Институт информационных наук, кафедра международной информационной безопасности, 2026).

Тема диплома: *«Разработка методики аудита информационной безопасности систем, использующих технологии искусственного интеллекта»*.

## 🎯 Что здесь?

Это **обучающая игра**, которая погружает пользователя в роль CISO стартапа, разрабатывающего ИИ-систему. Игрок проходит все 6 этапов жизненного цикла ИИ и сталкивается с реальными угрозами из диплома.

### Этапы:
1. **Сбор и подготовка данных** (Таблица 1.1)
2. **Разработка и обучение модели** (Таблица 1.2)  
3. **Валидация и тестирование** (Таблица 1.3)
4. **Развертывание** (Таблица 1.4)
5. **Эксплуатация и мониторинг** (Таблица 1.5)
6. **Обновление и переобучение** (Таблица 1.6)

## ⚙️ Механика

У игрока есть 3 ресурса:
- 💰 **Бюджет** (чем меньше, тем ближе банкротство)
- 🔒 **Безопасность** (чем меньше, тем выше риск утечки)
- ⏱️ **Время** (чем больше, тем ближе конкуренты)

## 📊 Все угрозы из диплома (27 штук)

| ID | Название | Риск | Таблица |
|----|----------|------|---------|
| T1.1 | Отравление данных | Высокий | 1.1 |
| T1.2 | Компрометация источников данных | Высокий | 1.1 |
| T1.3 | Несанкционированная модификация разметки | Средний | 1.1 |
| T1.4 | Нарушение конфиденциальности при сборе | Средний | 1.1 |
| T2.1 | Кража модели | Критический | 1.2 |
| T2.2 | Отравление модели через гиперпараметры | Средний | 1.2 |
| T2.3 | Компрометация кода обучения | Высокий | 1.2 |
| T2.4 | Атаки на среду обучения | Высокий | 1.2 |
| T3.1 | Подмена тестовых данных | Высокий | 1.3 |
| T3.2 | Манипуляция метриками | Средний | 1.3 |
| T3.3 | Сокрытие уязвимостей | Критический | 1.3 |
| T4.1 | Подмена модели | Критический | 1.4 |
| T4.2 | Небезопасная конфигурация API | Высокий | 1.4 |
| T4.3 | Компрометация контейнеров | Высокий | 1.4 |
| T5.1 | Состязательные атаки | Высокий | 1.5 |
| T5.2 | Промпт-инъекции | Критический | 1.5 |
| T5.3 | Несанкционированный доступ через API | Высокий | 1.5 |
| T5.4 | Атаки на конфиденциальность | Высокий | 1.5 |
| T5.5 | Изменение распределения данных | Средний | 1.5 |
| T5.6 | DoS/DDoS-атаки | Средний | 1.5 |
| T6.1 | Откат к уязвимой версии | Высокий | 1.6 |
| T6.2 | Компрометация пайплайна обновлений | Критический | 1.6 |
| T6.3 | Нарушение целостности при обновлении | Средний | 1.6 |

## 🚀 Как запустить

1. Перейдите по ссылке: [ai-security-quest](https://aleksa-ai-cybersec.github.io/ai-security-quest/)
2. Или клонируйте репозиторий и откройте `index.html` в браузере

## 📱 Адаптивность

Игра полностью адаптирована под:
- 💻 Компьютеры
- 📱 Планшеты
- 📱 Телефоны (все размеры экранов)

## 🎨 Дизайн

- Неоновая тема в стиле киберпанк
- Анимированные элементы
- Эффект глитча
- Терминальный стиль
- Адаптивная верстка

## 📖 Ссылки

- [Полный текст диплома](https://github.com/aleksa-ai-cybersec/deepseek-audit-diploma)
- [Симулятор](https://aleksa-ai-cybersec.github.io/ai-security-quest/)

## © Автор

**Воробьева Александра Александровна**  
Московский государственный лингвистический университет  
Институт информационных наук  
Кафедра международной информационной безопасности  
2026



# AI Security Simulator 🎮

Interactive simulator for auditing the security of artificial intelligence systems.

## 📚 About the project

This simulator was created as part of the diploma work of **VOROBEVA ALEKSANDRA** (MSLU, Institute of Information Sciences, Department of International Information Security, 2026).

Diploma topic: *"Development of an information security audit methodology for systems using artificial intelligence technologies"*.

## 🎯 What is this?

This is an **educational game** that immerses the user in the role of a CISO of a startup developing an AI system. The player goes through all 6 stages of the AI lifecycle and encounters real threats from the diploma.

### Stages:
1. **Data Collection and Preparation** (Table 1.1)
2. **Model Development and Training** (Table 1.2)  
3. **Validation and Testing** (Table 1.3)
4. **Deployment** (Table 1.4)
5. **Operation and Monitoring** (Table 1.5)
6. **Update and Retraining** (Table 1.6)

## ⚙️ Mechanics

The player has 3 resources:
- 💰 **Budget** (the lower, the closer to bankruptcy)
- 🔒 **Security** (the lower, the higher the risk of leakage)
- ⏱️ **Time** (the higher, the closer the competitors)

## 📊 All threats from the diploma (27 total)

| ID | Name | Risk | Table |
|----|------|------|-------|
| T1.1 | Data Poisoning | High | 1.1 |
| T1.2 | Data Source Compromise | High | 1.1 |
| T1.3 | Unauthorized Label Modification | Medium | 1.1 |
| T1.4 | Collection Privacy Violation | Medium | 1.1 |
| T2.1 | Model Theft | Critical | 1.2 |
| T2.2 | Hyperparameter Poisoning | Medium | 1.2 |
| T2.3 | Training Code Compromise | High | 1.2 |
| T2.4 | Training Environment Attacks | High | 1.2 |
| T3.1 | Test Data Replacement | High | 1.3 |
| T3.2 | Metric Manipulation | Medium | 1.3 |
| T3.3 | Vulnerability Hiding | Critical | 1.3 |
| T4.1 | Model Replacement | Critical | 1.4 |
| T4.2 | Insecure API Configuration | High | 1.4 |
| T4.3 | Container Compromise | High | 1.4 |
| T5.1 | Adversarial Attacks | High | 1.5 |
| T5.2 | Prompt Injections | Critical | 1.5 |
| T5.3 | Unauthorized API Access | High | 1.5 |
| T5.4 | Privacy Attacks | High | 1.5 |
| T5.5 | Data Distribution Shift | Medium | 1.5 |
| T5.6 | DoS/DDoS Attacks | Medium | 1.5 |
| T6.1 | Rollback to Vulnerable Version | High | 1.6 |
| T6.2 | Update Pipeline Compromise | Critical | 1.6 |
| T6.3 | Update Integrity Violation | Medium | 1.6 |

## 🚀 How to run

1. Go to the link: [ai-security-quest](https://aleksa-ai-cybersec.github.io/ai-security-quest/)
2. Or clone the repository and open `index.html` in your browser

## 📱 Responsiveness

The game is fully adapted for:
- 💻 Desktops
- 📱 Tablets
- 📱 Phones (all screen sizes)

## 🎨 Design

- Cyberpunk-style neon theme
- Animated elements
- Glitch effect
- Terminal style
- Responsive layout

## 📖 Links

- [Full diploma text](https://github.com/aleksa-ai-cybersec/deepseek-audit-diploma)
- [Simulator](https://aleksa-ai-cybersec.github.io/ai-security-quest/)

## © Author

**VOROBEVA ALEKSANDRA**  
Moscow State Linguistic University  
Institute of Information Sciences  
Department of International Information Security  
2026



# AI Security Simulator 🎮

人工智能系统安全审计交互式模拟器。

## 📚 关于项目

本模拟器是为 **VOROBEVA ALEKSANDRA** 的毕业论文创建的（莫斯科国立语言大学，信息科学研究所，国际信息安全系，2026年）。

论文题目：《使用人工智能技术的系统信息安全审计方法开发》。

## 🎯 这是什么？

这是一款**教育游戏**，让用户扮演开发AI系统的初创公司CISO角色。玩家经历AI生命周期的全部6个阶段，并面对论文中的真实威胁。

### 阶段：
1. **数据收集与准备**（表1.1）
2. **模型开发与训练**（表1.2）
3. **验证与测试**（表1.3）
4. **部署**（表1.4）
5. **运行与监控**（表1.5）
6. **更新与再训练**（表1.6）

## ⚙️ 游戏机制

玩家拥有3种资源：
- 💰 **预算**（越低越接近破产）
- 🔒 **安全**（越低，泄露风险越高）
- ⏱️ **时间**（越高，竞争对手越近）

## 📊 论文中的所有威胁（共27种）

| ID | 名称 | 风险 | 表 |
|----|------|------|-----|
| T1.1 | 数据投毒 | 高危 | 1.1 |
| T1.2 | 数据源入侵 | 高危 | 1.1 |
| T1.3 | 未经授权的标注修改 | 中危 | 1.1 |
| T1.4 | 收集时的隐私侵犯 | 中危 | 1.1 |
| T2.1 | 模型盗窃 | 严重 | 1.2 |
| T2.2 | 超参数投毒 | 中危 | 1.2 |
| T2.3 | 训练代码入侵 | 高危 | 1.2 |
| T2.4 | 训练环境攻击 | 高危 | 1.2 |
| T3.1 | 测试数据替换 | 高危 | 1.3 |
| T3.2 | 指标操纵 | 中危 | 1.3 |
| T3.3 | 漏洞隐藏 | 严重 | 1.3 |
| T4.1 | 模型替换 | 严重 | 1.4 |
| T4.2 | 不安全API配置 | 高危 | 1.4 |
| T4.3 | 容器入侵 | 高危 | 1.4 |
| T5.1 | 对抗攻击 | 高危 | 1.5 |
| T5.2 | 提示注入 | 严重 | 1.5 |
| T5.3 | 未经授权的API访问 | 高危 | 1.5 |
| T5.4 | 隐私攻击 | 高危 | 1.5 |
| T5.5 | 数据分布变化 | 中危 | 1.5 |
| T5.6 | DoS/DDoS攻击 | 中危 | 1.5 |
| T6.1 | 回滚到有漏洞版本 | 高危 | 1.6 |
| T6.2 | 更新流水线入侵 | 严重 | 1.6 |
| T6.3 | 更新时的完整性破坏 | 中危 | 1.6 |

## 🚀 如何运行

1. 访问链接：[ai-security-quest](https://aleksa-ai-cybersec.github.io/ai-security-quest/)
2. 或克隆仓库并在浏览器中打开 `index.html`

## 📱 响应式设计

游戏完全适配：
- 💻 电脑
- 📱 平板
- 📱 手机（所有屏幕尺寸）

## 🎨 设计

- 赛博朋克风格霓虹主题
- 动画元素
- 故障效果
- 终端风格
- 响应式布局

## 📖 链接

- [完整论文文本](https://github.com/aleksa-ai-cybersec/deepseek-audit-diploma)
- [模拟器](https://aleksa-ai-cybersec.github.io/ai-security-quest/)

## © 作者

**VOROBEVA ALEKSANDRA**  
莫斯科国立语言大学  
信息科学研究所  
国际信息安全系  
2026年