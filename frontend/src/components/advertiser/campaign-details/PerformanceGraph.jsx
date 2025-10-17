import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const PerformanceGraph = ({ performanceData }) => {
  const [timeRange, setTimeRange] = useState('7D');
  const [showImpressions, setShowImpressions] = useState(true);
  const [showClicks, setShowClicks] = useState(true);

  // Filter data based on time range
  const filterDataByRange = () => {
    const days = {
      '7D': 7,
      '14D': 14,
      '30D': 30,
      'ALL': performanceData.length
    };
    const daysToShow = days[timeRange] || 7;
    return performanceData.slice(-daysToShow);
  };

  const filteredData = filterDataByRange();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-sm">
          <p className="text-vintage-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
          {payload[0] && payload[1] && (
            <p className="text-vintage-gray-600 mt-2">
              CTR: {((payload[1].value / payload[0].value) * 100).toFixed(2)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Find peak performance
  const findPeakPerformance = () => {
    if (!filteredData.length) return null;

    const peak = filteredData.reduce((max, day) => {
      return day.impressions > max.impressions ? day : max;
    }, filteredData[0]);

    return peak;
  };

  const peakDay = findPeakPerformance();

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h3 className="font-mono uppercase tracking-wider text-sm">
          📊 Performance Over Time
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          {/* Time Range Selector */}
          <div className="flex gap-2">
            {['7D', '14D', '30D', 'ALL'].map((range) => (
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

          {/* Metric Toggles */}
          <div className="flex gap-3 font-mono text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showImpressions}
                onChange={(e) => setShowImpressions(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 inline-block"></span>
                Impressions
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showClicks}
                onChange={(e) => setShowClicks(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-purple-500 inline-block"></span>
                Clicks
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
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
            <Legend
              wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
            />
            {showImpressions && (
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Impressions"
              />
            )}
            {showClicks && (
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Clicks"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Peak Performance Insight */}
      {peakDay && (
        <div className="border-t border-vintage-gray-400 pt-4">
          <p className="font-mono text-xs text-vintage-gray-600">
            💡 Peak performance: {peakDay.date} ({peakDay.impressions.toLocaleString()} impressions, {peakDay.clicks.toLocaleString()} clicks)
          </p>
        </div>
      )}
    </div>
  );
};

export default PerformanceGraph;
