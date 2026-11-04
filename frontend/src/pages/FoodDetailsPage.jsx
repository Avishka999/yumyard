import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import FoodImage from '../components/foods/FoodImage';
import Loading from '../components/common/Loading';
import useCart from '../hooks/useCart';
import { getFood } from '../services/foodService';

function FoodDetailsPage() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFood() {
      try {
        setFood(await getFood(foodId));
      } catch {
        setError('We could not find this food item.');
      }
    }

    loadFood();
  }, [foodId]);

  if (error) {
    return <main className="page-shell"><ErrorMessage message={error} /><Link to="/foods">Back to menu</Link></main>;
  }

  if (!food) {
    return <Loading message="Loading dish..." />;
  }

  const total = Number(food.price) * quantity;

  function addFoodToCart() {
    for (let index = 0; index < quantity; index += 1) {
      addToCart(food);
    }
    navigate('/cart');
  }

  return (
    <main className="detail-page">
      <Link className="back-link" to="/foods">← Back to menu</Link>
      <div className="detail-layout">
        <FoodImage className="detail-image" food={food} />
        <section className="detail-content">
          <p className="eyebrow">{food.category?.name || 'Yum Yard special'}</p>
          <h1>{food.name}</h1>
          <div className="rating-line">★ {food.rating || '4.8'} <span>•</span> 20 mins</div>
          <p className="detail-description">{food.description || 'Made fresh with quality ingredients and served with care.'}</p>
          <div className="quantity-control">
            <span>Portion</span>
            <div>
              <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} type="button">−</button>
              <strong>{String(quantity).padStart(2, '0')}</strong>
              <button onClick={() => setQuantity((current) => current + 1)} type="button">+</button>
            </div>
          </div>
          <div className="detail-actions">
            <strong>Rs {total.toFixed(2)}</strong>
            <button className="button button--dark" onClick={addFoodToCart} type="button">Add to cart</button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodDetailsPage;
