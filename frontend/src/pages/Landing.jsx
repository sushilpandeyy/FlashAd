import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-vintage-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="border-4 border-vintage-white p-12 mb-8">
          <h1 className="text-6xl font-serif mb-4">FlashAd</h1>
          <p className="text-xl font-mono mb-2">Web3 Ad Platform</p>
          <p className="font-mono text-sm text-vintage-gray-600">Decentralized Advertising with Web2 Speed</p>
          <p className="font-mono text-xs text-vintage-gray-500 mt-2">EthOnline 2025 Hackathon Project</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Public Routes */}
          <div className="border-2 border-vintage-white p-6">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-vintage-white pb-2">Public Routes</h3>
            <ul className="space-y-2 font-mono text-xs">
              <li><Link to="/connect" className="hover:underline">→ Connect Wallet</Link></li>
              <li><Link to="/docs" className="hover:underline">→ Documentation</Link></li>
              <li><Link to="/transactions/0x123" className="hover:underline">→ Transaction Details</Link></li>
            </ul>
          </div>

          {/* Advertiser Routes */}
          <div className="border-2 border-vintage-white p-6">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-vintage-white pb-2">Advertiser Routes</h3>
            <ul className="space-y-2 font-mono text-xs">
              <li><Link to="/advertiser/dashboard" className="hover:underline">→ Dashboard</Link></li>
              <li><Link to="/advertiser/campaigns/new" className="hover:underline">→ Create Campaign</Link></li>
              <li><Link to="/advertiser/campaigns/1" className="hover:underline">→ Campaign Details</Link></li>
              <li><Link to="/advertiser/campaigns/1/analytics" className="hover:underline">→ Analytics</Link></li>
            </ul>
          </div>

          {/* Publisher Routes */}
          <div className="border-2 border-vintage-white p-6">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-vintage-white pb-2">Publisher Routes</h3>
            <ul className="space-y-2 font-mono text-xs">
              <li><Link to="/publisher/dashboard" className="hover:underline">→ Dashboard</Link></li>
              <li><Link to="/publisher/onboarding" className="hover:underline">→ Onboarding</Link></li>
              <li><Link to="/publisher/integration" className="hover:underline">→ Integration</Link></li>
              <li><Link to="/publisher/analytics" className="hover:underline">→ Analytics</Link></li>
              <li><Link to="/publisher/sites/1" className="hover:underline">→ Site Details</Link></li>
              <li><Link to="/publisher/withdraw" className="hover:underline">→ Withdraw</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
