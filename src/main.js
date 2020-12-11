import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/icomoon.css'
import '@/directive/index'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://localhost:3000/img/img_loading.png',
  loading: 'http://localhost:3000/img/img_loading.png',
  attempt: 1
})

import axios from 'axios'
axios.interceptors.request.use((config) => {
  config.headers.common['Authorization'] = 'Bearer ' + store.state.token
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
