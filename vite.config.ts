import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import pluginVueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports as autoImportRouter } from 'unplugin-vue-router'
import pluginImport from 'unplugin-auto-import/vite'
import pluginComponent from 'unplugin-vue-components/vite'
import pluginUnocss from 'unocss/vite'

export default defineConfig((config) => {
  console.debug('[vite] defineConfig - config:', config)

  const defineBuild = {
    // 'console.debug': '(() => {})',
    'process.env.NODE_ENV': '"production"',
  }

  return {
    root: fileURLToPath(new URL('core', import.meta.url)),
    define: {
      ...(config.command === 'build' ? defineBuild : {}),
    },
    build: {
      minify: false,
      lib: {
        entry: 'main.ts',
        name: 'userscript',
        formats: ['iife'],
        fileName: () => 'index.js',
      },
      outDir: fileURLToPath(new URL('dist', import.meta.url)),
      emptyOutDir: true,
      rollupOptions: {
        // external: ['vue', 'vue-router', 'naive-ui'],
        // output: {
        //   globals: {
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'naive-ui': 'naive', // naive-ui
        //   },
        // },
      },
    },
    plugins: [
      pluginVueRouter({
        routesFolder: [
          fileURLToPath(new URL('core/pages', import.meta.url)),
        ],
        exclude: ['**/*.component.vue'],
        dts: fileURLToPath(new URL('core/types/router.d.ts', import.meta.url)),
        logs: true,
      }),
      pluginVue({
        script: {
          defineModel: true,
        },
      }),
      pluginImport({
        dirs: ['components', 'composables', 'stores'],
        imports: [
          'vue',
          'pinia',
          autoImportRouter,
        ],
        vueTemplate: true,
        dts: fileURLToPath(new URL('core/types/import.d.ts', import.meta.url)),
      }),
      pluginComponent({
        dirs: ['components'],
        deep: true,
        version: 3,
        resolvers: [
          (ComponentName) => {
            console.debug(ComponentName)
            // if (ComponentName === 'RouterView')
            //   return { name: ComponentName, from: 'vue-router/auto' }
          },
        ],
        dts: fileURLToPath(new URL('core/types/component.d.ts', import.meta.url)),
      }),
      pluginUnocss(),
    ],
  }
})
