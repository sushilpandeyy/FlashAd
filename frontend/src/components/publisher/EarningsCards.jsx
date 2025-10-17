const EarningsCard = ({ icon, period, amount, trend, trendText, secondaryText }) => {
  const isPositive = trend > 0;

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6 flex-1 min-w-[250px] hover:bg-vintage-gray-200 transition-all hover:shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <div className="text-xs font-mono uppercase tracking-wider text-vintage-gray-600">
          {period}
        </div>
      </div>

      <div className="text-3xl font-bold text-green-400 mb-2">
        ${amount.toFixed(2)}
      </div>

      {trend !== null && (
        <div className={`text-xs font-mono flex items-center gap-1 mb-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{trendText}</span>
        </div>
      )}

      <div className="text-xs font-mono text-vintage-gray-600">
        {secondaryText}
      </div>
    </div>
  );
};

const EarningsCards = ({ earnings }) => {
  const cardsData = [
    {
      icon: '💵',
      period: 'Today',
      amount: earnings.today,
      trend: earnings.todayTrend,
      trendText: `${Math.abs(earnings.todayTrend)}% vs yesterday`,
      secondaryText: `${earnings.todayImpressions.toLocaleString()} impr`
    },
    {
      icon: '📅',
      period: 'This Week',
      amount: earnings.thisWeek,
      trend: earnings.weekTrend,
      trendText: `${Math.abs(earnings.weekTrend)}% vs last week`,
      secondaryText: `${earnings.weekImpressions.toLocaleString()} impr`
    },
    {
      icon: '📊',
      period: 'This Month',
      amount: earnings.thisMonth,
      trend: earnings.monthTrend,
      trendText: `${Math.abs(earnings.monthTrend)}% vs last month`,
      secondaryText: `${earnings.monthImpressions.toLocaleString()} impr`
    },
    {
      icon: '🏆',
      period: 'All Time',
      amount: earnings.allTime,
      trend: null,
      trendText: '',
      secondaryText: `${earnings.totalCampaigns} campaigns served`
    }
  ];

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {cardsData.map((card, index) => (
        <EarningsCard key={index} {...card} />
      ))}
    </div>
  );
};

export default EarningsCards;
