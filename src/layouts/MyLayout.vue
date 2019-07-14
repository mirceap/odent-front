<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <q-btn flat :to="{ path: '/' }">
            DentMan App
          </q-btn>
        </q-toolbar-title>

        <q-select dense borderless :options="languages" emit-value map-options v-model="lang" style="margin-right: 20px"></q-select>
        <div>
          <q-btn-dropdown
            color="white"
            dense
            text-color="black"
            icon="people"
          >
            <q-list>
              <q-item clickable @click="CLEAR_CREDENTIALS">
                <q-item-section avatar>
                  <q-avatar icon="exit_to_app" color="white" text-color="black" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{$t('auth.log_out')}}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click="openChangePass">
                <q-item-section avatar>
                  <q-avatar icon="vpn_key" color="white" text-color="black" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{$t('auth.change_pass')}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable :to="{ name: 'dashboard' }" v-if="currentUser.canSee.dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.dashboard')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'appointments' }" v-if="currentUser.canSee.appointments">
          <q-item-section avatar>
            <q-icon name="calendar_today"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.appointments')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'patients' }" v-if="currentUser.canSee.patients">
          <q-item-section avatar>
            <q-icon name="people"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.patients')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'employees' }" v-if="currentUser.canSee.employees">
          <q-item-section avatar>
            <q-icon name="supervised_user_circle"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.employees')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'treatments' }" v-if="currentUser.canSee.treatments">
          <q-item-section avatar>
            <q-icon name="healing"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.treatments')}}</q-item-label>
          </q-item-section>
        </q-item>
<!--        <q-item clickable :to="{ name: 'settings' }" v-if="currentUser.canSee.settings">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="settings"></q-icon>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>{{$t('menu.settings')}}</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-dialog no-esc-dismiss no-backdrop-dismiss v-model="openModal">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="max-height: 20vh">
        <q-header class="bg-black text-white">
          <q-toolbar>
          </q-toolbar>
        </q-header>
        <q-footer class="bg-black text-white">
          <q-toolbar color="dark">
            <q-space></q-space>
            <q-btn class="on-right"
                   color="red"
                   :label="$t(`generic.actions.cancel`)"
                   @click="closeModal()"></q-btn>
            <q-btn class="on-right"
                   color="primary"
                   :label="$t(`generic.actions.savePass`)"
                   @click="changePass()"
                   :disabled="this.disableSave"
            ></q-btn>
          </q-toolbar>
        </q-footer>

        <q-page-container>
          <q-page padding>
            <form class="column" @submit.prevent>
              <div class="layout-padding">
                <q-input
                  v-model="newPass"
                  color="dark"
                  required
                  type="password"
                  :label="$t('auth.newPass.label')"
                  ></q-input>
              </div>
            </form>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import currentUserMixin from '../mixins/current-user'
import languageMixin from '../mixins/language'

export default {
  name: 'MyLayout',
  mixins: [
    currentUserMixin,
    languageMixin
  ],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      openModal: false,
      newPass: '',
      disableSave: true
    }
  },
  watch: {
    newPass () {
      if (!(this.newPass === null || this.newPass === '')) {
        this.disableSave = false
      }
    }
  },
  methods: {
    ...mapMutations('auth', [
      'CLEAR_CREDENTIALS'
    ]),
    ...mapActions('auth', [
      'changePassword'
    ]),
    openChangePass () {
      this.openModal = true
    },
    changePass () {
      this.changePassword(this.newPass).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('generic.actions.success'),
          position: 'bottom-right'
        })
        this.newPass = ''
        this.disableSave = false
        this.openModal = false
      })
    },
    closeModal () {
      this.openModal = false
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
