import { http } from '../../boot/http'
import { clone } from 'quasar'

export const fetch = ({ commit, state }) => {
  commit('SET_LOADING', true)
  return http
    .get('salaries')
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
  return http.delete(`/salaries/${encodeURIComponent(id)}`)
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
    .get(`/salaries/${encodeURIComponent(id)}`)
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
    .post('/salaries', item)
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
  return http
    .put(`/salaries/${encodeURIComponent(item.ID)}`, item)
    .then(() => dispatch('fetch'))
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}
