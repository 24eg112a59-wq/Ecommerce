import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

const ProductListPage = () => {
  const { products, addToCart } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, products, query]);

  return (
    <div className="container py-5">
      <PageTitle
        eyebrow="Catalog"
        title="Browse products"
        description="Search the ShopEZ collection and filter by category."
      />

      <div className="page-surface p-3 p-md-4 mb-4">
        <div className="row g-3">
          <div className="col-md-8">
            <input
              className="form-control form-control-lg"
              type="search"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select className="form-select form-select-lg" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div className="col-md-6 col-xl-4" key={product.id}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </div>
        ))}
      </div>

      {!filteredProducts.length ? (
        <div className="page-surface p-5 text-center mt-4">
          <h3 className="fw-bold">No products found</h3>
          <p className="text-secondary mb-0">Try a different search term or category.</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductListPage;
