import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const AdminOrdersPage = () => {
  const { orders } = useStore();

  return (
    <div>
      <PageTitle eyebrow="Operations" title="All orders" description="Track the order queue and fulfillment status." />
      {orders.length ? (
        <div className="d-grid gap-3">
          {orders.map((order) => (
            <div className="page-surface p-4" key={order.id}>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Order #{order.id}</h5>
                  <div className="text-secondary small">{order.userName} · {order.userEmail}</div>
                </div>
                <div className="text-md-end">
                  <div className="badge text-bg-warning text-dark mb-2">{order.status}</div>
                  <div className="fw-bold">{formatCurrency(order.totalPrice)}</div>
                </div>
              </div>
              <div className="row g-3">
                {order.products.map((item) => (
                  <div className="col-md-6 col-xl-4" key={`${order.id}-${item.productId}`}>
                    <div className="d-flex gap-3 border rounded-3 p-3 h-100">
                      <img src={item.image} alt={item.name} width="68" className="rounded-3" />
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-secondary small">Qty {item.quantity}</div>
                        <div>{formatCurrency(item.lineTotal)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="page-surface p-5 text-center">
          <h3 className="fw-bold">No orders yet</h3>
          <p className="text-secondary mb-0">Orders will show here after checkout in the demo storefront.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
