import { readFileSync } from 'node:fs'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const APP_VERSION = packageJson.version || '0.0.0'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-app-version',
      transformIndexHtml(html) {
        const placeholder = '__INVIO_APP_VERSION__'
        if (!html.includes(placeholder)) {
          // Placeholder not found in index.html — version injection is a no-op.
          // Add ${placeholder} to index.html where the version string is needed.
          return html
        }
        return html.replaceAll(placeholder, APP_VERSION)
      },
    },
  ],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(APP_VERSION),
  },
  base: '/',
  server: {
    port: 7495,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_PORT
          ? `http://localhost:${process.env.VITE_BACKEND_PORT}`
          : process.env.PORT
            ? `http://localhost:${process.env.PORT}`
            : 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 7495,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
