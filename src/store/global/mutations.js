import { LocalStorage, extend } from 'quasar'

export const INIT_STATE = (state) => {
  if (!LocalStorage || !LocalStorage.has || !LocalStorage.has('state')) {
    return // eslint-disable-line
  }
  const storedState = LocalStorage.getItem('state')
  extend(true, state, storedState)
}
