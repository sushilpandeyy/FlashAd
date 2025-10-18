import { Link } from 'react-router-dom';
import { useState } from 'react';

const SiteHeader = ({ site, onPause, onResume, onSettings }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusStyle = () => {
    switch (site.status) {
      case 'active':
        return { bg: 'bg-green-900 bg-opacity-20', text: 'text-green-400', icon: '🟢' };
      case 'paused':
        return { bg: 'bg-yellow-900 bg-opacity-20', text: 'text-yellow-400', icon: '🟡' };
      case 'offline':
        return { bg: 'bg-red-900 bg-opacity-20', text: 'text-red-400', icon: '🔴' };
      default:
        return { bg: 'bg-vintage-gray-400 bg-opacity-20', text: 'text-vintage-white', icon: '⚪' };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <div className="border-b-2 border-vintage-gray-400 pb-6 mb-8">
      {/* Back Link */}
      <Link
        to="/publisher/dashboard"
        className="inline-flex items-center gap-2 font-mono text-sm text-vintage-gray-600 hover:text-vintage-white transition-colors mb-4"
      >
        ← Back to Dashboard
      </Link>

      {/* Site Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🌐</span>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-serif text-3xl">{site.domain}</h1>
              <span className={`font-mono text-xs px-3 py-1 ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.icon} {site.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-sm text-vintage-gray-600">
              <span>Publisher ID: {site.publisherId}</span>
              <span>•</span>
              <span>{site.category}</span>
              <span>•</span>
              <span>Added {site.addedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="btn-vintage text-xs py-2 px-4"
          >
            Actions ▼
          </button>

          {showActions && (
            <div className="absolute top-full right-0 mt-2 border-2 border-vintage-white bg-vintage-black p-2 z-10 min-w-[200px]">
              <button
                onClick={() => {
                  onSettings();
                  setShowActions(false);
                }}
                className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors"
              >
                ⚙️ Site Settings
              </button>

              {site.status === 'active' ? (
                <button
                  onClick={() => {
                    onPause();
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors text-yellow-400"
                >
                  ⏸️ Pause Site
                </button>
              ) : (
                <button
                  onClick={() => {
                    onResume();
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors text-green-400"
                >
                  ▶️ Resume Site
                </button>
              )}

              <Link
                to={`/publisher/sites/${site.id}/analytics`}
                className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors"
              >
                📊 View Analytics
              </Link>

              <button
                className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors text-red-400"
              >
                🗑️ Remove Site
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex gap-6 font-mono text-sm">
        <div>
          <span className="text-vintage-gray-600">Traffic Quality: </span>
          <span className="text-green-400 font-bold">{site.trafficQuality}% ✅</span>
        </div>
        <div>
          <span className="text-vintage-gray-600">Active Placements: </span>
          <span className="text-blue-400 font-bold">{site.activePlacements}</span>
        </div>
        <div>
          <span className="text-vintage-gray-600">Monthly Visitors: </span>
          <span className="text-purple-400 font-bold">{site.monthlyVisitors.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
