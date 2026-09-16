import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Served from the root of Massimo's custom domain
  base: '/',
  server: {
    host: '127.0.0.1',
    // Dev preview reads the seed content and images from ../studio/seed
    fs: { allow: ['..'] },
  },
})
