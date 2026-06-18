import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar bg-dark text-white">
        <div className="p-4 border-bottom border-secondary">
          <Link className="text-decoration-none text-white fw-bold fs-3" to="/admin/dashboard">
            ShopEZ Admin
          </Link>
          <div className="small text-white-50 mt-2">{currentUser?.name}</div>
        </div>
        <nav className="p-3 d-grid gap-2">
          <NavLink className="admin-link" to="/admin/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="admin-link" to="/admin/products">
            Products
          </NavLink>
          <NavLink className="admin-link" to="/admin/inventory">
            Inventory
          </NavLink>
          <NavLink className="admin-link" to="/admin/orders">
            Orders
          </NavLink>
          <NavLink className="admin-link" to="/admin/users">
            Users
          </NavLink>
          <Link className="btn btn-warning mt-3" to="/" onClick={logout}>
            Exit Admin
          </Link>
        </nav>
      </aside>
      <div className="admin-content">
        <header className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
          <div>
            <div className="fw-semibold">Admin Portal</div>
            <small className="text-secondary">Manage catalog, customers, orders, and inventory.</small>
          </div>
          <button className="btn btn-outline-dark btn-sm" type="button" onClick={logout}>
            Logout
          </button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
