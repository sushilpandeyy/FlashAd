import { useState } from 'react';
import CampaignRow from './CampaignRow';

const CampaignsTable = () => {
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const campaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      type: 'CPM',
      status: 'ACTIVE',
      progress: 78,
      spent: 78.00,
      budget: 100.00,
      metrics: '12,450/16,000 impressions',
      ctr: '1.88%',
      created: 'Oct 1, 2024'
    },
    {
      id: 2,
      name: 'Crypto Course Launch',
      type: 'CPC',
      status: 'ACTIVE',
      progress: 52,
      spent: 52.00,
      budget: 100.00,
      metrics: '104/200 clicks',
      ctr: '2.15%',
      created: 'Oct 5, 2024'
    },
    {
      id: 3,
      name: 'NFT Marketplace Ad',
      type: 'CPM',
      status: 'PAUSED',
      progress: 23,
      spent: 23.00,
      budget: 100.00,
      metrics: '2,300/10,000 impressions',
      ctr: '1.42%',
      created: 'Oct 10, 2024'
    }
  ];

  return (
    <div className="border-2 border-vintage-white bg-vintage-black mb-8">
      {/* Table Header */}
      <div className="p-5 border-b-2 border-vintage-white flex justify-between items-center">
        <h3 className="font-mono uppercase tracking-wider text-base">
          Active Campaigns ({campaigns.length})
        </h3>

        <div className="flex gap-3 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-vintage text-xs px-3 py-2"
          >
            <option value="name">Sort: Name</option>
            <option value="spent">Sort: Spent</option>
            <option value="date">Sort: Date</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-vintage text-xs px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="paused">Paused Only</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-vintage text-xs px-3 py-2 min-w-[200px]"
          />
        </div>
      </div>

      {/* Campaign Rows */}
      <div>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <CampaignRow key={campaign.id} campaign={campaign} />
          ))
        ) : (
          <div className="p-16 text-center">
            <div className="text-5xl mb-4">○</div>
            <h3 className="text-lg font-serif mb-2">No Campaigns Yet</h3>
            <p className="mb-6 text-vintage-gray-600 font-mono text-sm">
              Create your first campaign to start reaching your target audience.
            </p>
            <button className="btn-vintage-inverse">
              + Create First Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsTable;
