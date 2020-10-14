import { Module } from 'vuex'

class DictionaryState {
  items: Record<string, any> = {}
}

const app: Module<DictionaryState, unknown> = {
  namespaced: true,
  state: new DictionaryState(),
  mutations: {
    setItems (state: DictionaryState, items: Record<string, any> = {}) {
      state.items = items
    }
  },
  getters: {
    options (state: DictionaryState): Record<string, Record<string, string>> {
      const ret: Record<string, Record<string, string>> = {}
      Object.entries(state.items).forEach(([k, v]) => {
        const map: Record<string, string> = {}
        const values: any[] = v?.values || []
        values.forEach(v => {
          map[v.key] = v.label
        })
        ret[k] = map
      })
      return ret
    }
  },
  actions: {}
}

export default app
