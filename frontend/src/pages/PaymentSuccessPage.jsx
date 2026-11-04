import { Link } from 'react-router-dom';

function PaymentSuccessPage() {
  return (
    <main className="success-page">
      <section className="success-card">
        <div className="success-icon">✓</div>
        <h1>Success!</h1>
        <p>Your payment was successful.</p>
        <Link className="button" to="/foods">Continue shopping</Link>
      </section>
    </main>
  );
}

export default PaymentSuccessPage;
