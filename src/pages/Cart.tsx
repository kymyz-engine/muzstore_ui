import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " сом";
}

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={64} strokeWidth={1} />
        <h2>Корзина пуста</h2>
        <p>Выберите товары из каталога</p>
        <Link to="/catalog" className="btn btn-primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/catalog" className="back-link">
          <ArrowLeft size={18} /> Вернуться в каталог
        </Link>
        <h1>Корзина</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item">
              <Link to={`/product/${product.id}`} className="cart-item-image">
                <img src={product.image} alt={product.name} />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${product.id}`} className="cart-item-name">
                  {product.name}
                </Link>
                <p className="cart-item-brand">{product.brand}</p>
              </div>

              <div className="cart-item-qty">
                <button onClick={() => updateQuantity(product.id, quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => updateQuantity(product.id, quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <div className="cart-item-price">
                {formatPrice(product.price * quantity)}
              </div>

              <button
                className="cart-item-remove"
                onClick={() => removeItem(product.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Заказ</h3>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Доставка</span>
              <span className="free">Бесплатно</span>
            </div>
          </div>

          <div className="summary-total">
            <span>В общем</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <button className="btn btn-primary checkout-btn">
            Заказать
          </button>

          <button className="btn btn-outline clear-btn" onClick={clearCart}>
            Очистить корзину
          </button>
        </aside>
      </div>
    </div>
  );
}
