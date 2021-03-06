import { http } from '../../boot/http'

export const fetch = ({ commit }) => {
  commit('SET_LOADING', true)
  return http
    .get('dashboard')
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
