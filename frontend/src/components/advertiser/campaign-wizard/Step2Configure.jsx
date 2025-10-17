import { useState } from 'react';

const Step2Configure = ({ campaignData, onUpdateData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: 'File size must be less than 2MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateData({
          imageFile: file,
          imagePreview: reader.result
        });
        setErrors({ ...errors, image: null });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateProjection = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const rate = parseFloat(campaignData.ratePerAction) || 0;

    if (budget && rate) {
      if (campaignData.type === 'CPM') {
        const impressions = (budget / rate) * 1000;
        const estimatedClicks = Math.round(impressions * 0.02);
        return {
          impressions: Math.round(impressions).toLocaleString(),
          clicks: estimatedClicks.toLocaleString(),
          duration: '5-7 days'
        };
      } else {
        const clicks = Math.round(budget / rate);
        return {
          clicks: clicks.toLocaleString(),
          impressions: Math.round(clicks * 50).toLocaleString(),
          duration: '5-7 days'
        };
      }
    }
    return null;
  };

  const validateAndContinue = () => {
    const newErrors = {};

    if (!campaignData.name?.trim()) newErrors.name = 'Campaign name required';
    if (!campaignData.imageFile) newErrors.image = 'Please upload an ad image';
    if (!campaignData.targetUrl?.trim()) newErrors.targetUrl = 'Target URL required';
    if (!campaignData.budget || campaignData.budget < 10) newErrors.budget = 'Minimum budget is $10';
    if (!campaignData.ratePerAction) newErrors.ratePerAction = 'Rate is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const projection = calculateProjection();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif mb-3">Configure Your Campaign</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Upload your ad creative and set your budget
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Image Upload */}
        <div>
          {/* Upload Area */}
          <div className="border-2 border-vintage-white p-6 mb-6">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4">Ad Creative</h3>

            <div
              className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all hover:border-vintage-white hover:bg-vintage-gray-200 ${
                errors.image ? 'border-red-500' : 'border-vintage-gray-400'
              }`}
              onClick={() => document.getElementById('imageUpload').click()}
            >
              {campaignData.imagePreview ? (
                <div>
                  <img
                    src={campaignData.imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto mb-4 mx-auto"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateData({ imageFile: null, imagePreview: null });
                    }}
                    className="btn-vintage text-xs py-1 px-4"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-4">☁️</div>
                  <p className="font-mono text-sm mb-2">Drag & Drop</p>
                  <p className="font-mono text-sm mb-2">your ad image here</p>
                  <p className="font-mono text-sm text-vintage-gray-600">or Click to Browse</p>
                </div>
              )}
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {errors.image && <p className="text-red-500 font-mono text-xs mt-2">{errors.image}</p>}

            <div className="border-t border-vintage-gray-400 pt-4 mt-4">
              <p className="font-mono text-xs text-vintage-gray-600 mb-1">📏 Recommended:</p>
              <p className="font-mono text-xs text-vintage-gray-600">728x90 (Leaderboard)</p>
              <p className="font-mono text-xs text-vintage-gray-600 mb-2">300x250 (Medium)</p>
              <p className="font-mono text-xs text-vintage-gray-600">Max size: 2MB</p>
              <p className="font-mono text-xs text-vintage-gray-600">Formats: JPG, PNG, GIF</p>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div>
          <div className="border-2 border-vintage-white p-6">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-6">Campaign Settings</h3>

            {/* Campaign Name */}
            <div className="mb-6">
              <label className="font-mono text-xs uppercase tracking-wider block mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignData.name || ''}
                onChange={(e) => onUpdateData({ name: e.target.value })}
                className={`input-vintage w-full ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Summer Sale 2024"
              />
              {errors.name && <p className="text-red-500 font-mono text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Target URL */}
            <div className="mb-6">
              <label className="font-mono text-xs uppercase tracking-wider block mb-2">
                Target URL *
              </label>
              <input
                type="url"
                value={campaignData.targetUrl || ''}
                onChange={(e) => onUpdateData({ targetUrl: e.target.value })}
                className={`input-vintage w-full ${errors.targetUrl ? 'border-red-500' : ''}`}
                placeholder="https://mysite.com/sale"
              />
              <p className="font-mono text-xs text-vintage-gray-600 mt-1">Where clicks will redirect</p>
              {errors.targetUrl && <p className="text-red-500 font-mono text-xs mt-1">{errors.targetUrl}</p>}
            </div>

            {/* Campaign Budget */}
            <div className="mb-6">
              <label className="font-mono text-xs uppercase tracking-wider block mb-2">
                Campaign Budget *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={campaignData.budget || ''}
                  onChange={(e) => onUpdateData({ budget: e.target.value })}
                  className={`input-vintage flex-1 ${errors.budget ? 'border-red-500' : ''}`}
                  placeholder="100"
                  min="10"
                />
                <span className="flex items-center px-4 border-2 border-vintage-gray-400 font-mono text-xs">
                  USDC
                </span>
              </div>
              {errors.budget && <p className="text-red-500 font-mono text-xs mt-1">{errors.budget}</p>}
            </div>

            {/* Rate Per Action */}
            <div className="mb-6">
              <label className="font-mono text-xs uppercase tracking-wider block mb-2">
                Rate Per Action *
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={campaignData.ratePerAction || ''}
                  onChange={(e) => onUpdateData({ ratePerAction: e.target.value })}
                  className={`input-vintage flex-1 ${errors.ratePerAction ? 'border-red-500' : ''}`}
                  placeholder="2.00"
                  step="0.01"
                />
                <span className="flex items-center px-4 border-2 border-vintage-gray-400 font-mono text-xs">
                  USDC per {campaignData.type === 'CPM' ? '1000' : 'click'}
                </span>
              </div>
              <p className="font-mono text-xs text-vintage-gray-600 mt-1">
                Recommended: {campaignData.type === 'CPM' ? '$2-5' : '$0.25-1.00'}
              </p>
              {errors.ratePerAction && <p className="text-red-500 font-mono text-xs mt-1">{errors.ratePerAction}</p>}
            </div>

            {/* Projection */}
            {projection && (
              <div className="border border-vintage-gray-400 p-4 mt-6">
                <h4 className="font-mono text-xs uppercase tracking-wider mb-3">📊 Campaign Projection</h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-vintage-gray-600">Budget:</span>
                    <span>${campaignData.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-vintage-gray-600">Rate:</span>
                    <span>${campaignData.ratePerAction} per {campaignData.type === 'CPM' ? '1000 views' : 'click'}</span>
                  </div>
                  <div className="border-t border-vintage-gray-400 pt-2 mt-2">
                    {campaignData.type === 'CPM' && (
                      <div className="flex justify-between mb-2">
                        <span className="text-vintage-gray-600">Est. Impressions:</span>
                        <span>~{projection.impressions}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-2">
                      <span className="text-vintage-gray-600">Est. Clicks:</span>
                      <span>~{projection.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vintage-gray-600">Est. Duration:</span>
                      <span>{projection.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-vintage px-8 py-3">
          ← Back
        </button>
        <button onClick={validateAndContinue} className="btn-vintage-inverse px-8 py-3">
          Review Campaign →
        </button>
      </div>
    </div>
  );
};

export default Step2Configure;
