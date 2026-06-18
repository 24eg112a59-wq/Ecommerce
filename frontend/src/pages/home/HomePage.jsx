import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import StatCard from '../../components/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const HomePage = () => {
  const { products, addToCart } = useStore();
  const { currentUser } = useAuth();
  const featuredProducts = products.slice(0, 4);
  const topValue = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="container py-4 py-lg-5">
      <section className="hero-panel p-4 p-lg-5 mb-4 mb-lg-5 shadow-lg">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge hero-badge rounded-pill mb-3">MERN Commerce Platform</span>
            <h1 className="display-4 fw-bold mb-3">Shop smarter with ShopEZ.</h1>
            <p className="lead text-white-75 mb-4">
              Browse curated products, manage your cart, place orders, and review your shopping history in one clean experience.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/products" className="btn btn-warning btn-lg fw-semibold">
                Explore Products
              </Link>
              <Link to="/cart" className="btn btn-outline-light btn-lg">
                View Cart
              </Link>
            </div>
            <div className="mt-4 small text-white-50">
              {currentUser ? `Signed in as ${currentUser.name}` : 'Demo accounts are available for login and admin access.'}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="page-surface p-4 bg-white text-dark">
              <div className="row g-3">
                <div className="col-6"><StatCard label="Products" value={products.length} caption="Demo catalog" /></div>
                <div className="col-6"><StatCard label="Catalog Value" value={formatCurrency(topValue)} caption="Before discounts" /></div>
                <div className="col-12"><StatCard label="Fast Checkout" value="Ready" caption="Cart to order flow included" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageTitle
        eyebrow="Featured"
        title="Trending picks"
        description="A curated selection from the ShopEZ demo catalog."
      />

      <div className="row g-4 mb-5">
        {featuredProducts.map((product) => (
          <div className="col-md-6 col-xl-3" key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-md-4"><StatCard label="Secure Login" value="JWT" caption="Auth-ready architecture" /></div>
        <div className="col-md-4"><StatCard label="Admin Control" value="Live" caption="Users, orders, inventory" /></div>
        <div className="col-md-4"><StatCard label="Payments" value="Checkout" caption="Shipping and payment flow" /></div>
      </div>
    </div>
  );
};

export default HomePage;
