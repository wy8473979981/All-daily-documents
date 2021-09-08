import Vue from 'vue';
import Vuex from 'vuex';

import base from './modules/base';
import rentalPlatform from './modules/rentalPlatform';
import getters from './getters';

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    base,
    rentalPlatform,
  }
})
