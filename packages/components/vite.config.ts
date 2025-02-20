import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import unocss from 'unocss/vite'
import { presetWind } from '@unocss/preset-wind'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [presetWind()],
      theme: {
        fontFamily: {
          sans: [
            'Noto Sans SC',
            'system-ui',
            '-apple-system',
            'PingFang SC',
            'Microsoft YaHei',
            'sans-serif',
          ],
        },
      },
      rules: [
        [
          'resume-print',
          {
            '@media print': {
              'font-family':
                'SimSun, 宋体, Microsoft YaHei, 微软雅黑, serif !important',
              '-webkit-font-smoothing': 'initial',
              '-moz-osx-font-smoothing': 'initial',
              '-webkit-text-size-adjust': '100%',
              'text-rendering': 'geometricPrecision',
            },
          },
        ],
      ],
    }),
    dts(),
    react(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'cjs' ? 'js' : 'mjs'}`,
    },
    emptyOutDir: false,
    rollupOptions: {
      output: {
        banner: '"use client";',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css'
          return assetInfo.name!
        },
        inlineDynamicImports: false,
      },
      external: Object.keys(packageJson.dependencies),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
})
