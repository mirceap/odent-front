import http, { CancelToken, isCancel } from 'axios'
import { Notify } from 'quasar'
import { i18n } from '../boot/i18n'

const retrySchedule = [5000, 10000, 15000, 30000]
const retryScheduleLength = retrySchedule.length
const baseURL = process.env.API

const getRejectionMessage = (rejection, fallback = 'http.an_unknown_error_occured') => {
  if (isCancel(rejection)) {
    return 'http.request_cancelled'
  }
  if (typeof rejection === 'string') {
    return rejection
  }
  if (rejection.response) {
    if (rejection.response.data) {
      return rejection.response.data.Message ||
        rejection.response.data.message ||
        rejection.response.data.error_description ||
        rejection.response.data.error ||
        rejection.response.data.errorMessage ||
        fallback
    }
    return rejection.response.statusText || rejection.response.status || fallback
  }
  return rejection.message || fallback
}

const showRejectionMessage = (rejection, fallback = 'http.an_unknown_error_occured', type = 'negative', position = 'bottom-right') => {
  if (isCancel(rejection)) {
    return true
  }
  return Notify.create({
    type,
    position,
    message: i18n.t(getRejectionMessage(rejection, fallback))
  })
}

export {
  isCancel,
  http,
  showRejectionMessage,
  getRejectionMessage,
  CancelToken,
  baseURL
}

export default ({ Vue, store }) => {
  // API Backend
  http.defaults.baseURL = baseURL
  http.defaults.timeout = 0
  http.defaults.headers.post['Content-Type'] = 'application/json'
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error ? error.config : null
      if (originalRequest && !isCancel(error)) {
        if (!originalRequest.noRetry && (!error.response || [429, 503].includes(error.response.status))) {
          originalRequest.headers['retryCount'] = (originalRequest.headers['retryCount'] || 0) + 1
          const isLastRetry = originalRequest.headers['retryCount'] >= retryScheduleLength
          const defaultRetryAfter = isLastRetry ? retrySchedule[retryScheduleLength - 1] : retrySchedule[originalRequest.headers['retryCount'] - 1]
          const retryAfter = error.response ? error.response.headers['Retry-After'] || defaultRetryAfter : defaultRetryAfter
          return new Promise((resolve, reject) => {
            let cancel = isLastRetry
            Notify.create({
              type: 'negative',
              message: isLastRetry ? i18n.t('http.connection_problem') : i18n.t('http.connection_problem_retry', { sec: retryAfter / 1000 }),
              timeout: retryAfter,
              position: 'bottom-right',
              actions: [{
                label: isLastRetry ? i18n.t('http.retry') : i18n.t('http.cancel'),
                handler: () => {
                  cancel = !cancel
                }
              }],
              onDismiss: () => {
                if (cancel) {
                  return reject(error || 'http.cannot_connect_to_server')
                }
                return http(originalRequest)
                  .then(resolve)
                  .catch(reject)
              }
            })
          })
        }
        if (error && error.response && error.response.status === 401 && (!originalRequest || !originalRequest.noAuthRetry)) {
          return store
            .dispatch('auth/wait', {
              message: error.response.data.message === 'Invalid token format' ? true : error.response.data.message || error.response.data.error,
              cancellable: false
            })
            .catch(() => Promise.reject(error))
            .then((authorization) => {
              originalRequest.headers.Authorization = authorization
              return http(originalRequest)
            })
        }
      }

      return Promise.reject(error)
    }
  )
  http.interceptors.request.use(
    (config) => {
      config.headers['Cache-Control'] = 'no-cache'
      if (store.getters['auth/tokenAvailable']) {
        config.headers.Authorization = `Bearer ${store.getters['auth/tokenAvailable']}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  http.interceptors.request.use((config) => {
    const originalRequest = config
    if (store.state.auth.credentials.exp < (new Date()).getTime() / 1000) {
      return store.dispatch('auth/refreshToken').then((token) => {
        originalRequest.Authorization = `Bearer ${token}`
        return Promise.resolve(originalRequest)
      })
    }
    return config
  }, (error) => Promise.reject(error))
  Vue.prototype.$http = http
}
