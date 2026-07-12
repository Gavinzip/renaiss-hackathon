import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import { STATIC_ASSET_RELEASE } from './src/generated/staticAssetRelease.js';

function staticAssetBase(value) {
  const rawValue = String(value || '').trim().replace(/\/+$/, '');
  if (!rawValue) throw new Error('VITE_STATIC_ASSET_CDN_BASE_URL is required for production builds.');
  const url = new URL(rawValue);
  if (url.protocol !== 'https:') {
    throw new Error('VITE_STATIC_ASSET_CDN_BASE_URL must be an HTTPS asset origin.');
  }
  return rawValue;
}

export default defineConfig(({ command, mode }) => {
  const productionBuild = command === 'build';
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const cdnBase = productionBuild ? staticAssetBase(env.VITE_STATIC_ASSET_CDN_BASE_URL) : '';
  if (productionBuild && STATIC_ASSET_RELEASE === 'unpublished') {
    throw new Error('No immutable static asset release has been published. Run npm run assets:publish first.');
  }
  const assetOrigin = productionBuild ? `${cdnBase}/${STATIC_ASSET_RELEASE}` : '';

  return {
    publicDir: productionBuild ? false : 'public',
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
    plugins: [
      react(),
      {
        name: 'static-asset-cdn-html',
        transformIndexHtml(html) {
          return html.replaceAll('__STATIC_ASSET_ORIGIN__', assetOrigin);
        },
      },
    ],
  };
});
