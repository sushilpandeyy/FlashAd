import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const EarningsGraph = ({ data }) => {
  const [timeRange, setTimeRange] = useState('30D');

  const getDataForRange = () => {
    switch (timeRange) {
      case '7D':
        return data.slice(-7);
      case '14D':
        return data.slice(-14);
      case '30D':
        return data.slice(-30);
      case '90D':
        return data.slice(-90);
      case 'ALL':
        return data;
      default:
        return data.slice(-30);
    }
  };

  const currentData = getDataForRange();

  const summary = {
    totalEarned: currentData.reduce((sum, d) => sum + d.earnings, 0),
    avgDaily: currentData.reduce((sum, d) => sum + d.earnings, 0) / currentData.length,
    bestDay: currentData.reduce((best, d) => d.earnings > best.earnings ? d : best, currentData[0]),
    trend: 8 // Mock trend
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-2">{label}</p>
          <p className="text-green-400">Earnings: ${payload[0].value.toFixed(2)}</p>
          {payload[0].payload.impressions && (
            <p className="text-blue-400">Impressions: {payload[0].payload.impressions.toLocaleString()}</p>
          )}
          {payload[0].payload.clicks && (
            <p className="text-purple-400">Clicks: {payload[0].payload.clicks}</p>
          )}
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
          💰 Earnings Over Time
        </h2>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['7D', '14D', '30D', '90D', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`btn-vintage text-xs py-1 px-3 ${
                timeRange === range ? 'bg-vintage-white text-vintage-black' : ''
              }`}
            >
              {range === 'ALL' ? 'All Time' : range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
              label={{ value: '$', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="border-t border-vintage-gray-400 pt-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
          📊 Summary for Last {timeRange === 'ALL' ? 'All Time' : timeRange}:
        </h3>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-green-400">•</span>
            <span>Total Earned: <span className="text-green-400">${summary.totalEarned.toFixed(2)}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-400">•</span>
            <span>Avg Daily: <span className="text-blue-400">${summary.avgDaily.toFixed(2)}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400">•</span>
            <span>Best Day: <span className="text-purple-400">{summary.bestDay.date} (${summary.bestDay.earnings.toFixed(2)})</span></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">•</span>
            <span>Trend: <span className="text-yellow-400">↑ {summary.trend}% growth</span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EarningsGraph;
