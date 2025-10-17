import Header from '../../components/common/Header';
import WelcomeBanner from '../../components/advertiser/WelcomeBanner';
import SummaryCards from '../../components/advertiser/SummaryCards';
import PerformanceChart from '../../components/advertiser/PerformanceChart';
import CampaignsTable from '../../components/advertiser/CampaignsTable';
import BudgetWidget from '../../components/advertiser/BudgetWidget';
import InsightsPanel from '../../components/advertiser/InsightsPanel';
import QuickActionsSidebar from '../../components/advertiser/QuickActionsSidebar';

const AdvertiserDashboard = () => {
  return (
    <div className="bg-vintage-black min-h-screen">
      <Header walletAddress="0x1a2b3c4d5e6f7890abcdef" />

      <div className="p-6">
        <WelcomeBanner activeCampaignsCount={3} />

        <SummaryCards />

        <PerformanceChart />

        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <CampaignsTable />

            <div className="grid grid-cols-2 gap-6">
              <BudgetWidget />
              <InsightsPanel />
            </div>
          </div>

          <div className="w-[280px]">
            <QuickActionsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
