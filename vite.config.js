import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, port: 5176 ,
    fs: {
      strict: false
    },
    proxy: {
      '/api': {
        target: 'http://192.168.10.154:3010',
        changeOrigin: true
      }
    }
  }
})