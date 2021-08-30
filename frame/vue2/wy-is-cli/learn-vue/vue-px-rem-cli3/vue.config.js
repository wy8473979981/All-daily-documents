// Vue.config.js
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const timeStamp = new Date().getTime();
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
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,
  // 是否在保存是检查代码
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@components': resolve('src/components'),
      },
    },
    output: {
      filename: `static/js/[name].[hash]${timeStamp}.js`,
      chunkFilename: `static/js/[name].[hash].${timeStamp}.js`,
    },

  },
  // CSS配置
  css: {
    // 将组件内css提取到一个单独的css文件
    extract: true,
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // 新增内容
          require('autoprefixer')({}),
          require('postcss-px2rem')({ // 配置项，详见官方文档
            remUnit: 75, // 换算的基数
          }),
        ],
      },
    },
    modules: false,
  },

};
