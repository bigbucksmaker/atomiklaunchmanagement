import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import CampaignDetail from './pages/CampaignDetail'
import AuthError from './pages/AuthError'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/auth/error" element={<AuthError />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/campaign/:id" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}
