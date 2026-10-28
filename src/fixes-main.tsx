import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { FixesPage } from '@/pages/Fixes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FixesPage />
  </StrictMode>,
)
