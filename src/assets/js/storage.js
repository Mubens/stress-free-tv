function setLocal(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function getLocal(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function delLocl(key) {
  window.localStorage.removeItem(key)
}

function setSession(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

function getSession(key) {
  return JSON.parse(window.sessionStorage.getItem(key))
}

function delSession(key) {
  window.sessionStorage.removeItem(key)
}

module.exports = {
  setLocal,
  getLocal,
  delLocl,
  setSession,
  getSession,
  delSession
}
