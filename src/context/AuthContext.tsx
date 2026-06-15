import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: number;
  name: string;
  login: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// захардкоженные аккаунты
const USERS = [
  { id: 1, name: "дрочил", login: "qwerty", password: "qwerty" },
  { id: 2, name: "Администратор", login: "admin", password: "admin" },
  { id: 2, name: "Иман", login: "iman", password: "asdf" },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string, password: string) => {
    const found = USERS.find(
      (u) => u.login === username && u.password === password
    );
    if (!found) throw new Error("Неверный логин или пароль");
    const u = { id: found.id, name: found.name, login: found.login };
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}