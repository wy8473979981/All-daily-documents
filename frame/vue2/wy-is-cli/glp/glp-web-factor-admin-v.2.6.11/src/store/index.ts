import Vue from 'vue'
import Vuex from 'vuex'
import { namespace } from 'vuex-class'

import app from './modules/app'
import dictionary from './modules/dictionary'

Vue.use(Vuex)

export const AppModule = namespace('app')
export const DictionaryModule = namespace('dictionary')

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    app,
    dictionary
  },
  getters: {
  }
})
