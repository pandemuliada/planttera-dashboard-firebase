import axios from 'axios'
import { getLocalStorage } from './helper'

const _apiHost = 'http://localhost:3000/'

const url = suffix => {
  return _apiHost + suffix
}

const api = () => {
  const instance = axios.create({
    baseURL: _apiHost,
  })

  return instance
}

const privateApi = () => {
  const authToken = getLocalStorage('token')

  const instance = axios.create({
    baseURL: _apiHost,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return instance
}

export { url, api, privateApi }
