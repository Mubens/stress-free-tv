import Vue from 'vue'
import VueRouter from 'vue-router'

import { requireUnLogin, setTitle } from './middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/IndexPage')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('../views/PlayPage')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage'),
    beforeEnter: requireUnLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage'),
    beforeEnter: requireUnLogin
  },
  {
    path: '/anime/index',
    name: 'Indexes',
    component: () => import('../views/IndexesPage'),
    meta: { title: '番剧索引 - 悠哉悠哉在线动漫网（*＾ワ＾*）' },
    beforeEnter: setTitle
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchPage')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryPage'),
    meta: { title: '历史记录 - 悠哉悠哉在线动漫网（*＾ワ＾*）' },
    beforeEnter: setTitle
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound')
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
