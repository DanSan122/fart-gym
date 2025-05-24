import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
