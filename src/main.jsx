import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'
import { AuthProvider } from './lib/AuthContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb" }}>
        <App />
      </PayPalScriptProvider>
    </AuthProvider>
  </StrictMode>,
)
