import { Link } from "react-router-dom";
import { ShoppingCart, Check, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " сом";
}

const badgeLabels: Record<string, string> = {
  new: "Новое",
  sale: "Скидкы",
  hit: "Хит",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {badgeLabels[product.badge]}
          </span>
        )}
        {!product.inStock && <span className="out-of-stock-overlay">Нет в наличии</span>}
      </Link>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-rating">
          <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="product-old-price">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {discount > 0 && <span className="discount-tag">-{discount}%</span>}
        </div>

        <button
          className={`add-to-cart-btn ${inCart ? "in-cart" : ""}`}
          onClick={() => !inCart && addItem(product)}
          disabled={!product.inStock}
        >
          {inCart ? (
            <>
              <Check size={16} /> В корзине
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> В корзину
            </>
          )}
        </button>
      </div>
    </article>
  );
}
