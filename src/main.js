import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/fonts/style.css'

import { getLocal } from './assets/js/storage'

import axios from 'axios'
axios.interceptors.request.use((config) => {
  config.headers.common['Authorization'] = 'Bearer ' + store.state.token
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.directive('top-toast', {
  inserted(el, { value }) {
    el.style.position = 'relative'
    const parent = document.querySelector(`#${value}`).getBoundingClientRect()
    const child = el.children[0].getBoundingClientRect()

    if (child.right > parent.right) {
      el.children[0].style.left = `calc(50% - ${child.right - parent.right + 5}px)`
    } else if (child.left < parent.left) {
      el.children[0].style.left = `calc(50% + ${parent.left - child.left + 5}px)`
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
