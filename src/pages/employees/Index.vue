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
        <th class="text-left">{{ $t('employees.firstName') }}</th>
        <th class="text-left">{{ $t('employees.lastName') }}</th>
        <th class="text-left">{{ $t('employees.email') }}</th>
        <th class="text-left">{{ $t('employees.phoneNo') }}</th>
        <th class="text-left">{{ $t('employees.birthdate') }}</th>
        <th class="text-left">{{ $t('employees.positionTitle') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <employees-item-row v-for="item in list" :key="item.ID" :item="item" @action="onAction"></employees-item-row>
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
import EmployeesItemRow from './ItemRow'

export default {
  name: 'EmployeesIndex',
  components: { EmployeesItemRow },
  mixins: [
    CurrentUserMixin
  ],
  props: {
    idItem: [String, Number]
  },
  data () {
    return {
      usage: '',
      currentItem: {
        index: -1,
        item: undefined,
        opened: false,
        locked: false
      }
    }
  },
  computed: {
    ...mapState('employees', [
      'list',
      'loading'
    ])
  },
  methods: {
    ...mapActions('employees', [
      'fetch',
      'getItem'
    ]),
    onAction (payload) {
      const action = payload && payload.action ? payload.action : 'cancel'
      switch (action) {
        case 'edit': {
          this.$router.push({ name: this.$route.name, params: { idItem: payload.id } })
          break
        }
        case 'delete': {
          this.delete(payload)
          break
        }
      }
    },
    itemOpen (idItem) {
      if (!idItem) {
        this.usage = 'add'
        this.currentItem = {
          index: -1,
          item: {},
          opened: false,
          locked: false,
          actions: ['cancel', 'add']
        }
        return
      }
      const id = idItem
      this.usage = 'edit'
      this.getItem({ id }).then(({ item }) => {
        if (item) {
          const actions = []
          actions.push('cancel')
          actions.push('update')
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
  },
  watch: {
    idItem () {
      this.itemOpen(this.idItem)
    }
  },
  mounted () {
    if (!this.currentUser.canSee[this.$route.name]) {
      this.$router.push({ name: 'dashboard' })
    }
    this.fetch()
  }
}
</script>
