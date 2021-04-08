import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import market from './modules/market'

import tableView from './modules/tableView'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    tableView,
    user,
    market
  },
  getters
})

export default store
