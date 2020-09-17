import Vue from 'vue'
import VueRouter from 'vue-router'

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
    name: 'Home',
    component: () => import('../views/Index/Home')
  },
  ...MAIN_ROUTE,
  {
    path: '/play/:id',
    name: 'Play',
    component: Play
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
  // const isMain = ['Home', 'Movie', 'Game', 'Anime', 'History', 'Later', 'Subs', 'Collect'].includes(to.name)

  // if (!isMain) {
  //   router.app.$options.store.commit('toggleNavHide', true)
  //   router.app.$options.store.commit('toggleNavNarrow', true)
  // }
  next()
})

export default router
