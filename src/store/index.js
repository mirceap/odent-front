import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import global from './global'
import appointments from './appointments'
import dashboard from './dashboard'
import employees from './employees'
import patients from './patients'
import settings from './settings'
import treatments from './treatments'
import roles from './roles'
import salaries from './salaries'
import i18n from './i18n'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    ...global,
    modules: {
      auth,
      appointments,
      dashboard,
      employees,
      patients,
      settings,
      treatments,
      roles,
      salaries,
      i18n
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
