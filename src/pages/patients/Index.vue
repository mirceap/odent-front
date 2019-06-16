<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 margin-bottom">
      <q-space></q-space>
      <q-btn dense class="simple-margin on-right" color="blue"
             :label="$t('generic.add')" @click="openAdd"></q-btn>
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
        <th class="text-left">{{ $t('patients.lastName') }}</th>
        <th class="text-left">{{ $t('patients.email') }}</th>
        <th class="text-left">{{ $t('patients.phoneNo') }}</th>
        <th class="text-left">{{ $t('patients.birthdate') }}</th>
        <th class="text-left">{{ $t('patients.medicalRecord') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <patients-item-row v-for="item in list" :key="item.ID" :item="item" @action="onAction"></patients-item-row>
      </tbody>
    </q-markup-table>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <patients-details ref="patientsDetails" v-if="currentItem.item" :value="currentItem" :locked="currentItem.locked" @action="onAction" :usage="usage" ></patients-details>
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions, mapState } from 'vuex'
import CurrentUserMixin from '../../mixins/current-user'
import PatientsItemRow from './ItemRow'
import { showRejectionMessage } from '../../boot/http'
import PatientsDetails from './details'

export default {
  name: 'PatientsIndex',
  components: { PatientsDetails, PatientsItemRow },
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
    ...mapState('patients', [
      'list',
      'loading'
    ])
  },
  methods: {
    ...mapActions('patients', [
      'fetch',
      'getItem',
      'remove',
      'add',
      'edit'
    ]),
    doDeleteConfirm (id) {
      const resolverPromise = new Promise((resolve, reject) => {
        this.dialogResolver = { resolve, reject }
      })
      return this.$q
        .dialog({
          title: this.$t('generic.confirm_delete_title'),
          message: this.$t('generic.confirm_delete_message'),
          ok: {
            color: 'warning',
            icon: 'delete',
            label: this.$t('generic.confirm_delete_ok')
          },
          cancel: {
            color: 'dark',
            flat: true,
            icon: 'undo',
            label: this.$t('generic.confirm_delete_cancel')
          }
        }, resolverPromise)
        .onOk(() => this.doDeleteAsset(id))
        .onCancel(() => {})
    },
    doDeleteAsset (id) {
      this.remove({ id })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: this.$t('generic.delete_notifications.success'),
            position: 'bottom-right'
          })
        })
        .catch((rejection) => {
          showRejectionMessage(rejection, 'generic.actions.delete_notifications.fail')
        })
    },
    openAdd () {
      const payload = {
        id: null,
        action: 'openAdd'
      }
      this.onAction(payload)
    },
    onAction (payload) {
      const action = payload && payload.action ? payload.action : 'cancel'
      switch (action) {
        case 'openEdit': {
          this.$router.push({ name: this.$route.name, params: { idItem: payload.id } })
          break
        }
        case 'delete': {
          this.doDeleteConfirm(payload.id)
          break
        }
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
          break
        }
        case 'update': {
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
    },
    itemOpen (idItem) {
      if (!idItem) {
        this.usage = 'add'
        this.currentItem = {
          index: -1,
          item: {},
          opened: false,
          locked: false,
          actions: []
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
    this.fetch().then(() => this.itemOpen(this.idItem))
  }
}
</script>
