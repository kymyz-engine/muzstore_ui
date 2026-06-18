import { Cpu, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <Cpu size={24} />
            <span>Groovy Beat</span>
          </div>
          <p>
            Электронная система торговли музыкальных инструментов и аппаратуры.
            Качественная продукция, быстрая доставка.
          </p>
        </div>

        <div className="footer-links">
          <h4>Навигация</h4>
          <Link to="/">Главное</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/about">О нас</Link>
        </div>

        <div className="footer-links">
          <h4>Категории</h4>
          <Link to="/catalog?cat=guitars">Гитары</Link>
          <Link to="/catalog?cat=pianos">Клавишные</Link>
          <Link to="/catalog?cat=drums">Ударные</Link>
        </div>

        <div className="footer-contact">
          <h4>Контакты</h4>
          <p><Phone size={14} /> +996 (777) 328-907</p>
          <p><Mail size={14} /> info@muzstore.kg</p>
          <p><MapPin size={14} /> Бишкек, Чүй пр. 150</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 GroovyAss Beat. Все права защищены.</p>
      </div>
    </footer>
  );
}
