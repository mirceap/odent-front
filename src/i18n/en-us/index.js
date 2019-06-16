// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  auth: {
    sign_in_title: 'Sign in',
    sign_in_error: '',
    log_in_admin: 'Log In as Admin',
    log_in_doctor: 'Log In as Doctor',
    log_in_pacient: 'Log In as Pacient',
    log_out: 'Log Out'
  },
  menu: {
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    patients: 'Patients',
    employees: 'Employees',
    treatments: 'Treatments',
    settings: 'Settings'
  },
  http: {
    an_unknown_error_occured: 'An unknown error occured.',
    cancel: 'Cancel',
    connection_problem: 'Connection problem.',
    connection_problem_retry: 'Connection problem - re-trying in {sec} seconds.',
    cannot_connect_to_server: 'Cannot connect to server.',
    request_cancelled: 'Request cancelled.',
    retry: 'Retry'
  },
  generic: {
    yes: 'Yes',
    no: 'No',
    any: 'Any',
    confirm: 'Confirm',
    nothing_found: 'Nothing found',
    back_to_list: 'Back to list',
    back: 'Back',
    filters: 'Filter',
    search: 'Search',
    reset: 'Reset',
    add: 'Add',
    actions: {
      add: 'Add',
      cancel: 'Cancel',
      update: 'Update',
      confirm_cancel_cancel: 'Cancel',
      confirm_cancel_ok: 'Ok',
      confirm_cancel_message: 'Are you sure you want to discard your data',
      confirm_cancel_title: 'Warning!'
    },
    confirm_delete_cancel: 'Cancel',
    confirm_delete_ok: 'Delete',
    confirm_delete_message: 'Are you sure you want to delete this entry?',
    confirm_delete_title: 'Warning!',
    delete_notifications: {
      success: 'Successfully deleted entry',
      fail: 'Error deleting the entry'
    }
  },
  employees: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'Email',
    phoneNo: 'Phone number',
    birthdate: 'Birthdate',
    positionTitle: 'Position title'
  },
  patients: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'Email',
    phoneNo: 'Phone number',
    birthdate: 'Birthdate',
    medicalRecord: 'Medical Record'
  },
  treatments: {
    estimatedDuration: 'Estimated Duration (mins)',
    name: 'Name',
    price: 'Price',
    fields: {
      estimatedDuration: {
        label: 'Estimated Duration (mins)',
        error: 'Please add the duration of the treatment'
      },
      name: {
        label: 'Name',
        error: 'Please add the name of the treatment'
      },
      price: {
        label: 'Price',
        error: 'Please add the price of the treatment'
      }
    }
  }
}
