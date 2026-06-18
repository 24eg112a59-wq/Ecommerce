import { Link } from 'react-router-dom';
import { formatCurrency, getDiscountedPrice } from '../utils/money';

const ProductCard = ({ product, onAddToCart }) => {
  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  return (
    <div className="card h-100 product-card border-0 shadow-sm">
      <img src={product.image} className="card-img-top product-image" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
          <span className="badge rounded-pill text-bg-dark">{product.category}</span>
          <span className="badge rounded-pill text-bg-warning text-dark">-{product.discount}%</span>
        </div>
        <h5 className="card-title fw-bold">{product.name}</h5>
        <p className="card-text text-secondary small flex-grow-1">{product.description}</p>
        <div className="d-flex align-items-center justify-content-between mt-auto mb-3">
          <div>
            <div className="fw-bold fs-5">{formatCurrency(discountedPrice)}</div>
            <small className="text-secondary text-decoration-line-through">{formatCurrency(product.price)}</small>
          </div>
          <span className="small text-secondary">Stock: {product.stock}</span>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/products/${product.id}`} className="btn btn-outline-dark flex-grow-1">
            View Details
          </Link>
          <button
            type="button"
            className="btn btn-warning flex-grow-1"
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
