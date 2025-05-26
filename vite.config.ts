/// <reference types="vitest" />

import type { DotenvParseOutput } from 'dotenv'
import type { CommonServerOptions, ConfigEnv } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import PiniaAutoRefs from 'pinia-auto-refs'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevtools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode.mode}`

  let server: CommonServerOptions = {}
  const envDate = fs.readFileSync(curEnvFileName)
  const envMap: DotenvParseOutput = dotenv.parse(envDate)

  server = {
    port: Number(envMap.VITE_PORT) || 9536,
    host: envMap.VITE_HOST || 'localhost',
    proxy: {
      [envMap.VITE_BASE_URI || '/api']: {
        target: envMap.VITE_PROXY_DOMAIN || 'localhost',
      },
    },
  }

  return {
    server,
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    plugins: [
    // https://github.com/vue-macros/vue-macros
      VueMacros({
        defineOptions: false,
        defineModels: false,
        plugins: {
          vue: Vue({
            script: {
              propsDestructure: true,
              defineModel: true,
            },
          }),
        },
      }),

      VueDevtools(),

      // https://github.com/posva/unplugin-vue-router
      VueRouter(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            alova: [
              'useRequest',
              'useWatcher',
              'useFetcher',
            ],
          },
          {
            '@/helper/pinia-auto-refs': ['useStore'],
            'vue-router/auto': ['useLink'],
          },
        ],
        // Enable auto import by filename for default module exports under directories
        defaultExportByFilename: false,

        resolvers: [
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver(),
        ],
        dirs: [
          './src/components',
          './src/store',
          './src/composables',
        ],
        vueTemplate: true,
        injectAtEnd: true,

      }),

      // https://github.com/Allen-1998/pinia-auto-refs
      PiniaAutoRefs(),

      // https://github.com/antfu/vite-plugin-components
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      UnoCSS(),
    ],
    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
