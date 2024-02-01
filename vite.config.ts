/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-02-01 22:46:28
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-02-02 00:13:47
 * @Description : vite 配置文件
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ include: './src' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      e: fileURLToPath(new URL('./examples', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'petit',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          // 不用打包成 .es.js, 这里我们想把它打包成.js
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
})
