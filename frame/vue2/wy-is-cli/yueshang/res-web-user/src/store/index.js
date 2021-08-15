import Vue from 'vue'
import Vuex from 'vuex'
import state from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()]
})

// if (module.hot) {
//   module.hot.accept([
//     './state/state',
//     './getters/getters',
//     './mutations/mutations',
//     './actions/actions'
//   ], () => {
//     const newState = require('./state/state').default
//     const newMutations = require('./mutations/mutations').default
//     const newActions = require('./actions/actions').default
//     const newGetters = require('./getters/getters').default

//     console.log(newState, '---new state')
//     console.log(newMutations, '---newMutations')
//     console.log(newActions, '---newActions')
//     console.log(newGetters, '---newGetters')
//     store.hotUpdate({
//       state: newState,
//       mutations: newMutations,
//       actions: newActions,
//       getters: newGetters
//     })
//   })
// }

export default store
