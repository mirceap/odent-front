<template>
  <tr class="bg-grey-1">
    <td class="text-left" @click="itemOpen">
      {{item.FirstName}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.LastName}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.Email}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.PhoneNo}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.Birthdate}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.PositionTitle}}
    </td>
    <td>
      <q-btn round dense icon="delete" @click="itemDelete">
      </q-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'EmployeesItemRow',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemOpen () {
      return this.$emit('action', {
        action: 'edit',
        id: this.item.ID
      })
    },
    itemDelete () {
      return this.$emit('action', {
        action: 'delete',
        id: this.item.ID
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bg-grey-1
    cursor pointer
</style>
