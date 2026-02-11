import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// base must match your GitHub repo name for GitHub Pages (e.g. /valentines-day-page/)
export default defineConfig({
  plugins: [react()],
  base: '/valentines-day-page/',
})

