import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="dark-container">
      <Header />
      <main className="policy-main">
        <div className="dark-content-container">
          <div className="policy-header">
            <Shield size={48} className="policy-icon" />
            <h1 className="policy-title">Політика конфіденційності</h1>
            <p className="policy-subtitle">
              Ми цінуємо вашу приватність і зобов'язуємося захищати ваші персональні дані
            </p>
            <p className="policy-date">Остання редакція: 20 грудня 2024 року</p>
          </div>

          <div className="policy-content">
            <section className="policy-section">
              <div className="section-icon">
                <Database size={24} />
              </div>
              <h2>Які дані ми збираємо</h2>
              <div className="policy-text">
                <h3>Біометричні дані</h3>
                <ul>
                  <li>3D-скан обличчя для швидкої ідентифікації та входу до магазину</li>
                  <li>Дані зберігаються виключно локально на пристроях магазину</li>
                  <li>Біометричні дані НЕ передаються третім особам</li>
                  <li>Використовується тільки технологія розпізнавання обличчя</li>
                </ul>

                <h3>Дані покупок</h3>
                <ul>
                  <li>Історія покупок для персоналізації рекомендацій</li>
                  <li>Час та дата відвідувань магазину</li>
                  <li>Обрані товари та сума покупок</li>
                  <li>Способи оплати (зашифровані дані карток)</li>
                </ul>

                <h3>Контактна інформація</h3>
                <ul>
                  <li>Email адреса для відправки чеків та комунікації</li>
                  <li>Номер телефону (опціонально) для SMS-сповіщень</li>
                  <li>Ім'я для персоналізації сервісу</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <Lock size={24} />
              </div>
              <h2>Як ми захищаємо ваші дані</h2>
              <div className="policy-text">
                <h3>Шифрування</h3>
                <ul>
                  <li>Використовуємо AES-256 шифрування для всіх персональних даних</li>
                  <li>SSL/TLS протоколи для передачі даних</li>
                  <li>End-to-end шифрування для біометричних даних</li>
                </ul>

                <h3>Доступ до даних</h3>
                <ul>
                  <li>Обмежений доступ тільки для авторизованого персоналу</li>
                  <li>Двофакторна автентифікація для всіх системних адміністраторів</li>
                  <li>Регулярні аудити безпеки та моніторинг доступу</li>
                </ul>

                <h3>Зберігання даних</h3>
                <ul>
                  <li>Біометричні дані зберігаються тільки локально</li>
                  <li>Резервні копії створюються з використанням шифрування</li>
                  <li>Автоматичне видалення застарілих даних</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <Eye size={24} />
              </div>
              <h2>Використання даних</h2>
              <div className="policy-text">
                <h3>Покращення сервісу</h3>
                <ul>
                  <li>Персоналізовані рекомендації товарів</li>
                  <li>Оптимізація розташування товарів у магазині</li>
                  <li>Покращення швидкості обслуговування</li>
                </ul>

                <h3>Комунікація</h3>
                <ul>
                  <li>Відправка електронних чеків</li>
                  <li>Сповіщення про акції та знижки (з вашої згоди)</li>
                  <li>Важливі оновлення про роботу магазину</li>
                </ul>

                <h3>Аналітика</h3>
                <ul>
                  <li>Анонімна статистика для покращення сервісу</li>
                  <li>Аналіз популярності товарів</li>
                  <li>Оптимізація часу роботи магазину</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <UserCheck size={24} />
              </div>
              <h2>Ваші права</h2>
              <div className="policy-text">
                <h3>Право на доступ</h3>
                <ul>
                  <li>Переглядати всі дані, які ми про вас зберігаємо</li>
                  <li>Отримувати копії ваших персональних даних</li>
                  <li>Дізнаватися про способи використання ваших даних</li>
                </ul>

                <h3>Право на видалення</h3>
                <ul>
                  <li>Видалити всі ваші персональні дані з наших систем</li>
                  <li>Скасувати біометричну реєстрацію</li>
                  <li>Припинити обробку ваших даних</li>
                </ul>

                <h3>Право на портативність</h3>
                <ul>
                  <li>Експортувати ваші дані в зручному форматі</li>
                  <li>Передати дані іншому сервісу</li>
                  <li>Отримати структуровані дані</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2>Контакти</h2>
              <div className="policy-text">
                <p>
                  Якщо у вас є питання щодо обробки персональних даних або ви хочете 
                  скористатися своїми правами, зв'яжіться з нами:
                </p>
                <div className="contact-info">
                  <p><strong>Email:</strong> kreep@kreep.world</p>
                  <p><strong>Телефон:</strong> +380970183384</p>
                  <p><strong>Адреса:</strong> м. Львів, Галицький район</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;