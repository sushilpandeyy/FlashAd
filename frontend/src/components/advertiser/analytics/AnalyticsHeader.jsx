import { Link } from 'react-router-dom';
import { useState } from 'react';

const AnalyticsHeader = ({ campaign, onDateRangeChange, onExport, onRefresh }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState('7d');

  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onDateRangeChange(value);
    if (value !== 'custom') {
      setShowDatePicker(false);
    }
  };

  return (
    <div className="border-b-2 border-vintage-white py-6 px-6 mb-8">
      {/* Back Link */}
      <Link
        to={`/advertiser/campaigns/${campaign.id}`}
        className="font-mono text-sm text-vintage-gray-600 hover:text-vintage-white transition-colors inline-block mb-4"
      >
        ← Back to Campaign
      </Link>

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-3xl font-serif mb-2">
          <span className="text-blue-400">Advanced Analytics</span>
        </h1>
        <div className="flex items-center gap-4 font-mono text-sm text-vintage-gray-600">
          <span className="text-vintage-white">{campaign.name}</span>
          <span>•</span>
          <span>Campaign ID: #{campaign.id}</span>
          <span>•</span>
          <span>{campaign.dateRange}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="btn-vintage text-xs py-2 px-4 flex items-center gap-2"
          >
            📅 Date Range: {dateRanges.find(d => d.value === dateRange)?.label}
            <span>▼</span>
          </button>

          {showDatePicker && (
            <div className="absolute top-full left-0 mt-2 bg-vintage-black border-2 border-vintage-white min-w-[200px] z-10">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handleDateRangeChange(range.value)}
                  className={`block w-full text-left px-4 py-2 font-mono text-xs hover:bg-vintage-gray-200 transition-colors ${
                    dateRange === range.value ? 'bg-vintage-gray-200' : ''
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="btn-vintage text-xs py-2 px-4"
        >
          📊 Export Data
        </button>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="btn-vintage text-xs py-2 px-4"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
