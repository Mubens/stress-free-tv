import Vue from 'vue'
import Vuex from 'vuex'

import { getLocal, setLocal } from '../assets/js/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 左侧边栏是否要缩略
    narrowNav: getLocal('narrow-icon') || false,
    // 是否完全隐藏左侧边栏
    hideNav: false,
    // 登录状态
    isLogin: false
  },
  mutations: {
    toggleNavNarrow(state, val) {
      if (val) {
        state.narrowNav = val
      } else {
        state.narrowNav = !state.narrowNav
        setLocal('narrow-icon', state.narrowNav)
      }
    },
    toggleNavHide(state, val) {
      state.hideNav = val
    }
  },
  actions: {},
  modules: {}
})
