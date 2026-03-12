export function getToken() {
  return localStorage.getItem('token')
}

export function getUser() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function hasSession() {
  return Boolean(getToken())
}

export function setSession({ token, user }) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user || {}))
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
