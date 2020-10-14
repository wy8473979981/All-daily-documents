import { Module } from 'vuex'

class AppState {
  expand = true
  cached = process.env.VUE_APP_CACHED_MODE === 'Y' // 路由缓存模式
}

const app: Module<AppState, unknown> = {
  namespaced: true,
  state: new AppState(),
  mutations: {
    setExpand (state: AppState, expand: boolean) {
      state.expand = expand
    },
    setCached (state: AppState, cached: boolean) {
      state.cached = cached
    }
  },
  getters: {},
  actions: {}
}

export default app
