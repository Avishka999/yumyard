import CategoryItem from './CategoryItem';

function CategoryList({ categories }) {
  if (categories.length === 0) {
    return <p className="empty-state">No categories available yet.</p>;
  }

  return (
    <ul className="category-list">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </ul>
  );
}

export default CategoryList;
