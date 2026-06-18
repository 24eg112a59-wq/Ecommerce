import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, placeOrder } = useStore();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'COD',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const order = await placeOrder({
        paymentMethod: formData.paymentMethod,
        address: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      });
      setSuccess('Order placed successfully');
      navigate('/orders', { state: { placedOrderId: order.id } });
    } catch (placeOrderError) {
      setError(placeOrderError.message);
    }
  };

  return (
    <div className="container py-5">
      <PageTitle eyebrow="Checkout" title="Shipping and payment" description="Enter your delivery details and finish the purchase." />
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {success ? <div className="alert alert-success">{success}</div> : null}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="page-surface p-4">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Address Line 1</label>
                <input className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Address Line 2</label>
                <input className="form-control" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input className="form-control" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <input className="form-control" name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Postal Code</label>
                <input className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input className="form-control" name="country" value={formData.country} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Payment Method</label>
                <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-warning btn-lg fw-semibold" disabled={!cartItems.length}>
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="page-surface p-4 sticky-top" style={{ top: '100px' }}>
            <h4 className="fw-bold mb-3">Payment summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Total</span>
              <span className="fw-bold">{formatCurrency(cartTotal)}</span>
            </div>
            <small className="text-secondary d-block mt-3">
              Demo checkout creates a local order record now. Phase 8 will connect the live backend.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
