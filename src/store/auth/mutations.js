export const SET_MOCKUP = (state, role) => {
  state.credentials = {
    role: role,
    token: 'fake',
    name: role
  }
}

export const CLEAR_CREDENTIALS = (state) => {
  state.credentials = {
    role: null,
    token: null,
    name: null
  }
}
