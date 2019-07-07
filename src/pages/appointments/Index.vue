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
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import { mapActions, mapState } from 'vuex'
import { Kalendar } from 'kalendar-vue'
import 'kalendar-vue/dist/KalendarVue.css'
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'AppointmentsIndex',
  components: {
    Kalendar
  },
  data () {
    return {
      appointments: [
        {
          from: 'Wed Jun 26 2019 02:00:00',
          to: 'Wed Jun 26 2019 03:00:00',
          date: '2019-06-26',
          data: {
            title: 'Andrei Ion'
          }
        },
        {
          from: 'Wed Jun 23 2019 04:00:00',
          to: 'Wed Jun 23 2019 05:00:00',
          date: '2019-06-23',
          data: {
            title: 'Danaila Marin'
          }
        },
        {
          from: 'Wed Jun 25 2019 06:00:00',
          to: 'Wed Jun 25 2019 07:00:00',
          date: '2019-06-25',
          data: {
            title: 'Danaila Marin'
          }
        },
        {
          from: 'Wed Jun 27 2019 12:00:00',
          to: 'Wed Jun 27 2019 13:00:00',
          date: '2019-06-27',
          data: {
            title: 'Danaila Marin'
          }
        },
        {
          from: 'Wed Jun 23 2019 14:00:00',
          to: 'Wed Jun 23 2019 13:00:00',
          date: '2019-06-23',
          data: {
            title: 'Danaila Marin'
          }
        }
      ],
      selectedDoctor: null,
      calendar_settings: {
        style: 'material_design', // ['flat_design', 'material_design']
        view_type: 'Month', // ['Month', 'Day']
        split_value: 20, // Value % 60 === 0
        cell_height: 10, // !isNaN(Value)
        scrollToNow: false, // Boolean
        current_day: new Date(), // Valid date
        military_time: true // Boolean
      }
    }
  },
  computed: {
    ...mapState('employees', [
      'list'
    ]),
    doctorOptions () {
      return this.list.filter((o) => o.Role_ID === 2).map((o) => ({
        value: o.ID,
        label: `${o.FirstName} ${o.LastName}`
      }))
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
      'edit'
    ]),
    ...mapActions('employees', {
      fetchDoctors: 'fetch'
    })
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    this.fetchDoctors()
    this.fetch()
  }
}
</script>
