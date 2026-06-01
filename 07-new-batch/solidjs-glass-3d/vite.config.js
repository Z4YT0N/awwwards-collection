import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    minify: 'esbuild'
  },
  server: {
    host: true,
    port: 3000,
    open: true
  }
})
