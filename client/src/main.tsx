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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
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
