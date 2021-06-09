const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const timeStamp = new Date().getTime()
module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */

  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: "dist",
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "0.0.0.0",
    port: 9000,
    https: false,
    hotOnly: true,
    /* 使用代理 */
    proxy: {
      "/": {
        /* 目标代理服务器地址 */
        // target: "http://127.0.0.1/", // 测试地址
        // target: "http://192.168.120.68:8088/", // 高敬尧本地
        // target: "http://10.10.132.128:8088/", // 高敬尧宝龙本地
        // target: "http://10.10.10.175:8088/", // 测试服务器
        target: "https://resdemoapi.powerlong.com/", // 测试服务器
        /* 允许跨域 */
        changeOrigin: true,
        ws: false
      }
    }
  },
  chainWebpack:(config)=>{
	  config.resolve.symlinks(true) // 配置热刷新
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('@pages',resolve('./src/pages'))
    .set('@components',resolve('./src/components'))
    .set('@img',resolve('./static/img'))
    .set('@images',resolve('./src/assets/images'))
    // 当前模式为development的时候，就算filenameHashing的值为true，打包出的js文件不带hash值(css文件仍然受该值控制)，通过下行代码给打包的文件增加hash及时间戳值
    config.output.filename(`assets/js/[name].[hash].${timeStamp}.js`).chunkFilename(`assets/js/[name].[hash].${timeStamp}.js`).end()
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // prependData: `
        //           @import "~@//assets/style/baseColor.scss";
        // `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 预编译 + 运行时，适用于 dev 环境
      }
    },
    // 输出重构打包编译后的文件名称【模块名称.hash值.版本号.js】
    output: {
      filename: `js/[name].[hash]${timeStamp}.js`,
      chunkFilename: `js/[name].[hash].${timeStamp}.js`
    }
  },
  runtimeCompiler: true
};
