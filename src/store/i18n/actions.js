import { languages } from './state'

export const setLanguage = ({ commit }, { language }) => { // eslint-disable-line import/prefer-default-export
  const found = languages.find((l) => l.value === language) || languages[0]
  commit('SET_LANGUAGE', found)
}
