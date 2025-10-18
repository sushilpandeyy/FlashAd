import { useState } from 'react';

const AddPlacementModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    size: '728x90',
    position: 'sidebar',
    refreshRate: 45,
    inheritCategories: true
  });

  const adSizes = [
    { value: '728x90', label: '728x90 (Leaderboard)', desc: 'Best for headers/footers' },
    { value: '300x250', label: '300x250 (Medium Rectangle)', desc: 'Best for sidebars' },
    { value: '300x600', label: '300x600 (Half Page)', desc: 'Best for long sidebars' },
    { value: '320x50', label: '320x50 (Mobile Banner)', desc: 'Best for mobile devices' },
    { value: '970x250', label: '970x250 (Billboard)', desc: 'Best for premium headers' }
  ];

  const positions = [
    { value: 'top', label: 'Top of page (above the fold)' },
    { value: 'sidebar', label: 'Sidebar (mid-content)' },
    { value: 'bottom', label: 'Bottom of article' },
    { value: 'footer', label: 'Footer' },
    { value: 'custom', label: 'Custom position' }
  ];

  const refreshRates = [
    { value: 30, label: 'Auto-refresh every 30 seconds' },
    { value: 45, label: 'Auto-refresh every 45 seconds' },
    { value: 60, label: 'Auto-refresh every 60 seconds' },
    { value: 0, label: 'No refresh (static placement)' }
  ];

  const handleSubmit = () => {
    const newPlacement = {
      ...formData,
      id: `PL-${Math.random().toString(36).substring(7).toUpperCase()}`,
      estimatedImpressions: 4500,
      estimatedRevenue: 9,
      estimatedMonthlyRevenue: 270,
      estimatedRPM: 2.00
    };

    onCreate(newPlacement);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-vintage-black border-2 border-vintage-white p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-mono text-lg">📍 Add New Ad Placement</h3>
          <button onClick={onClose} className="text-vintage-gray-600 hover:text-vintage-white text-xl">
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Placement Name */}
          <div>
            <label className="block font-mono text-xs mb-2">Placement Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Homepage Sidebar, Article Top, Footer Banner"
              className="input-vintage w-full"
            />
          </div>

          {/* Ad Size */}
          <div className="border-t-2 border-vintage-gray-400 pt-6">
            <label className="block font-mono text-xs mb-3">Ad Size:</label>
            <div className="space-y-2">
              {adSizes.map((size) => (
                <label
                  key={size.value}
                  className="flex items-start gap-3 cursor-pointer p-2 hover:bg-vintage-gray-200 transition-colors"
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.value}
                    checked={formData.size === size.value}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="mt-1"
                  />
                  <div className="font-mono text-xs">
                    <div className="font-bold">{size.label}</div>
                    <div className="text-vintage-gray-600">{size.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Position */}
          <div className="border-t-2 border-vintage-gray-400 pt-6">
            <label className="block font-mono text-xs mb-3">Position on Page:</label>
            <div className="space-y-2">
              {positions.map((pos) => (
                <label
                  key={pos.value}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-vintage-gray-200 transition-colors"
                >
                  <input
                    type="radio"
                    name="position"
                    value={pos.value}
                    checked={formData.position === pos.value}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  />
                  <span className="font-mono text-xs">{pos.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Refresh Settings */}
          <div className="border-t-2 border-vintage-gray-400 pt-6">
            <label className="block font-mono text-xs mb-3">Refresh Settings:</label>
            <div className="space-y-2">
              {refreshRates.map((rate) => (
                <label
                  key={rate.value}
                  className="flex items-center gap-3 cursor-pointer p-2 hover:bg-vintage-gray-200 transition-colors"
                >
                  <input
                    type="radio"
                    name="refreshRate"
                    value={rate.value}
                    checked={formData.refreshRate === rate.value}
                    onChange={(e) => setFormData({ ...formData, refreshRate: parseInt(e.target.value) })}
                  />
                  <span className="font-mono text-xs">{rate.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Targeting */}
          <div className="border-t-2 border-vintage-gray-400 pt-6">
            <label className="block font-mono text-xs mb-3">Category Targeting (Optional):</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inheritCategories}
                  onChange={(e) => setFormData({ ...formData, inheritCategories: e.target.checked })}
                />
                <span className="font-mono text-xs">Inherit from site settings</span>
              </label>
            </div>
          </div>

          {/* Estimated Performance */}
          <div className="border-t-2 border-vintage-gray-400 pt-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-vintage-gray-600 mb-3">
              📊 Estimated Performance:
            </h4>
            <p className="font-mono text-xs text-vintage-gray-600 mb-3">
              Based on your site traffic and similar placements:
            </p>
            <ul className="space-y-2 font-mono text-xs">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">•</span>
                <span className="text-vintage-gray-600">Expected Impressions: <span className="text-blue-400">~4,500/day</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">•</span>
                <span className="text-vintage-gray-600">Expected Revenue: <span className="text-green-400">~$9/day ($270/month)</span></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">•</span>
                <span className="text-vintage-gray-600">Estimated RPM: <span className="text-yellow-400">$2.00</span></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t-2 border-vintage-gray-400">
          <button
            onClick={onClose}
            className="btn-vintage text-xs py-2 px-4 flex-1"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name}
            className={`btn-vintage-inverse text-xs py-2 px-4 flex-1 ${
              !formData.name ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Create Placement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlacementModal;
