import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
  optimizeDeps: {
    include: ['react-icons/ci', 'react-icons/md'],
  },
  server: {
    cors: {
      origin: '*',
    },
  },
  legacy: {
    skipWebSocketTokenCheck: true,
  },
})