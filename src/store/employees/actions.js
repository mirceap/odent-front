import { http } from '../../boot/http'

export const fetch = ({ commit, state }) => {
  commit('SET_LOADING', true)
  return http
    .get('employees')
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
  http.delete(`/employees/${encodeURIComponent(id)}`)
    .then(() => {
      dispatch('fetch')
    }).catch((rejection) => Promise.reject(rejection))
)
