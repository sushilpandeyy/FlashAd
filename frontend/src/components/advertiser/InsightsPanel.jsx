const InsightsPanel = () => {
  const insights = [
    {
      icon: '⚡',
      type: 'opportunity',
      message: 'Your "Summer Sale" campaign is performing 24% better than average. Consider increasing budget.',
      color: 'border-green-400',
      iconColor: 'text-green-400'
    },
    {
      icon: '⚠️',
      type: 'warning',
      message: '"Crypto Course" CTR dropped by 15% this week. Try updating your ad creative.',
      color: 'border-red-400',
      iconColor: 'text-red-400'
    },
    {
      icon: '💡',
      type: 'tip',
      message: 'Best performing time: Weekdays 2-5 PM. Schedule campaigns accordingly.',
      color: 'border-blue-400',
      iconColor: 'text-blue-400'
    }
  ];

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6">
      <h3 className="font-mono uppercase tracking-wider text-sm mb-5">
        💡 Smart Insights
      </h3>

      <div className="flex flex-col gap-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 border-2 ${insight.color} flex gap-3 items-start hover:bg-vintage-gray-200 transition-colors`}
          >
            <span className={`text-lg ${insight.iconColor}`}>{insight.icon}</span>
            <p className="m-0 font-mono text-xs leading-relaxed">
              {insight.message}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full btn-vintage text-xs py-2">
        View All Insights
      </button>
    </div>
  );
};

export default InsightsPanel;
