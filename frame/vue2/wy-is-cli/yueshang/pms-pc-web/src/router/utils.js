const filterRouters = (routers) => {
  const list = []
  routers.forEach(parent => {
    parent.children.forEach(son => {
      const sonList = son.children.map(item => {
        return Object.assign(
          {},
          item,
          {
            parent: son.path
          }
        )
      })
      list.push(...sonList)
    })
  })

  return list
}


function getRouterList(routers) {
  const list = filterRouters(routers)
  return list.map(item => {
    return {
      path: `/${item.path}`,
      name: `${item.parent}-${item.name}`,
      component: () => import(`views/${item.parent}/${item.name}/index.vue`),
      meta: {
        title: item.title
      }
    }
  })
}

export default getRouterList;