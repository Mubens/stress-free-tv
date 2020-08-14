import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeName: 'Home'
  },
  mutations: {
    routeChange(state, name) {
      state.routeName = name
    }
  },
  actions: {},
  modules: {}
})
