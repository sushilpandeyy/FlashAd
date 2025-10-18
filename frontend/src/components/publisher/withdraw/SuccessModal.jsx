import { Link } from 'react-router-dom';

const SuccessModal = ({ amount, txHash, blockNumber, newBalance, pendingBalance, onClose }) => {
  const timestamp = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txHash);
    alert('Transaction hash copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-vintage-black border-2 border-green-400 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">✅</div>
          <h2 className="font-serif text-2xl text-green-400 mb-2">
            Withdrawal Successful!
          </h2>
          <p className="font-mono text-sm text-vintage-white">
            ${amount.toFixed(2)} USDC has been sent to your wallet
          </p>
        </div>

        {/* Transaction Details */}
        <div className="border-2 border-vintage-gray-400 p-5 mb-6">
          <div className="space-y-3">
            <div>
              <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                Transaction Hash:
              </div>
              <div className="flex items-center gap-2">
                <code className="font-mono text-xs text-vintage-white bg-vintage-gray-200 px-2 py-1 flex-1 overflow-x-auto">
                  {txHash}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="btn-vintage text-xs py-1 px-3 whitespace-nowrap"
                >
                  📋 Copy
                </button>
                <a
                  href={`https://polygonscan.com/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-vintage text-xs py-1 px-3 whitespace-nowrap"
                >
                  🔗 View
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t-2 border-vintage-gray-400">
              <div>
                <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                  Status:
                </div>
                <div className="font-mono text-sm text-green-400">
                  ✅ Confirmed
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                  Network:
                </div>
                <div className="font-mono text-sm text-vintage-white">
                  Polygon
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                  Block:
                </div>
                <div className="font-mono text-sm text-vintage-white">
                  #{blockNumber.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                  Timestamp:
                </div>
                <div className="font-mono text-sm text-vintage-white">
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Balance */}
        <div className="border-2 border-green-400 bg-green-900 bg-opacity-5 p-5 mb-6">
          <div className="text-center mb-3">
            <div className="font-mono text-xs text-vintage-gray-600 mb-1">
              💰 New Available Balance:
            </div>
            <div className="font-mono text-3xl font-bold text-green-400">
              ${newBalance.toFixed(2)} USDC
            </div>
          </div>
          {pendingBalance > 0 && (
            <div className="border-t-2 border-vintage-gray-400 pt-3 text-center">
              <p className="font-mono text-xs text-vintage-gray-600">
                (Pending: ${pendingBalance.toFixed(2)} USDC will be available soon)
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/publisher/dashboard"
            className="btn-vintage text-xs py-3 px-6 flex-1 text-center"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={onClose}
            className="btn-vintage text-xs py-3 px-6 flex-1"
          >
            Make Another Withdrawal
          </button>
          <button
            onClick={() => {
              onClose();
              // Scroll to history section
              setTimeout(() => {
                document.getElementById('withdrawal-history')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="btn-vintage-inverse text-xs py-3 px-6 flex-1"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
