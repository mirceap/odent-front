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
          :options="doctorOptions"
          :label="$t('appointments.selectedDoctor')"
          >
        </q-select>
      </div>
    </div>
    <q-page class="flex flex-center">
      <kalendar class="full-width" :configuration="calendar_settings" :appointments="appointments">
        <div slot="details-card" slot-scope="{appointment_props}">
          <div class="appointment-title">{{appointment_props.data.title}}</div>
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
                       :status="statusOptions" :patients="patientsOptions"
      ></add-appointment>
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
import { mapActions, mapState } from 'vuex'
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
      selectedDoctor: null,
      calendar_settings: {
        style: 'material_design', // ['flat_design', 'material_design']
        view_type: 'Month', // ['Month', 'Day']
        split_value: 20, // Value % 60 === 0
        cell_height: 10, // !isNaN(Value)
        scrollToNow: false, // Boolean
        current_day: new Date(), // Valid date
        military_time: true, // Boolean
        read_only: true
      }
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
      statusList: 'statusList'
    }),
    doctorOptions () {
      return this.list.map((o) => ({
        value: o.ID,
        label: `${o.FirstName} ${o.LastName}`
      }))
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
    appointments () {
      return this.appointmentsList.map((o) => {
        return {
          from: new Date(o.StartDate),
          to: new Date(o.EndDate),
          date: date.formatDate(new Date(o.EndDate), 'YYYY-MM-DD'),
          data: {
            title: 'Existing Appointment'
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
      'fetchStatus'
    ]),
    ...mapActions('employees', {
      fetchDoctors: 'fetch'
    }),
    ...mapActions('patients', {
      fetchPatients: 'fetch'
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
            payload.item.Status_ID = 2
          }
          if (this.currentUser.is.doctor) {
            payload.item.Doctor_ID = Number(this.currentUser.credentials.id)
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
    this.fetchDoctors()
    this.fetchPatients()
    this.fetchStatus()
    this.fetch()
  }
}
</script>
