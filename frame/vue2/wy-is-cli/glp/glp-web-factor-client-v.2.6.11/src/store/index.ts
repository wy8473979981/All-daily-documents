import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { namespace } from 'vuex-class'

import app from './modules/app'
import dictionary from './modules/dictionary'
import plb from './modules/plb'

Vue.use(Vuex)

export const AppModule = namespace('app')
export const DictionaryModule = namespace('dictionary')
export const PlbModule = namespace('plb')
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    dictionary,
    plb
  }
  // plugins: [vuexLocal.plugin]
})
