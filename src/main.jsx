import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AlertProvider } from './contexts/AlertContext/AlertProvider'
import { LoaderProvider } from './contexts/LoaderContext/LoaderProvider'
import { Home } from './pages/Home'
import "./i18n";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
      <AlertProvider>
        <Home />
      </AlertProvider>
    </LoaderProvider>
  </StrictMode>,
)
