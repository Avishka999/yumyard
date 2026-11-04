function CategoryItem({ category }) {
  return (
    <li className="category-item">
      <div>
        <h3>{category.name}</h3>
        {category.description && <p>{category.description}</p>}
      </div>
      <span className={category.is_active ? 'category-status' : 'category-status category-status--inactive'}>
        {category.is_active ? 'Active' : 'Inactive'}
      </span>
    </li>
  );
}

export default CategoryItem;
