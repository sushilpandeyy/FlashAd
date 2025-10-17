import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Public Pages
import Landing from './pages/Landing'
import Connect from './pages/Connect'
import Docs from './pages/Docs'
import TransactionDetails from './pages/TransactionDetails'

// Advertiser Pages
import AdvertiserDashboard from './pages/advertiser/Dashboard'
import CreateCampaign from './pages/advertiser/CreateCampaign'
import CampaignDetails from './pages/advertiser/CampaignDetails'
import Analytics from './pages/advertiser/Analytics'

// Publisher Pages
import PublisherDashboard from './pages/publisher/Dashboard'
import Onboarding from './pages/publisher/Onboarding'
import Integration from './components/publisher/Integration'
import PublisherAnalytics from './components/publisher/Analytics'
import SiteDetails from './pages/publisher/SiteDetails'
import Withdraw from './pages/publisher/Withdraw'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/transactions/:txHash" element={<TransactionDetails />} />

        {/* Advertiser Routes */}
        <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
        <Route path="/advertiser/campaigns/new" element={<CreateCampaign />} />
        <Route path="/advertiser/campaigns/:campaignId" element={<CampaignDetails />} />
        <Route path="/advertiser/campaigns/:campaignId/analytics" element={<Analytics />} />

        {/* Publisher Routes */}
        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route path="/publisher/onboarding" element={<Onboarding />} />
        <Route path="/publisher/integration" element={<Integration />} />
        <Route path="/publisher/analytics" element={<PublisherAnalytics />} />
        <Route path="/publisher/sites/:siteId" element={<SiteDetails />} />
        <Route path="/publisher/withdraw" element={<Withdraw />} />
      </Routes>
    </Router>
  )
}

export default App
