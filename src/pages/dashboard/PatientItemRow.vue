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
        v-model="itemRating"
        size="2em"
        :readonly="new Date() < new Date(itemDate)"
        :color="new Date() < new Date(itemDate) ? 'green-5' : 'blue'"
        :icon="new Date() < new Date(itemDate) ? 'star_border' : 'star'"></q-rating>
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
    itemRating: {
      get: function () {
        return this.item.PatientRating || 0
      },
      set: function (newValue) {
        return this.$emit('action', {
          action: 'editAppointment',
          id: this.item.ID,
          rating: newValue
        })
      }
    },
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
