import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useStore } from '../../context/StoreContext';
import { formatCurrency } from '../../utils/money';

const AdminInventoryPage = () => {
  const { products, updateInventory } = useStore();
  const [editingId, setEditingId] = useState('');
  const [formData, setFormData] = useState({ stock: '', discount: '' });

  const startEditing = (product) => {
    setEditingId(product.id);
    setFormData({ stock: product.stock, discount: product.discount });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateInventory(editingId, {
      stock: Number(formData.stock),
      discount: Number(formData.discount),
    });
    setEditingId('');
    setFormData({ stock: '', discount: '' });
  };

  return (
    <div>
      <PageTitle eyebrow="Inventory" title="Manage stock" description="Update product stock and discount values." />
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="page-surface p-3 p-md-4">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Discount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{product.stock}</td>
                      <td>{product.discount}%</td>
                      <td>
                        <button className="btn btn-sm btn-outline-dark" type="button" onClick={() => startEditing(product)}>
                          Edit
                        </button>
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
            <h5 className="fw-bold mb-3">Update inventory</h5>
            {editingId ? (
              <form className="d-grid gap-3" onSubmit={handleSubmit}>
                <div>
                  <label className="form-label">Stock</label>
                  <input className="form-control" type="number" min="0" value={formData.stock} onChange={(event) => setFormData((current) => ({ ...current, stock: event.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Discount</label>
                  <input className="form-control" type="number" min="0" max="100" value={formData.discount} onChange={(event) => setFormData((current) => ({ ...current, discount: event.target.value }))} />
                </div>
                <button className="btn btn-warning fw-semibold" type="submit">Save changes</button>
              </form>
            ) : (
              <div className="text-secondary">Choose a product from the table to update its inventory data.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryPage;
