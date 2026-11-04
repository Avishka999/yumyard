import Button from '../common/Button';
import Input from '../common/Input';

// Collect the menu fields needed to create a food item.
function FoodForm({ categories = [], onSubmit }) {
  return (
    <form className="food-form" onSubmit={onSubmit}>
      <Input id="food-name" label="Food name" name="name" required />
      <label className="form-field" htmlFor="food-category">
        <span>Category</span>
        <select id="food-category" name="category_id" required>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <Input id="food-price" label="Price" min="0" name="price" required step="0.01" type="number" />
      <label className="form-field" htmlFor="food-description">
        <span>Description</span>
        <textarea id="food-description" name="description" rows="3" />
      </label>
      <Button type="submit">Save food</Button>
    </form>
  );
}

export default FoodForm;
