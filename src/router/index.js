import Vue from 'vue'
import VueRouter from 'vue-router'

import { requireUnLogin, setTitle } from './middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index-page')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('../views/play-page')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login-page'),
    beforeEnter: requireUnLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register-page'),
    beforeEnter: requireUnLogin
  },
  {
    path: '/anime/index',
    name: 'Indexes',
    component: () => import('../views/indexes-page'),
    meta: { title: '番剧索引 - 悠哉悠哉在线动漫网（*＾ワ＾*）' },
    beforeEnter: setTitle
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search-page')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/history-page'),
    meta: { title: '历史记录 - 悠哉悠哉在线动漫网（*＾ワ＾*）' },
    beforeEnter: setTitle
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404-page')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
