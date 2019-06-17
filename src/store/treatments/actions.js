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

export const remove = ({ dispatch, commit }, { id }) => {
  commit('SET_LOADING', true)
  return http.delete(`/treatments/${encodeURIComponent(id)}`)
    .then(() => {
      dispatch('fetch')
    }).catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}

export const getItem = ({ commit }, { id }) => {
  commit('SET_LOADING', true)
  return http
    .get(`/treatments/${encodeURIComponent(id)}`)
    .then((response) => {
      const item = clone(response.data)
      commit('SET_LOADING', false)
      return Promise.resolve({ item })
    })
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}

export const add = ({ dispatch, commit }, { item }) => {
  commit('SET_LOADING', true)
  return http
    .post('/treatments', item)
    .then((response) => {
      return dispatch('fetch')
    })
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}

export const edit = ({ dispatch, commit }, { item }) => {
  commit('SET_LOADING', true)
  let object = clone(item)
  const id = item.ID
  delete object.ID
  delete object.createdAt
  delete object.updatedAt
  return http
    .put(`/treatments/${encodeURIComponent(id)}`, object)
    .then(() => dispatch('fetch'))
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}
