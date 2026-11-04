import { NavLink } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';

function Navigation() {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="site-navigation" aria-label="Primary navigation">
      <div className="site-navigation__links">
        <NavLink to="/foods">Menu</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}
      </div>
      <div className="site-navigation__actions">
        <NavLink className="cart-link" to="/cart" aria-label={`Cart with ${cart.length} items`}>
          <span className="cart-link__icon">🛒</span>
          <span className="cart-link__label">Cart</span>
          <span className="cart-link__count">{cart.length}</span>
        </NavLink>
        {isAuthenticated ? (
          <button className="profile-button" onClick={logout} title={`Log out ${user?.name || 'account'}`} type="button">
            <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
          </button>
        ) : (
          <NavLink className="login-link" to="/login">Log in</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
