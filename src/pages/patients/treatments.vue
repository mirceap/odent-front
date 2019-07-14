<template>
  <div>
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="value">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="max-height: 60vh; min-width: 80vw">
        <q-header class="bg-black text-white">
          <q-toolbar>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-black text-white">
          <q-toolbar color="dark">
            <q-space></q-space>
            <q-btn key="dismiss"
                   color="red"
                   :label="$t(`generic.actions.cancel`)"
                   @click="doAction()"
                   ></q-btn>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <q-markup-table>
              <thead>
              <tr>
                <th class="text-left">Appointment Date</th>
                <th class="text-left">Treatment</th>
                <th class="text-left">Details</th>
                <th class="text-center">Rating</th>
              </tr>
              </thead>
              <tbody>
                <tr class="bg-grey-1" v-for="item in listByPacient" :key="item.ID">
                  <td class="text-left">
                    {{ item.Date }}
                  </td>
                  <td class="text-left">
                    {{ item.Treatments && item.Treatments[0] && item.Treatments[0].Treatment && item.Treatments[0].Treatment.Name ?
                      item.Treatments[0].Treatment.Name : 'Unspecified treatment'}}
                  </td>
                  <td class="text-left">
                    {{ item.Description }}
                  </td>
                  <td class="text-center">
                    <q-rating
                      :value="item.PatientRating || 0"
                      size="2em"
                      readonly
                      color="blue-5"
                      icon="star_border"></q-rating>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PatientsTreatments',
  props: {
    value: Boolean,
    patientId: Number
  },
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
    ...mapState('treatments', [
      'listByPacient'
    ])
  },
  mounted () {
    this.fetchByPatient({ id: this.patientId })
  },
  methods: {
    ...mapActions('treatments', [
      'fetchByPatient'
    ]),
    ...mapMutations('treatments', [
      'CLEAR_LIST_BY_PATIENTS'
    ]),
    doAction (action = 'dismissTreatment') {
      if (action === 'dismissTreatment') {
        return this.$emit('action', {
          action
        })
      }
    }
  },
  beforeDestroy () {
    if (this.dialogResolver) {
      this.dialogResolver.reject()
    }
    this.CLEAR_LIST_BY_PATIENTS()
  }
}
</script>

<style lang="stylus" scoped>
  .indexToInfinity
    z-index 10000
</style>
