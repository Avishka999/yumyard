import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { getCategories } from '../services/categoryService';
import { getFoods } from '../services/foodService';

const categoryDetails = {
  burgers: {
    className: 'customer-category-card--burgers',
    image: '/menu/royal-cheese-burger.png',
    eyebrow: 'Most loved',
    tagline: 'Stacked high with big flavour.',
  },
  drinks: {
    className: 'customer-category-card--drinks',
    image: '/menu/velvet-shake.png',
    eyebrow: 'Cool & creamy',
    tagline: 'Refresh your routine.',
  },
  salads: {
    className: 'customer-category-card--salads',
    image: '/menu/chicken-salad.png',
    eyebrow: 'Good for you',
    tagline: 'Freshness in every bite.',
  },
};

// Display active categories that contain customer-visible menu items.
function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getCategories(), getFoods()])
      .then(([loadedCategories, loadedFoods]) => {
        setCategories(loadedCategories.filter((category) => (
          category.is_active
          && loadedFoods.some((food) => food.category_id === category.id)
        )));
        setFoods(loadedFoods);
      })
      .catch(() => setError('We could not load the categories right now. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="page-shell customer-categories-page">
      <header className="customer-categories-hero">
        <div>
          <p className="eyebrow">Browse by craving</p>
          <h1>What are you in the mood for?</h1>
          <p>Pick a category and find something delicious, freshly prepared just for you.</p>
        </div>
        <span className="customer-categories-hero__mark">✦</span>
      </header>

      <ErrorMessage message={error} />
      {isLoading ? <Loading message="Loading categories..." /> : (
        <section className="customer-category-grid" aria-label="Food categories">
          {categories.map((category) => {
            const slug = category.name.toLowerCase();
            const details = categoryDetails[slug] || {
              className: 'customer-category-card--default',
              image: '/menu/fruit-salad.png',
              eyebrow: 'Yum Yard menu',
              tagline: category.description || 'Something delicious awaits.',
            };
            const foodCount = foods.filter((food) => food.category_id === category.id).length;

            const categoryUrl = categoryDetails[slug] ? `/${slug}` : `/foods?category=${encodeURIComponent(slug)}`;

            return (
              <Link className={`customer-category-card ${details.className}`} key={category.id} to={categoryUrl}>
                <span className="customer-category-card__copy">
                  <small>{details.eyebrow}</small>
                  <strong>{category.name}</strong>
                  <span>{details.tagline}</span>
                  <b>Explore {foodCount} {foodCount === 1 ? 'item' : 'items'} <i>→</i></b>
                </span>
                <img alt="" src={details.image} />
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default CategoriesPage;
