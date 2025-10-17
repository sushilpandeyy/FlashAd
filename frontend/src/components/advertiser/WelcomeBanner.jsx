import { Link } from 'react-router-dom';

const WelcomeBanner = ({ activeCampaignsCount = 3 }) => {
  return (
    <div className="border-2 border-vintage-white bg-vintage-black p-8 mb-8">
      <h2 className="text-3xl mb-2 font-serif">Welcome back, Advertiser.</h2>
      <p className="text-vintage-gray-600 mb-6 font-mono text-sm">
        You have {activeCampaignsCount} active campaigns running
      </p>

      <div className="flex gap-4 flex-wrap">
        <Link to="/advertiser/campaigns/new" className="btn-vintage-inverse">
          + New Campaign
        </Link>
        <Link to="/advertiser/campaigns" className="btn-vintage">
          View All
        </Link>
        <button className="btn-vintage">
          Add Funds
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
