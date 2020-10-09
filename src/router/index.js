import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// import Home from

Vue.use(VueRouter)

const MAIN_ROUTE = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('../views/Index/Movie')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Index/Game')
  },
  {
    path: '/anime',
    name: 'Anime',
    component: () => import('../views/Index/Anime')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/Index/PlayHistory')
  },
  {
    path: '/later',
    name: 'Later',
    component: () => import('../views/Index/PlayLater')
  },
  {
    path: '/subs',
    name: 'Subs',
    component: () => import('../views/Index/Subscribe')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Index/Collection')
  }
]

import Play from '../views/PlayPage'

const routes = [
  {
    path: '/',
    name: 'Anime',
    component: () => import('../views/Index/Anime')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: Play
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage'),
    meta: { title: '悠闲悠闲动漫网', keepAlive: true, notlogin: true },
    beforeEnter: (to, from, next) => {
      // console.log(store.getters.isLogin)
      if (store.getters.isLogin) {
        next({ path: from.path })
      } else {
        next()
      }
    }
  },
  {
    path: '/anime/index',
    name: 'Indexes',
    component: () => import('../views/IndexesPage')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if (!to.meta.notlogin) {
  //   next()
  // } else {
  //   next('/')
  // }
  next()
})

export default router
