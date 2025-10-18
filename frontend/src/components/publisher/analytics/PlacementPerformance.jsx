import { useState } from 'react';

const PlacementPerformance = ({ placements }) => {
  const [expandedSites, setExpandedSites] = useState(['cryptonews.io']);
  const [sortBy, setSortBy] = useState('revenue');

  const toggleSite = (siteId) => {
    setExpandedSites(prev =>
      prev.includes(siteId)
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const getLoadTimeStatus = (loadTime) => {
    if (loadTime < 200) return { icon: '✅', text: 'Good', color: 'text-green-400' };
    if (loadTime < 250) return { icon: '⚠️', text: 'Fair', color: 'text-yellow-400' };
    return { icon: '❌', text: 'Slow', color: 'text-red-400' };
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          📍 Performance by Ad Placement
        </h2>

        {/* Sort Selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-vintage text-xs py-1 px-3"
        >
          <option value="revenue">Sort: Revenue</option>
          <option value="impressions">Sort: Impressions</option>
          <option value="ctr">Sort: CTR</option>
          <option value="rpm">Sort: RPM</option>
          <option value="loadTime">Sort: Load Time</option>
        </select>
      </div>

      {/* Placements Table */}
      <div className="space-y-4">
        {placements.map((site) => (
          <div key={site.id} className="border border-vintage-gray-400">
            {/* Site Header */}
            <div
              onClick={() => toggleSite(site.id)}
              className="p-4 cursor-pointer hover:bg-vintage-gray-200 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span>{expandedSites.includes(site.id) ? '▼' : '▶'}</span>
                <span className="text-xl">🌐</span>
                <div>
                  <div className="font-mono text-sm font-bold">{site.domain}</div>
                  <div className="font-mono text-xs text-vintage-gray-600">
                    {site.placements.length} placements • ${site.totalRevenue.toFixed(2)} total
                  </div>
                </div>
              </div>
            </div>

            {/* Placements */}
            {expandedSites.includes(site.id) && (
              <div className="border-t border-vintage-gray-400">
                {site.placements.map((placement, index) => {
                  const loadStatus = getLoadTimeStatus(placement.loadTime);
                  return (
                    <div
                      key={index}
                      className="p-4 pl-12 border-b border-vintage-gray-400 last:border-b-0 hover:bg-vintage-gray-200 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-lg">{placement.icon}</span>
                        <div className="flex-1">
                          <div className="font-mono text-sm font-bold mb-1">{placement.name}</div>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-5 gap-4 mb-3 font-mono text-xs">
                            <div>
                              <div className="text-vintage-gray-600">Impressions</div>
                              <div className="text-blue-400 font-bold">{placement.impressions.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Clicks</div>
                              <div className="text-purple-400 font-bold">{placement.clicks.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">CTR</div>
                              <div className="text-green-400 font-bold">{placement.ctr.toFixed(2)}%</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Revenue</div>
                              <div className="text-green-400 font-bold">${placement.revenue.toFixed(2)}</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">RPM</div>
                              <div className="text-yellow-400 font-bold">${placement.rpm.toFixed(2)}</div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="w-full bg-vintage-gray-400 h-2">
                              <div
                                className="h-2 bg-green-500 transition-all"
                                style={{ width: `${placement.revenueShare}%` }}
                              />
                            </div>
                            <div className="font-mono text-xs text-vintage-gray-600 mt-1">
                              {placement.revenueShare}% of site revenue
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex items-center justify-between font-mono text-xs text-vintage-gray-600">
                            <span>Best performing time: {placement.bestTime}</span>
                            <span className={loadStatus.color}>
                              Load time: {placement.loadTime}ms {loadStatus.icon} {loadStatus.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementPerformance;
