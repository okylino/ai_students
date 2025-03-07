/// <reference types="vite/client" />

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default defineConfig(({ mode }) => {
  const buildTime = new Date().getTime();
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
      target: 'esnext',
      assetsInlineLimit: 0, // // Prevent assets from being converted to base64, ensuring all assets are served as separate files,
      sourcemap: true, // Source map generation must be turned on,
    },
    plugins: [
      react(),
      svgr({ include: ['./src/assets/svgr/**/*.svg', './fishing_cat_src/assets/svgr/**/*.svg'] }),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        org: 'viewsonic-sss',
        project: 'classswift-fishing-cat-student-participant',
        sourcemaps: {
          filesToDeleteAfterUpload: ['build/assets/*.map'],
        },
      }),
    ],
    define: {
      _global: {},
      'import.meta.env.VITE_BUILD_DATE': buildTime,
    },
    resolve: {
      alias: {
        '@': path.resolve(dirname, 'src'),
        '@fishing_cat': path.resolve(dirname, 'fishing_cat_src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: true,
    },
  };
});
