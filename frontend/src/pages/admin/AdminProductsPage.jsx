import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const emptyProduct = {
  name: '',
  description: '',
  image: '',
  category: '',
  price: '',
  stock: '',
  discount: '',
};

const AdminProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [editingId, setEditingId] = useState('');
  const [formData, setFormData] = useState(emptyProduct);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setFormData(product);
  };

  const resetForm = () => {
    setEditingId('');
    setFormData(emptyProduct);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      discount: Number(formData.discount),
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await addProduct(payload);
    }

    resetForm();
  };

  return (
    <div>
      <PageTitle eyebrow="Catalog" title="Manage products" description="Create, update, and delete products in the demo store." />
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="page-surface p-3 p-md-4">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.stock}</td>
                      <td className="text-end">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-dark" type="button" onClick={() => startEditing(product)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => deleteProduct(product.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="page-surface p-4">
            <h5 className="fw-bold mb-3">{editingId ? 'Edit product' : 'Add product'}</h5>
            <form className="d-grid gap-3" onSubmit={handleSubmit}>
              {['name', 'description', 'image', 'category', 'price', 'stock', 'discount'].map((field) => (
                <div key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  {field === 'description' ? (
                    <textarea className="form-control" name={field} rows="3" value={formData[field]} onChange={handleChange} required />
                  ) : (
                    <input
                      className="form-control"
                      name={field}
                      type={['price', 'stock', 'discount'].includes(field) ? 'number' : 'text'}
                      min={field === 'stock' || field === 'discount' ? '0' : undefined}
                      max={field === 'discount' ? '100' : undefined}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
              <button className="btn btn-warning fw-semibold" type="submit">
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
              {editingId ? (
                <button className="btn btn-outline-dark" type="button" onClick={resetForm}>
                  Cancel Edit
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
