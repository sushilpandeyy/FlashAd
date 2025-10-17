import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import AnalyticsHeader from '../../components/advertiser/analytics/AnalyticsHeader';
import TimePerformance from '../../components/advertiser/analytics/TimePerformance';
import DayOfWeekAnalysis from '../../components/advertiser/analytics/DayOfWeekAnalysis';
import PublisherDeepDive from '../../components/advertiser/analytics/PublisherDeepDive';
import FunnelAnalysis from '../../components/advertiser/analytics/FunnelAnalysis';
import CostAnalysis from '../../components/advertiser/analytics/CostAnalysis';
import ComparativeAnalysis from '../../components/advertiser/analytics/ComparativeAnalysis';

const Analytics = () => {
  const { campaignId } = useParams();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        campaign: {
          id: campaignId,
          name: 'Summer Sale 2024',
          dateRange: 'Oct 1 - Oct 7, 2024'
        },

        // Time Performance Data
        timePerformance: {
          hourlyData: [
            { label: '12am', impressions: 240, clicks: 5 },
            { label: '3am', impressions: 180, clicks: 3 },
            { label: '6am', impressions: 350, clicks: 7 },
            { label: '9am', impressions: 1200, clicks: 29 },
            { label: '12pm', impressions: 1600, clicks: 32 },
            { label: '3pm', impressions: 1840, clicks: 44 },
            { label: '6pm', impressions: 1400, clicks: 28 },
            { label: '9pm', impressions: 980, clicks: 20 },
            { label: '12am', impressions: 310, clicks: 6 }
          ],
          dailyData: [
            { label: 'Oct 1', impressions: 4200, clicks: 84 },
            { label: 'Oct 2', impressions: 5100, clicks: 102 },
            { label: 'Oct 3', impressions: 6300, clicks: 126 },
            { label: 'Oct 4', impressions: 7500, clicks: 150 },
            { label: 'Oct 5', impressions: 8240, clicks: 168 },
            { label: 'Oct 6', impressions: 7860, clicks: 154 },
            { label: 'Oct 7', impressions: 6000, clicks: 120 }
          ],
          weeklyData: [
            { label: 'Week 1', impressions: 39200, clicks: 784 }
          ],
          insights: [
            'Peak hours: 2-5 PM (avg 1,840 impressions/hour)',
            'Lowest activity: 12-6 AM (avg 240 impressions/hour)',
            'Best CTR: 9-11 AM (2.4%)'
          ]
        },

        // Day of Week Analysis
        dayOfWeekData: [
          { day: 'Monday', impressions: 6240, clicks: 132, ctr: 2.11, spent: 12.48, cpc: 0.09 },
          { day: 'Tuesday', impressions: 7120, clicks: 142, ctr: 1.99, spent: 14.24, cpc: 0.10 },
          { day: 'Wednesday', impressions: 8450, clicks: 168, ctr: 1.99, spent: 16.90, cpc: 0.10 },
          { day: 'Thursday', impressions: 7890, clicks: 154, ctr: 1.95, spent: 15.78, cpc: 0.10 },
          { day: 'Friday', impressions: 5340, clicks: 108, ctr: 2.02, spent: 10.68, cpc: 0.10 },
          { day: 'Saturday', impressions: 2180, clicks: 42, ctr: 1.93, spent: 4.36, cpc: 0.10 },
          { day: 'Sunday', impressions: 1980, clicks: 38, ctr: 1.92, spent: 3.96, cpc: 0.10 }
        ],

        // Publisher Deep Dive
        publishers: [
          {
            name: 'cryptonews.io',
            impressions: 12450,
            clicks: 248,
            ctr: 1.99,
            cpc: 0.10,
            spent: 24.90,
            loadTime: 180,
            score: 'A+',
            trafficQuality: 'High',
            engagementRate: 'Above Average',
            bestSlot: 'Homepage Header'
          },
          {
            name: 'defitracker.com',
            impressions: 10200,
            clicks: 214,
            ctr: 2.10,
            cpc: 0.10,
            spent: 20.40,
            loadTime: 210,
            score: 'A+',
            trafficQuality: 'High',
            engagementRate: 'Excellent',
            bestSlot: 'Sidebar Widget'
          },
          {
            name: 'nftgallery.xyz',
            impressions: 8100,
            clicks: 154,
            ctr: 1.90,
            cpc: 0.11,
            spent: 16.20,
            loadTime: 190,
            score: 'A',
            trafficQuality: 'Medium-High',
            engagementRate: 'Average',
            bestSlot: 'Article Footer'
          },
          {
            name: 'web3daily.com',
            impressions: 5320,
            clicks: 101,
            ctr: 1.90,
            cpc: 0.11,
            spent: 10.64,
            loadTime: 240,
            score: 'B+',
            trafficQuality: 'Medium',
            engagementRate: 'Average',
            bestSlot: 'Banner'
          },
          {
            name: 'blockchainblog.net',
            impressions: 3130,
            clicks: 67,
            ctr: 2.14,
            cpc: 0.09,
            spent: 6.26,
            loadTime: 170,
            score: 'A+',
            trafficQuality: 'High',
            engagementRate: 'Excellent',
            bestSlot: 'Post Footer'
          }
        ],

        // Funnel Analysis
        funnelData: {
          stages: [
            { label: 'Ad Served', value: 39200, unit: 'impressions' },
            { label: 'Ad Viewed', value: 35280, conversionRate: '90.0%' },
            { label: 'Ad Clicked', value: 784, conversionRate: '2.0%' },
            { label: 'Landing Page', value: 722, conversionRate: '92.1%' },
            { label: 'Engaged', value: 156, conversionRate: '19.9%' }
          ],
          insights: [
            '10% of impressions never fully loaded (slow publisher sites)',
            'Strong click-through rate (2.0%)',
            '8% bounce rate on landing page (good)',
            '21.6% engagement rate among visitors (excellent)'
          ]
        },

        // Cost Analysis
        costData: {
          totalSpent: 78.40,
          breakdown: {
            toPublishers: 74.48,
            platformFee: 3.92,
            total: 78.40
          },
          efficiency: {
            cpm: 2.00,
            cpc: 0.10,
            cpe: 0.50
          },
          dailySpend: [
            { date: 'Oct 1', spent: 8.40 },
            { date: 'Oct 2', spent: 10.20 },
            { date: 'Oct 3', spent: 12.60 },
            { date: 'Oct 4', spent: 15.00 },
            { date: 'Oct 5', spent: 16.48 },
            { date: 'Oct 6', spent: 15.72 },
            { date: 'Oct 7', spent: 12.00 }
          ],
          publisherPayments: [
            { name: 'cryptonews.io', amountPaid: 24.90, percentOfTotal: 32, avgCpm: 2.00, rating: 5 },
            { name: 'defitracker.com', amountPaid: 20.40, percentOfTotal: 26, avgCpm: 2.00, rating: 5 },
            { name: 'nftgallery.xyz', amountPaid: 16.20, percentOfTotal: 21, avgCpm: 2.00, rating: 4 },
            { name: 'web3daily.com', amountPaid: 10.64, percentOfTotal: 14, avgCpm: 2.00, rating: 4 },
            { name: 'blockchainblog', amountPaid: 6.26, percentOfTotal: 8, avgCpm: 2.00, rating: 5 }
          ]
        },

        // Comparative Analysis
        comparativeData: {
          metrics: [
            { name: 'CTR', yourValue: '2.00%', industryAvg: '1.70%', difference: 17.6, inverse: false },
            { name: 'CPC', yourValue: '$0.10', industryAvg: '$0.12', difference: -16.7, inverse: true },
            { name: 'Avg Load Time', yourValue: '195ms', industryAvg: '280ms', difference: -30.4, inverse: true },
            { name: 'Engagement Rate', yourValue: '21.6%', industryAvg: '15.0%', difference: 44.0, inverse: false },
            { name: 'Bounce Rate', yourValue: '8.0%', industryAvg: '12.5%', difference: -36.0, inverse: true }
          ],
          performanceScore: 87,
          strengths: [
            'Excellent engagement rate',
            'Low cost per click',
            'Fast load times'
          ],
          opportunities: [
            'CTR is good but could improve with A/B testing',
            'Consider expanding to more publishers'
          ]
        }
      };

      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [campaignId]);

  const handleDateRangeChange = (range) => {
    console.log('Date range changed:', range);
    // Fetch new data based on date range
  };

  const handleExport = () => {
    console.log('Exporting analytics data...');
    alert('Exporting analytics data...');
  };

  const handleRefresh = () => {
    console.log('Refreshing analytics...');
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  if (loading) {
    return (
      <div className="bg-vintage-black min-h-screen flex items-center justify-center">
        <div className="font-mono text-vintage-white">Loading analytics...</div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="bg-vintage-black min-h-screen flex items-center justify-center">
        <div className="font-mono text-vintage-white">Analytics data not found</div>
      </div>
    );
  }

  return (
    <div className="bg-vintage-black min-h-screen">
      <Header walletAddress="0x1a2b3c4d5e6f7890abcdef" />

      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader
          campaign={analyticsData.campaign}
          onDateRangeChange={handleDateRangeChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
        />

        <div className="px-6 pb-12">
          {/* Time Performance */}
          <TimePerformance data={analyticsData.timePerformance} />

          {/* Day of Week Analysis */}
          <DayOfWeekAnalysis data={analyticsData.dayOfWeekData} />

          {/* Publisher Deep Dive */}
          <PublisherDeepDive publishers={analyticsData.publishers} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Funnel Analysis */}
            <FunnelAnalysis funnelData={analyticsData.funnelData} />

            {/* Comparative Analysis */}
            <ComparativeAnalysis comparativeData={analyticsData.comparativeData} />
          </div>

          {/* Cost Analysis - Full Width */}
          <CostAnalysis costData={analyticsData.costData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
