import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from

Vue.use(VueRouter)

const MAIN_ROUTE = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index/Home')
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
    component: () => import('../views/Index/Anime'),
    children: [
      {
        path: '/player',
        component: () => import('../views/PlayerPage')
      }
    ]
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

const routes = [
  ...MAIN_ROUTE
  // {
  //   path: '/',
  //   component: () => import('../views/Index.vue'),
  //   children: [...MAIN_ROUTE]
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to, from, next)
// })

export default router
