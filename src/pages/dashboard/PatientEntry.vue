<template>
  <q-timeline-entry
    :title="`${ treatment } - Appointment with ${ employee }`"
    :subtitle="itemDate"
    :color="color"
  >
    <div>
      {{ item.Description }}
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
      return date.formatDate(new Date(this.item.StartDate), 'YYYY-MM-DD HH:mm')
    },
    treatment () {
      return (this.item && this.item.Treatments && this.item.Treatments.length && this.item.Treatments[0].Treatment &&
        this.item.Treatments[0].Treatment.Name) ? this.item.Treatments[0].Treatment.Name : 'Unspecified treatment'
    },
    employee () {
      return (this.item && this.item.Employees && this.item.Employees.length && this.item.Employees[0].Employee &&
        this.item.Employees[0].Employee.User.FirstName && this.item.Employees[0].Employee.User.LastName) ? `${this.item.Employees[0].Employee.User.FirstName} ${this.item.Employees[0].Employee.User.LastName}` : 'Unspecified Doctor'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg-grey-1
    cursor pointer
</style>
