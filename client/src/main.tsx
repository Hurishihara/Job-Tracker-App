import { BrowserRouter, Route, Routes } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RegisterPage from './RegisterPage.tsx'
import LoginPage from './LoginPage.tsx'
import { AuthProvider } from './auth/AuthContext.tsx'
import Private from './layout/Private.tsx'
import Analytics from './pages/Analytics.tsx'
import Applications from './pages/Applications.tsx'
import Dashboard from './pages/Dashboard.tsx'
import LandingPage from './LandingPage.tsx'
import { Toaster } from 'sonner'
import VerifyEmail from './VerifyEmail.tsx'
import PrivacyPolicy from './PrivacyPolicy.tsx'
import CookiePolicy from './CookiePolicy.tsx'
import TermsOfService from './TermsOfService.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position='top-right' richColors  />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<RegisterPage />} />
          <Route path='/verify-email/:email' element={<VerifyEmail />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/cookies' element={<CookiePolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route element={<Private />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/applications' element={<Applications />} />
            <Route path='/analytics' element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
