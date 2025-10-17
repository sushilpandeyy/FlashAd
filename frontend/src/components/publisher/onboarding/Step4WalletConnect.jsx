import { useState } from 'react';

const Step4WalletConnect = ({ formData, setFormData, onNext, onBack }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(0);

  const trafficTierLabels = {
    '<1K': 'Less than 1,000',
    '1K-10K': '1,000 - 10,000',
    '10K-50K': '10,000 - 50,000',
    '50K-100K': '50,000 - 100,000',
    '100K-500K': '100,000 - 500,000',
    '500K+': '500,000+'
  };

  const earningsEstimate = {
    '<1K': '$10 - $50',
    '1K-10K': '$20 - $100',
    '10K-50K': '$50 - $250',
    '50K-100K': '$250 - $500',
    '100K-500K': '$500 - $2,500',
    '500K+': '$2,500+'
  };

  const rpmEstimate = {
    '<1K': '$1.00 - $2.00',
    '1K-10K': '$1.50 - $3.00',
    '10K-50K': '$2.00 - $5.00',
    '50K-100K': '$3.00 - $6.00',
    '100K-500K': '$4.00 - $8.00',
    '500K+': '$5.00+'
  };

  const handleConnectWallet = async (walletType) => {
    setConnecting(true);

    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock wallet address
    const mockAddress = '0x7c3d...89f';
    setWalletAddress(mockAddress);
    setWalletConnected(true);
    setConnecting(false);
  };

  const handleRegister = async () => {
    if (!agreeToTerms || !walletConnected) return;

    setRegistering(true);

    const steps = [
      'Verifying website ownership...',
      'Creating publisher account...',
      'Generating integration code...',
      'Registering on blockchain...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setRegistrationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    setFormData({ ...formData, walletAddress });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl mb-3">Connect Wallet & Complete Registration</h2>
        <p className="text-vintage-gray-600 font-mono text-sm">
          Your wallet will receive all earnings from ads
        </p>
      </div>

      {/* Registration Summary */}
      <div className="mb-6">
        <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
          📝 Registration Summary:
        </h3>
        <div className="border-2 border-vintage-gray-400 p-6 space-y-3 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Website:</span>
            <span className="font-bold">{formData.websiteUrl}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Category:</span>
            <span className="font-bold">
              {formData.category === 'other' ? formData.customCategory : formData.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-vintage-gray-600">Traffic:</span>
            <span className="font-bold">{trafficTierLabels[formData.trafficTier]} monthly visitors</span>
          </div>
          <div className="border-t-2 border-vintage-gray-400 pt-3 mt-3">
            <div className="flex justify-between text-green-400">
              <span>Expected Earnings:</span>
              <span className="font-bold">{earningsEstimate[formData.trafficTier]}/month</span>
            </div>
            <div className="flex justify-between text-blue-400 mt-2">
              <span>Average RPM:</span>
              <span className="font-bold">{rpmEstimate[formData.trafficTier]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
        <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
          💳 Connect Your Wallet
        </h3>

        <div className="mb-4 font-mono text-sm text-vintage-gray-600 space-y-1">
          <p>Your wallet address will be used to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Verify ownership of your registration</li>
            <li>Receive instant payments when ads are displayed</li>
            <li>Manage your publisher account</li>
          </ul>
        </div>

        {!walletConnected ? (
          <div className="space-y-3">
            <button
              onClick={() => handleConnectWallet('metamask')}
              disabled={connecting}
              className="btn-vintage-inverse w-full py-4 text-base"
            >
              {connecting ? '⏳ Connecting...' : '🦊 Connect with MetaMask'}
            </button>

            <button
              onClick={() => handleConnectWallet('walletconnect')}
              disabled={connecting}
              className="btn-vintage w-full py-4 text-base"
            >
              👛 Connect with WalletConnect
            </button>

            <button
              onClick={() => handleConnectWallet('other')}
              disabled={connecting}
              className="btn-vintage w-full py-4 text-base"
            >
              🌐 Other Wallets
            </button>
          </div>
        ) : (
          <div className="border-2 border-green-400 bg-green-900 bg-opacity-10 p-4">
            <div className="flex items-start gap-3 font-mono text-sm">
              <div className="text-green-400 text-xl">✅</div>
              <div className="flex-1">
                <div className="text-green-400 font-bold mb-2">Wallet Connected</div>
                <div className="text-vintage-gray-600 space-y-1">
                  <div>Address: <span className="text-vintage-white">{walletAddress}</span></div>
                  <div>Network: <span className="text-vintage-white">Polygon (Matic)</span></div>
                  <div>Balance: <span className="text-vintage-white">342.50 USDC</span></div>
                </div>
                <div className="mt-3 text-green-400">
                  ✓ All set! Click Register to complete setup.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="border-t-2 border-vintage-gray-400 pt-6 mb-6">
        <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
          ⚠️ Important:
        </h3>
        <ul className="space-y-2 font-mono text-sm text-vintage-gray-600">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>No gas fees for registration (free to join!)</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>You'll need to sign a message to verify ownership</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Your wallet will not be charged</span>
          </li>
        </ul>
      </div>

      {/* Terms Agreement */}
      <div className="mb-8">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 w-4 h-4"
          />
          <span className="font-mono text-sm text-vintage-gray-600">
            I agree to the <span className="text-blue-400 underline">Terms of Service</span> and{' '}
            <span className="text-blue-400 underline">Publisher Guidelines</span>
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="btn-vintage px-8 py-3" disabled={registering}>
          ← Back
        </button>
        <button
          onClick={handleRegister}
          disabled={!walletConnected || !agreeToTerms || registering}
          className={`btn-vintage-inverse px-8 py-3 ${
            !walletConnected || !agreeToTerms || registering
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {registering ? 'Registering...' : 'Register →'}
        </button>
      </div>

      {/* Registration Progress Modal */}
      {registering && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-vintage-black border-2 border-vintage-white p-8 max-w-lg w-full">
            <h3 className="font-mono text-xl mb-6 text-center">Registering Your Website</h3>

            <div className="space-y-4 mb-8">
              {[
                'Verifying website ownership...',
                'Creating publisher account...',
                'Generating integration code...',
                'Registering on blockchain...'
              ].map((step, index) => (
                <div key={index} className="flex items-center justify-between font-mono text-sm">
                  <span>Step {index + 1}: {step}</span>
                  <span>
                    {index < registrationStep ? (
                      <span className="text-green-400">✅ Complete</span>
                    ) : index === registrationStep ? (
                      <span className="text-blue-400">⏳ In Progress</span>
                    ) : (
                      <span className="text-vintage-gray-600">⏸️ Pending</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center font-mono text-sm text-vintage-gray-600">
              Please sign the message in your wallet<br />
              (No gas fees required)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4WalletConnect;
