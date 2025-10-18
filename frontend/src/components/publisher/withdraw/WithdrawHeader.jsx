import { Link } from 'react-router-dom';

const WithdrawHeader = ({ walletAddress }) => {
  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Link
          to="/publisher/dashboard"
          className="text-vintage-gray-600 hover:text-vintage-white transition-colors font-mono text-sm"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="font-serif text-2xl flex-1">Withdraw Earnings</h1>
      </div>

      <div className="font-mono text-sm space-y-1">
        <p className="text-vintage-gray-600">Transfer your earnings to your wallet</p>
        <p className="text-vintage-white">
          Connected Wallet: <span className="text-green-400">{walletAddress}</span>
        </p>
      </div>
    </div>
  );
};

export default WithdrawHeader;
