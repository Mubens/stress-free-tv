function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getLocal(key) {
  const str = localStorage.getItem(key)
  return str === 'undefined' ? str : JSON.parse(str)
}

function delLocl(key) {
  localStorage.removeItem(key)
}

function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

function delSession(key) {
  sessionStorage.removeItem(key)
}

module.exports = {
  setLocal,
  getLocal,
  delLocl,
  setSession,
  getSession,
  delSession
}
