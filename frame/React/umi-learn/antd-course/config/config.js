export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true
      }
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
      // { path: 'list', component: '../pages/list' }
      { path: 'list', component: 'list' }
    ]
  }],
}