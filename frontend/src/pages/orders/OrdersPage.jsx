import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SectionHeading from '../../components/SectionHeading';

const OrdersPage = () => {
  const { orders } = useApp();
  const location = useLocation();
  const placedOrderId = location.state?.placedOrderId;

  return (
    <section className="container py-5">
      <SectionHeading
        eyebrow="Orders"
        title="Order history"
        description="Review previous orders and their delivery status."
      />

      {placedOrderId && (
        <div className="alert alert-success">
          Order <strong>{placedOrderId}</strong> has been placed successfully.
        </div>
      )}

      <div className="row g-4">
        {orders.map((order) => (
          <div key={order.id} className="col-12">
            <div className="card surface-card">
              <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3">
                <div>
                  <div className="text-muted small">{order.date}</div>
                  <h5 className="mb-1">{order.id}</h5>
                  <div className="text-secondary">{order.items.length} items</div>
                  <div className="text-secondary">{order.paymentMethod}</div>
                </div>
                <div className="text-md-end">
                  <div className="order-status">{order.status}</div>
                  <div className="fw-bold fs-5 mt-2">₹{order.totalPrice}</div>
                  <div className="text-secondary">
                    {order.address.city}, {order.address.state}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
