import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, updateCartQuantity, removeFromCart } = useStore();

  return (
    <div className="container py-5">
      <PageTitle eyebrow="Shopping bag" title="Your cart" description="Review quantities before moving to checkout." />

      {cartItems.length ? (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="page-surface p-3 p-md-4">
              <div className="d-grid gap-3">
                {cartItems.map((item) => (
                  <div className="card border-0 shadow-sm" key={item.productId}>
                    <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center">
                      <img src={item.product.image} alt={item.product.name} width="120" className="rounded-3" />
                      <div className="flex-grow-1">
                        <h5 className="fw-bold mb-1">{item.product.name}</h5>
                        <div className="text-secondary small">{formatCurrency(item.unitPrice)} each</div>
                        <div className="mt-3 d-flex align-items-center gap-2 flex-wrap">
                          <input
                            className="form-control"
                            style={{ maxWidth: '100px' }}
                            type="number"
                            min="1"
                            max={item.product.stock}
                            value={item.quantity}
                            onChange={(event) => updateCartQuantity(item.productId, Number(event.target.value))}
                          />
                          <button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(item.productId)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-md-end">
                        <div className="fw-bold fs-5">{formatCurrency(item.lineTotal)}</div>
                        <small className="text-secondary">Subtotal</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="page-surface p-4 sticky-top" style={{ top: '100px' }}>
              <h4 className="fw-bold mb-3">Order summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <span className="fw-bold">{formatCurrency(cartTotal)}</span>
              </div>
              <button className="btn btn-warning w-100 fw-semibold mb-2" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-outline-dark w-100">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-surface p-5 text-center">
          <h3 className="fw-bold">Your cart is empty</h3>
          <p className="text-secondary">Add products from the catalog to start building your order.</p>
          <Link to="/products" className="btn btn-dark">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
