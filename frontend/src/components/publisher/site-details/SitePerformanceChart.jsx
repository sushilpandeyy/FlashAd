import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SitePerformanceChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-2">{label}</p>
          <p className="text-green-400">Revenue: ${payload[0].value.toFixed(2)}</p>
          {payload[1] && (
            <p className="text-blue-400">Impressions: {payload[1].value.toLocaleString()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      <h2 className="font-mono uppercase tracking-wider text-sm mb-6">
        📈 Revenue Performance - Last 30 Days
      </h2>

      <div style={{ height: '300px' }}>
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
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 3 }}
              hide
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SitePerformanceChart;
