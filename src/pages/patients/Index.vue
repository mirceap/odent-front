<template>
  <q-page class="flex flex-center">
    Patients
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'PatientsIndex',
  mixins: [
    CurrentUserMixin
  ],
  methods: {
    ...mapActions('patients', [
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
