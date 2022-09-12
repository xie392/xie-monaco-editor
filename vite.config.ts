import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import config from './src/utils/config';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: config.Port,
    open: false,
    https: false,
    strictPort: true,
    proxy: {
      '/api': {
        target: config.BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      // less: {
      //   javascriptEnabled: true
      // }
      scss: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    // 解决打包后刷新页面丢失状态的问题
    minify: "terser",
    assetsDir: 'static',
    sourcemap: false, //是否构建source map 文件
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  chainWebpack(config) {
    config.optimization.runtimeChunk('single'),
    {
      from: resolve(__dirname, './public/robots.txt'), //防爬虫文件
      to: '/'
    }
  }
})
