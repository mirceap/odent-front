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
          <q-btn flat :to="{ name: 'home' }">
            Odent App
          </q-btn>
        </q-toolbar-title>

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
        <q-item clickable :to="{ name: 'dashboard' }">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.dashboard')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'appointments' }">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.appointments')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'patients' }">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.patients')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'employees' }">
          <q-item-section avatar>
            <q-icon name="supervised_user_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.employees')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'treatments' }">
          <q-item-section avatar>
            <q-icon name="healing" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.treatments')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{ name: 'settings' }">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{$t('menu.settings')}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapMutations } from 'vuex'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    ...mapMutations('auth', [
      'CLEAR_CREDENTIALS'
    ])
  }
}
</script>

<style>
</style>
