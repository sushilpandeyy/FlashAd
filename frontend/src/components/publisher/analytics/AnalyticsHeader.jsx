import { Link } from 'react-router-dom';
import { useState } from 'react';

const AnalyticsHeader = ({ dateRange, setDateRange, selectedSite, setSelectedSite, onExport }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSiteSelector, setShowSiteSelector] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sites = [
    { value: 'all', label: 'All Sites' },
    { value: 'cryptonews.io', label: 'cryptonews.io' },
    { value: 'defitracker.com', label: 'defitracker.com' },
    { value: 'nftgallery.xyz', label: 'nftgallery.xyz' }
  ];

  const exportFormats = [
    { value: 'csv', label: 'Export as CSV', icon: '📄' },
    { value: 'pdf', label: 'Export as PDF', icon: '📕' },
    { value: 'json', label: 'Export as JSON', icon: '📦' }
  ];

  return (
    <div className="border-b-2 border-vintage-gray-400 pb-6 mb-8">
      {/* Back Link */}
      <Link
        to="/publisher/dashboard"
        className="inline-flex items-center gap-2 font-mono text-sm text-vintage-gray-600 hover:text-vintage-white transition-colors mb-4"
      >
        ← Back to Dashboard
      </Link>

      {/* Title Section */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl mb-2">Publisher Analytics</h1>
        <p className="font-mono text-sm text-vintage-gray-600">
          Advanced Analytics & Reports
        </p>
        <p className="font-mono text-xs text-vintage-gray-600">
          {selectedSite === 'all' ? 'All Sites' : selectedSite} • {dateRangeOptions.find(d => d.value === dateRange)?.label || 'Last 30 Days'}
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Date Range Picker */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="btn-vintage text-xs py-2 px-4"
          >
            📅 Date Range: {dateRangeOptions.find(d => d.value === dateRange)?.label || 'Last 30 Days'} ▼
          </button>
          {showDatePicker && (
            <div className="absolute top-full left-0 mt-2 border-2 border-vintage-white bg-vintage-black p-2 z-10 min-w-[200px]">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setDateRange(option.value);
                    setShowDatePicker(false);
                  }}
                  className={`block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors ${
                    dateRange === option.value ? 'bg-vintage-gray-200' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Site Selector */}
        <div className="relative">
          <button
            onClick={() => setShowSiteSelector(!showSiteSelector)}
            className="btn-vintage text-xs py-2 px-4"
          >
            🌐 {sites.find(s => s.value === selectedSite)?.label || 'All Sites'} ▼
          </button>
          {showSiteSelector && (
            <div className="absolute top-full left-0 mt-2 border-2 border-vintage-white bg-vintage-black p-2 z-10 min-w-[200px]">
              {sites.map((site) => (
                <button
                  key={site.value}
                  onClick={() => {
                    setSelectedSite(site.value);
                    setShowSiteSelector(false);
                  }}
                  className={`block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors ${
                    selectedSite === site.value ? 'bg-vintage-gray-200' : ''
                  }`}
                >
                  {site.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="btn-vintage-inverse text-xs py-2 px-4"
          >
            📊 Export ▼
          </button>
          {showExportMenu && (
            <div className="absolute top-full left-0 mt-2 border-2 border-vintage-white bg-vintage-black p-2 z-10 min-w-[200px]">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => {
                    onExport(format.value);
                    setShowExportMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors"
                >
                  {format.icon} {format.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
