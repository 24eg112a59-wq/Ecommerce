import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const OrderHistoryPage = () => {
  const { userOrders } = useStore();

  return (
    <div className="container py-5">
      <PageTitle eyebrow="Orders" title="Order history" description="Review your placed orders and delivery status." />
      {userOrders.length ? (
        <div className="d-grid gap-4">
          {userOrders.map((order) => (
            <div className="page-surface p-4" key={order.id}>
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Order #{order.id}</h5>
                  <div className="text-secondary small">Placed on {new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-md-end">
                  <div className="badge text-bg-warning text-dark mb-2">{order.status}</div>
                  <div className="fw-bold">{formatCurrency(order.totalPrice)}</div>
                </div>
              </div>
              <div className="row g-3">
                {order.products.map((item) => (
                  <div className="col-md-6 col-xl-4" key={`${order.id}-${item.productId}`}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body d-flex gap-3 align-items-start">
                        <img src={item.image} alt={item.name} width="72" className="rounded-3" />
                        <div>
                          <h6 className="fw-bold mb-1">{item.name}</h6>
                          <div className="text-secondary small">Qty: {item.quantity}</div>
                          <div className="fw-semibold">{formatCurrency(item.lineTotal)}</div>
                        </div>
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
          <p className="text-secondary mb-0">Place your first order to see it appear here.</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
