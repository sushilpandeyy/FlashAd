import { useState } from 'react';

const PlacementList = ({ placements, onAddPlacement, onEditPlacement, onPausePlacement, onResumePlacement }) => {
  const [expandedPlacements, setExpandedPlacements] = useState([]);

  const togglePlacement = (placementId) => {
    setExpandedPlacements(prev =>
      prev.includes(placementId)
        ? prev.filter(id => id !== placementId)
        : [...prev, placementId]
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-900 bg-opacity-20', text: 'text-green-400', label: 'Active', icon: '✅' };
      case 'low_traffic':
        return { bg: 'bg-yellow-900 bg-opacity-20', text: 'text-yellow-400', label: 'Low Traffic', icon: '⚠️' };
      case 'high_load':
        return { bg: 'bg-orange-900 bg-opacity-20', text: 'text-orange-400', label: 'High Load Time', icon: '⚠️' };
      case 'paused':
        return { bg: 'bg-gray-900 bg-opacity-20', text: 'text-vintage-gray-600', label: 'Paused', icon: '⏸️' };
      case 'error':
        return { bg: 'bg-red-900 bg-opacity-20', text: 'text-red-400', label: 'Error', icon: '❌' };
      default:
        return { bg: 'bg-vintage-gray-400 bg-opacity-20', text: 'text-vintage-white', label: status, icon: '⚪' };
    }
  };

  return (
    <div className="border-2 border-vintage-white p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono uppercase tracking-wider text-sm">
          📍 Ad Placements ({placements.length})
        </h2>
        <button
          onClick={onAddPlacement}
          className="btn-vintage-inverse text-xs py-2 px-4"
        >
          + Add New Placement
        </button>
      </div>

      {/* Placements */}
      <div className="space-y-4">
        {placements.map((placement) => {
          const statusStyle = getStatusStyle(placement.status);
          const isExpanded = expandedPlacements.includes(placement.id);

          return (
            <div
              key={placement.id}
              className={`border-2 p-5 transition-all ${
                placement.status === 'active' ? 'border-l-4 border-l-green-400 border-vintage-gray-400' :
                placement.status === 'paused' ? 'border-vintage-gray-400' :
                'border-l-4 border-l-yellow-400 border-vintage-gray-400'
              }`}
            >
              {/* Placement Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{placement.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-mono text-sm font-bold">{placement.name}</h3>
                      <span className={`font-mono text-xs px-2 py-0.5 ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.icon} {statusStyle.label}
                      </span>
                      <span className="font-mono text-xs text-vintage-gray-600">
                        {placement.size}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-vintage-gray-600">
                      ID: {placement.id} • Position: {placement.position}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => togglePlacement(placement.id)}
                  className="text-vintage-gray-600 hover:text-vintage-white font-mono text-xs"
                >
                  {isExpanded ? '▼ Less' : '▶ More'}
                </button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="font-mono text-xs text-vintage-gray-600">Today</div>
                  <div className="text-green-400 font-bold">${placement.earningsToday.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-vintage-gray-600">This Month</div>
                  <div className="text-blue-400 font-bold">${placement.earningsMonth.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-vintage-gray-600">Impressions</div>
                  <div className="text-purple-400 font-bold">{placement.impressions.toLocaleString()}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-vintage-gray-600">RPM</div>
                  <div className="text-yellow-400 font-bold">${placement.rpm.toFixed(2)}</div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t-2 border-vintage-gray-400 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-2">
                        Performance Metrics
                      </h4>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-vintage-gray-600">CTR:</span>
                          <span className="text-green-400">{placement.ctr.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-vintage-gray-600">Clicks:</span>
                          <span className="text-purple-400">{placement.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-vintage-gray-600">Fill Rate:</span>
                          <span className="text-blue-400">{placement.fillRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-vintage-gray-600">Load Time:</span>
                          <span className={placement.loadTime < 200 ? 'text-green-400' : 'text-yellow-400'}>
                            {placement.loadTime}ms
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-2">
                        Widget Code
                      </h4>
                      <div className="border border-vintage-gray-400 p-3 bg-vintage-gray-200 font-mono text-xs overflow-x-auto">
                        <pre>{`<div id="web3ads-${placement.id}"></div>
<script>
  Web3Ads.createPlacement('${placement.id}', {
    size: '${placement.size}',
    refresh: ${placement.refreshRate}
  });
</script>`}</pre>
                      </div>
                      <button className="btn-vintage text-xs py-1 px-3 mt-2 w-full">
                        📋 Copy Code
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditPlacement(placement)}
                      className="btn-vintage text-xs py-2 px-4"
                    >
                      ✏️ Edit Settings
                    </button>

                    {placement.status === 'active' ? (
                      <button
                        onClick={() => onPausePlacement(placement.id)}
                        className="btn-vintage text-xs py-2 px-4 text-yellow-400"
                      >
                        ⏸️ Pause Placement
                      </button>
                    ) : placement.status === 'paused' ? (
                      <button
                        onClick={() => onResumePlacement(placement.id)}
                        className="btn-vintage text-xs py-2 px-4 text-green-400"
                      >
                        ▶️ Resume Placement
                      </button>
                    ) : null}

                    <button className="btn-vintage text-xs py-2 px-4 text-red-400 ml-auto">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementList;
