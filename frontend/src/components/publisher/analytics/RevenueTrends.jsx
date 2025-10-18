import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueTrends = ({ data }) => {
  const [timeView, setTimeView] = useState('daily');
  const [visibleMetrics, setVisibleMetrics] = useState({
    revenue: true,
    impressions: false,
    ctr: false
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const toggleMetric = (metric) => {
    setVisibleMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          📈 Revenue & Performance Trends
        </h2>

        {/* View Selector */}
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map((view) => (
            <button
              key={view}
              onClick={() => setTimeView(view)}
              className={`btn-vintage text-xs py-1 px-3 capitalize ${
                timeView === view ? 'bg-vintage-white text-vintage-black' : ''
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Toggles */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={visibleMetrics.revenue}
            onChange={() => toggleMetric('revenue')}
            className="w-4 h-4"
          />
          <span className="font-mono text-xs text-green-400">Revenue</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={visibleMetrics.impressions}
            onChange={() => toggleMetric('impressions')}
            className="w-4 h-4"
          />
          <span className="font-mono text-xs text-blue-400">Impressions</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={visibleMetrics.ctr}
            onChange={() => toggleMetric('ctr')}
            className="w-4 h-4"
          />
          <span className="font-mono text-xs text-purple-400">CTR</span>
        </label>
      </div>

      {/* Chart */}
      <div style={{ height: '300px' }} className="mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {visibleMetrics.revenue && (
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
                name="Revenue ($)"
              />
            )}
            {visibleMetrics.impressions && (
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                name="Impressions"
              />
            )}
            {visibleMetrics.ctr && (
              <Line
                type="monotone"
                dataKey="ctr"
                stroke="#8B5CF6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#8B5CF6', r: 4 }}
                name="CTR (%)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="border-t-2 border-vintage-gray-400 pt-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          💡 Key Insights:
        </h3>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Peak revenue: Oct 23 ($62.40) - 63% above average</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>CTR improved 18% in second half of month</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Weekend revenue dips by ~35% on average</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RevenueTrends;
