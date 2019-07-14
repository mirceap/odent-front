<template>
  <div>
    <div class="row" v-if="currentUser.is.admin || currentUser.is.patient">
      <div class="col-md-4 offset-md-4">
        <q-select
          v-model="selectedDoctor"
          class="full-width"
          required
          emit-value
          map-options
          :options="doctorOptionsView"
          :label="$t('appointments.selectedDoctor')"
          >
        </q-select>
      </div>
    </div>
    <q-page class="flex flex-center">
      <kalendar class="full-width" :configuration="calendar_settings" :appointments="appointments">
        <div slot="details-card" slot-scope="{appointment_props}" >
          <div class="appointment-title" @click="onAction({ action: 'openEdit', id: appointment_props.data.id })" :style="currentUser.is.doctor ? 'cursor: pointer' : ''">{{appointment_props.data.title}}</div>
          <small v-show="(appointment_props.end - appointment_props.start) > 2">{{appointment_props.data.description}}</small>
        </div>
      </kalendar>
      <q-page-sticky v-if="currentUser.is.patient || currentUser.is.doctor" position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          icon="add"
          color="primary"
          @click="showAddApp"
        >
        </q-btn>
      </q-page-sticky>
      <add-appointment ref="addAppointment" v-if="currentItem.item && (currentUser.is.patient || currentUser.is.doctor)"
                       :value="currentItem" :locked="currentItem.locked" @action="onAction" :doctors="doctorOptions"
                       :status="statusOptions" :patients="patientsOptions" :treatments="treatmentsOptions"
      ></add-appointment>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import { clone, date } from 'quasar'
import { mapActions, mapState, mapMutations } from 'vuex'
import { Kalendar } from 'kalendar-vue'
import 'kalendar-vue/dist/KalendarVue.css'
import CurrentUserMixin from '../../mixins/current-user'
import AddAppointment from './add'
import { showRejectionMessage } from '../../boot/http'

