<template>
  <div class="container">
    <q-card
      class="my-card text-white q-layout-padding row justify-center"
    >
      <q-card-section>
        <div class="text-h6 margins">{{$t('auth.sign_in_title')}}</div>
        <div class="text-subtitle2 margins">{{$t('auth.sign_in_error')}}</div>
      </q-card-section>

      <q-card-section>
        <q-btn
          :label="$t('auth.log_in_admin')" @click="mockupLogin('admin')" class="margins" color="white" text-color="black"></q-btn>
      </q-card-section>
      <q-card-section>
        <q-btn
          :label="$t('auth.log_in_doctor')" @click="mockupLogin('doctor')" class="margins" color="white" text-color="black"></q-btn>
      </q-card-section>
      <q-card-section>
        <q-btn
          :label="$t('auth.log_in_pacient')" @click="mockupLogin('patient')" class="margins" color="white" text-color="black"></q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 250px
    background $primary
  .margins
    margin 10px
  .container
    height 100vh
    display flex
    align-items center
    justify-content center
</style>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LoginForm',
  props: {
    open: Boolean
  },
  methods: {
    ...mapMutations('auth', [
      'SET_MOCKUP'
    ]),
    mockupLogin (role) {
      this.SET_MOCKUP(role)
    }
  }
}
</script>
