import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CostAnalysis = ({ costData }) => {
  const { totalSpent, breakdown, efficiency, dailySpend, publisherPayments } = costData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-1">{label}</p>
          <p className="text-green-400">Spent: ${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const getRating = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        💵 Cost Analysis
      </h2>

      {/* Total Spent */}
      <div className="text-center mb-6 pb-6 border-b border-vintage-gray-400">
        <div className="font-mono text-xs text-vintage-gray-600 mb-2">Total Spent</div>
        <div className="text-4xl font-bold text-green-400">${totalSpent.toFixed(2)}</div>
      </div>

      {/* Breakdown and Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Cost Breakdown */}
        <div className="border border-vintage-gray-400 p-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
            Cost Breakdown
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">To Publishers:</span>
              <span className="text-green-400">${breakdown.toPublishers.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">Platform Fee:</span>
              <span className="text-yellow-400">${breakdown.platformFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-vintage-gray-400 pt-3 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-blue-400">${breakdown.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="border border-vintage-gray-400 p-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
            Efficiency Metrics
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">CPM (per 1K imp):</span>
              <span className="text-blue-400">${efficiency.cpm.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">CPC (per click):</span>
              <span className="text-purple-400">${efficiency.cpc.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">CPE (per engage):</span>
              <span className="text-green-400">${efficiency.cpe.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">ROAS:</span>
              <span className="text-yellow-400">Calculate externally</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Spend Trend */}
      <div className="mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
          Daily Spend Trend
        </h3>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailySpend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
              />
              <YAxis
                stroke="#9CA3AF"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                label={{ value: '$', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="spent" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Publisher Payment Breakdown */}
      <div className="border-t border-vintage-gray-400 pt-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
          💰 Publisher Payment Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-vintage-gray-400">
                <th className="text-left py-2 px-2">Publisher</th>
                <th className="text-right py-2 px-2">Amount Paid</th>
                <th className="text-right py-2 px-2">% of Total</th>
                <th className="text-right py-2 px-2">Avg CPM</th>
                <th className="text-center py-2 px-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {publisherPayments.map((publisher, index) => (
                <tr key={index} className="border-b border-vintage-gray-400 hover:bg-vintage-gray-200 transition-colors">
                  <td className="py-2 px-2">{publisher.name}</td>
                  <td className="text-right py-2 px-2 text-green-400">${publisher.amountPaid.toFixed(2)}</td>
                  <td className="text-right py-2 px-2 text-blue-400">{publisher.percentOfTotal}%</td>
                  <td className="text-right py-2 px-2 text-purple-400">${publisher.avgCpm.toFixed(2)}</td>
                  <td className="text-center py-2 px-2 text-yellow-400">{getRating(publisher.rating)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
