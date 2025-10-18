const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'impression':
        return '👁️';
      case 'click':
        return '🖱️';
      case 'earning':
        return '💰';
      case 'placement_added':
        return '➕';
      case 'placement_paused':
        return '⏸️';
      case 'placement_resumed':
        return '▶️';
      case 'health_check':
        return '🔍';
      default:
        return '📌';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'earning':
        return 'text-green-400';
      case 'click':
        return 'text-purple-400';
      case 'impression':
        return 'text-blue-400';
      case 'placement_added':
        return 'text-green-400';
      case 'placement_paused':
        return 'text-yellow-400';
      case 'health_check':
        return 'text-blue-400';
      default:
        return 'text-vintage-white';
    }
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <h3 className="font-mono uppercase tracking-wider text-sm mb-4">
        🕐 Recent Activity
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 border border-vintage-gray-400 hover:bg-vintage-gray-200 transition-colors"
          >
            <span className="text-xl">{getActivityIcon(activity.type)}</span>
            <div className="flex-1 font-mono text-xs">
              <div className={`font-bold mb-1 ${getActivityColor(activity.type)}`}>
                {activity.message}
              </div>
              {activity.details && (
                <div className="text-vintage-gray-600 mb-1">{activity.details}</div>
              )}
              <div className="text-vintage-gray-600">
                {activity.timestamp}
                {activity.placement && ` • ${activity.placement}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
