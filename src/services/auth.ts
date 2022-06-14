import { post, URLS } from './calls'
import { clearAll, keys, save } from './storage'

export function login({
  setToken,
  setUser,
  setRefreshToken,
  user,
  tokens,
}: {
  setToken: (token: string | null) => void
  setUser: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  user: any
  tokens: {
    access: {
      token: string
      expires: string
    }
    refresh: {
      token: string
      expires: string
    }
  }
}) {
  setToken(tokens.access.token)
  setRefreshToken(tokens.refresh.token)
  setUser(user)
  save(String(keys.expirationToken), tokens.access.expires)
  save(String(keys.expirationRefreshToken), tokens.refresh.expires)
}

export function logout({
  setToken,
  setUser,
  refreshToken,
}: {
  setToken: hookSetterType
  setUser: hookSetterType
  refreshToken?: string
}) {
  //if the refreshToken is expired we don't need to delete it
  if (refreshToken) {
    post({
      url: `${process.env.REACT_APP_AUTH_DOMAIN}${URLS.LOGOUT}`,
      body: {
        refreshToken,
      },
      errorCallback: alert,
    })
  }

  setToken(null)
  setUser(null)
  clearAll()
}
