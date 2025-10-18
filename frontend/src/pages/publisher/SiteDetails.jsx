import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import SiteHeader from '../../components/publisher/site-details/SiteHeader';
import SiteEarningsOverview from '../../components/publisher/site-details/SiteEarningsOverview';
import SitePerformanceChart from '../../components/publisher/site-details/SitePerformanceChart';
import PlacementList from '../../components/publisher/site-details/PlacementList';
import WidgetHealth from '../../components/publisher/site-details/WidgetHealth';
import ActivityFeed from '../../components/publisher/site-details/ActivityFeed';
import AddPlacementModal from '../../components/publisher/site-details/AddPlacementModal';

const SiteDetails = () => {
  const { siteId } = useParams();
  const [showAddPlacementModal, setShowAddPlacementModal] = useState(false);

  // Mock user data
  const user = {
    name: 'Alex Publisher',
    walletAddress: '0x7c3d...89f'
  };

  // Mock site data
  const site = {
    id: siteId,
    domain: 'cryptonews.io',
    publisherId: '#PUB-12345',
    status: 'active',
    category: 'News & Media',
    addedDate: 'Jan 2024',
    trafficQuality: 94,
    activePlacements: 3,
    monthlyVisitors: 125000
  };

  // Mock earnings data
  const earnings = {
    today: 24.80,
    todayTrend: 12.5,
    todayImpressions: 8250,
    thisWeek: 168.50,
    weekTrend: 8.3,
    weekImpressions: 57500,
    thisMonth: 687.50,
    monthTrend: 15.7,
    monthImpressions: 245000,
    rpm: 3.12,
    avgLoadTime: 180
  };

  // Mock performance chart data
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: `Oct ${i + 1}`,
    revenue: 15 + Math.random() * 25,
    impressions: 6000 + Math.floor(Math.random() * 4000)
  }));

  // Mock placements data
  const [placements, setPlacements] = useState([
    {
      id: 'PL-001',
      icon: '📱',
      name: 'Homepage Header',
      status: 'active',
      size: '728x90',
      position: 'Top of page',
      earningsToday: 12.40,
      earningsMonth: 312.50,
      impressions: 123000,
      clicks: 2460,
      ctr: 2.00,
      rpm: 3.12,
      fillRate: 96,
      loadTime: 180,
      refreshRate: 45
    },
    {
      id: 'PL-002',
      icon: '📰',
      name: 'Article Sidebar',
      status: 'active',
      size: '300x250',
      position: 'Sidebar (mid-content)',
      earningsToday: 8.20,
      earningsMonth: 245.80,
      impressions: 89000,
      clicks: 1780,
      ctr: 2.00,
      rpm: 2.89,
      fillRate: 94,
      loadTime: 195,
      refreshRate: 45
    },
    {
      id: 'PL-003',
      icon: '📄',
      name: 'Article Footer',
      status: 'paused',
      size: '728x90',
      position: 'Bottom of article',
      earningsToday: 4.20,
      earningsMonth: 129.20,
      impressions: 56000,
      clicks: 1120,
      ctr: 2.00,
      rpm: 2.68,
      fillRate: 92,
      loadTime: 210,
      refreshRate: 30
    }
  ]);

  // Mock widget health data
  const [health, setHealth] = useState({
    scriptLoaded: true,
    publisherIdValid: true,
    placementsDetected: 3,
    impressionsRecorded: true,
    walletConnected: true,
    pageLoadTime: 1850,
    adLoadTime: 180,
    lastChecked: new Date()
  });

  // Mock activity feed data
  const activities = [
    {
      type: 'earning',
      message: 'Earned $2.49',
      details: '1,245 impressions served',
      timestamp: '2 minutes ago',
      placement: 'Homepage Header'
    },
    {
      type: 'click',
      message: 'Ad clicked',
      details: 'Summer Sale campaign',
      timestamp: '5 minutes ago',
      placement: 'Article Sidebar'
    },
    {
      type: 'impression',
      message: '1,000 impressions milestone',
      details: 'Daily goal reached',
      timestamp: '15 minutes ago',
      placement: 'Homepage Header'
    },
    {
      type: 'health_check',
      message: 'Health check passed',
      details: 'All systems operational',
      timestamp: '1 hour ago'
    },
    {
      type: 'placement_paused',
      message: 'Placement paused',
      details: 'Article Footer placement paused manually',
      timestamp: '3 hours ago',
      placement: 'Article Footer'
    }
  ];

  const handlePauseSite = () => {
    alert('Site paused');
  };

  const handleResumeSite = () => {
    alert('Site resumed');
  };

  const handleSiteSettings = () => {
    alert('Opening site settings...');
  };

  const handleAddPlacement = () => {
    setShowAddPlacementModal(true);
  };

  const handleCreatePlacement = (newPlacement) => {
    setPlacements([...placements, {
      ...newPlacement,
      earningsToday: 0,
      earningsMonth: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      rpm: 0,
      fillRate: 0,
      loadTime: 0,
      status: 'active',
      icon: '📍'
    }]);
    setShowAddPlacementModal(false);
    alert(`Placement "${newPlacement.name}" created successfully!`);
  };

  const handleEditPlacement = (placement) => {
    alert(`Edit placement: ${placement.name}`);
  };

  const handlePausePlacement = (placementId) => {
    setPlacements(placements.map(p =>
      p.id === placementId ? { ...p, status: 'paused' } : p
    ));
  };

  const handleResumePlacement = (placementId) => {
    setPlacements(placements.map(p =>
      p.id === placementId ? { ...p, status: 'active' } : p
    ));
  };

  const handleRunHealthCheck = () => {
    alert('Running health check...');
    setHealth({
      ...health,
      lastChecked: new Date()
    });
  };

  return (
    <>
      <Header user={user} userType="publisher" />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Site Header */}
        <SiteHeader
          site={site}
          onPause={handlePauseSite}
          onResume={handleResumeSite}
          onSettings={handleSiteSettings}
        />

        {/* Earnings Overview */}
        <SiteEarningsOverview earnings={earnings} />

        {/* Performance Chart */}
        <SitePerformanceChart data={performanceData} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content - Placements */}
          <div className="lg:col-span-2">
            <PlacementList
              placements={placements}
              onAddPlacement={handleAddPlacement}
              onEditPlacement={handleEditPlacement}
              onPausePlacement={handlePausePlacement}
              onResumePlacement={handleResumePlacement}
            />
          </div>

          {/* Sidebar */}
          <div>
            {/* Widget Health */}
            <WidgetHealth
              health={health}
              onRunCheck={handleRunHealthCheck}
            />

            {/* Activity Feed */}
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddPlacementModal && (
        <AddPlacementModal
          onClose={() => setShowAddPlacementModal(false)}
          onCreate={handleCreatePlacement}
        />
      )}
    </>
  );
};

export default SiteDetails;
