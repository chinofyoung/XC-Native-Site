import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { InstallIphonePage } from '@/pages/InstallIphone'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InstallIphonePage />
  </StrictMode>,
)
