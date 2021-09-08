/*
 * @Author: fhj
 * @LastEditors: fhj
 */
import { asyncRoutes, constantRoutes, getMenusList, errorRoutes } from '@/router'
import { getMenus } from '@/api/user'
import { permissionMenu } from '@/settings'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      if (permissionMenu) {
        // 开启接口路由权限
        getMenus().then(e => {
          const menu = getMenusList(e.data).concat(errorRoutes)
          commit('SET_ROUTES', menu)
          resolve(menu)
        })
      } else {
        // 使用本地accessedRoutes中的权限
        const accessedRoutes = filterAsyncRoutes(asyncRoutes).concat(errorRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
