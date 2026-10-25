import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { SharingShadersPage } from '@/pages/SharingShaders'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SharingShadersPage />
  </StrictMode>,
)
