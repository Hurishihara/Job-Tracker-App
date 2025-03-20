import { BrowserRouter, Route, Routes } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import RegisterPage from './RegisterPage.tsx'
import LoginPage from './LoginPage.tsx'
import { AuthProvider } from './auth/AuthContext.tsx'
import Private from './layout/Private.tsx'
import CustomTable from './applications/Page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route element={<Private />}>
            <Route path='/' element={<App />} />
            <Route path='/applications' element={<CustomTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
