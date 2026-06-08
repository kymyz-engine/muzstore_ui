import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div className="empty-cart">
      <CheckCircle size={64} strokeWidth={1} color="#34d399" />
      <h2>Заказ оформлен!</h2>
      <p>Номер заказа: #{id}</p>
      <p>Мы свяжемся с вами в ближайшее время.</p>
      <Link to="/catalog" className="btn btn-primary">Продолжить покупки</Link>
    </div>
  );
}