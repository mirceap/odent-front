export const language = (state) => ( // eslint-disable-line import/prefer-default-export
  state.languages.find((l) => l.value === state.language) || state.languages[0]
)