export default {
  name: 'AppointmentsIndex',
  components: {
    Kalendar,
    AddAppointment
  },
  data () {
    return {
      currentItem: {
        index: -1,
        item: undefined,
        opened: false,
        locked: false
      },
      selectedDoctor: 0,
      calendar_settings: {
        style: 'material_design', // ['flat_design', 'material_design']
        view_type: 'Day', // ['Month', 'Day']
        split_value: 20, // Value % 60 === 0
        cell_height: 10, // !isNaN(Value)
        scrollToNow: false, // Boolean
        current_day: new Date(), // Valid date
        military_time: true, // Boolean
        read_only: true
      }
    }
  },
  watch: {
    selectedDoctor () {
      this.setDoctor({ doctorId: this.selectedDoctor })
    }
  },
  computed: {
    ...mapState('employees', [
      'list'
    ]),
    ...mapState('patients', {
      patientsList: 'list'
    }),
    ...mapState('appointments', {
      appointmentsList: 'list',
      statusList: 'statusList',
      doctorId: 'doctor'
    }),
    ...mapState('treatments', {
      treatmentsList: 'list'
    }),
    ...mapMutations('appointments', [
      'SET_DOCTOR'
    ]),
    doctorOptions () {
      return this.list.map((o) => ({
        value: o.ID,
        label: `${o.FirstName} ${o.LastName}`
      }))
    },
    doctorOptionsView () {
      return [{ value: 0, label: 'All' }, ...this.list.map((o) => ({
        value: o.ID,
        label: `${o.FirstName} ${o.LastName}`
      }))]
    },
    patientsOptions () {
      return this.patientsList.map((o) => ({
        value: o.ID,
        label: `${o.FirstName} ${o.LastName}`
      }))
    },
    statusOptions () {
      return this.statusList.map((o) => ({
        value: o.ID,
        label: o.Description
      }))
    },
    treatmentsOptions () {
      return this.treatmentsList.map((o) => ({
        value: o.ID,
        label: o.Name
      }))
    },
    appointments () {
      return this.appointmentsList.map((o) => {
        if (this.currentUser.is.patient) {
          return {
            from: new Date(o.StartDate),
            to: new Date(o.EndDate),
            date: date.formatDate(new Date(o.EndDate), 'YYYY-MM-DD'),
            data: {
              title: this.currentUser.credentials.id === o.Patient_ID ? `Your appointment` : 'Existing Appointment',
              id: o.ID
            }
          }
        } else if (this.currentUser.is.doctor || this.currentUser.is.admin) {
          return {
            from: new Date(o.StartDate),
            to: new Date(o.EndDate),
            date: date.formatDate(new Date(o.EndDate), 'YYYY-MM-DD'),
            data: {
              title: `Appointment with ${o.Patient.User.FirstName} ${o.Patient.User.LastName}`,
              id: o.ID
            }
          }
        }
      })
    }
  },
  mixins: [
    CurrentUserMixin
  ],
  methods: {
    ...mapActions('appointments', [
      'fetch',
      'remove',
      'add',
      'edit',
      'fetchStatus',
      'getItem',
      'setDoctor'
    ]),
    ...mapActions('employees', {
      fetchDoctors: 'fetch'
    }),
    ...mapActions('patients', {
      fetchPatients: 'fetch'
    }),
    ...mapActions('treatments', {
      fetchTreatments: 'fetch'
    }),
    showAddApp () {
      this.onAction({ action: 'openAdd' })
    },
    onAction (payload) {
      const action = payload && payload.action ? payload.action : 'cancel'
      switch (action) {
        case 'openAdd': {
          this.currentItem = {
            index: -1,
            item: {},
            opened: true,
            locked: false,
            actions: ['cancel', 'add']
          }
          break
        }
        case 'add': {
          if (this.currentUser.is.patient) {
            payload.item.Patient_ID = this.currentUser.credentials.id
            payload.item.Status_ID = 6
          }
          if (this.currentUser.is.doctor) {
            payload.item.Doctor_ID = this.currentUser.credentials.id
            payload.item.Patient_ID = String(payload.item.Patient_ID)
          }
          this.add({ item: payload.item }).then(() => {
            this.currentItem = {
              index: -1,
              item: {},
              opened: false,
              locked: false,
              actions: ['cancel', 'add']
            }
            this.$q.notify({
              type: 'positive',
              message: this.$t('success'),
              position: 'bottom-right'
            })
            this.$router.replace({ name: this.$route.name })
          })
            .catch((rejection) => {
              showRejectionMessage(rejection, 'generic.fail')
            })
          break
        }
        case 'openEdit': {
          if (this.currentUser.is.doctor) {
            this.getItem({ id: payload.id }).then(({ item }) => {
              if (item) {
                const actions = []
                actions.push('cancel')
                actions.push('update')
                item.StartDate = date.formatDate(new Date(item.StartDate), 'YYYY-MM-DD HH:mm')
                this.currentItem = {
                  index: 0,
                  item,
                  opened: true,
                  locked: false,
                  actions
                }
              }
            })
          }
          break
        }
        case 'update': {
          payload.item.Patient_ID = payload.item.Patient_ID.toString()
          this.edit({ item: payload.item }).then(() => {
            this.currentItem = {
              index: -1,
              item: {},
              opened: false,
              locked: false,
              actions: ['cancel', 'add']
            }
            this.$router.replace({ name: this.$route.name })
          })
            .catch((rejection) => {
              showRejectionMessage(rejection, 'generic.actions.delete_notifications.fail')
            })
          break
        }
        case 'cancel': {
          this.currentItem = {
            index: -1,
            item: {},
            opened: false,
            locked: false,
            actions: ['cancel', 'add']
          }
          this.fetch()
          this.$router.replace({ name: this.$route.name })
          break
        }
      }
    }
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    if (this.currentUser.is.patient) {
      console.log(1)
      this.selectedDoctor = clone(this.doctorId)
    } else if (this.currentUser.is.doctor || this.currentUser.is.admin) {
      this.selectedDoctor = 0
      this.setDoctor({ doctorId: this.selectedDoctor })
    }
    this.fetchTreatments().then(() =>
      this.fetchDoctors().then(() =>
        this.fetchPatients().then(() =>
          this.fetchStatus().then(() =>
            this.fetch()))))
  }
}
</script>
