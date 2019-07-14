<template>
  <q-page>
    <template v-if="currentUser.is.admin">
      <div class="q-pa-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{$t('Money input per day by doctors')}}</div>
          </q-card-section>
          <GChart
            type="ColumnChart"
            :data="chartData1"
            :options="chartOptions2"
          />
        </q-card>
      </div>
      <div class="q-pa-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{$t('Money input per month by doctors')}}</div>
          </q-card-section>
          <GChart
            type="LineChart"
            :data="chartData2"
            :options="chartOptions2"
          />
        </q-card>
      </div>
      <div class="q-pa-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{$t('Appointments statuses')}}</div>
          </q-card-section>
          <GChart
            type="PieChart"
            :data="chartData3"
            :options="chartOptions3"
            style="height: 500px"
          />
        </q-card>
      </div>
    </template>
    <template v-if="currentUser.is.doctor">
      <div class="q-pa-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{$t('Appointments')}}</div>
          </q-card-section>
          <GChart
            type="BarChart"
            :data="chartData4"
            :options="chartOptions4"
            style="height:400px"
          />
        </q-card>
      </div>
      <div class="q-pa-md">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{$t('Appointments statuses')}}</div>
          </q-card-section>
          <GChart
            type="PieChart"
            :data="chartData5"
            :options="chartOptions5"
            style="height:500px"
          />
        </q-card>
      </div>
    </template>
    <template v-if="currentUser.is.patient">
      <q-toolbar class="bg-grey-3">
        <q-toolbar-title>
          {{$t('dashboard.patient.treatmentLabel')}}
        </q-toolbar-title>
      </q-toolbar>
      <q-markup-table class="margin-bottom">
        <thead>
        <tr>
          <th class="text-left">{{$t('dashboard.patient.appointment')}}</th>
          <th class="text-left">{{$t('dashboard.patient.treatment')}}</th>
          <th class="text-left">{{$t('dashboard.patient.doctor')}}</th>
          <th class="text-left">{{$t('dashboard.patient.details')}}</th>
          <th class="text-center">{{$t('dashboard.patient.rating')}}</th>
        </tr>
        </thead>
        <tbody>
          <patient-item-row v-for="item in list" :key="item.ID" :item="item"></patient-item-row>
        </tbody>
      </q-markup-table>
      <div class="q-px-lg q-pb-md">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Previous Appointments
          </q-timeline-entry>

          <patient-entry v-for="item in oldListEntry" :key="item.ID" :item="item" color="orange"></patient-entry>

          <q-timeline-entry heading>
            Upcoming Appointments
          </q-timeline-entry>

          <patient-entry v-for="item in newListEntry" :key="item.ID" :item="item" color="blue"></patient-entry>
        </q-timeline>
      </div>
    </template>
  </q-page>
</template>

<style>
</style>

<script>
import { mapState, mapActions } from 'vuex'
import CurrentUserMixin from '../../mixins/current-user'
import { GChart } from 'vue-google-charts'
import PatientItemRow from './PatientItemRow'
import { showRejectionMessage } from '../../boot/http'
import PatientEntry from './PatientEntry'

export default {
  name: 'DashboardIndex',
  components: {
    PatientEntry,
    PatientItemRow,
    GChart
  },
  mixins: [
    CurrentUserMixin
  ],
  data () {
    return {
      chartOptions1: {
        chart: {
          title: 'Money input',
          subtitle: 'Doctor per day'
        }
      },
      chartOptions2: {
        chart: {
          title: 'Money input',
          subtitle: 'Doctor per month'
        }
      },
      chartOptions3: {
        chart: {
          title: 'Statuses',
          is3D: true,
          height: 500
        }
      },
      chartOptions4: {
        chart: {
          title: 'Number of appointments per day',
          height: 400
        }
      },
      chartOptions5: {
        chart: {
          title: 'Statuses',
          is3D: true,
          height: 500
        }
      }
    }
  },
  computed: {
    ...mapState('dashboard', [
      'list'
    ]),
    chartData1 () {
      if (this.list && this.list.dailyChart && this.currentUser.is.admin) {
        return [
          this.list.dailyChart.doctors,
          this.list.dailyChart.sums
        ]
      }
      return [
        [],
        []
      ]
    },
    chartData2 () {
      if (this.list && this.list.monthlyChart && this.currentUser.is.admin) {
        return [
          this.list.monthlyChart.doctors,
          ...Object.keys(this.list.monthlyChart.yearlyData).map((k) => this.list.monthlyChart.yearlyData[k])
        ]
      }
      return [
        [],
        []
      ]
    },
    chartData4 () {
      let array = [
        ['date', 'Appointments']
      ]
      if (this.list && this.list.appointmentsData && this.currentUser.is.doctor) {
        return [
          ...array,
          ...this.list.appointmentsData
        ]
      }
      return [
        ...array,
        []
      ]
    },
    chartData5 () {
      if (this.list && this.list.appointmentsStats && this.currentUser.is.doctor) {
        return [
          ...this.list.appointmentsStats
        ]
      }
      return [
        [],
        []
      ]
    },
    chartData3 () {
      if (this.list && this.list.appointmentStats && this.currentUser.is.admin) {
        return [
          ...this.list.appointmentStats
        ]
      }
      return [
        [],
        []
      ]
    },
    newListEntry () {
      if (!this.currentUser.is.patient) {
        return []
      }
      if (this.list) {
        return this.list.filter((o) => new Date(o.StartDate) > new Date())
      }
      return []
    },
    oldListEntry () {
      if (!this.currentUser.is.patient) {
        return []
      }
      if (this.list) {
        return this.list.filter((o) => new Date(o.StartDate) < new Date())
      }
      return []
    }
  },
  methods: {
    ...mapActions('dashboard', [
      'fetch'
    ])
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    this.fetch()
      .catch((rejection) => {
        showRejectionMessage(rejection, 'generic.actions.fail')
      })
  }
}
</script>
