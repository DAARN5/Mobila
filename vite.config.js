import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'
import FullReload from 'vite-plugin-full-reload'
import SortCss from 'postcss-sort-media-queries'

export default defineConfig(({ command }) => {
  return {
    base: '/Mobila/',

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

    root: 'src',

    build: {
      outDir: '../dist',
      emptyOutDir: true,
      sourcemap: true,

      rollupOptions: {
        input: {
          main: './src/index.html'
        }
      }
    },

    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  }
})