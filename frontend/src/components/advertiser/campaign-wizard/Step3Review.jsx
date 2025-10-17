import { useState } from 'react';

const Step3Review = ({ campaignData, onBack, onLaunch }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const totalBudget = parseFloat(campaignData.budget) || 0;
  const platformFee = totalBudget * 0.05;
  const totalCost = totalBudget + platformFee;

  const handleLaunch = async () => {
    if (!agreedToTerms) return;

    setIsLaunching(true);
    try {
      await onLaunch();
    } finally {
      setIsLaunching(false);
    }
  };

  const calculateEstimates = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const rate = parseFloat(campaignData.ratePerAction) || 0;

    if (campaignData.type === 'CPM') {
      const impressions = Math.round((budget / rate) * 1000);
      const clicks = Math.round(impressions * 0.02);
      return {
        impressions: impressions.toLocaleString(),
        clicks: clicks.toLocaleString(),
        cpc: (budget / clicks).toFixed(2)
      };
    } else {
      const clicks = Math.round(budget / rate);
      return {
        clicks: clicks.toLocaleString(),
        impressions: Math.round(clicks * 50).toLocaleString(),
        cpc: rate.toFixed(2)
      };
    }
  };

  const estimates = calculateEstimates();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif mb-3">Review Your Campaign</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Double-check everything before launching
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="border-2 border-vintage-white p-6 mb-6">
        <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b border-vintage-gray-400 pb-2">
          📝 Campaign Details
        </h3>

        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Name:</span>
            <span>{campaignData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Type:</span>
            <span>{campaignData.type === 'CPM' ? '$ CPM (Cost Per 1000 Impressions)' : '↗ CPC (Cost Per Click)'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Target URL:</span>
            <span className="truncate ml-4">{campaignData.targetUrl}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Budget:</span>
            <span>${totalBudget.toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Rate:</span>
            <span>${campaignData.ratePerAction} per {campaignData.type === 'CPM' ? '1000 impressions' : 'click'}</span>
          </div>
        </div>
      </div>

      {/* Expected Performance */}
      <div className="border-2 border-vintage-white p-6 mb-6">
        <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b border-vintage-gray-400 pb-2">
          🎯 Expected Performance
        </h3>

        <div className="space-y-3 font-mono text-sm">
          {campaignData.type === 'CPM' && (
            <div className="flex justify-between">
              <span className="text-vintage-gray-600">Estimated Impressions:</span>
              <span>~{estimates.impressions} views</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Estimated Clicks:</span>
            <span>~{estimates.clicks} clicks {campaignData.type === 'CPM' && '(2% CTR)'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Estimated Duration:</span>
            <span>5-7 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Cost Per Click:</span>
            <span>~${estimates.cpc}</span>
          </div>
        </div>
      </div>

      {/* Ad Creative Preview */}
      <div className="border-2 border-vintage-white p-6 mb-6">
        <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b border-vintage-gray-400 pb-2">
          🖼️ Ad Creative Preview
        </h3>

        {campaignData.imagePreview && (
          <div className="text-center">
            <img
              src={campaignData.imagePreview}
              alt="Ad Preview"
              className="max-w-full h-auto mx-auto mb-3"
            />
            <p className="font-mono text-xs text-vintage-gray-600">
              This is how your ad will appear on publisher websites
            </p>
          </div>
        )}
      </div>

      {/* Payment Details */}
      <div className="border-2 border-vintage-white p-6 mb-6">
        <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b border-vintage-gray-400 pb-2">
          💳 Payment Details
        </h3>

        <div className="space-y-3 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Campaign Budget:</span>
            <span>${totalBudget.toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Platform Fee (5%):</span>
            <span>${platformFee.toFixed(2)} USDC</span>
          </div>
          <div className="border-t border-vintage-gray-400 pt-3 mt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total to Approve:</span>
              <span>${totalCost.toFixed(2)} USDC</span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-vintage-gray-600">Your Wallet Balance:</span>
            <span>$342.00 USDC <span className="text-vintage-white">✓ Sufficient</span></span>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="border border-vintage-gray-400 p-4 mb-6">
        <h4 className="font-mono text-sm mb-3">⚠️ Important Notes</h4>
        <ul className="space-y-2 font-mono text-xs text-vintage-gray-600">
          <li>• You'll be asked to approve the transaction in MetaMask</li>
          <li>• Your campaign will go live within 30 seconds</li>
          <li>• You can pause or adjust your campaign anytime</li>
          <li>• Funds will be released to publishers as impressions occur</li>
        </ul>
      </div>

      {/* Terms Checkbox */}
      <div className="border-2 border-vintage-white p-4 mb-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1"
          />
          <span className="font-mono text-sm">
            I agree to the Terms of Service and Campaign Guidelines
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isLaunching}
          className="btn-vintage px-8 py-3"
        >
          ← Edit Campaign
        </button>
        <button
          onClick={handleLaunch}
          disabled={!agreedToTerms || isLaunching}
          className={`btn-vintage-inverse px-8 py-3 ${
            !agreedToTerms || isLaunching ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLaunching ? 'Launching...' : 'Launch Campaign 🚀'}
        </button>
      </div>
    </div>
  );
};

export default Step3Review;
