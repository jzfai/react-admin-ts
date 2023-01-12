import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import mkcert from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
//mock
import { viteMockServe } from 'vite-plugin-mock'
// import settings from './src/settings'
const prodMock = false
export default ({ command }) => {
  return {
    base: "./",
    define: {
      GLOBAL_STRING: JSON.stringify('i am global var from vite.config.js define'),
      GLOBAL_VAR: {
        test: 'i am global var from vite.config.js define'
      }
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 5005, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      host: true,
      https: false
    },
    preview: {
      port: 5006,
      host: true,
      strictPort: true
    },
    plugins: [
      reactRefresh(),
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      mkcert(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/icons/common'), resolve(process.cwd(), 'src/icons/nav-bar')],
        symbolId: 'icon-[dir]-[name]'
      }),
      //https://blog.csdn.net/weixin_42067720/article/details/115579817
      viteMockServe({
        supportTs: false,
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true
      }),
      Components({
        dirs: ['src/components', 'src/icons'],
        extensions: ['ts','js'],
        deep: true,
        dts: './typings/components.d.ts'
      }),
      AutoImport({
        imports: [
          'react'
        ],
        //配置后会自动扫描目录下的文件
        dirs: ['src/api/**'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './eslintrc/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: './typings/auto-imports.d.ts'
      })
    ],

    build: {
      // minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 5000,
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },

    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.mjs']
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    }
  }
}
