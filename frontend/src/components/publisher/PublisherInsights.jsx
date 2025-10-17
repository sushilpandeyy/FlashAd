import { useState } from 'react';

const PublisherInsights = ({ insights: initialInsights }) => {
  const [insights, setInsights] = useState(initialInsights);

  const getInsightStyle = (type) => {
    switch (type) {
      case 'high_performer':
        return {
          border: 'border-green-400',
          icon: '⭐',
          badge: 'bg-green-900 bg-opacity-20 text-green-400',
          label: 'High Performer'
        };
      case 'growth_opportunity':
        return {
          border: 'border-blue-400',
          icon: '📈',
          badge: 'bg-blue-900 bg-opacity-20 text-blue-400',
          label: 'Growth Opportunity'
        };
      case 'optimization':
        return {
          border: 'border-yellow-400',
          icon: '💡',
          badge: 'bg-yellow-900 bg-opacity-20 text-yellow-400',
          label: 'Optimization Tip'
        };
      case 'payout_ready':
        return {
          border: 'border-purple-400',
          icon: '💰',
          badge: 'bg-purple-900 bg-opacity-20 text-purple-400',
          label: 'Payout Ready'
        };
      default:
        return {
          border: 'border-vintage-gray-400',
          icon: '📌',
          badge: 'bg-vintage-gray-400 bg-opacity-20 text-vintage-white',
          label: 'Info'
        };
    }
  };

  const handleDismiss = (id) => {
    setInsights(insights.filter(insight => insight.id !== id));
  };

  const handleAction = (action, insightId) => {
    console.log(`Action "${action}" triggered for insight ${insightId}`);
    // In real implementation, this would trigger the appropriate action
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          🤖 Smart Insights & Recommendations
        </h2>
        <div className="font-mono text-xs text-vintage-gray-600">
          {insights.length} active insights
        </div>
      </div>

      {/* Insights Grid */}
      {insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => {
            const style = getInsightStyle(insight.type);
            return (
              <div
                key={insight.id}
                className={`border-2 ${style.border} p-5 hover:bg-vintage-gray-200 transition-colors relative`}
              >
                {/* Dismiss Button */}
                <button
                  onClick={() => handleDismiss(insight.id)}
                  className="absolute top-3 right-3 text-vintage-gray-600 hover:text-vintage-white transition-colors font-mono text-xs"
                >
                  ✕
                </button>

                {/* Insight Header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{style.icon}</span>
                  <div>
                    <div className={`font-mono text-xs px-2 py-1 inline-block ${style.badge}`}>
                      {style.label}
                    </div>
                    <h3 className="font-mono text-sm font-bold mt-1">{insight.title}</h3>
                  </div>
                </div>

                {/* Insight Content */}
                <p className="font-mono text-xs text-vintage-gray-600 mb-4 leading-relaxed">
                  {insight.description}
                </p>

                {/* Metrics (if available) */}
                {insight.metrics && (
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-vintage-gray-400">
                    {insight.metrics.map((metric, index) => (
                      <div key={index} className="font-mono text-xs">
                        <div className="text-vintage-gray-600">{metric.label}</div>
                        <div className={`font-bold ${metric.color || 'text-vintage-white'}`}>
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {insight.actions && insight.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleAction(action.handler, insight.id)}
                      className={`${
                        action.primary
                          ? 'btn-vintage-inverse'
                          : 'btn-vintage'
                      } text-xs py-1 px-3 flex-1`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>

                {/* Timestamp */}
                {insight.timestamp && (
                  <div className="font-mono text-xs text-vintage-gray-600 mt-3 text-right">
                    {insight.timestamp}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">✨</span>
          <h3 className="font-mono text-sm text-vintage-gray-600 mb-2">
            No active insights at the moment
          </h3>
          <p className="font-mono text-xs text-vintage-gray-600">
            Keep optimizing your sites and we'll provide recommendations to help you grow!
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="border-t border-vintage-gray-400 pt-4 mt-6">
        <div className="flex items-center gap-2 font-mono text-xs text-vintage-gray-600">
          <span>💡</span>
          <span>
            Insights are generated based on your site performance, industry benchmarks, and best practices.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PublisherInsights;
