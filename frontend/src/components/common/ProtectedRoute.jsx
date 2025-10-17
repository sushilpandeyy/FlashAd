import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../../hooks/useWeb3';

const ProtectedRoute = ({ children }) => {
  const { account } = useWeb3();

  if (!account) {
    return <Navigate to="/connect" replace />;
  }

  return children;
};

export default ProtectedRoute;
