import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
// import {analyzer} from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
});
