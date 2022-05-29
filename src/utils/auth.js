import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_ihrm_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 主动介入token失效
const timeKey = 'hrsaas-timestamp-key'

export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}

export function removeTimeStamp() {
  Cookies.remove(timeKey)
}
