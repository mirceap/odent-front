<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 margin-bottom">
      <q-space></q-space>
      <q-btn dense class="simple-margin on-right" color="blue"
             :label="$t('generic.add')"></q-btn>
    </q-toolbar>
    <q-banner v-if="!list.length && !loading" rounded class="bg-yellow-8 text-white margin-bottom">
      <div class="q-dialog__title">
        {{ $t('generic.nothing_found') }}
      </div>
    </q-banner>
    <q-markup-table v-else>
      <thead>
      <tr>
        <th class="text-left">{{ $t('patients.firstName') }}</th>
        <th class="text-right">{{ $t('patients.lastName') }}</th>
        <th class="text-right">{{ $t('patients.email') }}</th>
        <th class="text-right">{{ $t('patients.phoneNo') }}</th>
        <th class="text-right">{{ $t('patients.birthdate') }}</th>
        <th class="text-right">{{ $t('patients.medicalRecord') }}</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
    </q-markup-table>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions, mapState } from 'vuex'
import CurrentUserMixin from '../../mixins/current-user'

export default {
  name: 'PatientsIndex',
  mixins: [
    CurrentUserMixin
  ],
  computed: {
    ...mapState('patients', [
      'list',
      'loading'
    ])
  },
  methods: {
    ...mapActions('patients', [
      'fetch'
    ])
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    this.fetch()
  }
}
</script>
