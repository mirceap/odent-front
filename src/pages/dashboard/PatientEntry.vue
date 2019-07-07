<template>
  <q-timeline-entry
    :title="`${ item.treatments.name } - Appointment with ${ item.employees.firstName } ${ item.employees.lastName }`"
    :subtitle="itemDate"
    :color="color"
  >
    <div>
      {{ item.appointment.Description }}
    </div>
  </q-timeline-entry>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PatientEntry',
  props: {
    item: Object,
    color: String
  },
  computed: {
    itemDate () {
      return date.formatDate(new Date(this.item.appointment.StartDate), 'YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg-grey-1
    cursor pointer
</style>
