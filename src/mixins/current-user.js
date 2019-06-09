import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', [
      'credentials'
    ]),
    currentUser () {
      const credentials = this.credentials || {}
      return {
        credentials,
        is: {
          admin: credentials.role === 'admin',
          doctor: credentials.role === 'doctor',
          patient: credentials.role === 'patient'
        },
        canSee: {
          dashboard: ['admin', 'doctor', 'patient'].indexOf(credentials.role) > -1,
          appointments: ['admin', 'doctor', 'patient'].indexOf(credentials.role) > -1,
          employees: ['admin'].indexOf(credentials.role) > -1,
          patients: ['admin', 'doctor'].indexOf(credentials.role) > -1,
          treatments: ['admin'].indexOf(credentials.role) > -1,
          settings: ['admin'].indexOf(credentials.role) > -1
        }
      }
    }
  }
}
