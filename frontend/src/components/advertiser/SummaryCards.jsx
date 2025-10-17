import SummaryCard from './SummaryCard';

const SummaryCards = () => {
  const summaryData = [
    {
      icon: '💰',
      label: 'Total Spend',
      value: '$1,247.50',
      trend: 12,
      trendText: '12% vs last month',
      color: 'green'
    },
    {
      icon: '👁️',
      label: 'Impressions',
      value: '624,000',
      trend: 8,
      trendText: '8% vs last week',
      color: 'blue'
    },
    {
      icon: '🖱️',
      label: 'Total Clicks',
      value: '12,480',
      trend: 15,
      trendText: '15% vs last week',
      color: 'purple'
    },
    {
      icon: '📈',
      label: 'Avg CTR',
      value: '2.00%',
      trend: 0.3,
      trendText: '0.3% better',
      color: 'yellow'
    }
  ];

  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {summaryData.map((data, index) => (
        <SummaryCard key={index} {...data} />
      ))}
    </div>
  );
};

export default SummaryCards;
