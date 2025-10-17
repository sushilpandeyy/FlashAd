import { useState } from 'react';

const RecentActivity = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const displayedActivities = showAll ? activities : activities.slice(0, 5);

  const filteredActivities = filterType === 'all'
    ? displayedActivities
    : displayedActivities.filter(activity => activity.type === filterType);

  const getEventIcon = (type) => {
    switch (type) {
      case 'impressions':
        return { icon: '🟢', color: 'text-green-400' };
      case 'clicks':
        return { icon: '🔵', color: 'text-blue-400' };
      case 'publisher':
        return { icon: '🟡', color: 'text-yellow-400' };
      case 'budget':
        return { icon: '🟠', color: 'text-orange-400' };
      case 'warning':
        return { icon: '🔴', color: 'text-red-400' };
      case 'milestone':
        return { icon: '🎉', color: 'text-purple-400' };
      default:
        return { icon: '⚪', color: 'text-gray-400' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return activityTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'impressions', label: 'Impressions' },
    { value: 'clicks', label: 'Clicks' },
    { value: 'publisher', label: 'Publishers' },
    { value: 'budget', label: 'Budget' },
    { value: 'milestone', label: 'Milestones' }
  ];

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="font-mono uppercase tracking-wider text-sm">
          📅 Recent Activity
        </h3>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {eventTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilterType(type.value)}
              className={`btn-vintage text-xs py-1 px-3 ${
                filterType === type.value ? 'bg-vintage-white text-vintage-black' : ''
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-vintage-gray-600 font-mono text-sm">
            No activities found for this filter
          </div>
        ) : (
          filteredActivities.map((activity, index) => {
            const eventStyle = getEventIcon(activity.type);

            return (
              <div
                key={activity.id || index}
                className="border-b border-vintage-gray-400 pb-4 last:border-b-0 hover:bg-vintage-gray-200 p-2 -mx-2 transition-colors"
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`text-lg ${eventStyle.color}`}>
                    {eventStyle.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                      {formatTimestamp(activity.timestamp)}
                    </div>
                    <div className="font-mono text-sm">
                      {activity.message}
                    </div>
                    {activity.details && (
                      <div className="font-mono text-xs text-vintage-gray-600 mt-1">
                        {activity.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More */}
      {!showAll && activities.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="btn-vintage text-xs py-2 px-6"
          >
            Load More Activity
          </button>
        </div>
      )}

      {/* Auto-refresh indicator */}
      <div className="mt-4 pt-4 border-t border-vintage-gray-400 text-center">
        <p className="font-mono text-xs text-vintage-gray-600">
          ⟳ Auto-refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default RecentActivity;
