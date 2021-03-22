// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('./src'))
      .set('@comps', resolve('./src/components'))

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
