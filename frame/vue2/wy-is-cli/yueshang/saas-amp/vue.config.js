// Vue.config.js
var path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
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
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        // snapsvg: 'snapsvg/dist/snap.svg.js'
        '@components': resolve('src/components')
      }
    }
    // module: {
    //   rules: [
    //     {
    //       test: require.resolve('snapsvg/dist/snap.svg.js'),
    //       use: 'imports-loader?this=>window,fix=>module.exports=0',
    //     }
    //   ]
    // }
  },
  // CSS配置
  css: {
    // 将组件内css提取到一个单独的css文件
    extract: true,
    sourceMap: false,
    loaderOptions: {
      css: {}
    },
    modules: false
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
        // target: 'http://192.168.121.229:8889/',
        // target: 'http://192.168.120.150:8889/',//赵士国
        // target: 'http://192.168.121.229:803/', // 华发
        // target: 'http://192.168.121.229:801/', // 宝龙old
        target: 'http://192.168.121.229:801/ampsaas_bl/', // 宝龙new
        // target: 'http://192.168.120.162/ampsaas/', // 春川
        // target: 'http://ampsaas-bl.test/index.php/', // 傲强
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
  chainWebpack: function (config) {
    config.resolve.alias.set('@', resolve('./src')).set('@images', resolve('./src/assets/images'))
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
