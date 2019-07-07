import { http } from '../../boot/http'
import { clone, date } from 'quasar'

export const fetch = ({ commit, state }) => {
  commit('SET_LOADING', true)
  return http
    .get('appointments')
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
    .get(`/appointments/${encodeURIComponent(id)}`)
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
  delete item.Image_ID
  item.Status_ID = 2
  delete item.ActualStartDate
  delete item.ActualEndDate
  item.EndDate = date.formatDate((new Date(item.StartDate).getTime() + 3600000), 'YYYY-MM-DD HH:mm')
  delete item.PatientRating
  delete item.DoctorRating
  delete item.NextVisit
  delete item.Doctor_ID
  return http
    .post('/appointments', item)
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
    .put(`/appointments/${encodeURIComponent(item.ID)}`, item)
    .then(() => dispatch('fetch'))
    .catch((rejection) => {
      commit('SET_LOADING', false)
      return Promise.reject(rejection)
    })
}
