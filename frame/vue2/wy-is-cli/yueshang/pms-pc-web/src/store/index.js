import Vue from 'vue';
import Vuex from 'vuex';

import base from './modules/base';
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    base,
  }
})
