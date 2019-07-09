<template>
  <tr class="bg-grey-1">
    <td class="text-left">
      {{ itemDate }}
    </td>
    <td class="text-left">
      {{ treatment }}
    </td>
    <td class="text-left">
      {{ `${employee}` }}
    </td>
    <td class="text-left">
      {{ item.Description }}
    </td>
    <td class="text-center">
      <q-rating
        :value="item.DoctorRating || 0"
        size="2em"
        readonly
        color="blue-5"
        icon="star_border"></q-rating>
    </td>
  </tr>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PatientItemRow',
  props: {
    item: Object
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
