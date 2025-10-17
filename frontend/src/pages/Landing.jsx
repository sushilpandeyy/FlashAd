import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Web3 Ad Platform - FlashAd</h1>
      <p>Decentralized Advertising with Web2 Speed</p>
      <p>EthOnline 2025 Hackathon Project</p>

      <div style={{ marginTop: '40px' }}>
        <h2>Quick Links</h2>

        <div style={{ marginTop: '20px' }}>
          <h3>Public Routes</h3>
          <ul>
            <li><Link to="/connect">Connect Wallet</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/transactions/0x123">Transaction Details (Example)</Link></li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Advertiser Routes</h3>
          <ul>
            <li><Link to="/advertiser/dashboard">Advertiser Dashboard</Link></li>
            <li><Link to="/advertiser/campaigns/new">Create Campaign</Link></li>
            <li><Link to="/advertiser/campaigns/1">Campaign Details (Example)</Link></li>
            <li><Link to="/advertiser/campaigns/1/analytics">Campaign Analytics (Example)</Link></li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Publisher Routes</h3>
          <ul>
            <li><Link to="/publisher/dashboard">Publisher Dashboard</Link></li>
            <li><Link to="/publisher/onboarding">Onboarding</Link></li>
            <li><Link to="/publisher/integration">Integration</Link></li>
            <li><Link to="/publisher/analytics">Analytics</Link></li>
            <li><Link to="/publisher/sites/1">Site Details (Example)</Link></li>
            <li><Link to="/publisher/withdraw">Withdraw</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
