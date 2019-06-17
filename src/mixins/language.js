import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('i18n', [
      'languages'
    ]),
    ...mapGetters('i18n', [
      'language'
    ]),
    lang: {
      get () {
        return this.language.value
      },
      set (value) {
        this
          .setLanguage({ language: value })
      }
    }
  },
  methods: {
    ...mapActions('i18n', [
      'setLanguage'
    ])
  }
}
