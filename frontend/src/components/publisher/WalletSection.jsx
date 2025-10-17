import { useState } from 'react';
import { Link } from 'react-router-dom';

const WalletSection = ({ balance, pending, history }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(balance.available.toString());
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async () => {
    setIsProcessing(true);
    // Simulate withdrawal
    setTimeout(() => {
      setIsProcessing(false);
      setShowWithdrawModal(false);
      alert('✅ Withdrawal successful!');
    }, 2000);
  };

  const networkFee = 0.02;
  const receiveAmount = parseFloat(withdrawAmount || 0) - networkFee;

  return (
    <>
      <div className="border-2 border-vintage-white p-6 mb-8">
        {/* Header */}
        <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
          💰 Earnings & Wallet
        </h2>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Available Balance */}
          <div className="border border-vintage-gray-400 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
              Available Balance
            </h3>
            <div className="text-3xl font-bold text-green-400 mb-4">
              ${balance.available.toFixed(2)}
            </div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-4">
              Ready to withdraw
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="btn-vintage-inverse text-xs py-2 px-4 w-full"
            >
              Withdraw to Wallet
            </button>
          </div>

          {/* Pending Settlement */}
          <div className="border border-vintage-gray-400 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
              Pending Settlement
            </h3>
            <div className="text-3xl font-bold text-yellow-400 mb-4">
              ${pending.amount.toFixed(2)}
            </div>
            <div className="font-mono text-xs text-vintage-gray-600 mb-2">
              Processing (next batch: {pending.nextBatch})
            </div>
            <div className="font-mono text-xs text-vintage-gray-600">
              {pending.impressions.toLocaleString()} impressions pending
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="border-t border-vintage-gray-400 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
            📊 Payment History:
          </h3>
          <ul className="space-y-2 font-mono text-xs text-vintage-gray-600 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-green-400">•</span>
              <span>Last withdrawal: {history.lastWithdrawal.date} - <span className="text-green-400">${history.lastWithdrawal.amount.toFixed(2)}</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400">•</span>
              <span>Avg monthly: <span className="text-blue-400">${history.avgMonthly.toFixed(2)}</span></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">•</span>
              <span>Next estimated payout: <span className="text-purple-400">${history.nextPayout.toFixed(2)}</span> (end of month)</span>
            </li>
          </ul>
          <Link
            to="/publisher/withdraw"
            className="btn-vintage text-xs py-2 px-4 inline-block"
          >
            View All Transactions →
          </Link>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-md w-full">
            <h3 className="font-mono text-lg mb-4">💰 Withdraw Earnings</h3>

            <div className="font-mono text-sm space-y-4 mb-6">
              <div className="border border-vintage-gray-400 p-3 text-xs">
                <div className="text-vintage-gray-600">Available Balance:</div>
                <div className="text-green-400 text-lg font-bold">${balance.available.toFixed(2)} USDC</div>
              </div>

              <div>
                <label className="block text-xs mb-2">Amount to Withdraw:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="input-vintage flex-1"
                    placeholder="0.00"
                    max={balance.available}
                    step="0.01"
                  />
                  <span className="flex items-center px-4 border-2 border-vintage-gray-400 font-mono text-xs">
                    USDC
                  </span>
                </div>
                <button
                  onClick={() => setWithdrawAmount(balance.available.toString())}
                  className="btn-vintage text-xs py-1 px-3 mt-2"
                >
                  Max
                </button>
              </div>

              <div className="border border-vintage-gray-400 p-3 text-xs">
                <div className="text-vintage-gray-600 mb-2">Recipient Wallet:</div>
                <div className="text-vintage-white break-all">0x7c3d...89f (Connected wallet)</div>
              </div>

              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-vintage-gray-600">Network Fee:</span>
                  <span className="text-yellow-400">~${networkFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>You'll receive:</span>
                  <span className="text-green-400">${receiveAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="border border-vintage-gray-400 p-3 text-xs text-vintage-gray-600">
                ⚡ Instant settlement via smart contract
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                disabled={isProcessing}
                className="btn-vintage text-xs py-2 px-4 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={isProcessing || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance.available}
                className={`btn-vintage-inverse text-xs py-2 px-4 flex-1 ${
                  (isProcessing || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance.available) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletSection;
