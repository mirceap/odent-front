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
    .get(`/patients/${encodeURIComponent(id)}`)
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
  item.Image_ID = 1
  return http
    .post('/patients', item)
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
  const id = item.ID
  delete item.ID
  delete item.createdAt
  delete item.updatedAt
  delete item.Role_ID
  return http
    .put(`/patients/${encodeURIComponent(id)}`, item)
    .then(() => dispatch('fetch'))
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}
