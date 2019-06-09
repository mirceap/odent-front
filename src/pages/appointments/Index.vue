<template>
  <q-page class="flex flex-center">
    <kalendar class="full-width" :configuration="calendar_settings" :appointments="appointments"/>
  </q-page>
</template>

<style>
</style>

<script>
import { Kalendar } from 'kalendar-vue'
import 'kalendar-vue/dist/KalendarVue.css'
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'PageIndex',
  components: {
    Kalendar
  },
  data () {
    return {
      appointments: [],
      calendar_settings: {
        style: 'material_design', // ['flat_design', 'material_design']
        view_type: 'Month', // ['Month', 'Day']
        split_value: 20, // Value % 60 === 0
        cell_height: 20, // !isNaN(Value)
        scrollToNow: true, // Boolean
        current_day: new Date(), // Valid date
        military_time: true // Boolean
      }
    }
  },
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
