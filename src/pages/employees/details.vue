<template>
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
                  v-model="item.FirstName"
                  color="dark"
                  required
                  autocapitalize="words"
                  :label="$t('employees.fields.firstname.label')"
                  @input="doTouch($v.item.FirstName)"
                  :error="$v.item.FirstName.$error"
                  :error-message="$t('employees.fields.firstname.error')"></q-input>
                <q-input
                  v-model="item.LastName"
                  color="dark"
                  required
                  autocapitalize="words"
                  :label="$t('employees.fields.lastname.label')"
                  @input="doTouch($v.item.LastName)"
                  :error="$v.item.LastName.$error"
                  :error-message="$t('employees.fields.lastname.error')"></q-input>
                <q-input
                  v-model="item.Email"
                  color="dark"
                  required
                  autocapitalize="words"
                  type="email"
                  :label="$t('employees.fields.email.label')"
                  @input="doTouch($v.item.Email)"
                  :error="$v.item.Email.$error"
                  :error-message="$t('employees.fields.email.error')"></q-input>
                <q-input
                  v-model="item.PhoneNo"
                  color="dark"
                  required
                  autocapitalize="words"
                  :label="$t('employees.fields.phoneNo.label')"
                  @input="doTouch($v.item.PhoneNo)"
                  :error="$v.item.PhoneNo.$error"
                  :error-message="$t('employees.fields.phoneNo.error')"></q-input>
                <q-input
                  v-model="item.Birthdate"
                  color="dark"
                  required
                  autocapitalize="words"
                  type="date"
                  stack-label
                  :label="$t('employees.fields.birthdate.label')"
                  @input="doTouch($v.item.Birthdate)"
                  :error="$v.item.Birthdate.$error"
                  :error-message="$t('employees.fields.birthdate.error')"></q-input>
                <q-input
                  v-model="item.PositionTitle"
                  color="dark"
                  required
                  autocapitalize="words"
                  :label="$t('employees.fields.positionTitle.label')"
                  @input="doTouch($v.item.PositionTitle)"
                  :error="$v.item.PositionTitle.$error"
                  :error-message="$t('employees.fields.positionTitle.error')"></q-input>
                <q-input
                  v-model="item.Description"
                  color="dark"
                  required
                  autocapitalize="words"
                  :label="$t('employees.fields.description.label')"
                  @input="doTouch($v.item.Description)"
                  :error="$v.item.Description.$error"
                  :error-message="$t('employees.fields.description.error')"></q-input>
                <q-input
                  v-model.number="item.Commission"
                  color="dark"
                  required
                  type="number"
                  autocapitalize="words"
                  :label="$t('employees.fields.commission.label')"
                  @input="doTouch($v.item.Commission)"
                  :error="$v.item.Commission.$error"
                  :error-message="$t('employees.fields.commission.error')"></q-input>
                <q-select
                  v-model="item.Role_ID"
                  color="dark"
                  required
                  emit-value
                  map-options
                  :options="roleOptions"
                  autocapitalize="words"
                  :label="$t('employees.fields.role.label')"
                  @input="doTouch($v.item.Role_ID)"
                  :error="$v.item.Role_ID.$error"
                  :error-message="$t('employees.fields.role.error')"></q-select>
                <q-select
                  v-model="item.Salary_ID"
                  color="dark"
                  required
                  emit-value
                  map-options
                  :options="salaryOptions"
                  autocapitalize="words"
                  :label="$t('employees.fields.salary.label')"
                  @input="doTouch($v.item.Salary_ID)"
                  :error="$v.item.Salary_ID.$error"
                  :error-message="$t('employees.fields.salary.error')"></q-select>
                <q-select
                  v-model="item.Manager_ID"
                  color="dark"
                  required
                  emit-value
                  map-options
                  :options="managerOptions"
                  autocapitalize="words"
                  :label="$t('employees.fields.manager.label')"
                  @input="doTouch($v.item.Manager_ID)"
                  :error="$v.item.Manager_ID.$error"
                  :error-message="$t('employees.fields.manager.error')"></q-select>
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
import { required, email, numeric } from 'vuelidate/lib/validators'

const icons = {
  add: 'add',
  update: 'save',
  remove: 'delete',
  cancel: 'close'
}

export default {
  name: 'EmployeesDetails',
  props: {
    value: Object,
    locked: Boolean,
    usage: String,
    roles: Array,
    salaries: Array,
    users: Array
  },
  data () {
    return {
      item: clone(this.value.item)
    }
  },
  validations: {
    item: {
      FirstName: {
        required
      },
      LastName: {
        required
      },
      Email: {
        required,
        email
      },
      Birthdate: {
        required
      },
      PhoneNo: {
        required,
        numeric
      },
      PositionTitle: {
        required
      },
      Description: {
        required
      },
      Commission: {
        required,
        numeric
      },
      Role_ID: {
        required
      },
      Salary_ID: {
        required
      },
      Manager_ID: {
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
    salaryOptions () {
      return this.salaries.map((o) => ({
        label: `Amount: ${o.Amount}`,
        sublabel: `Pay date: ${o.Paydate}`,
        value: o.ID
      }))
    },
    roleOptions () {
      return this.roles.map((o) => ({
        label: o.Type,
        value: o.ID
      }))
    },
    managerOptions () {
      return this.users.map((o) => ({
        label: `${o.FirstName} ${o.LastName}`,
        value: o.ID
      }))
    },
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
