import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData);
      navigate('/');
    } catch (registerError) {
      setError(registerError.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-card page-surface p-4 p-md-5">
        <PageTitle
          eyebrow="Create account"
          title="Register for ShopEZ"
          description="Create a demo customer account to use the storefront flow."
          align="center"
        />
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Name</label>
            <input className="form-control form-control-lg" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input className="form-control form-control-lg" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input className="form-control form-control-lg" name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <button type="submit" className="btn btn-warning btn-lg fw-semibold">
            Register
          </button>
        </form>
        <div className="text-center mt-4 small text-secondary">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
