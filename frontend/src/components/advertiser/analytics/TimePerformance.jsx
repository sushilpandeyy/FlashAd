import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TimePerformance = ({ data }) => {
  const [timeView, setTimeView] = useState('hourly');

  const { hourlyData, dailyData, weeklyData, insights } = data;

  const getCurrentData = () => {
    switch (timeView) {
      case 'hourly':
        return hourlyData;
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      default:
        return hourlyData;
    }
  };

  const currentData = getCurrentData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          ⏰ Performance by Time Period
        </h2>

        {/* Time View Selector */}
        <div className="flex gap-2">
          {['hourly', 'daily', 'weekly'].map((view) => (
            <button
              key={view}
              onClick={() => setTimeView(view)}
              className={`btn-vintage text-xs py-1 px-3 ${
                timeView === view ? 'bg-vintage-white text-vintage-black' : ''
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Title */}
      <h3 className="font-mono text-sm mb-4 text-blue-400">
        📈 {timeView === 'hourly' ? 'Hourly' : timeView === 'daily' ? 'Daily' : 'Weekly'} Performance (Last 7 Days)
      </h3>

      {/* Chart */}
      <div className="mb-6" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis
              dataKey="label"
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 3 }}
              name="Impressions"
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', r: 3 }}
              name="Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="border-t border-vintage-gray-400 pt-4">
        <h4 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          💡 Key Insights:
        </h4>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimePerformance;
