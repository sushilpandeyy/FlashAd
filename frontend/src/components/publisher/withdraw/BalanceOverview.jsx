const BalanceOverview = ({ balance, onWithdrawAll }) => {
  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        💰 Your Balance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available to Withdraw */}
        <div className="border-2 border-green-400 bg-green-900 bg-opacity-5 p-6">
          <div className="font-mono text-xs text-vintage-gray-600 mb-2">
            Available to Withdraw
          </div>
          <div className="text-4xl font-bold text-green-400 mb-1">
            ${balance.available.toFixed(2)}
          </div>
          <div className="font-mono text-xs text-vintage-gray-600 mb-4">
            USDC
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-4 mb-4">
            <p className="font-mono text-xs text-vintage-gray-600">
              Ready for immediate withdrawal
            </p>
          </div>
          <button
            onClick={onWithdrawAll}
            className="btn-vintage-inverse text-xs py-2 px-4 w-full"
          >
            Withdraw All
          </button>
        </div>

        {/* Pending Settlement */}
        <div className="border-2 border-yellow-400 bg-yellow-900 bg-opacity-5 p-6">
          <div className="font-mono text-xs text-vintage-gray-600 mb-2">
            Pending Settlement
          </div>
          <div className="text-4xl font-bold text-yellow-400 mb-1">
            ${balance.pending.toFixed(2)}
          </div>
          <div className="font-mono text-xs text-vintage-gray-600 mb-4">
            USDC
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-4">
            <p className="font-mono text-xs text-vintage-gray-600 mb-2">
              Processing in next batch
            </p>
            <p className="font-mono text-xs text-blue-400">
              (Est. {balance.pendingTime})
            </p>
            <p className="font-mono text-xs text-vintage-gray-600 mt-2">
              {balance.pendingImpressions.toLocaleString()} impressions pending
            </p>
          </div>
        </div>

        {/* This Month's Earnings */}
        <div className="border-2 border-vintage-gray-400 p-6">
          <div className="font-mono text-xs text-vintage-gray-600 mb-2">
            This Month's Earnings
          </div>
          <div className="text-4xl font-bold text-vintage-white mb-1">
            ${balance.monthEarnings.toFixed(2)}
          </div>
          <div className="font-mono text-xs text-vintage-gray-600 mb-4">
            USDC
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`font-mono text-xs ${balance.monthTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {balance.monthTrend >= 0 ? '↑' : '↓'} {Math.abs(balance.monthTrend)}% vs last month
              </span>
            </div>
            <p className="font-mono text-xs text-vintage-gray-600">
              {balance.monthImpressions.toLocaleString()} impressions
            </p>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="border-2 border-vintage-gray-400 p-6">
          <div className="font-mono text-xs text-vintage-gray-600 mb-2">
            Lifetime Earnings
          </div>
          <div className="text-4xl font-bold text-vintage-white mb-1">
            ${balance.lifetimeEarnings.toFixed(2)}
          </div>
          <div className="font-mono text-xs text-vintage-gray-600 mb-4">
            USDC
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-4">
            <p className="font-mono text-xs text-vintage-gray-600 mb-2">
              {balance.campaignsServed} campaigns served
            </p>
            <p className="font-mono text-xs text-vintage-gray-600">
              {(balance.lifetimeImpressions / 1000000).toFixed(2)}M impressions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;
