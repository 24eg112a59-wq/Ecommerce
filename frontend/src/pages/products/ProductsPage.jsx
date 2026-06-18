import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProductCard from '../../components/ProductCard';
import SectionHeading from '../../components/SectionHeading';

const ProductsPage = () => {
  const { products } = useApp();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesKeyword = product.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesKeyword && matchesCategory;
    });
  }, [products, keyword, category]);

  return (
    <section className="container py-5">
      <SectionHeading
        eyebrow="Catalog"
        title="Browse products"
        description="Search products, filter by category, and open details from the catalog grid."
      />

      <div className="card surface-card mb-4">
        <div className="card-body row g-3 align-items-center">
          <div className="col-12 col-md-8">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search products by name"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4">
            <select
              className="form-select form-select-lg"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-xl-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
