import { useState } from 'react';
import Header from '../common/Header';
import AnalyticsHeader from './analytics/AnalyticsHeader';
import RevenueOverview from './analytics/RevenueOverview';
import RevenueTrends from './analytics/RevenueTrends';
import PlacementPerformance from './analytics/PlacementPerformance';
import TransactionHistory from './analytics/TransactionHistory';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedSite, setSelectedSite] = useState('all');

  // Mock user data
  const user = {
    name: 'Alex Publisher',
    walletAddress: '0x7c3d...89f'
  };

  // Mock revenue overview data
  const revenueData = {
    totalRevenue: 1142.80,
    totalImpressions: 571400,
    avgDaily: 38.09,
    bestDay: 62.40,
    worstDay: 18.20,
    rpm: 2.00,
    industryRpm: 1.85,
    revenueTrend: 8,
    totalClicks: 11428,
    avgCTR: 2.00,
    industryCTR: 1.70,
    impressionGrowth: 12,
    clickGrowth: 15,
    days: 30
  };

  // Mock revenue trends data
  const trendData = Array.from({ length: 30 }, (_, i) => ({
    date: `Oct ${i + 1}`,
    revenue: 25 + Math.random() * 35 + (i === 22 ? 25 : 0),
    impressions: 15000 + Math.floor(Math.random() * 10000),
    ctr: 1.5 + Math.random() * 1.0
  }));

  // Mock placement performance data
  const placementData = [
    {
      id: 'cryptonews.io',
      domain: 'cryptonews.io',
      totalRevenue: 958.00,
      placements: [
        {
          icon: '📱',
          name: 'Homepage Header',
          impressions: 245000,
          clicks: 5145,
          ctr: 2.10,
          revenue: 490.00,
          rpm: 2.00,
          revenueShare: 43,
          bestTime: 'Weekdays 2-5 PM',
          loadTime: 180
        },
        {
          icon: '📰',
          name: 'Article Sidebar',
          impressions: 156000,
          clicks: 3120,
          ctr: 2.00,
          revenue: 312.00,
          rpm: 2.00,
          revenueShare: 27,
          bestTime: 'Weekdays 9-11 AM',
          loadTime: 195
        },
        {
          icon: '📄',
          name: 'Article Footer',
          impressions: 78000,
          clicks: 1482,
          ctr: 1.90,
          revenue: 156.00,
          rpm: 2.00,
          revenueShare: 14,
          bestTime: 'Evenings 6-9 PM',
          loadTime: 210
        }
      ]
    },
    {
      id: 'defitracker.com',
      domain: 'defitracker.com',
      totalRevenue: 269.60,
      placements: [
        {
          icon: '📱',
          name: 'Top Banner',
          impressions: 89200,
          clicks: 1784,
          ctr: 2.00,
          revenue: 178.40,
          rpm: 2.00,
          revenueShare: 16,
          bestTime: 'Weekdays 10 AM - 2 PM',
          loadTime: 220
        },
        {
          icon: '📰',
          name: 'Sidebar Widget',
          impressions: 45600,
          clicks: 912,
          ctr: 2.00,
          revenue: 91.20,
          rpm: 2.00,
          revenueShare: 8,
          bestTime: 'Lunch hours 12-2 PM',
          loadTime: 230
        }
      ]
    },
    {
      id: 'nftgallery.xyz',
      domain: 'nftgallery.xyz',
      totalRevenue: 57.20,
      placements: [
        {
          icon: '📱',
          name: 'Gallery Footer',
          impressions: 28600,
          clicks: 572,
          ctr: 2.00,
          revenue: 57.20,
          rpm: 2.00,
          revenueShare: 5,
          bestTime: 'Weekends',
          loadTime: 250
        }
      ]
    }
  ];

  // Mock transaction history data
  const transactionData = [
    {
      dateTime: 'Oct 15, 2:34 PM',
      type: 'earning',
      campaign: 'Summer Sale',
      site: 'cryptonews.io',
      placement: 'Homepage Header',
      metrics: '1,245 impr',
      amount: 2.49,
      txHash: '0xabc123...def789'
    },
    {
      dateTime: 'Oct 15, 1:22 PM',
      type: 'earning',
      campaign: 'Crypto Course',
      site: 'cryptonews.io',
      placement: 'Article Sidebar',
      metrics: '892 impr',
      amount: 1.78,
      txHash: '0x123abc...789def'
    },
    {
      dateTime: 'Oct 15, 11:45 AM',
      type: 'earning',
      campaign: 'NFT Launch',
      site: 'defitracker.com',
      placement: 'Top Banner',
      metrics: '2,103 impr',
      amount: 4.21,
      txHash: '0x456def...abc123'
    },
    {
      dateTime: 'Oct 14, 5:18 PM',
      type: 'earning',
      campaign: 'DeFi Platform',
      site: 'cryptonews.io',
      placement: 'Article Footer',
      metrics: '1,567 impr',
      amount: 3.13,
      txHash: '0x789abc...456def'
    },
    {
      dateTime: 'Oct 14, 3:42 PM',
      type: 'earning',
      campaign: 'Web3 Gaming',
      site: 'nftgallery.xyz',
      placement: 'Gallery Footer',
      metrics: '834 impr',
      amount: 1.67,
      txHash: '0xdef456...123abc'
    },
    {
      dateTime: 'Oct 10, 9:20 AM',
      type: 'withdrawal',
      campaign: 'Manual Withdrawal',
      site: null,
      placement: 'Withdrawal to wallet: 0x7c3d...89f',
      metrics: null,
      amount: -500.00,
      txHash: '0x111222...333444'
    },
    {
      dateTime: 'Oct 8, 4:15 PM',
      type: 'earning',
      campaign: 'Summer Sale',
      site: 'cryptonews.io',
      placement: 'Homepage Header',
      metrics: '3,245 impr',
      amount: 6.49,
      txHash: '0x555666...777888'
    },
    ...Array.from({ length: 18 }, (_, i) => ({
      dateTime: `Oct ${7 - Math.floor(i / 3)}, ${12 - (i % 3) * 2}:00 PM`,
      type: i % 5 === 0 ? 'bonus' : 'earning',
      campaign: ['Summer Sale', 'Crypto Course', 'NFT Launch', 'DeFi Platform'][i % 4],
      site: ['cryptonews.io', 'defitracker.com', 'nftgallery.xyz'][i % 3],
      placement: ['Homepage Header', 'Article Sidebar', 'Top Banner'][i % 3],
      metrics: `${1000 + Math.floor(Math.random() * 2000)} impr`,
      amount: 1 + Math.random() * 5,
      txHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 8)}`
    }))
  ];

  const handleExport = (format) => {
    alert(`Exporting analytics as ${format.toUpperCase()}...`);
  };

  return (
    <>
      <Header user={user} userType="publisher" />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Analytics Header */}
        <AnalyticsHeader
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          onExport={handleExport}
        />

        {/* Revenue Overview */}
        <RevenueOverview data={revenueData} />

        {/* Revenue Trends */}
        <RevenueTrends data={trendData} />

        {/* Placement Performance */}
        <PlacementPerformance placements={placementData} />

        {/* Transaction History */}
        <TransactionHistory transactions={transactionData} />
      </div>
    </>
  );
};

export default Analytics;
