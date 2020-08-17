import Vue from 'vue'
import Vuex from 'vuex'

import { getLocal, setLocal } from '../assets/js/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    narrowSide: getLocal('narrow-icon') || false
  },
  mutations: {
    toggleSidesWide(state) {
      state.narrowSide = !state.narrowSide
      setLocal('narrow-icon', state.narrowSide)
    }
  },
  actions: {},
  modules: {}
})
