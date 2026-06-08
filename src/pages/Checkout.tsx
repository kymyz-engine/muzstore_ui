import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Truck, Building, User, MapPin, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/order";

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " сом";
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [city, setCity]               = useState("Бишкек");
  const [district, setDistrict]       = useState("");
  const [address, setAddress]         = useState("");
  const [comment, setComment]         = useState("");
  const [deliveryType, setDeliveryType] = useState<"courier" | "pickup">("courier");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const handleSubmit = () => {
    if (!firstName || !phone) {
      setError("Заполните имя и телефон");
      return;
    }
    setLoading(true);
    setError(null);
    createOrder({ firstName, lastName, phone, email, city, district, address, comment, deliveryType })
      .then((order) => {
        clearCart();
        navigate(`/order-success/${order.id}`);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  if (items.length === 0) {
    return (
      <div className="not-found">
        <h2>Корзина пуста</h2>
        <Link to="/catalog" className="btn btn-primary">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Link to="/cart" className="back-link">
        <ArrowLeft size={18} /> Вернуться в корзину
      </Link>
      <h1>Оформление заказа</h1>

      <div className="checkout-layout">
        <div className="checkout-left">

          <div className="co-card">
            <h3><User size={16} /> Контактные данные</h3>
            <div className="row2">
              <div className="field">
                <label>Имя</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Айбек" />
              </div>
              <div className="field">
                <label>Фамилия</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Уметов" />
              </div>
            </div>
            <div className="row2">
              <div className="field">
                <label>Телефон</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+996 700 000 000" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="aibek@mail.com" />
              </div>
            </div>
          </div>

          <div className="co-card">
            <h3><Truck size={16} /> Способ доставки</h3>
            <div className="delivery-opts">
              <label className={`delivery-opt ${deliveryType === "courier" ? "sel" : ""}`}>
                <input type="radio" name="delivery" value="courier"
                  checked={deliveryType === "courier"}
                  onChange={() => setDeliveryType("courier")} />
                <Truck size={18} />
                <div className="delivery-opt-info">
                  <b>Курьер по Бишкеку</b>
                  <span>1–2 рабочих дня</span>
                </div>
                <span className="free-tag">Бесплатно</span>
              </label>
              <label className={`delivery-opt ${deliveryType === "pickup" ? "sel" : ""}`}>
                <input type="radio" name="delivery" value="pickup"
                  checked={deliveryType === "pickup"}
                  onChange={() => setDeliveryType("pickup")} />
                <Building size={18} />
                <div className="delivery-opt-info">
                  <b>Самовывоз</b>
                  <span>ул. Манаса 50, Бишкек</span>
                </div>
                <span className="free-tag">Бесплатно</span>
              </label>
            </div>
          </div>

          <div className="co-card">
            <h3><MapPin size={16} /> Адрес доставки</h3>
            <div className="field">
              <label>Улица и дом</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="ул. Чуй 100, кв. 5" />
            </div>
            <div className="row2">
              <div className="field">
                <label>Город</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Бишкек" />
              </div>
              <div className="field">
                <label>Район</label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Октябрьский" />
              </div>
            </div>
            <div className="field">
              <label>Комментарий</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Домофон не работает..." />
            </div>
          </div>

        </div>

        <aside className="checkout-summary">
          <div className="co-card">
            <h3><ShoppingBag size={16} /> Ваш заказ</h3>
            <div className="order-items">
              {items.map((item) => (
                <div key={item.product.id} className="order-item">
                  <div>
                    <p className="order-name">{item.product.name}</p>
                    <p className="order-brand">{item.product.brand} · {item.quantity} шт</p>
                  </div>
                  <span className="order-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="sum-row"><span>Товары</span><span>{formatPrice(totalPrice)}</span></div>
            <div className="sum-row"><span>Доставка</span><span className="free-tag">Бесплатно</span></div>
            <div className="sum-total"><span>Итого</span><span>{formatPrice(totalPrice)}</span></div>

            {error && <p className="error-msg">{error}</p>}

            <button className="btn btn-primary checkout-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Оформляем..." : "Подтвердить заказ"}
            </button>
            <div className="safe-note"><ShieldCheck size={14} /> Данные защищены</div>
          </div>
        </aside>
      </div>
    </div>
  );
}