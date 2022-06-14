import axios from 'axios'
import dayjs from 'dayjs'
import { logout } from './auth'
import { retrieve, keys, save } from './storage'

export const URLS = {
  //https://www.thecocktaildb.com/api.php
  SEARCH: '/api/json/v1/1/search.php?f=',
  //application server
  LOGIN: `/${process.env.REACT_APP_AUTH_API_VERSION}/auth/login`,
  LOGOUT: `/${process.env.REACT_APP_AUTH_API_VERSION}/auth/logout`,
  FORGOT_PASSWORD: `/${process.env.REACT_APP_AUTH_API_VERSION}/auth/forgot-password`,
  RESET_PASSWORD: `/${process.env.REACT_APP_AUTH_API_VERSION}/auth/reset-password`,
  REFRESH_TOKENS: `/${process.env.REACT_APP_AUTH_API_VERSION}/auth/refresh-tokens`,
  USERS: `/${process.env.REACT_APP_USERS_API_VERSION}/users`,
}

async function refreshTokens({
  refreshToken,
  setToken,
  setRefreshToken,
}: {
  setToken: hookSetterType
  setRefreshToken: hookSetterType
  refreshToken: string
}) {
  const response = await axios.post(
    `${process.env.REACT_APP_AUTH_DOMAIN}/${process.env.REFRESH_TOKENS}`,
    {
      refreshToken,
    },
  )

  if (!response?.data) {
    throw new Error('Unkown error')
  }

  const { tokens } = response?.data

  setToken(tokens.access.token)
  setRefreshToken(tokens.refresh.token)

  save(String(keys.expirationToken), tokens.access.expires)
  save(String(keys.expirationRefreshToken), tokens.refresh.expires)

  return tokens.access.token
}

async function checkTokens(context: authContextType) {
  const expirationRefreshToken = retrieve(String(keys.expirationRefreshToken))
  const expirationToken = retrieve(String(keys.expirationToken))

  if (expirationToken) {
    const isAccessTokenExpired = dayjs(expirationToken).isAfter(dayjs())

    if (isAccessTokenExpired) {
      const isRefreshTokenExpired = dayjs(expirationRefreshToken).isAfter(
        dayjs(),
      )

      if (isRefreshTokenExpired) {
        logout({
          setToken: context.setToken,
          setUser: context.setUser,
        })
        throw new Error('Session expired. Please login again.')
      }

      return await refreshTokens({
        refreshToken: context.refreshToken,
        setToken: context.setToken,
        setRefreshToken: context.setRefreshToken,
      })
    }
  }

  return context?.token
}

function handleErrors(errorCallback: errorCallbackType, e: any) {
  console.error(e)
  if (errorCallback) {
    errorCallback(e?.response?.data?.message || e?.message || 'Uknown error')
  }
  return null
}

function getAxiosConfig(token?: string) {
  return token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : undefined
}

async function getToken(isAuthenticated?: boolean, context?: authContextType) {
  let token = context?.token
  if (isAuthenticated && context) {
    return await checkTokens(context)
  }

  return token
}

export async function post({
  url,
  body,
  errorCallback,
  context,
  isAuthenticated,
}: {
  url: string
  body: any
  errorCallback: errorCallbackType
  context?: authContextType
  isAuthenticated?: boolean
}) {
  try {
    const token = await getToken(isAuthenticated, context)

    return (await axios.post(url, body, getAxiosConfig(token))) as any
  } catch (e: any) {
    return handleErrors(errorCallback, e)
  }
}

export async function patch({
  url,
  id,
  body,
  errorCallback,
  context,
  isAuthenticated,
}: {
  url: string
  id: string
  body: any
  errorCallback: errorCallbackType
  context?: authContextType
  isAuthenticated?: boolean
}) {
  try {
    const token = await getToken(isAuthenticated, context)

    return (await axios.patch(
      `${url}/${id}`,
      body,
      getAxiosConfig(token),
    )) as any
  } catch (e: any) {
    return handleErrors(errorCallback, e)
  }
}

export async function get({
  url,
  errorCallback,
  context,
  isAuthenticated,
}: {
  url: string
  errorCallback: errorCallbackType
  context?: authContextType
  isAuthenticated?: boolean
}) {
  try {
    const token = await getToken(isAuthenticated, context)

    return (await axios.get(url, getAxiosConfig(token))) as any
  } catch (e: any) {
    return handleErrors(errorCallback, e)
  }
}
