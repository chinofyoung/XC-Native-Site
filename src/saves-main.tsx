import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './index.css'
import { MovingSavesPage } from '@/pages/MovingSaves'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovingSavesPage />
  </StrictMode>,
)
