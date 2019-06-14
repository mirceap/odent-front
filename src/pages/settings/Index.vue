<template>
  <q-page class="flex flex-center">
    Settings
  </q-page>
</template>

<style>
</style>

<script>
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'SettingsIndex',
  mixins: [
    CurrentUserMixin
  ],
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
