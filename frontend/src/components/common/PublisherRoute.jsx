import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../../hooks/useWeb3';

const PublisherRoute = ({ children }) => {
  const { account, userRole } = useWeb3();

  if (!account) {
    return <Navigate to="/connect" replace />;
  }

  if (userRole !== 'publisher') {
    return <Navigate to="/connect" replace />;
  }

  return children;
};

export default PublisherRoute;
