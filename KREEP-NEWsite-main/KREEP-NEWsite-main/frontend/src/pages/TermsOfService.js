import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, AlertTriangle, CreditCard, Users, Shield } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="dark-container">
      <Header />
      <main className="policy-main">
        <div className="dark-content-container">
          <div className="policy-header">
            <FileText size={48} className="policy-icon" />
            <h1 className="policy-title">Умови використання</h1>
            <p className="policy-subtitle">
              Правила та умови користування магазином KREEP
            </p>
            <p className="policy-date">Остання редакція: 20 грудня 2024 року</p>
          </div>

          <div className="policy-content">
            <section className="policy-section">
              <div className="section-icon">
                <Users size={24} />
              </div>
              <h2>Загальні положення</h2>
              <div className="policy-text">
                <h3>Про KREEP</h3>
                <p>
                  KREEP - це інноваційний автономний магазин, що використовує 
                  найсучасніші технології для створення безшовного досвіду покупок. 
                  Використовуючи наш сервіс, ви погоджуєтеся з цими умовами.
                </p>

                <h3>Вікові обмеження</h3>
                <ul>
                  <li>Для використання сервісу необхідно досягти 18 років</li>
                  <li>Неповнолітні можуть користуватися сервісом тільки після підтвердження батьків</li>
                </ul>

                <h3>Реєстрація та доступ</h3>
                <ul>
                  <li>Для користування магазином необхідна біометрична реєстрація обличчя</li>
                  <li>Ви зобов'язуєтеся надавати точну та достовірну інформацію</li>
                  <li>Заборонено передавати свій доступ третім особам</li>
                  <li>KREEP залишає за собою право відмовити в доступі</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <CreditCard size={24} />
              </div>
              <h2>Оплата та покупки</h2>
              <div className="policy-text">
                <h3>Способи оплати</h3>
                <ul>
                  <li>Банківські картки (Visa, Mastercard, American Express)</li>
                  <li>Цифрові гаманці (Apple Pay, Google Pay, Samsung Pay)</li>
                  <li>Онлайн банкінг</li>
                  <li>Криптовалюти (за попередньою домовленістю)</li>
                </ul>

                <h3>Процес покупки</h3>
                <ul>
                  <li>Товари автоматично додаються до кошика при взятті з полиці</li>
                  <li>Оплата проводиться автоматично при виході з магазину</li>
                  <li>Електронний чек надсилається на вашу email адресу</li>
                  <li>У разі технічної помилки - звертайтеся до адміністратора</li>
                </ul>

                <h3>Ціни та знижки</h3>
                <ul>
                  <li>Ціни можуть змінюватися без попереднього повідомлення</li>
                  <li>Діють спеціальні пропозиції та акції</li>
                  <li>Програма лояльності надає додаткові знижки</li>
                  <li>Помилки в цінах будуть виправлені та компенсовані</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <Shield size={24} />
              </div>
              <h2>Права та обов'язки</h2>
              <div className="policy-text">
                <h3>Ваші права</h3>
                <ul>
                  <li>Отримувати якісні товари та сервіс</li>
                  <li>Повертати товари згідно з законодавством</li>
                  <li>Захист персональних даних</li>
                  <li>Підтримка клієнтів 24/7</li>
                  <li>Справедливе вирішення спорів</li>
                </ul>

                <h3>Ваші обов'язки</h3>
                <ul>
                  <li>Дотримуватися правил поведінки в магазині</li>
                  <li>Не пошкоджувати обладнання та товари</li>
                  <li>Повідомляти про технічні проблеми</li>
                  <li>Поважати інших відвідувачів</li>
                  <li>Своєчасно оплачувати покупки</li>
                </ul>

                <h3>Наші обов'язки</h3>
                <ul>
                  <li>Забезпечувати безпеку та якість товарів</li>
                  <li>Підтримувати працездатність технологій</li>
                  <li>Захищати ваші персональні дані</li>
                  <li>Надавати кваліфіковану підтримку</li>
                  <li>Дотримуватися законодавства України</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <div className="section-icon">
                <AlertTriangle size={24} />
              </div>
              <h2>Обмеження відповідальності</h2>
              <div className="policy-text">
                <h3>Технічні збої</h3>
                <ul>
                  <li>KREEP не несе відповідальності за збої через форс-мажор</li>
                  <li>Компенсуємо прямі збитки від технічних помилок</li>
                  <li>Не відповідаємо за непрямі або випадкові збитки</li>
                </ul>

                <h3>Використання біометрії</h3>
                <ul>
                  <li>Біометричні дані обличчя використовуються тільки для ідентифікації</li>
                  <li>Не гарантуємо 100% точність розпізнавання обличчя</li>
                  <li>Передбачені альтернативні способи доступу</li>
                </ul>

                <h3>Товари та послуги</h3>
                <ul>
                  <li>Не відповідаємо за товари третіх виробників</li>
                  <li>Гарантуємо свіжість швидкопсувних продуктів</li>
                  <li>Замінюємо бракований товар за нашою провиною</li>
                </ul>
              </div>
            </section>

            <section className="policy-section">
              <h2>Зміни умов</h2>
              <div className="policy-text">
                <p>
                  KREEP залишає за собою право змінювати ці умови використання. 
                  Про всі зміни ми повідомлятимемо через email або push-сповіщення 
                  в мобільній програмі за 30 днів до вступу в силу.
                </p>
                <p>
                  Продовження користування сервісом після зміни умов означає 
                  вашу згоду з новими умовами.
                </p>
              </div>
            </section>

            <section className="policy-section">
              <h2>Контакти</h2>
              <div className="policy-text">
                <p>
                  З питань щодо умов використання звертайтеся:
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

export default TermsOfService;