import { useState, useEffect } from 'react';

export const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'advertiser' or 'publisher'

  // Web3 connection logic will go here

  return {
    account,
    provider,
    userRole,
  };
};
