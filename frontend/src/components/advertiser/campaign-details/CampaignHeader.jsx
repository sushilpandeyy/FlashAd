import { Link } from 'react-router-dom';

const CampaignHeader = ({ campaign }) => {
  const getStatusColor = () => {
    switch (campaign.status) {
      case 'ACTIVE': return 'text-green-400';
      case 'PAUSED': return 'text-yellow-400';
      case 'COMPLETED': return 'text-gray-400';
      case 'OUT_OF_BUDGET': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="border-b-2 border-vintage-white py-6 px-6 mb-8">
      <Link
        to="/advertiser/dashboard"
        className="font-mono text-sm text-vintage-gray-600 hover:text-vintage-white transition-colors inline-block mb-4"
      >
        ← Back to Dashboard
      </Link>

      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-serif">{campaign.name}</h1>
            <span className={`font-mono text-sm uppercase tracking-wider ${getStatusColor()}`}>
              ● {campaign.status}
            </span>
          </div>

          <div className="font-mono text-xs text-vintage-gray-600 space-x-4">
            <span>Campaign ID: #{campaign.id}</span>
            <span>•</span>
            <span>{campaign.type} Campaign</span>
            <span>•</span>
            <span>Created: {campaign.created}</span>
            <span>•</span>
            <span>Last updated: {campaign.lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button className="btn-vintage text-xs py-2 px-4">⏸️ Pause</button>
        <button className="btn-vintage text-xs py-2 px-4">✏️ Edit</button>
        <button className="btn-vintage text-xs py-2 px-4">💰 Add Budget</button>
        <button className="btn-vintage text-xs py-2 px-4">📊 Export Report</button>
        <button className="btn-vintage text-xs py-2 px-4">⋮ More</button>
      </div>
    </div>
  );
};

export default CampaignHeader;
