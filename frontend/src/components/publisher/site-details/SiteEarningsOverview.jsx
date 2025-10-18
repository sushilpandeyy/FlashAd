const SiteEarningsOverview = ({ earnings }) => {
  const cards = [
    {
      icon: '💵',
      label: 'Today',
      value: `$${earnings.today.toFixed(2)}`,
      trend: earnings.todayTrend >= 0 ? `↑ ${earnings.todayTrend}%` : `↓ ${Math.abs(earnings.todayTrend)}%`,
      trendColor: earnings.todayTrend >= 0 ? 'text-green-400' : 'text-red-400',
      secondary: `${earnings.todayImpressions.toLocaleString()} impressions`,
      color: 'text-green-400'
    },
    {
      icon: '📅',
      label: 'This Week',
      value: `$${earnings.thisWeek.toFixed(2)}`,
      trend: earnings.weekTrend >= 0 ? `↑ ${earnings.weekTrend}%` : `↓ ${Math.abs(earnings.weekTrend)}%`,
      trendColor: earnings.weekTrend >= 0 ? 'text-green-400' : 'text-red-400',
      secondary: `${earnings.weekImpressions.toLocaleString()} impressions`,
      color: 'text-blue-400'
    },
    {
      icon: '📊',
      label: 'This Month',
      value: `$${earnings.thisMonth.toFixed(2)}`,
      trend: earnings.monthTrend >= 0 ? `↑ ${earnings.monthTrend}%` : `↓ ${Math.abs(earnings.monthTrend)}%`,
      trendColor: earnings.monthTrend >= 0 ? 'text-green-400' : 'text-red-400',
      secondary: `${earnings.monthImpressions.toLocaleString()} impressions`,
      color: 'text-purple-400'
    },
    {
      icon: '📈',
      label: 'RPM',
      value: `$${earnings.rpm.toFixed(2)}`,
      trend: 'Revenue per 1K',
      trendColor: 'text-vintage-gray-600',
      secondary: `Avg load: ${earnings.avgLoadTime}ms`,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="border-2 border-vintage-white bg-vintage-black p-5 hover:bg-vintage-gray-200 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{card.icon}</span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600">
              {card.label}
            </h3>
          </div>

          <div className={`text-2xl font-bold mb-2 ${card.color}`}>
            {card.value}
          </div>

          <div className="border-t-2 border-vintage-gray-400 pt-2 mt-2">
            <div className={`font-mono text-xs mb-1 ${card.trendColor}`}>
              {card.trend}
            </div>
            <div className="font-mono text-xs text-vintage-gray-600">
              {card.secondary}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SiteEarningsOverview;
