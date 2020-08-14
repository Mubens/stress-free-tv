import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from

Vue.use(VueRouter)

const beforeEnter = (to, from, next) => {
  router.app.$options.store.commit('routeChange', to.name)
  next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    beforeEnter
  },
  {
    path: '/movie',
    name: 'Movie',
    component: () => import('../views/Movie'),
    beforeEnter
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game'),
    beforeEnter
  },
  {
    path: '/anime',
    name: 'Anime',
    component: () => import('../views/Anime'),
    beforeEnter
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/PlayHistory'),
    beforeEnter
  },
  {
    path: '/later',
    name: 'Later',
    component: () => import('../views/PlayLater'),
    beforeEnter
  },
  {
    path: '/subs',
    name: 'Subs',
    component: () => import('../views/Subscribe'),
    beforeEnter
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collection'),
    beforeEnter
  }
]

// function beforeEnter() {
//   return (to, from, next) => {
//     // 导航离开该组件的对应路由时调用
//     // 可以访问组件实例 `this`
//     console.log(to.name, from.name)
//     // this.$store.commit('routeChange')
//   }
// }

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to, from, next)
// })

export default router
