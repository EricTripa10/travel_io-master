import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Use the proxy to forward API requests
      '/api': {
        target: 'http://localhost:5000', // Change this if your API server is on a different port
        changeOrigin: true,
        rewrite: path => path // Keeps the original path intact
      },
    },
    host: '0.0.0.0',
    port: 3000

  },
  plugins: [react()],

})
