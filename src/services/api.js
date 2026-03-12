const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function buildHeaders(customHeaders = {}) {
  const token = localStorage.getItem('token')

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  }
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : null

  if (!response.ok) {
    const error = new Error(payload?.message || 'Error en la solicitud')
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}

export { API_URL }
