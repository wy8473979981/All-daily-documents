// Vue.config.js
var path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const timeStamp = new Date().getTime()
const AutoCodePlugin = require('./webpack/plugins/auto.code.plugin')

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // publicPath: './',
  // 输入路径
  outputDir: 'dist',
  // 放置生成静态资源
  assetsDir: 'static',
  // html 输出路径
  indexPath: 'index.html',
  // 文件名hash - 非vue-cli构建index.html 可以配置
  // filenameHashing: true,
  // 多页
  // pages: {},
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  // 是否在保存是检查代码
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack(config) {
    // config.devtool = process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'source-map'
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolve('src/components'),
      '@': resolve('src')
    }
    config.output = { // 输出重构  打包编译后的 文件名称  【模块名称.hash.时间戳】
      ...config.output,
      filename: `static/js/[name].[hash]${timeStamp}.js`,
      chunkFilename: `static/js/[name].[hash].${timeStamp}.js`
    }

    // 路由和组件自动化注册
    config.plugins.push( // 自动化编码补丁
      new AutoCodePlugin(
        [
          // {
          // /** ********* 路由自动化注册 ***********/
          // // 文件监听等级
          //   maxlevel: 1,
          //   // 监听./src/router/*下的文件夹
          //   inPath: resolve('src/views'),
          //   // 自动在./src/router/目录下生成index.js
          //   outPath: resolve('src/views/index.js'),
          //   // 模板
          //   // fileName: 文件夹名称
          //   // filePath: 文件夹路径
          //   templateEach: (fileName) => {
          //     return `${fileName}: () => import( /* webpackChunkName: "views/${fileName}" */"./${fileName}/StandingBook.vue"),`
          //   },
          //   /**
          //    * 输出模板
          //    * template: 模板名称
          //    * modules: 模板模块名称
          //    */
          //   out: (template) => {
          //     return `
          //         /* eslint-disable */
          //         /**
          //          * @author fhj
          //          * @desc 页面自动化注册
          //          * @important 此文件禁止手动修改！
          //          */
          //         // 路由配置
          //         import Layout from '@/layout'
          //         const menusList = {
          //             ${template}
          //             Layout
          //         };
          //         export default menusList;
          //     `
          //   }
          // /** ********* 路由自动化注册 ***********/
          // },
          {
            /** ********* 组件自动化注册 ***********/
            // 文件监听等级
            maxlevel: 1,
            // 监听./src/router/*下的文件夹
            inPath: resolve('src/components'),
            // 自动在./src/router/目录下生成index.js
            outPath: resolve('src/components/index.js'),
            // 模板
            // fileName: 文件夹名称
            // filePath: 文件夹路径
            templateEach: (fileName) => {
              // chunk名称
              return `Vue.component('${fileName}', () => import(/* webpackChunkName: "components${fileName}" */ './${fileName}/index.vue'));`
            },
            /**
           * 输出模板
           * template: 模板名称
           * modules: 模板模块名称
           */
            out: (template) => {
              return `
                  /* eslint-disable */
                  /**
                   * @author fhj
                   * @desc 组件自动化注册
                   * @important 此文件禁止手动修改！
                   */
                  ${template}
                  
                  import Vue from 'vue'

              `
            },
            // 自动新建index入口文件
            addIndex: [{
              // 默认路由
              state: 'file',
              name: (fileName) => `${fileName}.vue`,
              template: (fileName) => {
                return `
                          <template>
                              <div>
                                  组件 ysn-${fileName}
                              </div>
                          </template>
                          <script>
                          export default {
                              name: 'ysn-${fileName}'
                          };
                          </script>
                      `
              }
            }
            ]
            /** ********* 组件自动化注册 ***********/
          }
        ]
      ))
  },
  // CSS配置
  css: {
    // 将组件内css提取到一个单独的css文件
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      scss: {
        data: `@import"~@/styles/variables.scss";`
      },
      postcss: {
        plugin: [
          require('autoprefixer')({
            remove: false
          })
        ]
      }
    }
  },
  devServer: {
    // open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    open: true,
    // 默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    host: '0.0.0.0',
    port: 8080,
    // hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    hot: true,
    https: false,
    hotOnly: false,
    proxy: {
      '/': {
        // 目标接口域名
        // target: 'https://pmstest-g.yueworld.cn/',
        target: 'http://yapi.yueworld.cn/',
        // false为http访问，true为https访问
        secure: false,
        // 是否跨域
        changeOrigin: true,
        pathRewrite: {
          // 重写接口
          '^/': '/'
        }
      }
    }
  },
  chainWebpack: function(config) {
    // {
    //   [
    //     {
    //       test: /\.less$/,
    //       loader: 'style-loader!css-loader!less-loader'
    //     }
    //   ]
    // }

    config.resolve.alias.set('@', resolve('./src'))
      .set('@images', resolve('./src/assets/images'))
      .set('@styles', resolve('./src/assets/styles'))
      .set('@views', resolve('./src/views'))
      .set('@comps', resolve('./src/components'))
      .set('@utils', resolve('./src/utils'))
      .set('@apis', resolve('./src/apis/apis'))
      .set('@mixins', resolve('./src/mixins'))
      .set('@bus', resolve('./src/bus/eventBus.js'))
      .set('@tpl', resolve('./src/template'))
      .set('@enums', resolve('./src/enums/index.js'))
      .set('@models', resolve('./src/api/models'))
      .set('@enum', resolve('./src/enum/index.js'))
    // when there are many pages, it will cause too many meaningless requests
    // 当前模式为development的时候，就算filenameHashing的值为true，打包出的js文件不带hash值(css文件仍然受该值控制)，通过下行代码给打包的文件增加hash及时间戳值
    config.output.filename(`assets/js/[name].[hash].${timeStamp}.js`).chunkFilename(`assets/js/[name].[hash].${timeStamp}.js`).end()
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
