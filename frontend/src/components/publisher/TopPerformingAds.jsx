import { useState } from 'react';

const TopPerformingAds = ({ ads }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedAds = showAll ? ads : ads.slice(0, 5);

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'bg-green-900 bg-opacity-20 text-green-400';
      case 'Very Good': return 'bg-green-900 bg-opacity-10 text-green-400';
      case 'Good': return 'text-vintage-white';
      case 'Average': return 'bg-yellow-900 bg-opacity-10 text-yellow-400';
      case 'Poor': return 'bg-red-900 bg-opacity-10 text-red-400';
      default: return 'text-vintage-white';
    }
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          🔥 Top Performing Ads (Last 30 Days)
        </h2>
        {!showAll && ads.length > 5 && (
          <button className="font-mono text-xs text-vintage-gray-600 hover:text-vintage-white transition-colors">
            View All →
          </button>
        )}
      </div>

      {/* Ads List */}
      <div className="space-y-4">
        {displayedAds.map((ad, index) => (
          <div
            key={index}
            className={`border border-vintage-gray-400 p-4 hover:bg-vintage-gray-200 transition-colors ${getPerformanceColor(ad.performance)}`}
          >
            {/* Ad Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🖼️</span>
                <div>
                  <h3 className="font-mono text-sm font-bold">{ad.campaign}</h3>
                  <div className="flex items-center gap-2 font-mono text-xs text-vintage-gray-600 mt-1">
                    <span className={`px-2 py-0.5 border ${ad.type === 'CPM' ? 'border-blue-400 text-blue-400' : 'border-green-400 text-green-400'}`}>
                      {ad.type} Campaign
                    </span>
                    <span>•</span>
                    <span>{ad.sites}</span>
                  </div>
                </div>
              </div>
              {index === 0 && (
                <span className="text-yellow-400 text-xl">⭐</span>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 mb-3 font-mono text-xs">
              <div>
                <div className="text-vintage-gray-600">Impressions</div>
                <div className="text-blue-400 font-bold">{ad.impressions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">Clicks</div>
                <div className="text-purple-400 font-bold">{ad.clicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">Earned</div>
                <div className="text-green-400 font-bold">${ad.earned.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600">RPM</div>
                <div className="text-yellow-400 font-bold">${ad.rpm.toFixed(2)}</div>
              </div>
            </div>

            {/* Performance Details */}
            <div className="flex items-center justify-between font-mono text-xs text-vintage-gray-600">
              <span>Performance: <span className="text-vintage-white">{ad.performance}</span></span>
              <span>Load time: <span className="text-vintage-white">{ad.loadTime}ms</span></span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-vintage-gray-400 h-2">
                <div
                  className="h-2 bg-green-500 transition-all duration-500"
                  style={{ width: `${ad.sharePercentage}%` }}
                />
              </div>
              <div className="font-mono text-xs text-vintage-gray-600 mt-1">
                {ad.sharePercentage}% of monthly earnings
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      {!showAll && ads.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="btn-vintage text-xs py-2 px-4"
          >
            + {ads.length - 5} more campaigns - Show All Ads →
          </button>
        </div>
      )}
    </div>
  );
};

export default TopPerformingAds;
