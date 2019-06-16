import { http } from '../../boot/http'
import { clone } from 'quasar'

export const fetch = ({ commit, state }) => {
  commit('SET_LOADING', true)
  return http
    .get('treatments')
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
  http.delete(`/treatments/${encodeURIComponent(id)}`)
    .then(() => {
      dispatch('fetch')
    }).catch((rejection) => Promise.reject(rejection))
)

export const getItem = (_, { id }) => http
  .get(`/treatments/${encodeURIComponent(id)}`)
  .then((response) => {
    const item = clone(response.data)
    return Promise.resolve({ item })
  })
  .catch((rejection) => Promise.reject(rejection))

export const add = ({ dispatch }, { item }) => http
  .post('/treatments', item)
  .then((response) => {
    return dispatch('fetch')
  })

export const edit = ({ dispatch }, { item }) => http
  .post('/treatments', item)
  .then(() => dispatch('fetch'))
