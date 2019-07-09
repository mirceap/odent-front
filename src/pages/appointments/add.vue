<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="value.opened">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="max-height: 60vh">
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
                  v-model="item.Description"
                  color="dark"
                  required
                  :label="$t('appointments.fields.description.label')"
                  @input="doTouch($v.item.Description)"
                  :error="$v.item.Description.$error"
                  :error-message="$t('appointments.fields.description.error')"></q-input>
                <q-select
                  v-model="item.Doctor_ID"
                  class="full-width"
                  required
                  emit-value
                  map-options
                  :options="doctors"
                  v-if="currentUser.is.patient"
                  :label="$t('appointments.fields.doctor.label')"
                  :error="$v.item.Doctor_ID.$error"
                  :error-message="$t('appointments.fields.doctor.error')"></q-select>
                <q-select
                  v-model="item.Patient_ID"
                  class="full-width"
                  required
                  emit-value
                  v-else
                  map-options
                  :options="patients"
                  :label="$t('appointments.fields.patient.label')"
                  :error="$v.item.Patient_ID.$error"
                  :error-message="$t('appointments.fields.patient.error')"></q-select>
                <q-select
                  v-model="item.Treatment_ID"
                  class="full-width"
                  required
                  emit-value
                  map-options
                  :options="treatments"
                  :label="$t('appointments.fields.treatment.label')"
                  :error="$v.item.Treatment_ID.$error"
                  :error-message="$t('appointments.fields.treatment.error')"></q-select>
                <q-select
                  v-model="item.Status_ID"
                  class="full-width"
                  required
                  emit-value
                  v-if="currentUser.is.doctor"
                  map-options
                  :options="status"
                  :label="$t('appointments.fields.status.label')"
                  :error="$v.item.Status_ID.$error"
                  :error-message="$t('appointments.fields.status.error')"></q-select>
                <q-input :label="$t('appointments.fields.startDate.label')" filled v-model="item.StartDate"
                         :error="$v.item.StartDate.$error"
                         :error-message="$t('appointments.fields.startDate.error')">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="item.StartDate" mask="YYYY-MM-DD HH:mm" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="item.StartDate" mask="YYYY-MM-DD HH:mm" format24h :minute-options="[0]" :hour-options="[8,9,10,11,12,13,14,15,16,17]"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
<!--                <q-input :stack-label="$t('appointments.fields.endDate.label')" filled v-model="item.EndDate"-->
<!--                         :error="$v.item.EndDate.$error"-->
<!--                         :error-message="$t('appointments.fields.endDate.error')">-->
<!--                  <template v-slot:prepend>-->
<!--                    <q-icon name="event" class="cursor-pointer">-->
<!--                      <q-popup-proxy transition-show="scale" transition-hide="scale">-->
<!--                        <q-date v-model="item.EndDate" mask="YYYY-MM-DD HH:mm" />-->
<!--                      </q-popup-proxy>-->
<!--                    </q-icon>-->
<!--                  </template>-->

<!--                  <template v-slot:append>-->
<!--                    <q-icon name="access_time" class="cursor-pointer">-->
<!--                      <q-popup-proxy transition-show="scale" transition-hide="scale">-->
<!--                        <q-time v-model="item.EndDate" mask="YYYY-MM-DD HH:mm" format24h :minute-options="[0]"/>-->
<!--                      </q-popup-proxy>-->
<!--                    </q-icon>-->
<!--                  </template>-->
<!--                </q-input>-->
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
import CurrentUserMixin from '../../mixins/current-user'

const icons = {
  add: 'add',
  update: 'save',
  remove: 'delete',
  cancel: 'close'
}

export default {
  name: 'AddAppointment',
  props: {
    value: Object,
    locked: Boolean,
    doctors: Array,
    patients: Array,
    status: Array,
    treatments: Array
  },
  mixins: [
    CurrentUserMixin
  ],
  data () {
    return {
      item: clone(this.value.item)
    }
  },
  validations () {
    if (this.currentUser.is.patient) {
      return {
        item: {
          Description: {
            required
          },
          Doctor_ID: {
            required
          },
          StartDate: {
            required
          },
          Treatment_ID: {
            required
          }
        }
      }
    }
    return {
      item: {
        Description: {
          required
        },
        Patient_ID: {
          required
        },
        StartDate: {
          required
        },
        Status_ID: {
          required
        },
        Treatment_ID: {
          required
        }
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
