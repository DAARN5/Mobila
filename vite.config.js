import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    base: '/Mobila/',

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

    root: 'src',

    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,

      rollupOptions: {
        // ✅ гарантированно найдётся при root: 'src'
        input: 'index.html',

        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});