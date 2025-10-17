const MetricCard = ({ icon, label, value, subtitle, progress, detail, secondaryDetail, color, badge }) => {
  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-5 hover:bg-vintage-gray-200 transition-all hover:shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600">
          {label}
        </h3>
      </div>

      <div className={`text-2xl font-bold mb-2 ${color || 'text-vintage-white'}`}>
        {value}
      </div>

      {subtitle && (
        <div className="font-mono text-xs text-vintage-gray-600 mb-2">
          {subtitle}
        </div>
      )}

      {progress !== null && progress !== undefined && (
        <div className="mb-3">
          <div className="w-full bg-vintage-gray-400 h-2 mb-1">
            <div
              className="h-2 bg-vintage-white transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="font-mono text-xs text-vintage-gray-600">
            {progress.toFixed(0)}% {subtitle}
          </div>
        </div>
      )}

      <div className="font-mono text-xs text-vintage-gray-600">
        {detail}
      </div>
      {secondaryDetail && (
        <div className="font-mono text-xs text-vintage-gray-600 mt-1">
          {secondaryDetail}
        </div>
      )}
      {badge && (
        <div className={`mt-2 font-mono text-xs ${badge.color}`}>
          {badge.text}
        </div>
      )}
    </div>
  );
};

const PublisherMetrics = ({ metrics }) => {
  const metricsData = [
    {
      icon: '👁️',
      label: 'Impressions',
      value: metrics.impressions.toLocaleString(),
      subtitle: 'this month',
      progress: (metrics.impressions / metrics.targetImpressions) * 100,
      detail: `of target`,
      color: 'text-blue-400'
    },
    {
      icon: '🖱️',
      label: 'Clicks',
      value: metrics.clicks.toLocaleString(),
      subtitle: 'this month',
      detail: `+${metrics.clicksToday.toLocaleString()} today`,
      secondaryDetail: `Avg: ${metrics.avgDailyClicks}/day`,
      color: 'text-purple-400'
    },
    {
      icon: '📈',
      label: 'CTR',
      value: `${metrics.ctr.toFixed(2)}%`,
      detail: `Industry avg: ${metrics.industryCtr}%`,
      secondaryDetail: `↑ ${(metrics.ctr - metrics.industryCtr).toFixed(2)}% better`,
      color: 'text-green-400'
    },
    {
      icon: '💰',
      label: 'RPM',
      value: `$${metrics.rpm.toFixed(2)}`,
      detail: 'Revenue per',
      secondaryDetail: '1K impressions',
      color: 'text-yellow-400'
    },
    {
      icon: '⚡',
      label: 'Avg Load Time',
      value: `${metrics.avgLoadTime}ms`,
      detail: `↓ ${metrics.loadTimeImprovement}ms faster`,
      secondaryDetail: 'than last week',
      badge: { text: '✅ Excellent', color: 'text-green-400' },
      color: 'text-blue-400'
    },
    {
      icon: '🎯',
      label: 'Fill Rate',
      value: `${metrics.fillRate}%`,
      detail: 'Available ad',
      secondaryDetail: 'requests filled',
      badge: { text: '✅ Great', color: 'text-green-400' },
      color: 'text-green-400'
    },
    {
      icon: '📍',
      label: 'Active Sites',
      value: `${metrics.activeSites} sites`,
      detail: 'All verified',
      secondaryDetail: '& running',
      color: 'text-purple-400'
    },
    {
      icon: '🔥',
      label: 'Active Ads',
      value: `${metrics.activeAds} campaigns`,
      detail: `${metrics.newAdsThisWeek} new this week`,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default PublisherMetrics;
