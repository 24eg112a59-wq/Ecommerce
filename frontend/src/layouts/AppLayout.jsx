import { Link, NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AppLayout = () => {
  const { authUser, logout, cartItems } = useApp();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-shell">
      <header className="site-header sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark container py-3">
          <Link to="/" className="navbar-brand brand-mark">
            ShopEZ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart <span className="badge rounded-pill text-bg-light ms-1">{cartCount}</span>
                </NavLink>
              </li>
              {authUser ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/orders" className="nav-link">
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  {authUser.role === 'admin' && (
                    <li className="nav-item">
                      <NavLink to="/admin" className="nav-link">
                        Admin
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-outline-light btn-sm ms-lg-2" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="btn btn-warning btn-sm ms-lg-2">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer py-4 mt-5">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>ShopEZ © 2026</span>
          <span>Built with MERN stack for college project delivery</span>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
