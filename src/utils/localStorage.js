export function readCollection(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

export function prependItem(key, item) {
  const previous = readCollection(key, [])
  const next = [item, ...previous]
  writeCollection(key, next)
  return next
}
