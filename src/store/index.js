import Vue from 'vue'
import Vuex from 'vuex'

import { getLocal, setLocal, delLocl } from '../assets/js/storage'

const ease_token = getLocal('ease_token') || {}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ease_token?.token || '',
    user_id: ease_token?.id || '',
    user_face: 'http://localhost:3000/img/head/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp'
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data.token
      state.user_id = data.id
      setLocal('ease_token', data)
    },
    delToken(state) {
      state.token = ''
      state.user_id = ''
      delLocl('ease_token')
    }
  },
  actions: {},
  modules: {}
})
