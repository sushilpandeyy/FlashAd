const SummaryCard = ({ icon, label, value, trend, trendText, color = 'blue' }) => {
  const isPositive = trend > 0;

  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400'
  };

  const valueColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6 flex-1 min-w-[250px] hover:bg-vintage-gray-200 transition-all hover:shadow-lg">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs font-mono uppercase tracking-wider text-vintage-gray-600 mb-2">{label}</div>
      <div className={`text-4xl font-bold mb-2 ${valueColor}`}>{value}</div>
      <div className={`text-xs font-mono flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{trendText}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
