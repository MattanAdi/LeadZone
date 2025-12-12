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
  console.log('🔄 Attempting to render app...')
  
  // Remove loading screen immediately
  const loadingScreen = rootElement.querySelector('.loading-screen')
  if (loadingScreen) {
    console.log('🗑️ Removing loading screen...')
    rootElement.innerHTML = ''
  }
  
  console.log('⚛️ Creating React root...')
  const root = createRoot(rootElement)
  
  console.log('🎨 Rendering React app...')
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  )
  console.log('✅ App rendering initiated successfully')
} catch (error) {
  console.error('❌ Failed to render app:', error)
  console.error('❌ Error stack:', error.stack)
  
  // Show error message
  const errorHtml = `
    <div style="padding: 2rem; font-family: sans-serif; text-align: center; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9fafb;">
      <h1 style="color: #ef4444; margin-bottom: 1rem;">Failed to load application</h1>
      <p style="color: #6b7280; margin-bottom: 1rem;">${error.message || 'Unknown error occurred'}</p>
      <pre style="text-align: left; background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem; max-width: 800px; overflow: auto; font-size: 12px; white-space: pre-wrap;">
        ${error.stack || 'No stack trace available'}
      </pre>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
        Reload Page
      </button>
    </div>
  `
  
  try {
    rootElement.innerHTML = errorHtml
  } catch (innerError) {
    document.body.innerHTML = errorHtml
  }
}
