import { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PublisherDeepDive = ({ publishers }) => {
  const [sortBy, setSortBy] = useState('ctr');
  const [showAll, setShowAll] = useState(false);

  const sortedPublishers = [...publishers].sort((a, b) => {
    switch (sortBy) {
      case 'ctr':
        return b.ctr - a.ctr;
      case 'impressions':
        return b.impressions - a.impressions;
      case 'score':
        return getScoreValue(b.score) - getScoreValue(a.score);
      default:
        return 0;
    }
  });

  const displayedPublishers = showAll ? sortedPublishers : sortedPublishers.slice(0, 3);

  function getScoreValue(score) {
    const scoreMap = { 'A+': 5, 'A': 4, 'B+': 3, 'B': 2, 'C': 1 };
    return scoreMap[score] || 0;
  }

  function getScoreColor(score) {
    const colorMap = {
      'A+': 'text-green-400',
      'A': 'text-blue-400',
      'B+': 'text-yellow-400',
      'B': 'text-orange-400',
      'C': 'text-red-400'
    };
    return colorMap[score] || 'text-vintage-gray-600';
  }

  const scatterData = publishers.map(p => ({
    x: p.impressions,
    y: p.ctr,
    name: p.name,
    spent: p.spent
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-vintage-black border-2 border-vintage-white p-3 font-mono text-xs">
          <p className="text-vintage-white mb-1">{data.name}</p>
          <p className="text-blue-400">Impressions: {data.x.toLocaleString()}</p>
          <p className="text-green-400">CTR: {data.y.toFixed(2)}%</p>
          <p className="text-yellow-400">Spent: ${data.spent.toFixed(2)}</p>
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
          🌐 Publisher Performance Comparison
        </h2>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-vintage-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-vintage text-xs py-1 px-2"
          >
            <option value="ctr">CTR</option>
            <option value="impressions">Impressions</option>
            <option value="score">Score</option>
          </select>
        </div>
      </div>

      {/* Publisher Cards */}
      <div className="space-y-4 mb-6">
        {displayedPublishers.map((publisher, index) => (
          <div
            key={index}
            className="border border-vintage-gray-400 p-4 hover:bg-vintage-gray-200 transition-colors"
          >
            {/* Publisher Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-mono text-sm text-vintage-white">{publisher.name}</h3>
                  <span className={`font-mono text-xs font-bold ${getScoreColor(publisher.score)}`}>
                    {publisher.score}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-3 font-mono text-xs">
              <div>
                <div className="text-vintage-gray-600">Impressions</div>
                <div className="text-blue-400">{publisher.impressions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">Clicks</div>
                <div className="text-purple-400">{publisher.clicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">CTR</div>
                <div className="text-green-400">{publisher.ctr.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">CPC</div>
                <div className="text-yellow-400">${publisher.cpc.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">Load Time</div>
                <div>{publisher.loadTime}ms</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">Score</div>
                <div className={getScoreColor(publisher.score)}>{publisher.score}</div>
              </div>
            </div>

            {/* Details */}
            <div className="font-mono text-xs text-vintage-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <span>├─</span>
                <span>Traffic Quality: <span className="text-vintage-white">{publisher.trafficQuality}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span>├─</span>
                <span>Engagement Rate: <span className="text-vintage-white">{publisher.engagementRate}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span>└─</span>
                <span>Best Performing Ad Slot: <span className="text-vintage-white">{publisher.bestSlot}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      {!showAll && publishers.length > 3 && (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowAll(true)}
            className="btn-vintage text-xs py-2 px-4"
          >
            + {publishers.length - 3} more publishers - Show All →
          </button>
        </div>
      )}

      {/* Scatter Plot */}
      <div className="border-t border-vintage-gray-400 pt-6">
        <h3 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-4">
          📊 CTR vs Impressions Scatter Plot
        </h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                type="number"
                dataKey="x"
                name="Impressions"
                stroke="#9CA3AF"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                label={{ value: 'Impressions', position: 'insideBottom', offset: -10, style: { fontSize: '12px' } }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="CTR"
                stroke="#9CA3AF"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                label={{ value: 'CTR (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={scatterData} fill="#3B82F6">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index < 3 ? '#10B981' : '#3B82F6'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 font-mono text-xs text-vintage-gray-600 text-center">
          Bubble color: Green = Top performers | Blue = Others
        </div>
      </div>
    </div>
  );
};

export default PublisherDeepDive;
