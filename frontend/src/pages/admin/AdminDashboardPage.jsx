import PageTitle from '../../components/PageTitle';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const AdminDashboardPage = () => {
  const { users } = useAuth();
  const { products, orders, inventorySummary } = useStore();
  const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div>
      <PageTitle eyebrow="Analytics" title="Dashboard" description="High-level store metrics for the admin portal." />
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard label="Users" value={users.length} caption="Registered accounts" /></div>
        <div className="col-md-3"><StatCard label="Products" value={products.length} caption="Catalog items" /></div>
        <div className="col-md-3"><StatCard label="Orders" value={orders.length} caption="Local order records" /></div>
        <div className="col-md-3"><StatCard label="Revenue" value={formatCurrency(revenue)} caption="Demo total" /></div>
      </div>
      <div className="page-surface p-4">
        <h5 className="fw-bold mb-3">Inventory watch</h5>
        <div className="text-secondary mb-3">Products with low stock need attention before restocking runs out.</div>
        <div className="d-grid gap-2">
          {inventorySummary.lowStockProducts.length ? inventorySummary.lowStockProducts.map((product) => (
            <div className="d-flex justify-content-between border rounded-3 p-3" key={product.id}>
              <span>{product.name}</span>
              <span className="badge text-bg-warning text-dark">Stock {product.stock}</span>
            </div>
          )) : <div className="text-success fw-semibold">No low-stock items right now.</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
