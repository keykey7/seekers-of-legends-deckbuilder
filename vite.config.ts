import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      // https://github.com/preactjs/signals/blob/main/packages/react/README.md#babel-transform
      plugins: [['module:@preact/signals-react-transform']],
    },
  })],
})
