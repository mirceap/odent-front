export const SET_MOCKUP = (state, role) => {
  state.role = role
  state.token = 'fake'
  state.name = role
}

export const CLEAR_CREDENTIALS = (state) => {
  state.token = null
  state.name = null
  state.role = null
}
