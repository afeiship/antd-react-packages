import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
// https://github.com/antfu/vite-plugin-pwa

export default defineConfig({
  root: 'public',
  base: '',
  server:{
    port: 3210
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  plugins: [reactRefresh()]
});
