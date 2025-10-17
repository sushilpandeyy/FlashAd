import { Navigate } from 'react-router-dom';
import { useWeb3 } from '../../hooks/useWeb3';

const AdvertiserRoute = ({ children }) => {
  const { account, userRole } = useWeb3();

  if (!account) {
    return <Navigate to="/connect" replace />;
  }

  if (userRole !== 'advertiser') {
    return <Navigate to="/connect" replace />;
  }

  return children;
};

export default AdvertiserRoute;
