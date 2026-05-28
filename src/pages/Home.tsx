import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import SulaimanToo from "../components/SulaimanToo";
import { fetchProducts } from "../api/products";
import { fetchCategories } from "../api/categories";
import type { Product, Category } from "../types"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const hits   = products.filter((p) => p.badge === "hit").slice(0, 4);
  const sales  = products.filter((p) => p.badge === "sale").slice(0, 4);
  const newest = products.filter((p) => p.badge === "new").slice(0, 4);

  return (
    <div className="home">
      {/* Hero with Sulaiman-Too */}
      <section className="hero">
        <SulaimanToo className="hero-bg-svg" />
        <div className="hero-overlay" />

        <div className="hero-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${8 + Math.random() * 84}%`,
                top: `${10 + Math.random() * 70}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-badge" custom={0} variants={fadeUp}>
            <Zap size={14} /> Новая коллекция 2026
          </motion.span>
          <motion.h1 custom={1} variants={fadeUp}>
            Самые лучшие
            <span className="gradient-text"> музыкальные инструменты </span>
            в городе
          </motion.h1>
          <motion.p custom={2} variants={fadeUp}>
            Гитары, синтезаторы, барабаны и спецеффекты для твоего выступления 
            - все в одном месте. Лучшие цены в городе.
          </motion.p>
          <motion.div className="hero-actions" custom={3} variants={fadeUp}>
            <Link to="/catalog" className="btn btn-primary btn-glow">
              Смотреть каталог <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-glass">
              О нас
            </Link>
          </motion.div>

          <motion.div className="hero-stats" custom={4} variants={fadeUp}>
            <div>
              <strong>500+</strong>
              <span>Продуктов</span>
            </div>
            <div className="stat-divider" />
            <div>
              <strong>5000+</strong>
              <span>Клиентов</span>
            </div>
            <div className="stat-divider" />
            <div>
              <strong>24/7</strong>
              <span>Поддержка</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features">
        {[
          { icon: <Truck size={28} />, title: "Быстрая доставка", desc: "По Бишкеку за 2-3 часа" },
          { icon: <Shield size={28} />, title: "Гарантия", desc: "Официальная гарантия 1-3 года" },
          { icon: <Headphones size={28} />, title: "Поддержка 24/7", desc: "Служба тех. поддержки" },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Categories */}
      <section className="section">
        <div className="section-header">
          <h2>Категории</h2>
          <Link to="/catalog" className="see-all">
            Смотреть все <ArrowRight size={16} />
          </Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={`/catalog?cat=${cat.id}`} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} продуктов</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hits */}
      <section className="section">
        <div className="section-header">
          <h2>
            <Star size={22} fill="#fbbf24" stroke="#fbbf24" /> Популярное
          </h2>
          <Link to="/catalog" className="see-all">
            Смотреть все <ArrowRight size={16} />
          </Link>
        </div>
        <div className="products-grid">
          {hits.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      {newest.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>
              <Zap size={22} /> Свежее поступление
            </h2>
            <Link to="/catalog" className="see-all">
              Смотреть все <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {newest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sales */}
      {sales.length > 0 && (
        <section className="section">
          <div className="section-header">
            <h2>Скидки</h2>
            <Link to="/catalog" className="see-all">
              Смотреть все <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {sales.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-glow" />
        <h2>Все что вы хотите у нас!</h2>
        <Link to="/catalog" className="btn btn-primary btn-glow">
          Купить сейчас <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
