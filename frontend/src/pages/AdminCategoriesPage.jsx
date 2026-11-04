import { useEffect, useState } from 'react';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryList from '../components/categories/CategoryList';
import ErrorMessage from '../components/common/ErrorMessage';
import Loading from '../components/common/Loading';
import { createCategory, getCategories } from '../services/categoryService';

// Manage menu categories from the protected admin area.
function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError('Failed to load categories. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleCreateCategory(categoryData) {
    setIsSubmitting(true);
    setError('');

    try {
      const newCategory = await createCategory(categoryData);
      setCategories((currentCategories) => [...currentCategories, newCategory]);
      return true;
    } catch {
      setError('Failed to create the category. Please check the form and try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-page">
      <header className="page-header">
        <p className="eyebrow">Yum Yard administration</p>
        <h1>Categories</h1>
        <p className="page-intro">Manage the categories used to organize your food menu.</p>
      </header>
      <ErrorMessage message={error} />
      <section className="category-layout">
        <CategoryForm onSubmit={handleCreateCategory} submitting={isSubmitting} />
        <section className="category-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Menu organization</p>
              <h2>All categories</h2>
            </div>
            {!isLoading && <span className="category-count">{categories.length}</span>}
          </div>
          {isLoading ? <Loading message="Loading categories..." /> : <CategoryList categories={categories} />}
        </section>
      </section>
    </main>
  );
}

export default AdminCategoriesPage;
