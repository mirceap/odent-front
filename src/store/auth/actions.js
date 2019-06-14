import { http } from '../../boot/http'

export const wait = ({ commit, state }, { message, cancellable }) => {
  const { token } = state.credentials
  let calculatedMessage = message

  if (calculatedMessage === true || token === undefined) {
    calculatedMessage = 'auth.please_authenticate'
  } else if (typeof calculatedMessage === 'string' && calculatedMessage.length) {
    if (['Invalid token', 'Invalid token format', 'Invalid credentials', 'invalid_token'].includes(calculatedMessage)) {
      calculatedMessage = 'auth.authentication_expired'
    }
  } else {
    calculatedMessage = null
  }
  if (state.message !== calculatedMessage) {
    commit('SET_MESSAGE', { message: calculatedMessage })
  }
  if (state.cancellable !== cancellable) {
    commit('SET_CANCELLABLE', { cancellable })
  }

  if (!cancellable) {
    commit('SET_CREDENTIALS', {
      token: null,
      role: null,
      name: null,
      lang: 'en'
    })
  }

  return new Promise((resolve, reject) => {
    const handlerPopstate = () => reject(new Error('auth.cancelled'))
    if (process.env.CLIENT) {
      window.addEventListener('popstate', handlerPopstate)
    }

    const handlerAuth = () => {
      if (typeof state.message === 'string') {
        setTimeout(handlerAuth, 1000)
        return
      }
      if (process.env.CLIENT) {
        window.removeEventListener('popstate', handlerPopstate)
      }
      if (state.message !== null) {
        commit('SET_MESSAGE', { message: null })
      }
      if (state.credentials.token && token !== state.credentials.token) {
        resolve(http.defaults.headers.common.Authorization)
      } else {
        reject(new Error('auth.not_authenticated'))
      }
    }
    handlerAuth()
  })
    .catch((reason) => {
      if (cancellable) {
        return undefined
      }
      return Promise.reject(reason)
    })
}
