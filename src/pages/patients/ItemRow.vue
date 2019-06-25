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
      {{item.MedicalRecord}}
    </td>
    <td class="on-right">
      <q-btn round dense icon="delete" style="margin-right: 10px" @click="itemDelete">
      </q-btn>
      <q-btn round dense icon="pageview" @click="itemTreatment">
      </q-btn>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PatientsItemRow',
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
    },
    itemTreatment () {
      return this.$emit('action', {
        action: 'openTreatment',
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
