import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import CampaignDetail from './pages/CampaignDetail'
import CRM from './pages/CRM'
import Timeline from './pages/Timeline'
import Analytics from './pages/Analytics'
import Workload from './pages/Workload'
import ActivityLogPage from './pages/ActivityLog'
import CostCalculator from './pages/CostCalculator'
import AuthError from './pages/AuthError'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/auth/error" element={<AuthError />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/campaign/:id" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />
          <Route path="/dashboard/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
          <Route path="/dashboard/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
          <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/dashboard/workload" element={<ProtectedRoute><Workload /></ProtectedRoute>} />
          <Route path="/dashboard/activity" element={<ProtectedRoute><ActivityLogPage /></ProtectedRoute>} />
          <Route path="/dashboard/calculator" element={<ProtectedRoute><CostCalculator /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default function App() {
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppRoutes />
      </GoogleOAuthProvider>
    )
  }
  return <AppRoutes />
}
