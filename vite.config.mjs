import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/motion/') || id.includes('/node_modules/framer-motion/')) return 'motion';
          if (id.includes('/node_modules/@phosphor-icons/')) return 'icons';
          if (id.includes('/node_modules/ogl/')) return 'ogl';
          if (
            id.includes('/node_modules/react/')
            || id.includes('/node_modules/react-dom/')
            || id.includes('/node_modules/react-router/')
            || id.includes('/node_modules/react-router-dom/')
            || id.includes('/node_modules/scheduler/')
          ) return 'react-vendor';
          if (id.includes('/src/i18n/project-locales/')) return 'project-locales';
          if (id.includes('/src/i18n/locales/')) return 'interface-locales';
          return undefined;
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom/client', 'motion/react'],
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['terminal.local'],
    proxy: {
      '/api': 'http://127.0.0.1:4174',
      '/auth': 'http://127.0.0.1:4174',
    },
  },
});
