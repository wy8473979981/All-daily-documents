import baolRoutes from './baol/route_baol'
import menulist from './router-map'
// let menulist = JSON.parse(localStorage.getItem('spxt_menu'));
const dynamicRoutes = [
  ...baolRoutes,
];

const fixRoutes = (routes) => {
  return routes.filter(item => item.meta.visible).map(item => {
    const { component, children, ...rest } = item
    if (children && children.length > 0) {
      let fixedChildren = fixRoutes(children)
      if (menulist) {
        let fchildren = [];
        fixedChildren.forEach((e, i) => {
          var r = menulist.some(j => {
            return e.meta.title == j.menuName
          })
          if (r) {
            fchildren.push(e);
          }
        })
        return { children: fchildren, ...rest }
      } else {
        return { children: fixedChildren, ...rest }
      }
    } else {
      return rest;
    }
  })
}

let fixed = fixRoutes(dynamicRoutes)

fixed = fixed.filter(e => e.children)

// console.log(fixed,'fixed')

const routes = [
  {
    path: '*',
    redirect: fixed[0].redirect
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: "登录",
      visible: false
    }
  },
  ...dynamicRoutes
]
export {
  routes,
  fixed
}
