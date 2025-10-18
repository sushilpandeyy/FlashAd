const WidgetHealth = ({ health, onRunCheck }) => {
  const checks = [
    { key: 'scriptLoaded', label: 'Widget script loaded', passed: health.scriptLoaded },
    { key: 'publisherId', label: 'Publisher ID valid', passed: health.publisherIdValid },
    { key: 'placements', label: 'Placements detected', passed: health.placementsDetected > 0, value: health.placementsDetected },
    { key: 'impressions', label: 'Impressions recorded', passed: health.impressionsRecorded },
    { key: 'wallet', label: 'Wallet connected', passed: health.walletConnected }
  ];

  const allPassed = checks.every(check => check.passed);

  return (
    <div className={`border-2 p-6 mb-8 ${allPassed ? 'border-green-400 bg-green-900 bg-opacity-5' : 'border-yellow-400 bg-yellow-900 bg-opacity-5'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-mono uppercase tracking-wider text-sm">
          {allPassed ? '✅ Widget Health - All Systems Operational' : '⚠️ Widget Health - Issues Detected'}
        </h3>
        <button
          onClick={onRunCheck}
          className="btn-vintage text-xs py-1 px-3"
        >
          🔄 Run Check
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {checks.map((check) => (
          <div
            key={check.key}
            className="flex items-center gap-2 font-mono text-xs"
          >
            <span className={check.passed ? 'text-green-400' : 'text-red-400'}>
              {check.passed ? '✅' : '❌'}
            </span>
            <span className="text-vintage-gray-600">{check.label}</span>
            {check.value !== undefined && (
              <span className="text-vintage-white">({check.value})</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-vintage-gray-400 pt-3">
        <div className="grid grid-cols-2 gap-4 font-mono text-xs">
          <div>
            <div className="text-vintage-gray-600">Page Load Time</div>
            <div className={`font-bold ${health.pageLoadTime < 3000 ? 'text-green-400' : 'text-yellow-400'}`}>
              {health.pageLoadTime}ms
            </div>
          </div>
          <div>
            <div className="text-vintage-gray-600">Ad Load Time</div>
            <div className={`font-bold ${health.adLoadTime < 200 ? 'text-green-400' : 'text-yellow-400'}`}>
              {health.adLoadTime}ms
            </div>
          </div>
        </div>
      </div>

      {health.lastChecked && (
        <div className="font-mono text-xs text-vintage-gray-600 mt-3 text-right">
          Last checked: {new Date(health.lastChecked).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default WidgetHealth;
