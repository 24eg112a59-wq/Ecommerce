import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: 'user@shopez.com', password: 'User@123' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(formData);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-card page-surface p-4 p-md-5">
        <PageTitle
          eyebrow="Welcome back"
          title="Login to ShopEZ"
          description="Use the demo user credentials or the admin account to explore the app."
          align="center"
        />
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email</label>
            <input className="form-control form-control-lg" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input className="form-control form-control-lg" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-dark btn-lg">
            Login
          </button>
        </form>
        <div className="text-center mt-4 small text-secondary">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
