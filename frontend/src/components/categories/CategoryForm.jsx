import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const initialFormState = {
  name: '',
  description: '',
};

// Collect validated category data for the admin page.
function CategoryForm({ onSubmit, submitting = false }) {
  const [formData, setFormData] = useState(initialFormState);
  const [validationError, setValidationError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
    setValidationError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Category name is required.');
      return;
    }

    const wasCreated = await onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim() || null,
    });

    if (wasCreated) {
      setFormData(initialFormState);
    }
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div>
        <h2>Add a category</h2>
        <p className="muted-text">Organize the menu into easy-to-browse groups.</p>
      </div>
      <Input
        id="category-name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. Main dishes"
        error={validationError}
        required
      />
      <label className="form-field" htmlFor="category-description">
        <span>Description</span>
        <textarea
          id="category-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add a short description"
          rows="3"
        />
      </label>
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Add category'}
      </Button>
    </form>
  );
}

export default CategoryForm;
