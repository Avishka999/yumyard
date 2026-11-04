import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import FoodForm from '../components/foods/FoodForm';
import Loading from '../components/common/Loading';
import { getCategories } from '../services/categoryService';
import { createFood, getFoods } from '../services/foodService';

// Create foods and review the current menu catalog as an administrator.
function AdminFoodsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFoods(), getCategories()])
      .then(([loadedFoods, loadedCategories]) => {
        setFoods(loadedFoods);
        setCategories(loadedCategories);
      })
      .catch(() => setError('Unable to load food management data.'))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const food = await createFood({
        name: formData.get('name'),
        price: formData.get('price'),
        category_id: formData.get('category_id'),
        description: formData.get('description') || null,
      });
      setFoods((current) => [...current, food]);
      event.currentTarget.reset();
    } catch {
      setError('Unable to create food. Check the category and form values.');
    }
  }

  return (
    <main className="admin-page">
      <p className="eyebrow">Menu management</p>
      <h1>Manage foods</h1>
      <ErrorMessage message={error} />
      <section className="admin-management-grid">
        <FoodForm categories={categories} onSubmit={handleSubmit} />
        {isLoading ? <Loading message="Loading foods..." /> : (
          <div className="admin-table">
            {foods.map((food) => <div className="admin-table-row" key={food.id}><strong>{food.name}</strong><span>Rs {Number(food.price).toFixed(2)}</span><small>{food.category?.name || 'Uncategorized'}</small></div>)}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminFoodsPage;
