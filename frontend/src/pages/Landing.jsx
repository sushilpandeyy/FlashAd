import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-vintage-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="border-4 border-vintage-white p-12 mb-8 hover:shadow-2xl transition-shadow">
          <h1 className="text-6xl font-serif mb-4">
            <span className="text-blue-400">Flash</span>
            <span className="text-green-400">Ad</span>
          </h1>
          <p className="text-xl font-mono mb-2 text-purple-400">Web3 Ad Platform</p>
          <p className="font-mono text-sm text-vintage-gray-400">
            ⚡ Decentralized Advertising with Web2 Speed
          </p>
          <p className="font-mono text-xs text-yellow-400 mt-2">
            🏆 EthOnline 2025 Hackathon Project
          </p>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Public Routes */}
          <div className="border-2 border-blue-400 p-6 hover:bg-vintage-gray-200 transition-all">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-blue-400 pb-2 text-blue-400">
              🌐 Public Routes
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <Link to="/connect" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Connect Wallet
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Documentation
                </Link>
              </li>
              <li>
                <Link to="/transactions/0x123" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-400">→</span> Transaction Details
                </Link>
              </li>
            </ul>
          </div>

          {/* Advertiser Routes */}
          <div className="border-2 border-green-400 p-6 hover:bg-vintage-gray-200 transition-all">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-green-400 pb-2 text-green-400">
              💰 Advertiser Routes
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <Link to="/advertiser/dashboard" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="text-green-400">→</span> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/advertiser/campaigns/new" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="text-green-400">→</span> Create Campaign
                </Link>
              </li>
              <li>
                <Link to="/advertiser/campaigns/1" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="text-green-400">→</span> Campaign Details
                </Link>
              </li>
              <li>
                <Link to="/advertiser/campaigns/1/analytics" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <span className="text-green-400">→</span> Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Publisher Routes */}
          <div className="border-2 border-purple-400 p-6 hover:bg-vintage-gray-200 transition-all">
            <h3 className="font-mono uppercase tracking-wider text-sm mb-4 border-b-2 border-purple-400 pb-2 text-purple-400">
              📊 Publisher Routes
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <Link to="/publisher/dashboard" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/publisher/onboarding" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Onboarding
                </Link>
              </li>
              <li>
                <Link to="/publisher/integration" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Integration
                </Link>
              </li>
              <li>
                <Link to="/publisher/analytics" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Analytics
                </Link>
              </li>
              <li>
                <Link to="/publisher/sites/1" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Site Details
                </Link>
              </li>
              <li>
                <Link to="/publisher/withdraw" className="hover:text-purple-400 transition-colors flex items-center gap-2">
                  <span className="text-purple-400">→</span> Withdraw
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
