import { useState } from 'react';
import { Link } from 'react-router-dom';

const CampaignRow = ({ campaign }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = () => {
    switch (campaign.status) {
      case 'ACTIVE': return 'text-green-400 border-green-400';
      case 'PAUSED': return 'text-yellow-400 border-yellow-400';
      case 'COMPLETED': return 'text-gray-400 border-gray-400';
      case 'OUT_OF_BUDGET': return 'text-red-400 border-red-400';
      default: return 'text-vintage-gray-600 border-vintage-gray-400';
    }
  };

  const getProgressBarColor = () => {
    if (campaign.progress > 90) return 'bg-red-500';
    if (campaign.progress > 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-5 border-b border-vintage-gray-300 relative hover:bg-vintage-gray-200 transition-colors">
      <div className="flex items-start gap-4">
        {/* Campaign Icon */}
        <div className="text-2xl">🖼️</div>

        {/* Campaign Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to={`/advertiser/campaigns/${campaign.id}`}
              className="text-base font-serif hover:underline"
            >
              {campaign.name}
            </Link>

            <span className="px-3 py-1 border border-vintage-white font-mono text-xs uppercase tracking-wider">
              {campaign.type}
            </span>

            <span className={`font-mono text-xs uppercase tracking-wider px-2 py-1 border ${getStatusColor()}`}>
              ● {campaign.status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full h-2 border border-vintage-gray-400 mb-1">
              <div
                className={`h-full ${getProgressBarColor()} transition-all`}
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-vintage-gray-600">{campaign.progress}% spent</span>
          </div>

          {/* Metrics */}
          <div className="font-mono text-xs text-vintage-gray-600">
            {campaign.metrics} · <span className="text-blue-400">CTR: {campaign.ctr}</span> · {campaign.created}
          </div>
        </div>

        {/* Spent/Budget */}
        <div className="text-right min-w-[120px]">
          <div className="font-mono text-sm">
            <span className="text-green-400">${campaign.spent.toFixed(2)}</span> / ${campaign.budget.toFixed(2)}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-vintage-gray-300 transition-colors font-mono"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-vintage-black border-2 border-vintage-white min-w-[180px] z-10">
              <Link
                to={`/advertiser/campaigns/${campaign.id}`}
                className="block px-4 py-2 font-mono text-xs hover:bg-vintage-gray-200 border-b border-vintage-gray-300"
              >
                View Details
              </Link>
              <button className="w-full px-4 py-2 text-left font-mono text-xs hover:bg-vintage-gray-200 border-b border-vintage-gray-300">
                Edit Campaign
              </button>
              <button className="w-full px-4 py-2 text-left font-mono text-xs hover:bg-vintage-gray-200 border-b border-vintage-gray-300">
                {campaign.status === 'ACTIVE' ? 'Pause' : 'Resume'}
              </button>
              <button className="w-full px-4 py-2 text-left font-mono text-xs hover:bg-vintage-gray-200 border-b border-vintage-gray-300">
                Add Budget
              </button>
              <Link
                to={`/advertiser/campaigns/${campaign.id}/analytics`}
                className="block px-4 py-2 font-mono text-xs hover:bg-vintage-gray-200 border-b border-vintage-gray-300"
              >
                Analytics
              </Link>
              <button className="w-full px-4 py-2 text-left font-mono text-xs hover:bg-vintage-gray-200 text-vintage-gray-600">
                Archive
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignRow;
