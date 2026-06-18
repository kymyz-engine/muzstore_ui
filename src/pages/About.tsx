import { Users, Award, Clock, Truck } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Биз жөнүндө</h1>
        <p>
          Groovy Beat — Электронная система торговли музыкальных инструментов и аппаратуры.
          Предлагаем качественную продукцию в лучшей цене.
        </p>
      </section>

      <section className="about-stats">
        <div className="stat-card">
          <Users size={36} />
          <strong>5000+</strong>
          <span>Покупателей</span>
        </div>
        <div className="stat-card">
          <Award size={36} />
          <strong>500+</strong>
          <span>Товаров</span>
        </div>
        <div className="stat-card">
          <Clock size={36} />
          <strong>6 лет</strong>
          <span>Опыта</span>
        </div>
        <div className="stat-card">
          <Truck size={36} />
          <strong>24 часа</strong>
          <span>Доставка</span>
        </div>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>Наша миссия</h2>
          <p>
            Самые новые и раритетные интрументы - на ваш вкус.
            Индивидуальынй подход каждому клиенту
          </p>
        </div>

        <div className="about-block">
          <h2>Почему мы?</h2>
          <ul>
            <li>Официальный диллер — все товары с гарантией</li>
            <li>Быстрая доставка — По Бишкеку 24 часа</li>
            <li>Техническое обслуживание — служба 24/7</li>
            <li>Удобная оплата — возможна рассрочка</li>
            <li>Широкий ассортимент — 500+ продуктов</li>
          </ul>
        </div>

        <div className="about-block">
          <h2>Контакты</h2>
          <p>Адрес: г. Бишкек, пр. Чүй 150</p>
          <p>Телефон: +996 (555) 123-456</p>
          <p>Email: info@techstore.kg</p>
          <p>График работы: Понедельник - Пятница 09:00 - 19:00</p>
        </div>
      </section>
    </div>
  );
}
