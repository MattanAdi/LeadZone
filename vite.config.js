import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages hosts the app under /LeadZone, so adjust asset paths accordingly
const repoBasePath = '/LeadZone/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? repoBasePath : '/',
}))
