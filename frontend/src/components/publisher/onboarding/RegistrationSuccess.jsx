import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationSuccess = ({ formData }) => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/publisher/integration');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Success Icon */}
      <div className="text-8xl mb-6">🎉</div>

      <h2 className="font-serif text-4xl mb-4">Registration Complete!</h2>
      <p className="text-vintage-gray-600 font-mono text-base mb-8">
        Welcome to FlashAd, you're ready to start earning!
      </p>

      {/* Summary Card */}
      <div className="border-2 border-green-400 bg-green-900 bg-opacity-10 p-6 mb-8">
        <div className="font-mono text-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-vintage-gray-600">Your Publisher ID:</span>
            <span className="font-bold text-green-400">#PUB-12345</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-vintage-gray-600">Website:</span>
            <span className="font-bold">{formData.websiteUrl}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-vintage-gray-600">Status:</span>
            <span className="font-bold text-green-400">✅ VERIFIED</span>
          </div>
          <div className="border-t-2 border-green-400 pt-3 mt-3">
            <p className="text-vintage-white">Your site is now registered and ready to display ads!</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="border-2 border-vintage-white p-6 mb-8 text-left">
        <h3 className="font-mono text-lg uppercase tracking-wider mb-6 text-center">
          🚀 Next Steps:
        </h3>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="text-3xl">1️⃣</div>
            <div className="flex-1">
              <h4 className="font-mono text-sm font-bold mb-2">Add the ad widget to your website</h4>
              <p className="font-mono text-xs text-vintage-gray-600 mb-3">
                Copy the integration code and paste it into your site
              </p>
              <Link
                to="/publisher/integration"
                className="btn-vintage-inverse text-xs py-2 px-4 inline-block"
              >
                Get Integration Code →
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="text-3xl">2️⃣</div>
            <div className="flex-1">
              <h4 className="font-mono text-sm font-bold mb-2">Verify your integration</h4>
              <p className="font-mono text-xs text-vintage-gray-600 mb-3">
                We'll check that ads are loading correctly
              </p>
              <Link
                to="/publisher/integration"
                className="btn-vintage text-xs py-2 px-4 inline-block"
              >
                Test Integration →
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="text-3xl">3️⃣</div>
            <div className="flex-1">
              <h4 className="font-mono text-sm font-bold mb-2">Start earning!</h4>
              <p className="font-mono text-xs text-vintage-gray-600 mb-3">
                Ads will appear within 30 seconds of integration
              </p>
              <Link
                to="/publisher/dashboard"
                className="btn-vintage text-xs py-2 px-4 inline-block"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="border-2 border-blue-400 bg-blue-900 bg-opacity-10 p-6 mb-8 text-left">
        <h3 className="font-mono text-sm uppercase tracking-wider text-vintage-gray-600 mb-3">
          💡 What happens next?
        </h3>
        <ul className="space-y-2 font-mono text-sm text-vintage-gray-600">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Advertisers can start bidding on your ad space immediately</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>You'll earn money every time an ad is displayed</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Withdraw earnings anytime, no minimum threshold</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Track performance in real-time from your dashboard</span>
          </li>
        </ul>
      </div>

      {/* CTA Button */}
      <Link
        to="/publisher/integration"
        className="btn-vintage-inverse text-base py-4 px-12 inline-block mb-4"
      >
        Continue to Integration →
      </Link>

      {/* Auto-redirect countdown */}
      <div className="font-mono text-xs text-vintage-gray-600">
        Redirecting in {countdown} seconds...
      </div>
    </div>
  );
};

export default RegistrationSuccess;
