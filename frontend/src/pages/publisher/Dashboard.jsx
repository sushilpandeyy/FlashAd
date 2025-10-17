import Header from '../../components/common/Header';
import WelcomeBanner from '../../components/publisher/WelcomeBanner';
import EarningsCards from '../../components/publisher/EarningsCards';
import PublisherMetrics from '../../components/publisher/PublisherMetrics';
import EarningsGraph from '../../components/publisher/EarningsGraph';
import TopPerformingAds from '../../components/publisher/TopPerformingAds';
import WalletSection from '../../components/publisher/WalletSection';
import SitesOverview from '../../components/publisher/SitesOverview';
import PublisherInsights from '../../components/publisher/PublisherInsights';

const Dashboard = () => {
  // Mock user data
  const user = {
    name: 'Alex Publisher',
    walletAddress: '0x7c3d...89f'
  };

  // Mock earnings data
  const earnings = {
    today: 42.50,
    todayTrend: 12.5,
    todayImpressions: 125000,
    thisWeek: 287.30,
    weekTrend: 8.3,
    weekImpressions: 890000,
    thisMonth: 1142.80,
    monthTrend: 15.7,
    monthImpressions: 3420000,
    allTime: 12847.60,
    totalCampaigns: 87
  };

  // Mock metrics data
  const metrics = {
    impressions: 3420000,
    targetImpressions: 5000000,
    clicks: 18750,
    clicksToday: 650,
    avgDailyClicks: 625,
    ctr: 0.55,
    industryCtr: 0.42,
    rpm: 2.85,
    avgLoadTime: 124,
    loadTimeImprovement: 38,
    fillRate: 94,
    activeSites: 3,
    activeAds: 12,
    newAdsThisWeek: 3
  };

  // Mock earnings graph data
  const earningsGraphData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      earnings: 25 + Math.random() * 35 + (i > 60 ? (i - 60) * 0.3 : 0),
      impressions: 80000 + Math.floor(Math.random() * 60000),
      clicks: 400 + Math.floor(Math.random() * 400)
    };
  });

  // Mock top performing ads
  const topPerformingAds = [
    {
      campaign: 'DeFi Pulse Premium Banner',
      type: 'CPM',
      sites: '2 sites',
      impressions: 856000,
      clicks: 4890,
      earned: 428.50,
      rpm: 3.12,
      performance: 'Excellent',
      loadTime: 98,
      sharePercentage: 37.5
    },
    {
      campaign: 'CryptoNews Sidebar Ad',
      type: 'CPM',
      sites: '1 site',
      impressions: 672000,
      clicks: 3210,
      earned: 312.80,
      rpm: 2.89,
      performance: 'Very Good',
      loadTime: 112,
      sharePercentage: 27.4
    },
    {
      campaign: 'NFT Marketplace Banner',
      type: 'CPC',
      sites: '3 sites',
      impressions: 523000,
      clicks: 2890,
      earned: 245.60,
      rpm: 2.93,
      performance: 'Very Good',
      loadTime: 105,
      sharePercentage: 21.5
    },
    {
      campaign: 'Web3 Gaming Leaderboard',
      type: 'CPM',
      sites: '2 sites',
      impressions: 389000,
      clicks: 1560,
      earned: 89.30,
      rpm: 1.43,
      performance: 'Good',
      loadTime: 134,
      sharePercentage: 7.8
    },
    {
      campaign: 'Crypto Exchange Footer',
      type: 'CPM',
      sites: '1 site',
      impressions: 245000,
      clicks: 890,
      earned: 66.60,
      rpm: 1.69,
      performance: 'Average',
      loadTime: 156,
      sharePercentage: 5.8
    }
  ];

  // Mock wallet data
  const balance = {
    available: 1098.60
  };

  const pending = {
    amount: 44.20,
    nextBatch: 'Dec 25, 2024',
    impressions: 156000
  };

  const history = {
    lastWithdrawal: {
      date: 'Dec 10, 2024',
      amount: 892.40
    },
    avgMonthly: 1087.30,
    nextPayout: 1142.80
  };

  // Mock sites data
  const sites = [
    {
      id: 'site-1',
      domain: 'cryptonews.io',
      status: 'ACTIVE',
      category: 'News & Media',
      addedDate: 'Jan 2024',
      isTopPerformer: true,
      earningsToday: 24.80,
      earningsMonth: 687.50,
      rpm: 3.12,
      fillRate: 96,
      trafficQuality: 94,
      topPlacements: [
        {
          name: 'Header Banner',
          type: '728x90',
          impressions: 423000,
          earnings: 312.50
        },
        {
          name: 'Sidebar Widget',
          type: '300x600',
          impressions: 289000,
          earnings: 245.80
        },
        {
          name: 'In-Article',
          type: 'Native',
          impressions: 156000,
          earnings: 129.20
        }
      ]
    },
    {
      id: 'site-2',
      domain: 'defitracker.com',
      status: 'ACTIVE',
      category: 'Finance & Analytics',
      addedDate: 'Mar 2024',
      isTopPerformer: false,
      earningsToday: 12.30,
      earningsMonth: 312.40,
      rpm: 2.68,
      fillRate: 92,
      trafficQuality: 89,
      topPlacements: [
        {
          name: 'Dashboard Banner',
          type: '970x250',
          impressions: 178000,
          earnings: 156.30
        },
        {
          name: 'Footer Sticky',
          type: '728x90',
          impressions: 134000,
          earnings: 98.70
        },
        {
          name: 'Mobile Bottom',
          type: '320x50',
          impressions: 89000,
          earnings: 57.40
        }
      ]
    },
    {
      id: 'site-3',
      domain: 'nftgallery.xyz',
      status: 'ACTIVE',
      category: 'Art & Collectibles',
      addedDate: 'Jun 2024',
      isTopPerformer: false,
      earningsToday: 5.40,
      earningsMonth: 142.90,
      rpm: 2.34,
      fillRate: 88,
      trafficQuality: 82,
      topPlacements: [
        {
          name: 'Gallery Sidebar',
          type: '300x250',
          impressions: 94000,
          earnings: 78.60
        },
        {
          name: 'Between Items',
          type: 'Native',
          impressions: 67000,
          earnings: 42.30
        },
        {
          name: 'Profile Page',
          type: '728x90',
          impressions: 45000,
          earnings: 22.00
        }
      ]
    }
  ];

  // Mock insights data
  const insights = [
    {
      id: 'insight-1',
      type: 'high_performer',
      title: 'cryptonews.io is crushing it!',
      description: 'This site generated 60% of your monthly earnings with excellent traffic quality (94%). Consider adding more premium placements to maximize revenue.',
      metrics: [
        { label: 'Monthly Earnings', value: '$687.50', color: 'text-green-400' },
        { label: 'RPM', value: '$3.12', color: 'text-blue-400' }
      ],
      actions: [
        { label: 'Add Placement', primary: true, handler: 'add-placement' },
        { label: 'View Details', primary: false, handler: 'view-details' }
      ],
      timestamp: '2 hours ago'
    },
    {
      id: 'insight-2',
      type: 'growth_opportunity',
      title: 'Optimize nftgallery.xyz load times',
      description: 'This site has lower earnings potential due to slower ad load times (avg 156ms). Optimizing placement code could increase RPM by up to 18%.',
      metrics: [
        { label: 'Current Load', value: '156ms', color: 'text-yellow-400' },
        { label: 'Potential Gain', value: '+$25.74/mo', color: 'text-green-400' }
      ],
      actions: [
        { label: 'Optimize Now', primary: true, handler: 'optimize' },
        { label: 'Learn More', primary: false, handler: 'learn-more' }
      ],
      timestamp: '5 hours ago'
    },
    {
      id: 'insight-3',
      type: 'payout_ready',
      title: 'You can withdraw your earnings!',
      description: 'You have $1,098.60 available for withdrawal. Funds are settled and ready to be transferred to your wallet instantly via smart contract.',
      metrics: [
        { label: 'Available', value: '$1,098.60', color: 'text-green-400' },
        { label: 'Network Fee', value: '~$0.02', color: 'text-yellow-400' }
      ],
      actions: [
        { label: 'Withdraw Now', primary: true, handler: 'withdraw' },
        { label: 'View Wallet', primary: false, handler: 'view-wallet' }
      ],
      timestamp: '1 day ago'
    },
    {
      id: 'insight-4',
      type: 'optimization',
      title: 'Try Native Ads for Higher CTR',
      description: 'Sites in your category see 2.3x higher CTR with native ad formats. Your "In-Article" placement on cryptonews.io is already performing well - consider adding more.',
      metrics: [
        { label: 'Your CTR', value: '0.55%', color: 'text-green-400' },
        { label: 'With Native', value: 'Est. 1.27%', color: 'text-blue-400' }
      ],
      actions: [
        { label: 'Browse Native Ads', primary: true, handler: 'browse-native' },
        { label: 'Dismiss', primary: false, handler: 'dismiss' }
      ],
      timestamp: '2 days ago'
    }
  ];

  return (
    <>
      <Header user={user} userType="publisher" />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <WelcomeBanner
          userName={user.name}
          todayEarnings={earnings.today}
          todayImpressions={metrics.impressions}
        />

        {/* Earnings Cards */}
        <EarningsCards earnings={earnings} />

        {/* Metrics Grid */}
        <PublisherMetrics metrics={metrics} />

        {/* Earnings Graph */}
        <EarningsGraph data={earningsGraphData} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Performing Ads */}
          <div>
            <TopPerformingAds ads={topPerformingAds} />
          </div>

          {/* Wallet Section */}
          <div>
            <WalletSection
              balance={balance}
              pending={pending}
              history={history}
            />
          </div>
        </div>

        {/* Sites Overview */}
        <SitesOverview sites={sites} />

        {/* Publisher Insights */}
        <PublisherInsights insights={insights} />
      </div>
    </>
  );
};

export default Dashboard;
