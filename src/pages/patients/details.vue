<template>
  <div>
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="value.opened">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-black text-white">
          <q-toolbar>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-black text-white">
          <q-toolbar color="dark">
            <q-btn v-for="button in actionsLeft" :key="button.action"
                   class="on-left"
                   :color="button.color"
                   :flat="button.flat"
                   :icon="button.icon"
                   :label="$t(`generic.actions.${button.action}`)"
                   :type="button.type"
                   @click="doAction(button.action)"></q-btn>
            <div class="col"></div>
            <q-btn v-for="button in actionsRight" :key="button.action"
                   class="on-right"
                   :color="button.color"
                   :flat="button.flat"
                   :icon="button.icon"
                   :label="$t(`generic.actions.${button.action}`)"
                   :type="button.type"
                   @click="doAction(button.action)"
                   :disable="locked"></q-btn>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <form class="column" @submit.prevent>
              <div class="layout-padding">
                <q-input
                  v-model="item.name"
                  color="dark"
                  required
                  autocapitalize="words"
                  :float-label="$t('services.fields.name.label')"
                  @input="doTouch($v.item.name)"
                  :error="$v.item.name.$error"
                  :error-message="$t('employees.fields.name.error')"></q-input>
              </div>
            </form>
          </q-page>
        </q-page-container>
      </q-layout>
      <q-inner-loading :visible="locked"/>
    </q-dialog>
  </div>

</template>

<script>
import { clone } from 'quasar'
import { required } from 'vuelidate/lib/validators'

const icons = {
  add: 'add',
  update: 'save',
  remove: 'delete',
  cancel: 'close'
}

export default {
  name: 'PatientsDetails',
  props: {
    value: Object,
    locked: Boolean,
    usage: String
  },
  data () {
    return {
      item: clone(this.value.item)
    }
  },
  validations: {
    item: {
      name: {
        required
      }
    }
  },
  watch: {
    'value.item': function valueItem (val) {
      this.item = clone(val)
    },
    'value.opened': function valueOpened (val) {
      if (val) {
        this.$v.item.$reset()
        this.$dirty = false
      }
    }
  },
  computed: {
    actions () {
      const actionsList = this.value.actions && this.value.actions.length ? this.value.actions : ['cancel']
      const last = actionsList.length - 1
      return actionsList.map((action, i) => {
        let color = i === last ? 'primary' : null
        if (action === 'remove') {
          color = 'negative'
        }
        return {
          action,
          color,
          icon: icons[action],
          side: action === 'remove' ? 'left' : 'right',
          flat: i !== last && action !== 'remove',
          type: i === last ? 'submit' : 'button'
        }
      })
    },
    actionsLeft () {
      return this.actions.filter((a) => a.side === 'left')
    },
    actionsRight () {
      return this.actions.filter((a) => a.side !== 'left')
    }
  },
  methods: {
    doTouch (field) {
      this.$dirty = true
      field.$touch()
    },
    doAction (action = 'cancel') {
      if (!this.value.opened) {
        return null
      }
      if (action === 'cancel') {
        if (this.$dirty) {
          return this.doActionConfirm({
            action,
            color: 'warning',
            icon: 'close'
          })
            .onOk(() => {
              this.$dirty = false
            })
            .onCancel(() => {
            })
        }
      } else if (this.usage === 'add') {
        if (this.$v.item.$invalid) {
          this.$v.item.$touch()
          return false
        }
      } else if (this.$v.item.$invalid) {
        this.$v.item.$touch()
        return false
      }
      return this.$emit('action', {
        action,
        item: this.item
      })
    },
    doActionConfirm ({
      action = 'cancel',
      color = 'warning',
      icon = 'close',
      skipAction = false
    } = {
      action: 'cancel',
      color: 'warning',
      icon: 'close',
      skipAction: false
    }) {
      const resolverPromise = new Promise((resolve, reject) => {
        this.dialogResolver = {
          resolve,
          reject
        }
      })
      return this.$q
        .dialog({
          title: this.$t(`generic.actions.confirm_${action}_title`),
          message: this.$t(`generic.actions.confirm_${action}_message`),
          ok: {
            color,
            icon,
            label: this.$t(`generic.actions.confirm_${action}_ok`)
          },
          cancel: {
            color: 'dark',
            flat: true,
            icon: 'undo',
            label: this.$t(`generic.actions.confirm_${action}_cancel`)
          }
        }, resolverPromise)
        .onOk(() => !skipAction && this.$emit('action', {
          action,
          item: this.item
        }))
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
