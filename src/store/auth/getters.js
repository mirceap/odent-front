export const loggedIn = (state) => (state.credentials != null && state.credentials.token != null && state.credentials.name != null)
