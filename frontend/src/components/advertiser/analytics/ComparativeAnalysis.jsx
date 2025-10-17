const ComparativeAnalysis = ({ comparativeData }) => {
  const { metrics, performanceScore, strengths, opportunities } = comparativeData;

  const getDifferenceColor = (difference) => {
    if (difference > 0) return 'text-green-400';
    if (difference < 0) return 'text-red-400';
    return 'text-vintage-gray-600';
  };

  const getDifferenceIcon = (difference, inverse = false) => {
    if (inverse) {
      if (difference > 0) return '⬇️';
      if (difference < 0) return '⬆️';
      return '─';
    }
    if (difference > 0) return '⬆️';
    if (difference < 0) return '⬇️';
    return '─';
  };

  const formatDifference = (value, suffix = '%') => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}${suffix}`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceTier = (score) => {
    if (score >= 80) return 'Top 20%';
    if (score >= 60) return 'Top 40%';
    if (score >= 40) return 'Top 60%';
    return 'Below Average';
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        📊 Your Campaign vs Industry Average
      </h2>

      {/* Metrics Comparison Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="border-b-2 border-vintage-gray-400">
              <th className="text-left py-3 px-2">Metric</th>
              <th className="text-right py-3 px-2">Your Campaign</th>
              <th className="text-right py-3 px-2">Industry Avg</th>
              <th className="text-right py-3 px-2">Difference</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => {
              const isInverse = metric.inverse || false;

              return (
                <tr key={index} className="border-b border-vintage-gray-400 hover:bg-vintage-gray-200 transition-colors">
                  <td className="py-3 px-2">{metric.name}</td>
                  <td className="text-right py-3 px-2 text-blue-400">{metric.yourValue}</td>
                  <td className="text-right py-3 px-2 text-vintage-gray-600">{metric.industryAvg}</td>
                  <td className={`text-right py-3 px-2 ${getDifferenceColor(isInverse ? -metric.difference : metric.difference)}`}>
                    {formatDifference(metric.difference)} {getDifferenceIcon(metric.difference, isInverse)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Performance Score */}
      <div className="border-t border-vintage-gray-400 pt-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600">
            📈 Overall Performance Score
          </h3>
          <div className="flex items-center gap-3">
            <div className={`text-3xl font-bold ${getScoreColor(performanceScore)}`}>
              {performanceScore}/100
            </div>
            <div className="font-mono text-xs text-vintage-gray-600">
              ({getPerformanceTier(performanceScore)})
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-vintage-gray-400 h-4 mb-2">
          <div
            className={`h-4 transition-all duration-500 ${
              performanceScore >= 80
                ? 'bg-green-500'
                : performanceScore >= 60
                ? 'bg-blue-500'
                : performanceScore >= 40
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${performanceScore}%` }}
          />
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          Strengths:
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 font-mono text-xs">
              <span className="text-green-400">✅</span>
              <span className="text-vintage-gray-600">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Opportunities */}
      <div>
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          Opportunities:
        </h3>
        <ul className="space-y-2">
          {opportunities.map((opportunity, index) => (
            <li key={index} className="flex items-start gap-2 font-mono text-xs">
              <span className="text-blue-400">💡</span>
              <span className="text-vintage-gray-600">{opportunity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
