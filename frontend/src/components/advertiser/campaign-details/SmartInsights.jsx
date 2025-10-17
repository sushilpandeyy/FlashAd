import { useState } from 'react';

const SmartInsights = ({ insights, onAction }) => {
  const [dismissedInsights, setDismissedInsights] = useState([]);

  const handleDismiss = (insightId) => {
    setDismissedInsights([...dismissedInsights, insightId]);
  };

  const getInsightIcon = (category) => {
    switch (category) {
      case 'opportunity':
        return { icon: '⚡', color: 'border-green-400', textColor: 'text-green-400' };
      case 'trend':
        return { icon: '📊', color: 'border-blue-400', textColor: 'text-blue-400' };
      case 'publisher':
        return { icon: '🌐', color: 'border-purple-400', textColor: 'text-purple-400' };
      case 'timing':
        return { icon: '⏰', color: 'border-yellow-400', textColor: 'text-yellow-400' };
      case 'warning':
        return { icon: '⚠️', color: 'border-red-400', textColor: 'text-red-400' };
      default:
        return { icon: '💡', color: 'border-vintage-gray-400', textColor: 'text-vintage-white' };
    }
  };

  const visibleInsights = insights.filter(
    insight => !dismissedInsights.includes(insight.id)
  );

  if (visibleInsights.length === 0) {
    return null;
  }

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <h3 className="font-mono uppercase tracking-wider text-sm mb-6">
        💡 Smart Insights & Recommendations
      </h3>

      {/* Insights List */}
      <div className="space-y-4">
        {visibleInsights.map((insight) => {
          const style = getInsightIcon(insight.category);

          return (
            <div
              key={insight.id}
              className={`border-2 ${style.color} p-4 hover:bg-vintage-gray-200 transition-colors`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{style.icon}</span>
                  <h4 className={`font-mono text-sm uppercase tracking-wider ${style.textColor}`}>
                    {insight.category}
                  </h4>
                </div>
                <button
                  onClick={() => handleDismiss(insight.id)}
                  className="text-vintage-gray-600 hover:text-vintage-white transition-colors text-sm"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>

              {/* Message */}
              <p className="font-mono text-sm mb-4">
                {insight.message}
              </p>

              {/* Additional Details */}
              {insight.details && (
                <div className="border border-vintage-gray-400 p-3 mb-4 text-xs font-mono text-vintage-gray-600">
                  {insight.details}
                </div>
              )}

              {/* Actions */}
              {insight.actions && insight.actions.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {insight.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => onAction(action.type, insight.id)}
                      className="btn-vintage text-xs py-1 px-3"
                    >
                      {action.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handleDismiss(insight.id)}
                    className="btn-vintage text-xs py-1 px-3"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-4 border-t border-vintage-gray-400">
        <p className="font-mono text-xs text-vintage-gray-600 text-center">
          Insights are updated daily based on your campaign performance
        </p>
      </div>
    </div>
  );
};

export default SmartInsights;
