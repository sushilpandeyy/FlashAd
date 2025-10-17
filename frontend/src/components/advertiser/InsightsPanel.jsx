const InsightsPanel = () => {
  const insights = [
    {
      icon: '+',
      type: 'opportunity',
      message: 'Your "Summer Sale" campaign is performing 24% better than average. Consider increasing budget.'
    },
    {
      icon: '!',
      type: 'warning',
      message: '"Crypto Course" CTR dropped by 15% this week. Try updating your ad creative.'
    },
    {
      icon: '→',
      type: 'tip',
      message: 'Best performing time: Weekdays 2-5 PM. Schedule campaigns accordingly.'
    }
  ];

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6">
      <h3 className="font-mono uppercase tracking-wider text-sm mb-5">
        Smart Insights
      </h3>

      <div className="flex flex-col gap-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 border border-vintage-gray-400 flex gap-3 items-start"
          >
            <span className="font-mono text-lg">{insight.icon}</span>
            <p className="m-0 font-mono text-xs leading-relaxed">
              {insight.message}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full btn-vintage text-xs py-2">
        View All
      </button>
    </div>
  );
};

export default InsightsPanel;
