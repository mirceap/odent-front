<template>
  <div class="container">
    <q-card
      class="my-card text-white q-layout-padding row justify-center"
    >
      <q-card-section class="text-center full-width">
        <div class="text-h6 margins">{{$t('auth.sign_in_title')}}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 margins text-redasd">{{ error }}</div>
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
              :error="$v.loginInfo.user.$error"
              :label="$t('auth.fields.user.label')"></q-input>
            <q-input
              v-model="loginInfo.password"
              bg-color="white"
              rounded outlined
              required
              type="password"
              :error="$v.loginInfo.password.$error"
              :label="$t('auth.fields.password.label')"></q-input>
          </div>
        </form>
      </q-card-section>
      <q-card-section>
        <q-btn
          :label="$t('auth.log_in')" @click="loginBtn()" class="margins" color="white" text-color="black"></q-btn>
      </q-card-section>
      <q-inner-loading :showing="loading"></q-inner-loading>
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
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
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
      error: '',
      loading: false
    }
  },
  validations: {
    loginInfo: {
      user: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    loginBtn () {
      this.loading = true
      if (this.$v.loginInfo.$invalid) {
        this.error = 'Please complete all fields'
      }
      this.login({ email: this.loginInfo.user, password: this.loginInfo.password })
        .then(() => {
          this.loading = false
        })
        .catch((rejection) => {
          this.error = 'Login Failed'
          this.loading = false
          return Promise.reject(rejection)
        })
    }
  }
}
</script>
