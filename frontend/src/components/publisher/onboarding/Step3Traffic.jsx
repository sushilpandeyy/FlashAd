import { useState } from 'react';

const Step3Traffic = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedTier, setSelectedTier] = useState(formData.trafficTier || '');
  const [pageViews, setPageViews] = useState(formData.pageViews || '');

  const trafficTiers = [
    {
      id: '<1K',
      label: 'Less than 1,000',
      description: 'Just starting out? Perfect time to monetize!',
      earnings: '$10 - $50',
      rpm: '$1.00 - $2.00',
      impressions: '~300'
    },
    {
      id: '1K-10K',
      label: '1,000 - 10,000',
      description: 'Growing site with steady traffic',
      earnings: '$20 - $100',
      rpm: '$1.50 - $3.00',
      impressions: '~800'
    },
    {
      id: '10K-50K',
      label: '10,000 - 50,000',
      description: 'Established site with good reach',
      earnings: '$50 - $250',
      rpm: '$2.00 - $5.00',
      impressions: '~1,600'
    },
    {
      id: '50K-100K',
      label: '50,000 - 100,000',
      description: 'High-traffic site with strong audience',
      earnings: '$250 - $500',
      rpm: '$3.00 - $6.00',
      impressions: '~3,200'
    },
    {
      id: '100K-500K',
      label: '100,000 - 500,000',
      description: 'Major publisher with significant reach',
      earnings: '$500 - $2,500',
      rpm: '$4.00 - $8.00',
      impressions: '~10,000'
    },
    {
      id: '500K+',
      label: '500,000+',
      description: 'Premium publisher with massive audience',
      earnings: '$2,500+',
      rpm: '$5.00+',
      impressions: '~30,000+'
    }
  ];

  const handleSelectTier = (tierId) => {
    setSelectedTier(tierId);
  };

  const handleContinue = () => {
    setFormData({
      ...formData,
      trafficTier: selectedTier,
      pageViews: pageViews
    });
    onNext();
  };

  const selectedTierData = trafficTiers.find(t => t.id === selectedTier);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl mb-3">Estimate Your Traffic</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          This helps us match you with suitable advertisers
        </p>
      </div>

      <div className="mb-6">
        <label className="block font-mono text-sm mb-4">
          Monthly Unique Visitors <span className="text-red-400">*</span>
        </label>

        <div className="space-y-3">
          {trafficTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => handleSelectTier(tier.id)}
              className={`border-2 p-4 cursor-pointer transition-all ${
                selectedTier === tier.id
                  ? 'border-blue-400 bg-blue-900 bg-opacity-10'
                  : 'border-vintage-gray-400 hover:border-blue-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedTier === tier.id
                      ? 'border-blue-400 bg-blue-400'
                      : 'border-vintage-gray-400'
                  }`}
                >
                  {selectedTier === tier.id && (
                    <div className="w-3 h-3 bg-vintage-black rounded-full" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-mono text-sm font-bold mb-1">{tier.label}</div>
                  <div className="font-mono text-xs text-vintage-gray-600">
                    {tier.description}
                  </div>
                  {selectedTier === tier.id && (
                    <div className="mt-2 font-mono text-xs text-blue-400">
                      Estimated earnings: {tier.earnings}/month
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Views (Optional) */}
      <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
        <label className="block font-mono text-sm mb-2">
          Monthly Page Views (Optional)
        </label>
        <input
          type="number"
          value={pageViews}
          onChange={(e) => setPageViews(e.target.value)}
          placeholder="e.g., 50,000"
          className="input-vintage w-full"
        />
      </div>

      {/* Earnings Projection */}
      {selectedTierData && (
        <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
          <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
            📊 Based on your selection:
          </h3>
          <div className="border-2 border-green-400 bg-green-900 bg-opacity-10 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
              <div>
                <div className="text-vintage-gray-600 text-xs mb-1">Expected Monthly Earnings</div>
                <div className="text-green-400 font-bold text-lg">{selectedTierData.earnings}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600 text-xs mb-1">Average RPM</div>
                <div className="text-blue-400 font-bold text-lg">{selectedTierData.rpm}</div>
              </div>
              <div>
                <div className="text-vintage-gray-600 text-xs mb-1">Estimated Daily Impressions</div>
                <div className="text-purple-400 font-bold text-lg">{selectedTierData.impressions}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Message */}
      <div className="border-2 border-blue-400 bg-blue-900 bg-opacity-10 p-4 mb-8">
        <div className="flex items-center gap-3 font-mono text-sm">
          <div>💡</div>
          <div className="text-vintage-gray-600">
            Don't worry if you're not sure - you can update this later!
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btn-vintage px-8 py-3">
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedTier}
          className={`btn-vintage-inverse px-8 py-3 ${
            !selectedTier ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Step3Traffic;
