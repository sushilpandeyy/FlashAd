const FunnelAnalysis = ({ funnelData }) => {
  const getPercentageWidth = (value, total) => {
    return (value / total) * 100;
  };

  const getDropOffRate = (current, previous) => {
    return ((1 - current / previous) * 100).toFixed(1);
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        🎯 Conversion Funnel
      </h2>

      {/* Funnel Visualization */}
      <div className="space-y-4 mb-6">
        {funnelData.stages.map((stage, index) => {
          const percentage = getPercentageWidth(stage.value, funnelData.stages[0].value);
          const dropOff = index > 0 ? getDropOffRate(stage.value, funnelData.stages[index - 1].value) : 0;

          return (
            <div key={index}>
              {/* Stage Bar */}
              <div className="flex items-center gap-4 mb-1">
                <div className="w-32 font-mono text-xs text-vintage-gray-600">
                  {stage.label}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-vintage-gray-400 h-8 relative">
                    <div
                      className={`h-8 ${
                        index === 0
                          ? 'bg-blue-500'
                          : index === 1
                          ? 'bg-green-500'
                          : index === 2
                          ? 'bg-purple-500'
                          : index === 3
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      } transition-all duration-500 flex items-center px-3 justify-between`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="font-mono text-xs text-vintage-black font-bold">
                        {stage.value.toLocaleString()} {stage.unit || ''}
                      </span>
                      <span className="font-mono text-xs text-vintage-black">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              {index > 0 && stage.conversionRate && (
                <div className="ml-36 font-mono text-xs text-vintage-gray-600 mb-2">
                  Conversion: <span className="text-green-400">{stage.conversionRate}</span>
                  {dropOff > 0 && (
                    <span className="ml-4 text-red-400">Drop-off: {dropOff}%</span>
                  )}
                </div>
              )}

              {/* Arrow */}
              {index < funnelData.stages.length - 1 && (
                <div className="ml-36 text-vintage-gray-600 text-sm">↓</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="border-t border-vintage-gray-400 pt-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          💡 Drop-off Analysis:
        </h3>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          {funnelData.insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FunnelAnalysis;
