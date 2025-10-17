const SummaryCard = ({ icon, label, value, trend, trendText }) => {
  const isPositive = trend > 0;

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6 flex-1 min-w-[250px]">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-xs font-mono uppercase tracking-wider text-vintage-gray-600 mb-2">{label}</div>
      <div className="text-4xl font-serif mb-2">{value}</div>
      <div className={`text-xs font-mono flex items-center gap-1 ${isPositive ? 'text-vintage-white' : 'text-vintage-gray-600'}`}>
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>{trendText}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
