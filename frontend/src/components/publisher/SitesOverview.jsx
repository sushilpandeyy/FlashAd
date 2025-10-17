import { Link } from 'react-router-dom';

const SitesOverview = ({ sites }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-400';
      case 'PAUSED': return 'text-yellow-400';
      case 'PENDING': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE': return '🟢';
      case 'PAUSED': return '🟡';
      case 'PENDING': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          📍 Your Sites Overview
        </h2>
        <Link
          to="/publisher/sites/add"
          className="btn-vintage-inverse text-xs py-2 px-4"
        >
          + Add New Site
        </Link>
      </div>

      {/* Sites List */}
      <div className="space-y-4">
        {sites.map((site, index) => (
          <div
            key={index}
            className="border border-vintage-gray-400 p-5 hover:bg-vintage-gray-200 transition-colors"
          >
            {/* Site Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-bold">{site.domain}</h3>
                    <span className={`font-mono text-xs ${getStatusColor(site.status)}`}>
                      {getStatusIcon(site.status)} {site.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-vintage-gray-600 mt-1">
                    {site.category} • Added {site.addedDate}
                  </div>
                </div>
              </div>
              {site.isTopPerformer && (
                <span className="text-yellow-400 text-xl">⭐</span>
              )}
            </div>

            {/* Earnings & Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="font-mono text-xs">
                <div className="text-vintage-gray-600 mb-1">Today's Earnings</div>
                <div className="text-green-400 text-lg font-bold">${site.earningsToday.toFixed(2)}</div>
              </div>
              <div className="font-mono text-xs">
                <div className="text-vintage-gray-600 mb-1">This Month</div>
                <div className="text-blue-400 text-lg font-bold">${site.earningsMonth.toFixed(2)}</div>
              </div>
              <div className="font-mono text-xs">
                <div className="text-vintage-gray-600 mb-1">RPM</div>
                <div className="text-yellow-400 text-lg font-bold">${site.rpm.toFixed(2)}</div>
              </div>
              <div className="font-mono text-xs">
                <div className="text-vintage-gray-600 mb-1">Fill Rate</div>
                <div className="text-purple-400 text-lg font-bold">{site.fillRate}%</div>
              </div>
            </div>

            {/* Placements Performance */}
            <div className="border-t border-vintage-gray-400 pt-4 mb-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
                🎯 Best Performing Placements:
              </h4>
              <div className="space-y-2">
                {site.topPlacements.map((placement, pIndex) => (
                  <div
                    key={pIndex}
                    className="flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${pIndex === 0 ? 'text-green-400' : 'text-vintage-gray-600'}`}>
                        #{pIndex + 1}
                      </span>
                      <span className="text-vintage-white">{placement.name}</span>
                      <span className="text-vintage-gray-600">({placement.type})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-blue-400">{placement.impressions.toLocaleString()} impr</span>
                      <span className="text-green-400">${placement.earnings.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Quality & Actions */}
            <div className="flex items-center justify-between">
              <div className="font-mono text-xs">
                <span className="text-vintage-gray-600">Traffic Quality: </span>
                <span className={`font-bold ${
                  site.trafficQuality >= 90 ? 'text-green-400' :
                  site.trafficQuality >= 70 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {site.trafficQuality}% {
                    site.trafficQuality >= 90 ? '✅ Excellent' :
                    site.trafficQuality >= 70 ? '⚠️ Good' :
                    '❌ Needs Improvement'
                  }
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/publisher/sites/${site.id}`}
                  className="btn-vintage text-xs py-1 px-3"
                >
                  View Details
                </Link>
                <Link
                  to={`/publisher/sites/${site.id}/placements`}
                  className="btn-vintage-inverse text-xs py-1 px-3"
                >
                  Manage Placements
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="border-t border-vintage-gray-400 pt-4 mt-6">
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-6">
            <span className="text-vintage-gray-600">
              Total Sites: <span className="text-vintage-white font-bold">{sites.length}</span>
            </span>
            <span className="text-vintage-gray-600">
              Active: <span className="text-green-400 font-bold">{sites.filter(s => s.status === 'ACTIVE').length}</span>
            </span>
            <span className="text-vintage-gray-600">
              Combined Monthly: <span className="text-blue-400 font-bold">${sites.reduce((sum, s) => sum + s.earningsMonth, 0).toFixed(2)}</span>
            </span>
          </div>
          <Link
            to="/publisher/sites"
            className="text-vintage-gray-600 hover:text-vintage-white transition-colors"
          >
            View All Sites →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitesOverview;
