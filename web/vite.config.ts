import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site under /<repo>/. Set VITE_BASE to '/' once the
  // custom domain is pointed at it, since a domain serves from the root.
  base: process.env.VITE_BASE ?? '/massimo-russo/',
  server: {
    host: '127.0.0.1',
    // Dev preview reads the seed content and images from ../studio/seed
    fs: { allow: ['..'] },
  },
})
