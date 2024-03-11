import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import rawLoaderPlugin from "vite-raw-plugin"
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 12800
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    vueJsx(),
  ],
  // assetsInclude: ["./src/assets/**.json"],
  build: {
    outDir: path.join(__dirname, "../out/vue-table")
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
