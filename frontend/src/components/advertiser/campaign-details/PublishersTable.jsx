import { useState } from 'react';

const PublishersTable = ({ publishers, totalStats }) => {
  const [expandedPublisher, setExpandedPublisher] = useState(null);
  const [sortColumn, setSortColumn] = useState('impressions');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showAll, setShowAll] = useState(false);

  // Sort publishers
  const sortedPublishers = [...publishers].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
  });

  // Show top 5 or all
  const displayedPublishers = showAll ? sortedPublishers : sortedPublishers.slice(0, 5);
  const hiddenCount = publishers.length - 5;

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const toggleExpand = (publisherId) => {
    setExpandedPublisher(expandedPublisher === publisherId ? null : publisherId);
  };

  const getBadge = (publisher) => {
    if (publisher.badge === 'top') return { icon: '⭐', text: 'Top performer', color: 'text-yellow-400' };
    if (publisher.badge === 'growing') return { icon: '⚡', text: 'Fast growing', color: 'text-blue-400' };
    if (publisher.badge === 'roi') return { icon: '💰', text: 'Best ROI', color: 'text-green-400' };
    if (publisher.badge === 'ctr') return { icon: '🔥', text: 'Highest CTR', color: 'text-red-400' };
    if (publisher.badge === 'fast') return { icon: '⏱️', text: 'Fastest load', color: 'text-purple-400' };
    return null;
  };

  const getCtrColor = (ctr) => {
    if (ctr >= 2) return 'text-green-400';
    if (ctr >= 1) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono uppercase tracking-wider text-sm">
          🌍 Top Performing Publishers ({publishers.length} total)
        </h3>
        {!showAll && hiddenCount > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="font-mono text-xs text-vintage-gray-600 hover:text-vintage-white transition-colors"
          >
            View All →
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="border-b-2 border-vintage-gray-400">
              <th
                className="text-left py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('name')}
              >
                Publisher {sortColumn === 'name' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
              <th
                className="text-right py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('impressions')}
              >
                Impressions {sortColumn === 'impressions' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
              <th
                className="text-right py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('clicks')}
              >
                Clicks {sortColumn === 'clicks' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
              <th
                className="text-right py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('ctr')}
              >
                CTR {sortColumn === 'ctr' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
              <th
                className="text-right py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('earned')}
              >
                Earned {sortColumn === 'earned' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
              <th
                className="text-right py-3 px-2 cursor-pointer hover:text-vintage-white transition-colors"
                onClick={() => handleSort('share')}
              >
                Share {sortColumn === 'share' && (sortDirection === 'desc' ? '↓' : '↑')}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedPublishers.map((publisher) => {
              const badge = getBadge(publisher);
              const isExpanded = expandedPublisher === publisher.id;

              return (
                <>
                  <tr
                    key={publisher.id}
                    className="border-b border-vintage-gray-400 hover:bg-vintage-gray-200 cursor-pointer transition-colors"
                    onClick={() => toggleExpand(publisher.id)}
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌐</span>
                        <span>{publisher.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-2">{publisher.impressions.toLocaleString()}</td>
                    <td className="text-right py-4 px-2">{publisher.clicks.toLocaleString()}</td>
                    <td className={`text-right py-4 px-2 ${getCtrColor(publisher.ctr)}`}>
                      {publisher.ctr.toFixed(2)}%
                    </td>
                    <td className="text-right py-4 px-2">${publisher.earned.toFixed(2)}</td>
                    <td className="text-right py-4 px-2">{publisher.share}%</td>
                  </tr>

                  {/* Progress Bar Row */}
                  <tr className="border-b border-vintage-gray-400">
                    <td colSpan="6" className="py-2 px-2">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-vintage-gray-400 h-2">
                          <div
                            className="bg-vintage-white h-2 transition-all duration-500"
                            style={{ width: `${publisher.share}%` }}
                          />
                        </div>
                        <span className="text-xs text-vintage-gray-600 whitespace-nowrap">
                          {publisher.share}% of total
                        </span>
                      </div>
                      {badge && (
                        <div className={`flex items-center gap-2 mt-2 text-xs ${badge.color}`}>
                          <span>{badge.icon}</span>
                          <span>{badge.text}</span>
                          {publisher.badgeDetail && (
                            <span className="text-vintage-gray-600">• {publisher.badgeDetail}</span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <tr className="bg-vintage-gray-200">
                      <td colSpan="6" className="p-4">
                        <div className="border border-vintage-gray-400 p-4">
                          <h4 className="font-mono text-sm mb-3 border-b border-vintage-gray-400 pb-2">
                            📍 {publisher.name} - Detailed Stats
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                            <div>
                              <div className="text-vintage-gray-600">Total Impressions:</div>
                              <div className="text-vintage-white">
                                {publisher.impressions.toLocaleString()} ({publisher.share}% of campaign)
                              </div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Total Clicks:</div>
                              <div className="text-vintage-white">
                                {publisher.clicks.toLocaleString()} (CTR: {publisher.ctr.toFixed(2)}%)
                              </div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Amount Paid:</div>
                              <div className="text-vintage-white">${publisher.earned.toFixed(2)}</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Avg. Load Time:</div>
                              <div className="text-vintage-white">{publisher.loadTime || 'N/A'}ms</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">First Impression:</div>
                              <div className="text-vintage-white">{publisher.firstImpression}</div>
                            </div>
                            <div>
                              <div className="text-vintage-gray-600">Last Impression:</div>
                              <div className="text-vintage-white">{publisher.lastImpression}</div>
                            </div>
                          </div>

                          {publisher.placements && publisher.placements.length > 0 && (
                            <div className="mb-4">
                              <div className="text-vintage-gray-600 text-xs mb-2">Ad Placements:</div>
                              <ul className="text-xs space-y-1">
                                {publisher.placements.map((placement, idx) => (
                                  <li key={idx} className="text-vintage-white">
                                    • {placement.name} - {placement.impressions.toLocaleString()} impressions
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <button className="btn-vintage text-xs py-1 px-3">
                              Visit Publisher Site →
                            </button>
                            <button className="btn-vintage text-xs py-1 px-3">
                              View All Transactions →
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {!showAll && hiddenCount > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="btn-vintage text-xs py-2 px-4"
          >
            + {hiddenCount} more publishers - Show All Publishers →
          </button>
        </div>
      )}
    </div>
  );
};

export default PublishersTable;
