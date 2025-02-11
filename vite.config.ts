import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
// import {analyzer} from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1024
  },
  plugins: [preact()],
});
