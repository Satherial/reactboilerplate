import { createContext, useContext, useState, useEffect } from 'react'
import { keys, retrieve, save } from '../services/storage'

const AuthContext = createContext(null) as any
export const useAuth = () => useContext(AuthContext) as any

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(retrieve(String(keys.token)) || null)
  const [refreshToken, setRefreshToken] = useState(
    retrieve(String(keys.refreshToken)) || null,
  )
  const [user, setUser] = useState(retrieve(String(keys.user)) || null)

  useEffect(() => {
    save(String(keys.token), token)
  }, [token])

  useEffect(() => {
    save(String(keys.refreshToken), refreshToken)
  }, [refreshToken])

  useEffect(() => {
    save(String(keys.user), user)
  }, [user])

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}
