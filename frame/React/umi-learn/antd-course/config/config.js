export default {
  plugins: [
    ['umi-plugin-react', {
      // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
      antd: true,
      dva: true,
    }],
  ],
  proxy: {
    '/api': {
      target: 'https://www.fastmock.site/mock/454f99ba2d1c6fd0b1ed79a1ad0132de/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        component: 'Helloworld',
      },
      {
        path: '/helloworld',
        component: 'Helloworld'
      },
      { path: 'puzzlecards', component: './puzzlecards' },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: 'Dashboard/Workplace' },
        ]
      },
    ]
  }],
}