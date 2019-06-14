<template>
  <q-page class="flex flex-center">
    Employees
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'EmployeesIndex',
  mixins: [
    CurrentUserMixin
  ],
  methods: {
    ...mapActions('employees', [
      'fetch'
    ])
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    this.fetch()
  }
}
</script>
