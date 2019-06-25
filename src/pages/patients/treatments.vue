<template>
  <div>
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="value">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="max-height: 60vh">
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
              </tr>
              </thead>
              <tbody>
                <tr class="bg-grey-1">
                  <td class="text-left">
                    2019-06-23
                  </td>
                  <td class="text-left">
                    Usual check-up
                  </td>
                  <td class="text-left">
                    All good
                  </td>
                </tr>
                <tr class="bg-grey-1">
                  <td class="text-left">
                    2019-06-22
                  </td>
                  <td class="text-left">
                    Blood analysis
                  </td>
                  <td class="text-left">
                    All good too
                  </td>
                </tr>
                <tr class="bg-grey-1">
                  <td class="text-left">
                    2019-06-22
                  </td>
                  <td class="text-left">
                    Usual check-up
                  </td>
                  <td class="text-left">
                    All good
                  </td>
                </tr>
                <tr class="bg-grey-1">
                  <td class="text-left">
                    2019-06-21
                  </td>
                  <td class="text-left">
                    Blood analysis
                  </td>
                  <td class="text-left">
                    All good too
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

export default {
  name: 'PatientsTreatments',
  props: {
    value: Boolean
  },
  data () {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
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
  }
}
</script>

<style lang="stylus" scoped>
  .indexToInfinity
    z-index 10000
</style>
