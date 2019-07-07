import { LocalStorage, extend } from 'quasar'
import { http } from '../../boot/http'

export const INIT_STATE = (state) => {
  if (!LocalStorage || !LocalStorage.has || !LocalStorage.has('state')) {
    return // eslint-disable-line
  }
  const storedState = LocalStorage.getItem('state')
  extend(true, state, storedState)
  if (state && state.auth && state.auth.credentials && state.auth.credentials.token) {
    http.defaults.headers.common.Authorization = `${state.auth.credentials.token}`
  }
}
