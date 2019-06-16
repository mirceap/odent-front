import { http } from '../../boot/http'
import { clone } from 'quasar'

export const fetch = ({ commit, state }) => {
  commit('SET_LOADING', true)
  return http
    .get('patients')
    .then((response) => {
      const list = response.data
      commit('SET_LIST', list)
      commit('SET_LOADING', false)
      return list
    })
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}

export const remove = ({ dispatch }, { id }) => (
  http.delete(`/patients/${encodeURIComponent(id)}`)
    .then(() => {
      dispatch('fetch')
    }).catch((rejection) => Promise.reject(rejection))
)

export const getItem = (_, { id }) => http
  .get(`/patients/${encodeURIComponent(id)}`)
  .then((response) => {
    const item = clone(response.data)
    return Promise.resolve({ item })
  })
  .catch((rejection) => Promise.reject(rejection))

export const add = ({ dispatch }, { item }) => http
  .post('/patients', item)
  .then((response) => {
    return dispatch('fetch')
  })

export const edit = ({ dispatch }, { item }) => http
  .post('/patients', item)
  .then(() => dispatch('fetch'))
