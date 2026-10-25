import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { InstallMacPage } from '@/pages/InstallMac'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InstallMacPage />
  </StrictMode>,
)
