import { Link } from 'react-router-dom';

const WelcomeBanner = ({ todayEarnings, todayImpressions }) => {
  return (
    <div className="border-2 border-vintage-white bg-gradient-to-r from-green-900 to-vintage-black bg-opacity-10 p-6 mb-8">
      <h2 className="text-2xl font-serif mb-3">
        👋 <span className="text-green-400">Welcome back!</span>
      </h2>
      <p className="font-mono text-sm text-vintage-gray-400 mb-6">
        Your sites earned <span className="text-green-400 font-bold">${todayEarnings.toFixed(2)}</span> today across{' '}
        <span className="text-blue-400 font-bold">{todayImpressions.toLocaleString()}</span> impressions
      </p>

      <div className="flex gap-3 flex-wrap">
        <Link to="/publisher/onboarding" className="btn-vintage text-xs py-2 px-4">
          + Add New Site
        </Link>
        <button className="btn-vintage text-xs py-2 px-4">
          View Payment History
        </button>
        <Link to="/publisher/withdraw" className="btn-vintage-inverse text-xs py-2 px-4">
          Withdraw Earnings
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBanner;
