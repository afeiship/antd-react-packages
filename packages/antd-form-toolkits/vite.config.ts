import { defineConfig } from 'vite';
import { join } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// https://github.com/antfu/vite-plugin-pwa

export default defineConfig({
  root: 'public',
  base: '',
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  plugins: [react()]
});
