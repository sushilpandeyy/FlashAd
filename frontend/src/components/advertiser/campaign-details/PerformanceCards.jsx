const PerformanceCards = ({ campaignStats }) => {
  const {
    spent = 0,
    budget = 0,
    impressions = 0,
    targetImpressions = 0,
    clicks = 0,
    ctr = 0,
    avgCtr = 0,
    industryCtr = 0,
    costPerClick = 0,
    expectedCpc = 0,
    daysActive = 0,
    avgDailyImpressions = 0,
    estimatedCompletionDays = 0,
    activePublishers = 0,
    newPublishersThisWeek = 0,
    clicksToday = 0,
    avgDailyClicks = 0
  } = campaignStats;

  const spentPercentage = (spent / budget) * 100;
  const impressionsPercentage = (impressions / targetImpressions) * 100;
  const remaining = budget - spent;
  const impressionsLeft = targetImpressions - impressions;
  const ctrDiff = ctr - avgCtr;
  const cpcDiff = costPerClick - expectedCpc;

  const cards = [
    {
      icon: '💰',
      title: 'Spent',
      value: `$${spent.toFixed(2)}`,
      subtitle: `of $${budget.toFixed(2)}`,
      progress: spentPercentage,
      detail: `$${remaining.toFixed(2)} remaining`,
      color: spentPercentage > 90 ? 'text-red-400' : 'text-green-400'
    },
    {
      icon: '👁️',
      title: 'Impressions',
      value: impressions.toLocaleString(),
      subtitle: `of ${targetImpressions.toLocaleString()}`,
      progress: impressionsPercentage,
      detail: `~${impressionsLeft.toLocaleString()} left`,
      color: 'text-blue-400'
    },
    {
      icon: '🖱️',
      title: 'Clicks',
      value: clicks.toLocaleString(),
      subtitle: null,
      progress: null,
      detail: `+${clicksToday} today`,
      secondaryDetail: `Avg: ${avgDailyClicks}/day`,
      color: 'text-purple-400'
    },
    {
      icon: '📈',
      title: 'CTR',
      value: `${ctr.toFixed(2)}%`,
      subtitle: null,
      progress: null,
      detail: ctrDiff > 0 ? `↑ ${Math.abs(ctrDiff).toFixed(2)}% vs avg` : `↓ ${Math.abs(ctrDiff).toFixed(2)}% vs avg`,
      secondaryDetail: `Industry: ${industryCtr}%`,
      color: ctrDiff > 0 ? 'text-green-400' : 'text-yellow-400',
      trend: ctrDiff > 0 ? 'up' : 'down'
    },
    {
      icon: '💵',
      title: 'Cost Per Click',
      value: `$${costPerClick.toFixed(2)}`,
      subtitle: null,
      progress: null,
      detail: cpcDiff < 0 ? `↓ $${Math.abs(cpcDiff).toFixed(2)} better` : `↑ $${Math.abs(cpcDiff).toFixed(2)} higher`,
      secondaryDetail: 'than expected',
      color: cpcDiff < 0 ? 'text-green-400' : 'text-red-400',
      trend: cpcDiff < 0 ? 'good' : 'bad'
    },
    {
      icon: '⏱️',
      title: 'Avg. Duration',
      value: 'Campaign Active',
      subtitle: `for ${daysActive} days`,
      progress: null,
      detail: `Daily avg: ${avgDailyImpressions}`,
      secondaryDetail: 'impressions',
      color: 'text-blue-400'
    },
    {
      icon: '🎯',
      title: 'Est. Completion',
      value: `${estimatedCompletionDays} days`,
      subtitle: null,
      progress: null,
      detail: 'At current rate',
      color: 'text-yellow-400'
    },
    {
      icon: '📍',
      title: 'Publishers',
      value: `${activePublishers} active`,
      subtitle: null,
      progress: null,
      detail: `${newPublishersThisWeek} this week`,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border-2 border-vintage-white p-5 hover:bg-vintage-gray-200 transition-all hover:shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{card.icon}</span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600">
              {card.title}
            </h3>
          </div>

          {/* Value */}
          <div className="mb-2">
            <div className={`text-2xl font-bold ${card.color || 'text-vintage-white'}`}>
              {card.value}
            </div>
            {card.subtitle && (
              <div className="font-mono text-xs text-vintage-gray-600">
                {card.subtitle}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {card.progress !== null && (
            <div className="mb-3">
              <div className="w-full bg-vintage-gray-400 h-2 mb-1">
                <div
                  className={`h-2 transition-all duration-500 ${
                    card.progress > 90 ? 'bg-red-500' : 'bg-vintage-white'
                  }`}
                  style={{ width: `${Math.min(card.progress, 100)}%` }}
                />
              </div>
              <div className="font-mono text-xs text-vintage-gray-600">
                {card.progress.toFixed(0)}%
              </div>
            </div>
          )}

          {/* Details */}
          <div className="font-mono text-xs text-vintage-gray-600">
            <div className={card.trend ? (card.trend === 'up' || card.trend === 'good' ? 'text-green-400' : 'text-red-400') : ''}>
              {card.detail}
            </div>
            {card.secondaryDetail && (
              <div className="mt-1">{card.secondaryDetail}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceCards;
