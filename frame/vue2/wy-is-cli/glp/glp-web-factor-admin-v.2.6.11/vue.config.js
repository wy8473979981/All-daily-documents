// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/backend': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      },
      '/glp-fae': {
        target: process.env.VUE_APP_FAE_URL,
        changeOrigin: true
      },
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      },
      '/logout': {
        target: process.env.VUE_APP_GETWAY_URL,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/plugins/svg/src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/plugins/svg/src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })

    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE
        return args
      })
  }
}
