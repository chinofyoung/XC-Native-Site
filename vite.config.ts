import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'

const base = '/XC-Native-Site/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        sharing: path.resolve(import.meta.dirname, 'sharing-shaders/index.html'),
        mac: path.resolve(import.meta.dirname, 'mac/index.html'),
        iphone: path.resolve(import.meta.dirname, 'iphone/index.html'),
        saves: path.resolve(import.meta.dirname, 'moving-saves/index.html'),
        fixes: path.resolve(import.meta.dirname, 'fixes/index.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    // vitest serves from '/', so give import.meta.env.BASE_URL the real base
    env: { BASE_URL: base },
  },
})
