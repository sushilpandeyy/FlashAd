import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AdvertiserDashboard from './pages/AdvertiserDashboard'
import PublisherDashboard from './pages/PublisherDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/advertiser" element={<AdvertiserDashboard />} />
        <Route path="/publisher" element={<PublisherDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
