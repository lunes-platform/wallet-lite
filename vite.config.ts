import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // CRITICAL: Use relative paths for Chrome extension compatibility
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    // Ensure assets use relative paths
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      // Polyfills for crypto libraries like bip39
      'buffer': 'buffer',
      'stream': 'stream-browserify',
      'crypto': 'crypto-browserify',
    },
  },
  define: {
    // Required for bip39 and other crypto libraries
    'global': 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});
