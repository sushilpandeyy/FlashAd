const DayOfWeekAnalysis = ({ data }) => {
  const getMaxImpressions = () => {
    return Math.max(...data.map(d => d.impressions));
  };

  const maxImpressions = getMaxImpressions();

  const getBadge = (day) => {
    if (day.impressions === maxImpressions) return '🔥';
    if (day.ctr >= 2.10) return '⭐';
    return '';
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        📅 Performance by Day of Week
      </h2>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="border-b-2 border-vintage-gray-400">
              <th className="text-left py-3 px-2">Day</th>
              <th className="text-right py-3 px-2">Impressions</th>
              <th className="text-right py-3 px-2">Clicks</th>
              <th className="text-right py-3 px-2">CTR</th>
              <th className="text-right py-3 px-2">Spent</th>
              <th className="text-right py-3 px-2">CPC</th>
              <th className="text-center py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((day, index) => (
              <tr key={index} className="border-b border-vintage-gray-400 hover:bg-vintage-gray-200 transition-colors">
                <td className="py-3 px-2">{day.day}</td>
                <td className="text-right py-3 px-2 text-blue-400">{day.impressions.toLocaleString()}</td>
                <td className="text-right py-3 px-2 text-purple-400">{day.clicks.toLocaleString()}</td>
                <td className="text-right py-3 px-2 text-green-400">{day.ctr.toFixed(2)}%</td>
                <td className="text-right py-3 px-2 text-yellow-400">${day.spent.toFixed(2)}</td>
                <td className="text-right py-3 px-2">${day.cpc.toFixed(2)}</td>
                <td className="text-center py-3 px-2">{getBadge(day)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart Visualization */}
      <div className="border-t border-vintage-gray-400 pt-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
          Visual Distribution
        </h3>
        <div className="space-y-3">
          {data.map((day, index) => {
            const percentage = (day.impressions / maxImpressions) * 100;
            const isHighest = day.impressions === maxImpressions;

            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 font-mono text-xs text-vintage-gray-600">
                  {day.day.substring(0, 3)}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-vintage-gray-400 h-6 relative">
                    <div
                      className={`h-6 ${isHighest ? 'bg-blue-500' : 'bg-blue-400'} transition-all duration-500 flex items-center px-2`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="font-mono text-xs text-vintage-black">
                        {day.impressions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                {isHighest && (
                  <span className="font-mono text-xs text-blue-400">← Highest</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DayOfWeekAnalysis;
