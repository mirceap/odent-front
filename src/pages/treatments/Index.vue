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
        <th class="text-left">{{ $t('treatments.name') }}</th>
        <th class="text-left">{{ $t('treatments.price') }}</th>
        <th class="text-left">{{ $t('treatments.estimatedDuration') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <treatments-item-row v-for="item in list" :key="item.ID" :item="item" @action="onAction"></treatments-item-row>
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
import TreatmentsItemRow from './ItemRow'
import { showRejectionMessage } from '../../boot/http'

export default {
  name: 'TreatmentsIndex',
  components: { TreatmentsItemRow },
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
    ...mapState('treatments', [
      'list',
      'loading'
    ])
  },
  methods: {
    ...mapActions('treatments', [
      'fetch',
      'getItem'
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
      this.delete({ id })
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: this.$t('generic.delete_notifications.success'),
            position: 'bottom-right'
          })
        })
        .catch((rejection) => {
          showRejectionMessage(rejection, 'fleet.actions.delete_notifications.fail')
        })
    },
    onAction (payload) {
      const action = payload && payload.action ? payload.action : 'cancel'
      switch (action) {
        case 'edit': {
          this.$router.push({ name: this.$route.name, params: { idItem: payload.id } })
          break
        }
        case 'delete': {
          this.doDeleteConfirm(payload.id)
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
    this.fetch()
  }
}
</script>
