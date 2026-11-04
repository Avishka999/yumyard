import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page-shell not-found-page">
      <p className="eyebrow">Page not found</p>
      <h1>That page does not exist.</h1>
      <p className="page-intro">The page you requested could not be found.</p>
      <Link className="button button--link" to="/categories">
        View categories
      </Link>
    </main>
  );
}

export default NotFoundPage;
