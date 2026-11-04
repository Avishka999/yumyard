function FoodImage({ food, className = '' }) {
  if (!food.image) {
    return (
      <div className={`food-image food-image--empty ${className}`} aria-label={`${food.name} image unavailable`}>
        <span>🍽️</span>
      </div>
    );
  }

  const imageSource = food.image.startsWith('/')
    ? `${window.location.origin}${food.image}`
    : food.image;

  return <img alt={food.name} className={`food-image ${className}`} src={imageSource} />;
}

export default FoodImage;
