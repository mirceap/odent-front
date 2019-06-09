<template>
  <q-page class="flex flex-center">
    Treatments
  </q-page>
</template>

<style>
</style>

<script>
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'PageIndex',
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
