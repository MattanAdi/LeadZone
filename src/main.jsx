import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// Simple test to verify React is working
console.log('🚀 LeadZone CRM: Starting app...')

const rootElement = document.getElementById('root')

if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
      <h1 style="color: #ef4444;">Error: Root element not found</h1>
      <p>Make sure there is a &lt;div id="root"&gt;&lt;/div&gt; in your HTML.</p>
    </div>
  `
  throw new Error('Root element not found')
}

console.log('✅ Root element found')

// Render the app
createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)

console.log('✅ App rendering initiated')
