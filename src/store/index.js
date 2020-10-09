import Vue from 'vue'
import Vuex from 'vuex'

import { getLocal, setLocal, delLocl } from '../assets/js/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getLocal('ease_token')?.token,
    user_id: getLocal('ease_token')?.id
  },
  getters: {
    isLogin(state) {
      return state.token == null ? false : true
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data.token
      state.user_id = data.id
      setLocal('ease_token', data)
    },
    delToken(state) {
      state.token = undefined
      state.user_id = undefined
      delLocl('ease_token')
    }
  },
  actions: {},
  modules: {}
})
