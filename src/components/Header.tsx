import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, Cpu } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const links = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/about", label: "О нас" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(query.trim())}`;
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <Cpu size={28} />
          <span>GroovyAss Beat</span>
        </Link>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Поиск"
          >
            <Search size={20} />
          </button>

          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button
            className="icon-btn burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Открыть меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="search-bar" onSubmit={handleSearch}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Найти продукт..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-submit">
            Поиск
          </button>
        </form>
      )}
    </header>
  );
}
