const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');

const resolve = dir => path.join(__dirname, dir);

const publicPath = process.env.VUE_BASE_PATH || '';
const name = '租赁首页';
const devPort = '8888';
const timeStamp = new Date().getTime()

module.exports = {
  outputDir: 'dist',
  publicPath,
  lintOnSave: true,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  productionSourceMap: false,
  devServer: {
    port: devPort,
    open: true,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/PowerDesk': {
        target: 'http://demo.powerlong.com',
        changeOrigin: true,
      },
      '/': {
        // target: 'http://pmstest.powerlong.com',
        target: 'http://pms.powerlong.com',
        // target: 'http://192.168.120.114:8081', // 王锦涛 Sky Wang
        // target: 'http://172.16.12.71:8082', // 徐常硕
        changeOrigin: true
      },
      // [process.env.VUE_BASE_API]: {
      //   target: process.env.VUE_BASE_URL,
      //   changeOrigin: true
      // },
    }
  },

  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件 https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
      scss: {
        prependData: `@import"~@/assets/style/variable.scss";`
      }
    }
  },

  configureWebpack() {
    const plugins = []
    plugins.push(new LodashModuleReplacementPlugin())
    plugins.push(new WebpackMd5Hash())

    return {
      plugins,
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: { // 别名
          '@': resolve('src'),
          components: resolve('src/components'),
          common: resolve('src/common'),
          directive: resolve('src/directive'),
          utils: resolve('src/utils'),
          api: resolve('src/api'),
          interfaces: resolve('src/interfaces'),
          assets: resolve('src/assets'),
          views: resolve('src/views'),
          'OpeningRate': resolve('src/views/OpeningRate'),
        }
      },
      output: {
        filename: `js/[name].[hash]${timeStamp}.js`,
        chunkFilename: `js/[name].[hash].${timeStamp}.js`
      }
    }
  },

  chainWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
    config
      .plugin('html')
      .tap(args => {
        args[0].title= name
        return args
      })

    // 把图片传给组件 <avatar img-src="./assets/default-avatar.png"></avatar>
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return {
          ...options
          // transformAssetUrls: {
          //   avatar: ['img-src']
          // }
        }
      })

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all'
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
