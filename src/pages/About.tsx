import { Users, Award, Clock, Truck } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Биз жөнүндө</h1>
        <p>
          GroovyAss Beat — Кыргызстандагы компьютердик техника жана тетиктердин
          электрондук соода системасы. 2020-жылдан бери сапаттуу продукттарды
          мыкты баада сунуштайбыз.
        </p>
      </section>

      <section className="about-stats">
        <div className="stat-card">
          <Users size={36} />
          <strong>5000+</strong>
          <span>Кардарлар</span>
        </div>
        <div className="stat-card">
          <Award size={36} />
          <strong>500+</strong>
          <span>Продукттар</span>
        </div>
        <div className="stat-card">
          <Clock size={36} />
          <strong>6 жыл</strong>
          <span>Тажрыйба</span>
        </div>
        <div className="stat-card">
          <Truck size={36} />
          <strong>24 саат</strong>
          <span>Жеткирүү</span>
        </div>
      </section>

      <section className="about-content">
        <div className="about-block">
          <h2>Биздин миссия</h2>
          <p>
            Кыргызстандын жарандарына эң жаңы жана сапаттуу компьютердик
            техниканы жеткиликтүү баада сунуштоо. Ар бир кардарга жеке мамиле
            жана профессионалдуу кеңеш берүү.
          </p>
        </div>

        <div className="about-block">
          <h2>Эмне үчүн биз?</h2>
          <ul>
            <li>Расмий дилер — бардык продукттар кепилдик менен</li>
            <li>Тез жеткирүү — Бишкек боюнча 24 саат ичинде</li>
            <li>Техникалык колдоо — 24/7 кызмат</li>
            <li>Ыңгайлуу төлөм — бөлүп төлөө мүмкүнчүлүгү</li>
            <li>Кеңири ассортимент — 500+ продукт</li>
          </ul>
        </div>

        <div className="about-block">
          <h2>Байланыш маалыматы</h2>
          <p>Дарек: Бишкек шаары, Чүй проспектиси 150</p>
          <p>Телефон: +996 (555) 123-456</p>
          <p>Email: info@techstore.kg</p>
          <p>Иш убактысы: Дүйшөмбү-Жума 09:00 - 19:00</p>
        </div>
      </section>
    </div>
  );
}
