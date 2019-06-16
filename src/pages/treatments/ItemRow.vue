<template>
  <tr class="bg-grey-1">
    <td class="text-left" @click="itemOpen">
      {{item.Name}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.Price}}
    </td>
    <td class="text-left" @click="itemOpen">
      {{item.EstimatedDuration}}
    </td>
    <td>
      <q-btn round dense icon="delete" @click="itemDelete">
      </q-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TreatmentsItemRow',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    itemOpen () {
      return this.$emit('action', {
        action: 'openEdit',
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
