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
            type="LineChart"
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
          Your Treatments
        </q-toolbar-title>
      </q-toolbar>
      <q-markup-table class="margin-bottom">
        <thead>
        <tr>
          <th class="text-left">Appointment Date</th>
          <th class="text-left">Treatment</th>
          <th class="text-left">Doctor</th>
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
            Andrei Cazacu
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
            Marian Nedelcu
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
            Andrei Cazacu
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
            Valeriu Andreescu
          </td>
          <td class="text-left">
            All good too
          </td>
        </tr>
        </tbody>
      </q-markup-table>
      <div class="q-px-lg q-pb-md">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Previous Appointments
          </q-timeline-entry>

          <q-timeline-entry
            title="Appointment with Andrei Cazacu"
            subtitle="February 22, 1986"
            color="orange"
          >
            <div>
              Your treatment was Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Appointment with Andrei Cazacu"
            subtitle="February 21, 1986"
            color="orange"
          >
            <div>
              Your treatment was Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>
            Upcoming Appointments
          </q-timeline-entry>

          <q-timeline-entry
            title="Appointment with Valeriu Andreescu"
            subtitle="February 22, 1986"
            color="blue"
          >
            <div>
              Your treatment was Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            title="Appointment with Matei Iacob"
            subtitle="February 22, 1986"
            color="blue"
          >
            <div>
              Your treatment was Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </template>
  </q-page>
</template>

<style>
</style>

<script>
import CurrentUserMixin from '../../mixins/current-user'
import { GChart } from 'vue-google-charts'

export default {
  name: 'DashboardIndex',
  components: {
    GChart
  },
  mixins: [
    CurrentUserMixin
  ],
  data () {
    return {
      chartData1: [
        ['', 'Doctor #1', 'Doctor #2', 'Doctor #3'],
        ['Sums', 1000, 400, 200]
      ],
      chartOptions1: {
        chart: {
          title: 'Money input',
          subtitle: 'Doctor per day'
        }
      },
      chartData2: [
        ['', 'Doctor #1', 'Doctor #2', 'Doctor #3'],
        ['February', 1000, 400, 200],
        ['March', 1200, 500, 290],
        ['May', 1300, 200, 210],
        ['June', 1700, 300, 203],
        ['July', 1100, 400, 202]
      ],
      chartOptions2: {
        chart: {
          title: 'Money input',
          subtitle: 'Doctor per month'
        }
      },
      chartData3: [
        ['Status', 'Percentage'],
        ['Show', 60],
        ['No Show', 20],
        ['Delayed', 10],
        ['Cancelled', 10]
      ],
      chartOptions3: {
        chart: {
          title: 'Statuses',
          is3D: true,
          height: 500
        }
      },
      chartData4: [
        ['date', 'Appointments'],
        [ new Date(2019, 6, 1), 3 ],
        [ new Date(2019, 6, 2), 5 ],
        [ new Date(2019, 6, 3), 5 ],
        [ new Date(2019, 6, 4), 12 ],
        [ new Date(2019, 6, 5), 14 ],
        [ new Date(2019, 6, 6), 3 ],
        [ new Date(2019, 6, 7), 5 ],
        [ new Date(2019, 6, 8), 7 ],
        [ new Date(2019, 6, 9), 8 ],
        [ new Date(2019, 6, 10), 7 ],
        [ new Date(2019, 6, 11), 9 ],
        [ new Date(2019, 6, 12), 10 ],
        [ new Date(2019, 6, 12), 12 ]
      ],
      chartOptions4: {
        chart: {
          title: 'Number of appointments per day',
          height: 400
        }
      },
      chartData5: [
        ['Status', 'Percentage'],
        ['Show', 60],
        ['No Show', 20],
        ['Delayed', 10],
        ['Cancelled', 10]
      ],
      chartOptions5: {
        chart: {
          title: 'Statuses',
          is3D: true,
          height: 500
        }
      }
    }
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
