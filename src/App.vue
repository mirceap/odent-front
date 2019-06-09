<template>
  <div id="q-app">
    <login-form v-if="!loggedIn"/>
    <router-view v-if="loggedIn" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginForm from 'components/login-form'

export default {
  name: 'App',
  components: {
    LoginForm
  },
  watch: {
    loggedIn () {
      console.log(this.loggedIn)
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn'
    ])
  }
}
</script>

<style>
</style>
