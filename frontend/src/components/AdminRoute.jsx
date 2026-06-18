import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AdminRoute = ({ children }) => {
  const { authUser } = useApp();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (authUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
