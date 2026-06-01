import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glslify from 'rollup-plugin-glslify';

const isDev = process.env.NODE_ENV === 'development';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glslify({
    compress: !isDev
  })],
})
