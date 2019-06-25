<template>
  <div class="container">
    <q-card
      class="my-card text-white q-layout-padding row justify-center"
    >
      <q-card-section class="text-center full-width">
        <div class="text-h6 margins">{{$t('auth.sign_in_title')}}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 margins">{{ error }}</div>
      </q-card-section>

      <q-card-section>
        <form class="column" @submit.prevent>
          <div class="layout-padding">
            <q-input
              class="margin-bottom"
              v-model="loginInfo.user"
              bg-color="white"
              rounded outlined
              required
              :label="$t('auth.fields.user.label')"></q-input>
            <q-input
              v-model="loginInfo.password"
              bg-color="white"
              rounded outlined
              required
              type="password"
              :label="$t('auth.fields.password.label')"></q-input>
          </div>
        </form>
      </q-card-section>
      <q-card-section>
        <q-btn
          :label="$t('auth.log_in')" @click="mockupLoginWithPassword()" class="margins" color="white" text-color="black"></q-btn>
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
  data () {
    return {
      loginInfo: {
        user: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    ...mapMutations('auth', [
      'SET_MOCKUP'
    ]),
    mockupLogin (role) {
      this.SET_MOCKUP(role)
    },
    mockupLoginWithPassword () {
      if (this.loginInfo.user === this.loginInfo.password) {
        switch (this.loginInfo.user) {
          case 'admin': this.mockupLogin('admin'); break
          case 'patient': this.mockupLogin('patient'); break
          case 'doctor': this.mockupLogin('doctor'); break
          default: this.error = 'Wrong credentials!'
        }
      } else {
        this.error = 'Wrong credentials'
        this.loginInfo = {
          user: '',
          password: ''
        }
      }
    }
  }
}
</script>
