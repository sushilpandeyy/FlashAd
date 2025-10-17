import { useParams } from 'react-router-dom';

const TransactionDetails = () => {
  const { txHash } = useParams();

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>Transaction Hash: {txHash}</p>
    </div>
  );
};

export default TransactionDetails;
