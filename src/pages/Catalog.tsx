import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { fetchProducts } from "../api/products";
import type { CategoryId, SortOption, Product } from "../types";

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") as CategoryId | null;
  const initialQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const [category, setCategory] = useState<CategoryId | null>(initialCat);
  const [sort, setSort]         = useState<SortOption>("rating");
  const [query, setQuery]       = useState(initialQuery);
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // загружаем с бэка при изменении категории, сортировки, цены
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProducts({
      category:  category ?? undefined,
      priceMin:  priceRange[0] > 0 ? priceRange[0] : undefined,
      priceMax:  priceRange[1] < 200000 ? priceRange[1] : undefined,
      sort,
    })
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category, sort, priceRange]);

  // поиск и inStock фильтруем локально (без лишних запросов)
  const filtered = useMemo(() => {
    let result = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (inStockOnly) result = result.filter((p) => p.inStock);

    return result;
  }, [products, query, inStockOnly]);

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог</h1>
        <p>{filtered.length} продукт табылды</p>
      </div>

      <CategoryFilter selected={category} onSelect={setCategory} />

      <div className="catalog-toolbar">
        <div className="search-input-wrap">
          <input
            type="text"
            placeholder="Издөө..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="catalog-search"
          />
        </div>

        <div className="toolbar-right">
          <label className="stock-toggle">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span>Кампада бар</span>
          </label>

          <div className="price-filter">
            <SlidersHorizontal size={16} />
            <input
              type="range"
              min={0}
              max={200000}
              step={5000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
            <span>{priceRange[1].toLocaleString("ru-RU")} сом</span>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="sort-select"
          >
            <option value="rating">Рейтинг боюнча</option>
            <option value="price-asc">Арзан → Кымбат</option>
            <option value="price-desc">Кымбат → Арзан</option>
            <option value="name">Аталышы боюнча</option>
          </select>

          <div className="view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
              <Grid3X3 size={18} />
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="loading-state">Жүктөлүүдө...</div>}
      {error   && <div className="error-state">Катa: {error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <p>Продукт табылган жок</p>
          <button className="btn btn-outline" onClick={() => { setCategory(null); setQuery(""); }}>
            Фильтрлерди тазалоо
          </button>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={`products-grid ${view === "list" ? "list-view" : ""}`}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}