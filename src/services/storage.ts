export enum keys {
  token,
  refreshToken,
  expirationToken,
  expirationRefreshToken,
  user,
}

export function save(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

export function retrieve(key: string) {
  try {
    const json = localStorage.getItem(key)
    return typeof json === 'string' ? JSON.parse(json) : null
  } catch (e) {
    console.log(e)
  }
}

export function clear(key: string) {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.log(e)
  }
}

export function clearAll() {
  try {
    localStorage.clear()
  } catch (e) {
    console.log(e)
  }
}
