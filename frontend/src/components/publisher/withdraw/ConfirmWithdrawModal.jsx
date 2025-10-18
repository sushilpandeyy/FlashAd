const ConfirmWithdrawModal = ({ amount, walletAddress, onConfirm, onCancel }) => {
  const gasFee = 0.02;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-vintage-black border-2 border-yellow-400 p-6 max-w-lg w-full">
        <h3 className="font-mono text-lg uppercase tracking-wider mb-6">
          ⚠️ Confirm Withdrawal
        </h3>

        <div className="mb-6">
          <p className="font-mono text-xs text-vintage-gray-600 mb-3">
            You're about to withdraw:
          </p>
          <div className="border-2 border-vintage-gray-400 p-6 text-center">
            <div className="font-mono text-4xl font-bold text-green-400">
              ${amount.toFixed(2)} USDC
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">To wallet:</span>
            <span className="text-vintage-white">{walletAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Network:</span>
            <span className="text-vintage-white">Polygon (Matic)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Gas fee:</span>
            <span className="text-vintage-white">~${gasFee.toFixed(2)} MATIC</span>
          </div>
        </div>

        <div className="border-t-2 border-vintage-gray-400 pt-4 mb-6">
          <div className="border-2 border-red-400 bg-red-900 bg-opacity-5 p-4">
            <p className="font-mono text-xs text-red-400 mb-2">
              ⚠️ This action cannot be undone.
            </p>
            <p className="font-mono text-xs text-vintage-gray-600">
              Please confirm in your wallet.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onCancel} className="btn-vintage text-xs py-3 px-6 flex-1">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-vintage-inverse text-xs py-3 px-6 flex-1">
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdrawModal;
