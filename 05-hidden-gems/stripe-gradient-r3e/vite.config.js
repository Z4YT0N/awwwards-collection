import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    disabled: true
  },
  plugins: [
    glsl({
      compress: true,
      watch: true
    })
  ]
});
