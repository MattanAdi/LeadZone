import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

console.log('🚀 LeadZone CRM: Starting app...')

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('❌ Root element not found!')
  throw new Error('Root element not found! Make sure there is a <div id="root"></div> in your HTML.')
}

console.log('✅ Root element found')

try {
  console.log('📦 Rendering app...')
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
  console.log('✅ App rendered successfully!')
} catch (error) {
  console.error('❌ Error rendering app:', error)
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
      <h1 style="color: #ef4444; margin-bottom: 1rem;">Error Loading App</h1>
      <p style="margin-bottom: 1rem;">${error.message}</p>
      <pre style="background: #f3f4f6; padding: 1rem; border-radius: 8px; overflow: auto; font-size: 0.875rem;">${error.stack}</pre>
      <button 
        onclick="window.location.reload()"
        style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;"
      >
        Reload Page
      </button>
    </div>
  `
}
