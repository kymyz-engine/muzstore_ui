import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Calendar } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " сом";
}

export default function Cart() {
  const { items, removeItem, updateQuantity, updateRentDays, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const saleItems = items.filter((i) => !i.isRent);
  const rentItems = items.filter((i) => i.isRent);

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

          {/* Секция покупки */}
          {saleItems.length > 0 && (
            <div className="cart-section">
              <h2 className="cart-section-title">Покупка</h2>
              {saleItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.product.id}`} className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </Link>

                  <div className="cart-item-info">
                    <Link to={`/product/${item.product.id}`} className="cart-item-name">
                      {item.product.name}
                    </Link>
                    <p className="cart-item-brand">{item.product.brand}</p>
                  </div>

                  <div className="cart-item-qty">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    {formatPrice(Number(item.subtotal))}
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Секция аренды */}
          {rentItems.length > 0 && (
            <div className="cart-section">
              <h2 className="cart-section-title cart-section-title--rent">
                <Calendar size={17} /> Аренда
              </h2>
              {rentItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.product.id}`} className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </Link>

                  <div className="cart-item-info">
                    <Link to={`/product/${item.product.id}`} className="cart-item-name">
                      {item.product.name}
                    </Link>
                    <p className="cart-item-brand">{item.product.brand}</p>
                  </div>

                  <div className="cart-item-qty">
                    <button
                      onClick={() =>
                        updateRentDays(item.product.id, (item.rentDays ?? 1) - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.rentDays} дн.</span>
                    <button
                      onClick={() =>
                        updateRentDays(item.product.id, (item.rentDays ?? 1) + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    {formatPrice(Number(item.subtotal))}
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="cart-summary">
          <h3>Заказ</h3>

          <div className="summary-rows">
            {saleItems.length > 0 && (
              <div className="summary-row">
                <span>Товары ({saleItems.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>
                  {formatPrice(
                    Number(saleItems.reduce((s, i) => s + Number(i.subtotal), 0))
                  )}
                </span>
              </div>
            )}
            {rentItems.length > 0 && (
              <div className="summary-row">
                <span>Аренда ({rentItems.length} поз.)</span>
                <span>
                  {formatPrice(
                    Number(rentItems.reduce((s, i) => s + Number(i.subtotal), 0))
                  )}
                </span>
              </div>
            )}
            <div className="summary-row">
              <span>Доставка</span>
              <span className="free">Бесплатно</span>
            </div>
          </div>

          <div className="summary-total">
            <span>Итого</span>
            <span>{formatPrice(Number(totalPrice))}</span>
          </div>

          <button
            className="btn btn-primary checkout-btn"
            onClick={() => navigate("/checkout")}
          >
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