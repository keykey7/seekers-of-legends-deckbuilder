// preact/debug Must be the first import
if (import.meta.env.DEV) {
  // https://vitejs.dev/guide/env-and-mode.html
  import('preact/debug')
    .then(() => console.warn('preact devtools enabled'));
}

import { render } from 'preact'
import App from './App.tsx'
import './index.css'

render(<App />, document.getElementById('app')!)
