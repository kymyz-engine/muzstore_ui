import { useState, useEffect } from "react";
import { fetchCategories } from "../api/categories";
import type { Category, CategoryId } from "../types";

interface Props {
  selected: CategoryId | null;
  onSelect: (id: CategoryId | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="category-filter">
      <button
        className={`cat-btn ${selected === null ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        <img className="cat-icon" src="https://img.icons8.com/?size=100&id=nKRW0uVSnqxV&format=png&color=000000" />
        Все
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`cat-btn ${selected === cat.id ? "active" : ""}`}
          onClick={() => onSelect(cat.id)}
        >
          <img className="cat-icon" src={cat.icon}/>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}