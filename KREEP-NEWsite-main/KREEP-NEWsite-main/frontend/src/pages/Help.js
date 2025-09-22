import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HelpCircle, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../components/ui/input";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqCategories = [
    {
      category: "Початок роботи",
      items: [
        {
          id: 1,
          question: "Як зареєструватися в системі KREEP?",
          answer: "Для реєстрації завантажте мобільну програму KREEP з App Store або Google Play. Дотримуйтесь інструкцій для створення акаунту та налаштування біометричної автентифікації."
        },
        {
          id: 2,
          question: "Як налаштувати біометричний доступ?",
          answer: "У мобільному додатку перейдіт в розділ 'Налаштування' → 'Біометрія'. Дотримуйтесь інструкцій для сканування обличчя."
        },
        {
          id: 3,
          question: "Які способи оплати підтримуються?",
          answer: "KREEP підтримує банківські картки (Visa, Mastercard), цифрові гаманці (Apple Pay, Google Pay), онлайн банкінг та криптовалюти."
        }
      ]
    },
    {
      category: "Покупки",
      items: [
        {
          id: 4,
          question: "Як здійснити покупку в магазині?",
          answer: "Просто зайдіть до магазину (система автоматично вас розпізнає), беріть потрібні товари та виходьте. Оплата пройде автоматично, а чек надійде на email."
        },
        {
          id: 5,
          question: "Що робити, якщо товар не зарахувався?",
          answer: "Якщо товар не зафіксувався системою, зверніться до адміністратора магазину або скористайтеся кнопкою 'Допомога' в мобільному додатку."
        },
        {
          id: 6,
          question: "Як повернути товар?",
          answer: "Повернення товарів здійснюється через мобільний додаток або звернення до служби підтримки протягом 14 днів з моменту покупки."
        }
      ]
    },
    {
      category: "Технічні питання",
      items: [
        {
          id: 7,
          question: "Система не розпізнає мене на вході",
          answer: "Перевірте освітлення біля сканера, очистіть екран телефону, спробуйте альтернативний спосіб входу через QR-код в додатку або зверніться до адміністратора."
        },
        {
          id: 8,
          question: "Проблеми з мобільним додатком",
          answer: "Спробуйте перезавантажити додаток, перевірте інтернет-з'єднання, оновіть додаток до останньої версії або переустановіть його."
        },
        {
          id: 9,
          question: "Як змінити способ оплати?",
          answer: "В мобільному додатку перейдіть в 'Налаштування' → 'Способи оплати', де ви можете додати, видалити або змінити пріоритетність платіжних методів."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Чат підтримки",
      description: "Миттєва допомога онлайн",
      action: "Розпочати чат",
      available: "24/7"
    },
    {
      icon: Phone,
      title: "Телефонна підтримка",
      description: "+380970183384",
      action: "Зателефонувати",
      available: "9:00 - 21:00"
    },
    {
      icon: Mail,
      title: "Email підтримка", 
      description: "kreep@kreep.world",
      action: "Написати email",
      available: "Відповідь до 2 годин"
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="dark-container">
      <Header />
      <main className="help-main">
        <div className="dark-content-container">
          <div className="help-header">
            <HelpCircle size={48} className="help-icon" />
            <h1 className="help-title">Центр допомоги</h1>
            <p className="help-subtitle">
              Знайдіть відповіді на поширені питання або зв'яжіться з нашою командою підтримки
            </p>
          </div>

          <div className="help-search">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <Input
                type="text"
                placeholder="Пошук по базі знань..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="help-content">
            <section className="faq-section">
              <h2>Поширені питання</h2>
              
              {filteredFAQs.map((category) => (
                <div key={category.category} className="faq-category">
                  <h3 className="category-title">{category.category}</h3>
                  
                  {category.items.map((faq) => (
                    <div key={faq.id} className="faq-item">
                      <button
                        className="faq-question-btn"
                        onClick={() => toggleFAQ(faq.id)}
                      >
                        <span>{faq.question}</span>
                        {expandedFAQ === faq.id ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {filteredFAQs.length === 0 && searchTerm && (
                <div className="no-results">
                  <p>Не знайдено результатів для "{searchTerm}"</p>
                  <p>Спробуйте інші ключові слова або зверніться до служби підтримки</p>
                </div>
              )}
            </section>

            <section className="contact-section">
              <h2>Зв'язатися з нами</h2>
              <div className="contact-options">
                {contactOptions.map((option, index) => (
                  <div key={index} className="contact-option">
                    <div className="contact-icon">
                      <option.icon size={32} />
                    </div>
                    <div className="contact-info">
                      <h3>{option.title}</h3>
                      <p className="contact-description">{option.description}</p>
                      <p className="contact-available">{option.available}</p>
                    </div>
                    <button className="contact-action">
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="quick-links">
              <h2>Швидкі посилання</h2>
              <div className="links-grid">
                <a href="/privacy" className="quick-link">
                  Політика конфіденційності
                </a>
                <a href="/terms" className="quick-link">
                  Умови використання
                </a>
                <a href="#contact" className="quick-link">
                  Контакти магазину
                </a>
                <a href="#" className="quick-link">
                  Завантажити додаток
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;