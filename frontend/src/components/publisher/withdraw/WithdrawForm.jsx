import { useState, useEffect } from 'react';

const WithdrawForm = ({ balance, walletAddress, onWithdraw, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Validate amount
  useEffect(() => {
    setError('');
    setIsValid(false);

    if (!amount || amount === '') {
      return;
    }

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      setError('Please enter a valid number');
      return;
    }

    if (numAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (numAmount > balance) {
      setError(`Amount exceeds available balance ($${balance.toFixed(2)})`);
      return;
    }

    setIsValid(true);
  }, [amount, balance]);

  const setQuickAmount = (percentage) => {
    const quickAmount = (balance * percentage / 100).toFixed(2);
    setAmount(quickAmount);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onWithdraw(parseFloat(amount));
    }
  };

  const gasFee = 0.02;
  const youReceive = amount ? parseFloat(amount) : 0;

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        💸 Withdraw Funds
      </h2>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block font-mono text-xs mb-3">Amount to Withdraw:</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-mono text-xl text-vintage-gray-600">
            $
          </span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className={`w-full pl-10 pr-24 py-4 border-2 ${
              error ? 'border-red-400' : 'border-vintage-gray-400'
            } bg-transparent font-mono text-2xl text-vintage-white text-right focus:border-vintage-white focus:outline-none`}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-mono text-sm text-vintage-gray-600">
            USDC
          </span>
        </div>
        {error && (
          <p className="font-mono text-xs text-red-400 mt-2">⚠️ {error}</p>
        )}
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <button
          onClick={() => setQuickAmount(25)}
          className="btn-vintage text-xs py-2"
        >
          25%<br />${(balance * 0.25).toFixed(2)}
        </button>
        <button
          onClick={() => setQuickAmount(50)}
          className="btn-vintage text-xs py-2"
        >
          50%<br />${(balance * 0.5).toFixed(2)}
        </button>
        <button
          onClick={() => setQuickAmount(75)}
          className="btn-vintage text-xs py-2"
        >
          75%<br />${(balance * 0.75).toFixed(2)}
        </button>
        <button
          onClick={() => setQuickAmount(100)}
          className="btn-vintage text-xs py-2"
        >
          Max<br />${balance.toFixed(2)}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-vintage-gray-400 my-6"></div>

      {/* Recipient Wallet */}
      <div className="mb-6">
        <label className="block font-mono text-xs mb-3">Recipient Wallet:</label>
        <div className="border-2 border-vintage-gray-400 p-4 flex items-center justify-between">
          <span className="font-mono text-sm text-vintage-white truncate flex-1">
            {walletAddress}
          </span>
          <span className="text-green-400 ml-3">✓</span>
        </div>
        <p className="font-mono text-xs text-green-400 mt-2">
          ✅ Verified publisher wallet
        </p>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-vintage-gray-400 my-6"></div>

      {/* Transaction Summary */}
      <div className="mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          Transaction Summary:
        </h3>
        <div className="border-2 border-vintage-gray-400 p-5 space-y-3">
          <div className="flex justify-between items-center font-mono text-sm">
            <span className="text-vintage-gray-600">Withdrawal Amount:</span>
            <span className="text-vintage-white">${youReceive.toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between items-center font-mono text-sm">
            <span className="text-vintage-gray-600">Network Fee (Gas):</span>
            <span className="text-vintage-white">~${gasFee.toFixed(2)} MATIC</span>
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-3">
            <div className="flex justify-between items-center font-mono text-sm font-bold">
              <span className="text-vintage-white">You'll Receive:</span>
              <span className="text-green-400">${youReceive.toFixed(2)} USDC</span>
            </div>
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-3 space-y-1">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-vintage-gray-600">Network:</span>
              <span className="text-vintage-white">Polygon (Matic)</span>
            </div>
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-vintage-gray-600">Estimated Time:</span>
              <span className="text-vintage-white">~5 seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-vintage-gray-400 my-6"></div>

      {/* Important Information */}
      <div className="mb-6 border-2 border-blue-400 bg-blue-900 bg-opacity-5 p-4">
        <h4 className="font-mono text-xs uppercase tracking-wider text-blue-400 mb-3">
          💡 Important Information:
        </h4>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>No minimum withdrawal amount</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>No platform withdrawal fees</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Instant transfer via smart contract</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Network gas fees paid by you (~$0.02)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400">•</span>
            <span className="text-red-400">Withdrawals are irreversible</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="btn-vintage text-xs py-3 px-6 flex-1"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`btn-vintage-inverse text-xs py-3 px-6 flex-1 ${
            !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Withdraw Now →
        </button>
      </div>
    </div>
  );
};

export default WithdrawForm;
