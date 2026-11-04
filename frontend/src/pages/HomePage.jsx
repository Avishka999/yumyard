import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <span className="hero-kicker"><span className="hero-kicker__dot" /> Freshly made, always delicious</span>
          <h1>Your daily dose of <em>delicious.</em></h1>
          <p>From craveable burgers to refreshing drinks, discover food made to brighten your day.</p>
          <div className="hero-actions">
            <Link className="button button--large" to="/foods">Explore the menu <span>→</span></Link>
            <span className="hero-note">★ 4.9/5 from happy foodies</span>
          </div>
        </div>
        <div className="home-hero__visual">
          <div className="hero-glow" />
          <img alt="Crispy chicken burger" src="/menu/crispy-chicken-burger.png" />
          <span className="floating-badge floating-badge--top">100%<small>fresh</small></span>
          <span className="floating-badge floating-badge--bottom">20 min<small>delivery</small></span>
        </div>
      </section>
      <section className="home-section">
        <div className="section-title-row">
          <div>
            <span className="section-label">Explore the menu</span>
            <h2>Something for every craving</h2>
          </div>
          <Link className="text-link" to="/foods">View all <span>→</span></Link>
        </div>
        <div className="home-categories">
          <Link className="category-feature category-feature--burgers" to="/burgers">
            <span className="category-feature__copy"><small>Most loved</small><strong>Burgers</strong><span>Big flavour, stacked high</span></span>
            <img alt="" src="/menu/royal-cheese-burger.png" />
          </Link>
          <Link className="category-feature category-feature--drinks" to="/drinks">
            <span className="category-feature__copy"><small>Cool & creamy</small><strong>Drinks</strong><span>Refresh your routine</span></span>
            <img alt="" src="/menu/velvet-shake.png" />
          </Link>
          <Link className="category-feature category-feature--salads" to="/salads">
            <span className="category-feature__copy"><small>Good for you</small><strong>Salads</strong><span>Freshness in every bite</span></span>
            <img alt="" src="/menu/chicken-salad.png" />
          </Link>
        </div>
      </section>
      <section className="home-promise">
        <div><span className="promise-icon">✦</span><strong>Made with care</strong><span>Quality ingredients, prepared fresh.</span></div>
        <div><span className="promise-icon">⌁</span><strong>Fast delivery</strong><span>Hot food at your door in 20–30 mins.</span></div>
        <div><span className="promise-icon">♡</span><strong>Made for you</strong><span>Easy ordering, happy eating.</span></div>
      </section>
    </main>
  );
}

export default HomePage;
