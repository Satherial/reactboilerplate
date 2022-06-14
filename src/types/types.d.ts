type errorCallbackType = (error: string) => any
type hookSetterType = (token: string | null) => void
type authContextType = {
  setUser: hookSetterType
  setToken: hookSetterType
  setRefreshToken: hookSetterType
  token: string
  refreshToken: string
}
