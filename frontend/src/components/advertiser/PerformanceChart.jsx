import { useState } from 'react';

const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState('7D');

  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-mono uppercase tracking-wider">
          Performance Overview
        </h3>
        <div className="flex gap-2">
          {['7D', '30D', '90D', 'All'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1 border border-vintage-white font-mono text-xs uppercase tracking-wider transition-all ${
                timeRange === range
                  ? 'bg-vintage-white text-vintage-black'
                  : 'bg-transparent text-vintage-white hover:bg-vintage-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="h-[300px] border border-vintage-gray-400 flex items-center justify-center text-vintage-gray-600 font-mono text-sm">
        [Chart visualization]
      </div>

      <div className="mt-4 flex gap-6 text-sm font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-vintage-white"></div>
          <span>Spend ($)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-vintage-white"></div>
          <span>Impressions</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
