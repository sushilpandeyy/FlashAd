import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import CampaignHeader from '../../components/advertiser/campaign-details/CampaignHeader';
import PerformanceCards from '../../components/advertiser/campaign-details/PerformanceCards';
import PerformanceGraph from '../../components/advertiser/campaign-details/PerformanceGraph';
import PublishersTable from '../../components/advertiser/campaign-details/PublishersTable';
import AdCreativeDisplay from '../../components/advertiser/campaign-details/AdCreativeDisplay';
import CampaignControls from '../../components/advertiser/campaign-details/CampaignControls';
import RecentActivity from '../../components/advertiser/campaign-details/RecentActivity';
import SmartInsights from '../../components/advertiser/campaign-details/SmartInsights';

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCampaign = {
        id: campaignId,
        name: 'Summer Sale 2024',
        status: 'ACTIVE',
        type: 'CPM',
        created: '2024-10-01',
        lastUpdated: '2 minutes ago',
        budget: 100,
        spent: 78.40,
        ratePerAction: 2.0,
        targetUrl: 'https://mysite.com/sale',
        activePublishers: 12,

        // Performance Stats
        stats: {
          spent: 78.40,
          budget: 100,
          impressions: 39200,
          targetImpressions: 50000,
          clicks: 784,
          ctr: 2.00,
          avgCtr: 1.70,
          industryCtr: 1.7,
          costPerClick: 0.10,
          expectedCpc: 0.12,
          daysActive: 6,
          avgDailyImpressions: 6533,
          estimatedCompletionDays: 2,
          activePublishers: 12,
          newPublishersThisWeek: 8,
          clicksToday: 124,
          avgDailyClicks: 131
        },

        // Performance Graph Data
        performanceData: [
          { date: 'Oct 1', impressions: 4200, clicks: 84 },
          { date: 'Oct 2', impressions: 5100, clicks: 102 },
          { date: 'Oct 3', impressions: 6300, clicks: 126 },
          { date: 'Oct 4', impressions: 7500, clicks: 150 },
          { date: 'Oct 5', impressions: 8240, clicks: 168 },
          { date: 'Oct 6', impressions: 7860, clicks: 154 },
          { date: 'Oct 7', impressions: 6000, clicks: 120 }
        ],

        // Publishers Data
        publishers: [
          {
            id: 1,
            name: 'cryptonews.io',
            impressions: 12450,
            clicks: 248,
            ctr: 1.99,
            earned: 24.90,
            share: 32,
            badge: 'top',
            badgeDetail: 'Avg load time: 180ms',
            loadTime: 180,
            firstImpression: 'Oct 1, 2024',
            lastImpression: '12 minutes ago',
            placements: [
              { name: 'Homepage Header', impressions: 8200 },
              { name: 'Article Sidebar', impressions: 4250 }
            ]
          },
          {
            id: 2,
            name: 'defitracker.com',
            impressions: 10200,
            clicks: 214,
            ctr: 2.10,
            earned: 20.40,
            share: 26,
            badge: 'growing',
            badgeDetail: '+45% vs last week',
            loadTime: 220,
            firstImpression: 'Oct 1, 2024',
            lastImpression: '5 minutes ago',
            placements: [
              { name: 'Homepage Banner', impressions: 10200 }
            ]
          },
          {
            id: 3,
            name: 'nftgallery.xyz',
            impressions: 8100,
            clicks: 154,
            ctr: 1.90,
            earned: 16.20,
            share: 21,
            badge: 'roi',
            badgeDetail: 'Low cost, high engagement',
            loadTime: 165,
            firstImpression: 'Oct 2, 2024',
            lastImpression: '1 hour ago',
            placements: [
              { name: 'Gallery Sidebar', impressions: 8100 }
            ]
          },
          {
            id: 4,
            name: 'web3daily.com',
            impressions: 5320,
            clicks: 101,
            ctr: 1.90,
            earned: 10.64,
            share: 14,
            badge: null,
            loadTime: 195,
            firstImpression: 'Oct 3, 2024',
            lastImpression: '30 minutes ago',
            placements: [
              { name: 'Article Header', impressions: 5320 }
            ]
          },
          {
            id: 5,
            name: 'blockchainblog.io',
            impressions: 3130,
            clicks: 67,
            ctr: 2.14,
            earned: 6.26,
            share: 8,
            badge: 'ctr',
            badgeDetail: 'Quality audience',
            loadTime: 175,
            firstImpression: 'Oct 4, 2024',
            lastImpression: '45 minutes ago',
            placements: [
              { name: 'Post Footer', impressions: 3130 }
            ]
          }
        ],

        // Ad Creative
        adCreative: {
          imageUrl: 'https://via.placeholder.com/728x90?text=Summer+Sale+2024',
          targetUrl: 'https://mysite.com/sale',
          format: '728x90 Leaderboard',
          fileSize: '245 KB',
          ipfsHash: 'Qm...abc123',
          dimensions: '728x90'
        },

        // Recent Activity
        activities: [
          {
            id: 1,
            type: 'impressions',
            timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            message: '124 new impressions from cryptonews.io'
          },
          {
            id: 2,
            type: 'clicks',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            message: '8 clicks generated',
            details: 'CTR: 2.1%'
          },
          {
            id: 3,
            type: 'publisher',
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            message: 'New publisher joined: web3times.io'
          },
          {
            id: 4,
            type: 'milestone',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            message: 'Milestone reached: 30,000 impressions! 🎉'
          },
          {
            id: 5,
            type: 'clicks',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            message: 'Daily summary: 5,240 impressions, 112 clicks'
          }
        ],

        // Smart Insights
        insights: [
          {
            id: 1,
            category: 'opportunity',
            message: 'Your CTR is 17% above average! Consider increasing your budget to maximize this high-performing campaign.',
            actions: [
              { type: 'add_budget', label: 'Add Budget' },
            ]
          },
          {
            id: 2,
            category: 'trend',
            message: 'Impressions spiked by 45% on weekdays (2-5 PM). Schedule future campaigns during these peak hours.',
            actions: [
              { type: 'view_details', label: 'View Details' },
            ]
          },
          {
            id: 3,
            category: 'publisher',
            message: 'cryptonews.io drives 32% of your impressions with the best CTR. Consider targeting similar publishers.',
            actions: [
              { type: 'find_similar', label: 'Find Similar' },
            ]
          },
          {
            id: 4,
            category: 'timing',
            message: 'Your campaign will complete in 2-3 days. Create your next campaign now to maintain momentum.',
            actions: [
              { type: 'create_campaign', label: 'Create Campaign' },
            ]
          }
        ]
      };

      setCampaign(mockCampaign);
      setLoading(false);
    }, 1000);
  }, [campaignId]);

  // Campaign action handlers
  const handlePause = async () => {
    console.log('Pausing campaign...');
    // Simulate API call
    setTimeout(() => {
      setCampaign({ ...campaign, status: 'PAUSED' });
    }, 500);
  };

  const handleResume = async () => {
    console.log('Resuming campaign...');
    setTimeout(() => {
      setCampaign({ ...campaign, status: 'ACTIVE' });
    }, 500);
  };

  const handleAddBudget = async (amount) => {
    console.log('Adding budget:', amount);
    setTimeout(() => {
      setCampaign({
        ...campaign,
        budget: campaign.budget + amount
      });
    }, 500);
  };

  const handleEdit = async (editData) => {
    console.log('Editing campaign:', editData);
    setTimeout(() => {
      setCampaign({
        ...campaign,
        ...editData
      });
    }, 500);
  };

  const handleExport = async (exportOptions) => {
    console.log('Exporting report:', exportOptions);
    // Simulate download
    alert(`Downloading ${exportOptions.format.toUpperCase()} report...`);
  };

  const handleShare = async () => {
    console.log('Sharing campaign...');
  };

  const handleArchive = async () => {
    console.log('Archiving campaign...');
    // Simulate API call and redirect
    setTimeout(() => {
      window.location.href = '/advertiser/dashboard';
    }, 500);
  };

  const handleChangeCreative = () => {
    console.log('Changing creative...');
    // Open file upload modal
    alert('Creative change modal would open here');
  };

  const handleInsightAction = (actionType, insightId) => {
    console.log('Insight action:', actionType, insightId);

    switch (actionType) {
      case 'add_budget':
        // Trigger add budget modal
        document.querySelector('[data-action="add-budget"]')?.click();
        break;
      case 'create_campaign':
        window.location.href = '/advertiser/create-campaign';
        break;
      case 'view_details':
      case 'find_similar':
        alert(`Action ${actionType} would be implemented here`);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="bg-vintage-black min-h-screen flex items-center justify-center">
        <div className="font-mono text-vintage-white">Loading campaign details...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="bg-vintage-black min-h-screen flex items-center justify-center">
        <div className="font-mono text-vintage-white">Campaign not found</div>
      </div>
    );
  }

  return (
    <div className="bg-vintage-black min-h-screen">
      <Header walletAddress="0x1a2b3c4d5e6f7890abcdef" />

      <div className="max-w-7xl mx-auto">
        {/* Campaign Header */}
        <CampaignHeader campaign={campaign} />

        {/* Alert Banner (if needed) */}
        {campaign.budget - campaign.spent < 10 && campaign.status === 'ACTIVE' && (
          <div className="mx-6 mb-8 border-2 border-yellow-400 bg-yellow-900 bg-opacity-20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="font-mono text-sm">
                  <div className="text-yellow-400 font-bold">Low Budget Warning</div>
                  <div className="text-vintage-white">
                    Your campaign has only ${(campaign.budget - campaign.spent).toFixed(2)} remaining.
                    Add budget now to prevent interruption.
                  </div>
                </div>
              </div>
              <button
                data-action="add-budget"
                onClick={() => {
                  // Trigger add budget modal
                }}
                className="btn-vintage text-xs py-2 px-4 whitespace-nowrap"
              >
                Add Budget
              </button>
            </div>
          </div>
        )}

        <div className="px-6 pb-12">
          {/* Performance Cards */}
          <PerformanceCards campaignStats={campaign.stats} />

          {/* Performance Graph */}
          <PerformanceGraph performanceData={campaign.performanceData} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              {/* Publishers Table */}
              <PublishersTable
                publishers={campaign.publishers}
                totalStats={campaign.stats}
              />

              {/* Recent Activity */}
              <RecentActivity activities={campaign.activities} />
            </div>

            <div className="lg:col-span-1">
              {/* Ad Creative Display */}
              <AdCreativeDisplay
                adCreative={campaign.adCreative}
                onChangeCreative={handleChangeCreative}
              />

              {/* Smart Insights */}
              <SmartInsights
                insights={campaign.insights}
                onAction={handleInsightAction}
              />
            </div>
          </div>

          {/* Campaign Controls */}
          <CampaignControls
            campaign={campaign}
            onPause={handlePause}
            onResume={handleResume}
            onAddBudget={handleAddBudget}
            onEdit={handleEdit}
            onExport={handleExport}
            onShare={handleShare}
            onArchive={handleArchive}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
