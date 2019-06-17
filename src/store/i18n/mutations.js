import { i18n } from '../../boot/i18n'

export const SET_LANGUAGE = (state, { value }) => { // eslint-disable-line import/prefer-default-export
  i18n.locale = value
  state.language = value
}
