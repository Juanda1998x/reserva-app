import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppReservas } from './AppReservas.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppReservas />
    </StrictMode>
  </BrowserRouter>,
)
