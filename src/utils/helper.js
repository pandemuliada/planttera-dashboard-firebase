export function setLocalStorage(name, value) {
  return localStorage.setItem(name, value)
}

export function getLocalStorage(name) {
  return localStorage.getItem(name)
}

export function removeLocalStorage(name) {
  return localStorage.removeItem(name)
}
