import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation/Navigation';
import { Link } from 'react-router-dom';

// Shared customer shell containing navigation and the page outlet.
function CustomerLayout() {
  return (
    <>
      <header className="site-header">
        <NavLinkBrand />
        <Navigation />
      </header>
      <Outlet />
    </>
  );
}

function NavLinkBrand() {
  return <Link className="brand" to="/">Yum Yard</Link>;
}

export default CustomerLayout;
