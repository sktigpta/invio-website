import { readFileSync } from 'node:fs';
import process from 'node:process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
// VITE_APP_VERSION env (e.g. Vercel) wins when set; otherwise fall back to package.json.
const APP_VERSION = process.env.VITE_APP_VERSION || packageJson.version || '1.1.0';

const BACKEND_PORT =
  process.env.VITE_BACKEND_PORT ||
  process.env.BACKEND_PORT ||
  (process.platform === 'darwin' ? '3000' : '5000');
const API_PROXY_TARGET = process.env.VITE_API_URL || `http://localhost:${BACKEND_PORT}`;

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(APP_VERSION),
  },
  base: '/',
  server: {
    port: 7495,
    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('/react/')) {
              return 'react-vendor';
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }
          }
        },
      },
    },
  },
});
