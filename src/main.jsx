import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// Simple test to verify React is working
console.log('🚀 LeadZone CRM: Starting app...')
console.log('📍 Current URL:', window.location.href)
console.log('📍 Base path:', import.meta.env.BASE_URL)

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

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('❌ Global error:', event.error)
  console.error('❌ Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Unhandled promise rejection:', event.reason)
})

// Render the app
try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
  console.log('✅ App rendering initiated')
} catch (error) {
  console.error('❌ Failed to render app:', error)
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
      <h1 style="color: #ef4444;">Failed to load application</h1>
      <p>${error.message}</p>
      <pre style="text-align: left; background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
        ${error.stack}
      </pre>
    </div>
  `
}
