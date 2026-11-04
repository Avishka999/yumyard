import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import FoodCard from '../components/foods/FoodCard';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getFoods } from '../services/foodService';

function FoodsPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const categories = ['all', 'burgers', 'drinks', 'salads'];
  const routeCategory = location.pathname.slice(1);
  const activeCategory = categories.includes(routeCategory)
    ? routeCategory
    : searchParams.get('category') || 'all';

  useEffect(() => {
    async function loadFoods() {
      try {
        setFoods(await getFoods());
      } catch {
        setError('We could not load the menu. Please check that the Laravel API is running.');
      } finally {
        setIsLoading(false);
      }
    }

    loadFoods();
  }, []);

  const visibleFoods = useMemo(() => foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const categoryName = food.category?.name?.toLowerCase() || '';
    const matchesCategory = activeCategory === 'all' || categoryName.includes(activeCategory);
    return matchesSearch && matchesCategory;
  }), [activeCategory, foods, search]);

  function selectCategory(category) {
    if (category === 'all') {
      navigate('/foods');
      return;
    }
    navigate(`/${category}`);
  }

  return (
    <main className="menu-page">
      <section className="menu-hero">
        <p className="eyebrow">Good mood, great food</p>
        <h1>Find your next favourite meal.</h1>
        <p>Fresh burgers, cool drinks, and colourful salads made for your day.</p>
      </section>
      <section className="menu-toolbar">
        <label className="search-field" htmlFor="food-search">
          <span aria-hidden="true">⌕</span>
          <input id="food-search" onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" value={search} />
        </label>
        <div className="category-tabs" role="tablist" aria-label="Food categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'category-tab category-tab--active' : 'category-tab'}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
            >
              {category[0].toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>
      <ErrorMessage message={error} />
      {isLoading ? <Loading message="Loading the menu..." /> : (
        <section className="food-grid" aria-live="polite">
          {visibleFoods.map((food) => <FoodCard food={food} key={food.id} />)}
          {!visibleFoods.length && !error && <p className="empty-state">No matching dishes found.</p>}
        </section>
      )}
    </main>
  );
}

export default FoodsPage;
