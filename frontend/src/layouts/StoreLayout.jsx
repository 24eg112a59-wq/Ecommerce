import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

const StoreLayout = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { cartQuantity } = useStore();

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning border-3 sticky-top">
        <div className="container py-2">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            ShopEZ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart <span className="badge text-bg-warning text-dark ms-1">{cartQuantity}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders">
                  Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              {isAdmin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard">
                    Admin
                  </NavLink>
                </li>
              ) : null}
            </ul>
            <div className="d-flex align-items-center gap-2">
              {currentUser ? (
                <>
                  <span className="text-white-50 small d-none d-lg-inline">Welcome, {currentUser.name}</span>
                  <button className="btn btn-outline-light btn-sm" type="button" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-light btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-warning btn-sm">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-white-50 py-4 mt-auto">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
          <div>
            <div className="fw-bold text-white">ShopEZ</div>
            <small>A modern MERN e-commerce college project.</small>
          </div>
          <div className="small">Built with React, Bootstrap, and a clean route-first architecture.</div>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
