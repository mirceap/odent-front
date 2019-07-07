<template>
  <tr class="bg-grey-1">
    <td class="text-left">
      {{ itemDate }}
    </td>
    <td class="text-left">
      {{ item.treatments.name }}
    </td>
    <td class="text-left">
      {{ `${ item.employees.firstName } ${ item.employees.lastName }` }}
    </td>
    <td class="text-left">
      {{ item.appointment.Description }}
    </td>
    <td class="text-center">
      <q-rating
        :value="item.appointment.DoctorRating || 0"
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
      return date.formatDate(new Date(this.item.appointment.StartDate), 'YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg-grey-1
    cursor pointer
</style>
