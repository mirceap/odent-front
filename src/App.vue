<template>
  <div id="q-app">
    <login-form v-if="!loggedIn"/>
    <router-view v-if="loggedIn" />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import { mapGetters } from 'vuex'
import LoginForm from 'components/login-form'

export default {
  name: 'App',
  components: {
    LoginForm
  },
  watch: {
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn'
    ])
  },
  beforeCreate () {
    this.$store.dispatch('initState')
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.indexOf('route/') === 0) {
        return // eslint-disable-line
      }
      const saveState = {
        auth: state.auth,
        patients: state.patients,
        treatments: state.treatments,
        employees: state.employees,
        appointments: state.appointments
      }
      if (LocalStorage && LocalStorage.set) {
        LocalStorage.set('state', saveState)
      }
    })
  }
}
</script>

<style>
</style>
