const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', '..', dir)
}

module.exports = {
  title: 'Glp Web 中文文档',
  description: 'reference of glp web.',
  base: '/glp-web/',
  dest: resolve('docs'),
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/zhangyinag/glp-web' },
    ],
    sidebar: {
      '/guide/': [
          {
            title: '指南',  
            collapsable: false, // 可选的, 默认值是 true,
            sidebarDepth: 2,    // 可选的, 默认值是 1
            children: [
              '',
              'quickstart',
              'structure'
            ]
          }
      ]
    }
  }
}