import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { resolve, join } from 'path'

export default defineConfig({
  build: {
    target: 'modules',
    outDir: './dist'
  },
  base: './',
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
    }
  },
  plugins: [react()],
  css: {
    postcss:{
      plugins: [
        autoprefixer(),
        tailwindcss()
      ]
    }
  },
  server: {
    port: 3002
  }
})