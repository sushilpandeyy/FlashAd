const RevenueOverview = ({ data }) => {
  const metrics = [
    {
      icon: '💰',
      label: 'Total Revenue',
      value: `$${data.totalRevenue.toFixed(2)}`,
      trend: `↑ ${data.revenueTrend}% vs last month`,
      secondary: `${data.totalImpressions.toLocaleString()} impr`,
      color: 'text-green-400'
    },
    {
      icon: '📊',
      label: 'Avg Daily',
      value: `$${data.avgDaily.toFixed(2)}`,
      trend: `Best: $${data.bestDay.toFixed(2)}`,
      secondary: `Worst: $${data.worstDay.toFixed(2)}`,
      color: 'text-blue-400'
    },
    {
      icon: '📈',
      label: 'RPM',
      value: `$${data.rpm.toFixed(2)}`,
      trend: `Industry: $${data.industryRpm.toFixed(2)}`,
      secondary: `↑ ${((data.rpm - data.industryRpm) / data.industryRpm * 100).toFixed(0)}% better`,
      color: 'text-purple-400'
    },
    {
      icon: '👁️',
      label: 'Total Impressions',
      value: data.totalImpressions.toLocaleString(),
      trend: `${(data.totalImpressions / data.days).toFixed(0)}K daily avg`,
      secondary: `↑ ${data.impressionGrowth}% growth`,
      color: 'text-blue-400'
    },
    {
      icon: '🖱️',
      label: 'Total Clicks',
      value: data.totalClicks.toLocaleString(),
      trend: `${Math.floor(data.totalClicks / data.days)} daily avg`,
      secondary: `↑ ${data.clickGrowth}% growth`,
      color: 'text-purple-400'
    },
    {
      icon: '📌',
      label: 'Avg CTR',
      value: `${data.avgCTR.toFixed(2)}%`,
      trend: `vs ${data.industryCTR}% avg`,
      secondary: '⭐ Excellent',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        💰 Revenue Analysis - Last 30 Days
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="border-2 border-vintage-gray-400 p-5 hover:bg-vintage-gray-200 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{metric.icon}</span>
              <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600">
                {metric.label}
              </h3>
            </div>

            <div className={`text-2xl font-bold mb-2 ${metric.color}`}>
              {metric.value}
            </div>

            <div className="border-t-2 border-vintage-gray-400 pt-2 mt-2">
              <div className="font-mono text-xs text-vintage-gray-600 mb-1">
                {metric.trend}
              </div>
              <div className="font-mono text-xs text-vintage-gray-600">
                {metric.secondary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueOverview;
