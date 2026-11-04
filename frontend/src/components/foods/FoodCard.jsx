import { Link } from 'react-router-dom';
import FoodImage from './FoodImage';

// Render a clickable summary card for one menu item.
function FoodCard({ food, onSelect }) {
  return (
    <article className="food-card">
      <Link className="food-card__link" onClick={() => onSelect?.(food)} to={`/foods/${food.id}`}>
        <div className="food-card__image-wrap">
          <FoodImage food={food} />
          <span className="food-card__quick-add">+</span>
        </div>
        <div className="food-card__content">
          <span className="food-card__category">{food.category?.name || 'Yum Yard special'}</span>
          <h3>{food.name}</h3>
          <p className="food-card__description">{food.description || 'Freshly prepared at Yum Yard.'}</p>
          <div className="food-card__meta">
            <strong>Rs {Number(food.price).toFixed(2)}</strong>
            <span>★ {food.rating || '4.8'}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default FoodCard;
