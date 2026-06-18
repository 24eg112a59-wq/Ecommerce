import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency, getDiscountedPrice } from '../../utils/money';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addToCart } = useStore();

  const product = useMemo(() => getProductById(id), [getProductById, id]);

  if (!product) {
    return (
      <div className="container py-5">
        <div className="page-surface p-5 text-center">
          <h2 className="fw-bold">Product not found</h2>
          <p className="text-secondary">The product you requested does not exist in the catalog.</p>
          <Link to="/products" className="btn btn-dark">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    navigate('/cart');
  };

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        <div className="col-lg-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded-4 shadow-sm" />
        </div>
        <div className="col-lg-6">
          <PageTitle eyebrow={product.category} title={product.name} description={product.description} />
          <div className="page-surface p-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="fs-2 fw-bold">{formatCurrency(discountedPrice)}</div>
              <span className="text-secondary text-decoration-line-through">{formatCurrency(product.price)}</span>
              <span className="badge text-bg-warning text-dark">-{product.discount}%</span>
            </div>
            <div className="mb-3">
              <strong>Stock:</strong> {product.stock}
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-warning btn-lg fw-semibold" onClick={handleAddToCart} disabled={product.stock === 0}>
                Add to Cart
              </button>
              <Link to="/checkout" className="btn btn-dark btn-lg">
                Go to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
