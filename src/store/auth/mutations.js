export const CLEAR_CREDENTIALS = (state) => {
  state.credentials = {
    role: null,
    token: null,
    name: null,
    lang: 'en',
    id: null
  }
}

export const SET_MESSAGE = (state, { message }) => {
  state.message = message
}

export const SET_CANCELLABLE = (state, { cancellable }) => {
  state.cancellable = Boolean(cancellable)
}

export const SET_CREDENTIALS = (state, credentials) => {
  state.credentials = credentials
}
