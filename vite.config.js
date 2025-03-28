import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vitePluginCesium from 'vite-plugin-cesium'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitePluginCesium({
            rebuildCesium: false
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
