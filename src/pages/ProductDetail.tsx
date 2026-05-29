import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Check, Star, ArrowLeft, Package, Shield, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { fetchProduct, fetchProducts } from "../api/products";
import type { Product } from "../types";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " сом";
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem, isInCart } = useCart();

  const [product, setProduct]   = useState<Product | null>(null);
  const [related, setRelated]   = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchProduct(Number(id))
      .then((p) => {
        setProduct(p);
        // загружаем похожие по категории
        return fetchProducts({ category: p.category });
      })
      .then((all) => {
        setRelated(all.filter((p) => p.id !== Number(id)).slice(0, 4));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-state">Загрузка...</div>;
  if (error || !product) {
    return (
      <div className="not-found">
        <h2>Продукт не найден</h2>
        <Link to="/catalog" className="btn btn-primary">
          <ArrowLeft size={18} /> Вернуться в каталог
        </Link>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  // остальной JSX без изменений — product тот же тип
  return (
    <div className="product-detail">
      <Link to="/catalog" className="back-link">
        <ArrowLeft size={18} /> Вернуться в каталог
      </Link>

      <div className="detail-main">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className={`product-badge badge-${product.badge}`}>
              {product.badge === "new" ? "Новое" : product.badge === "sale" ? "Скидка" : "Хит"}
            </span>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-brand">{product.brand}</p>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18}
                  fill={i < Math.round(product.rating) ? "#fbbf24" : "none"}
                  stroke="#fbbf24"
                />
              ))}
            </div>
            <span>{product.rating} ({product.reviews} отзывов)</span>
          </div>

          <div className="detail-price">
            <span className="price-main">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="price-old">{formatPrice(product.oldPrice)}</span>
                <span className="discount-tag">-{discount}%</span>
              </>
            )}
          </div>

          <p className={`stock-status ${product.inStock ? "in-stock" : "no-stock"}`}>
            <Package size={16} />
            {product.inStock ? "Есть в наличии" : "Нет в наличии"}
          </p>

          <p className="detail-desc">{product.description}</p>

          <button
            className={`btn ${inCart ? "btn-success" : "btn-primary"} add-btn`}
            onClick={() => !inCart && addItem(product)}
            disabled={!product.inStock}
          >
            {inCart ? <><Check size={18} /> В корзине</> : <><ShoppingCart size={18} /> Добавить в корзину</>}
          </button>

          <div className="detail-perks">
            <div><Truck size={18} /> Быстрая доставка по Бишкеку</div>
            <div><Shield size={18} /> Официальная гарантия</div>
          </div>
        </div>
      </div>

      <section className="specs-section">
        <h2>Технические характеристики</h2>
        <div className="specs-table">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="spec-row">
              <span className="spec-label">{key}</span>
              <span className="spec-value">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <h2>Похожие</h2>
          <div className="products-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}