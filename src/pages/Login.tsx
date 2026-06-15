import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log("login attempt:", username, password);
    setLoading(true);
    setError(null);
    login(username, password)
      .then(() => navigate("/"))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="checkout-page" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Вход</h1>
      <div className="co-card">
        <div className="field">
          <label>Логин</label>
          <input type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin" />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" />
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="btn btn-primary checkout-btn"
          onClick={handleSubmit} disabled={loading}>
          {loading ? "Входим..." : "Войти"}
        </button>
      </div>
    </div>
  );
}