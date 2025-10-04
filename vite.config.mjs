import { defineConfig } from 'vite';

// Vite dev server config
// - Opens directly to /html/index.html
// - Serves /js and /style from project root
export default defineConfig({
  server: {
    open: '/html/index.html',
    port: 5173,
    strictPort: true
  },
  preview: {
    open: '/html/index.html',
    port: 5173,
    strictPort: true
  }
});