export const SET_LIST = (state, list) => {
  state.list = list
}

export const SET_LIST_BY_PATIENT = (state, list) => {
  state.listByPacient = list
}

export const SET_LOADING = (state, flag) => {
  state.loading = flag
}

export const CLEAR_LIST_BY_PATIENTS = (state) => {
  state.listByPacient = []
}
