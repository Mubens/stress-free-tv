import store from '../store'

export function requireUnLogin(to, from, next) {
  if (store.getters.isLogin) {
    next({ path: from.path })
  } else {
    next()
  }
}

export function requireLogin(to, from, next) {
  if (store.getters.isLogin) {
    next()
  } else {
    next({ path: from.path })
  }
}

export function setTitle(to, from, next) {
  document.title = to.meta.title
  next()
}
