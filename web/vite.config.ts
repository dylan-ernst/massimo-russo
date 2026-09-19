import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the built site under /<repo>/, while dev stays at the root.
  // Set VITE_BASE to '/' once the custom domain is pointed at it, since a domain serves from the root.
  // An unset repository variable arrives as an empty string, so || not ??
  base: command === 'build' ? process.env.VITE_BASE || '/massimo-russo/' : '/',
  server: {
    host: '127.0.0.1',
    // Dev preview reads the seed content and images from ../studio/seed
    fs: { allow: ['..'] },
  },
}))
