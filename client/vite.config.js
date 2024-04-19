import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react'
import path from 'path';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // use @ as the absolute directory path for src
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  }
});
