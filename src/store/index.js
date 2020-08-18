import Vue from 'vue'
import Vuex from 'vuex'

import { getLocal, setLocal } from '../assets/js/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    narrowSide: getLocal('narrow-icon') || false,
    hideSide: false
  },
  mutations: {
    toggleSidesWide(state, val) {
      if (val) {
        state.narrowSide = val
      } else {
        state.narrowSide = !state.narrowSide
        setLocal('narrow-icon', state.narrowSide)
      }
    },
    toggleSide(state, val) {
      state.hideSide = val
    }
  },
  actions: {},
  modules: {}
})
