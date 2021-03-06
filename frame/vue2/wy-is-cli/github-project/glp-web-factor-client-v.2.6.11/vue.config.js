// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/clientend': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      },
      '/apiCdc/': {
        target: 'http://172.16.6.124:8098',
        changeOrigin: true,
        pathRewrite: {
          '^/apiCdc': '/ext-gateway/forward/glpcdc/glp-cdc-server/'
        }
      },
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      },
      '/electron-bill-server': {
        target: process.env.VUE_APP_API_LOAD,
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
