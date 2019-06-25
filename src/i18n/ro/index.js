// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Actiune esuata',
  success: 'Actiune realizata cu succes',
  auth: {
    sign_in_title: 'Autentificare',
    sign_in_error: '',
    log_in_admin: 'Autentificare ca Admin',
    log_in_doctor: 'Autentificare ca Doctor',
    log_in_patient: 'Autentificare ca Pacient',
    log_out: 'Iesire din cont',
    log_in: 'Autentificare',
    fields: {
      user: {
        label: 'User'
      },
      password: {
        label: 'Parola'
      }
    }
  },
  menu: {
    dashboard: 'Panou statistici',
    appointments: 'Programari',
    patients: 'Pacienti',
    employees: 'Angajati',
    treatments: 'Tratamente',
    settings: 'Setari'
  },
  http: {
    an_unknown_error_occured: 'Eroare necunoscuta.',
    cancel: 'Anulare',
    connection_problem: 'Problema la conectare',
    connection_problem_retry: 'Problema la conectare - Incercare in {sec} secunde.',
    cannot_connect_to_server: 'Conexiunea la server a esuat',
    request_cancelled: 'Conexiune anulata',
    retry: 'Reincercare'
  },
  generic: {
    yes: 'Da',
    no: 'Nu',
    any: 'Oricare',
    confirm: 'Confirm',
    nothing_found: 'Nicio intrare gasita',
    back_to_list: 'Inapoi la listaa',
    back: 'Inapoi',
    filters: 'Filtru',
    search: 'Cautare',
    reset: 'Resetare',
    add: 'Adauga',
    actions: {
      add: 'Adauga',
      cancel: 'Anulare',
      update: 'Editare',
      confirm_cancel_cancel: 'Anulare',
      confirm_cancel_ok: 'Ok',
      confirm_cancel_message: 'Esti sigur ca doresti anularea modificarilor?',
      confirm_cancel_title: 'Atentie!'
    },
    confirm_delete_cancel: 'Anulare',
    confirm_delete_ok: 'Stergere',
    confirm_delete_message: 'Esti sigur ca vrei sa stergi aceasta intrare?',
    confirm_delete_title: 'Atentie!',
    delete_notifications: {
      success: 'Intrare stearsa cu success',
      fail: 'Eroare la stergere'
    }
  },
  employees: {
    firstName: 'Prenume',
    lastName: 'Nume',
    email: 'Email',
    phoneNo: 'Numar telefon',
    birthdate: 'Data nasterii',
    positionTitle: 'Postul ocupat',
    fields: {
      firstname: {
        label: 'Firstname',
        error: 'Please add the firstname'
      },
      lastname: {
        label: 'Lastname',
        error: 'Please add the lastname'
      },
      birthdate: {
        label: 'Birthdate',
        error: 'Please add the birthdate'
      },
      phoneNo: {
        label: 'Phone Number',
        error: 'Please add the phone number'
      },
      email: {
        label: 'Email',
        error: 'Please add the email'
      },
      description: {
        label: 'Description',
        error: 'Please add the description'
      },
      positionTitle: {
        label: 'Position Title',
        error: 'Please add the position title'
      },
      role: {
        label: 'Role',
        error: 'Please add the role'
      },
      manager: {
        label: 'Manager',
        error: 'Please add the manager'
      },
      salary: {
        label: 'Salary',
        error: 'Please add the salary'
      },
      commission: {
        label: 'Commission',
        error: 'Please add the commission'
      }
    }
  },
  patients: {
    firstName: 'Prenume',
    lastName: 'Nume',
    email: 'Email',
    phoneNo: 'Numarul de telefon',
    birthdate: 'Data nasterii',
    medicalRecord: 'Inregistrari medicale'
  },
  treatments: {
    estimatedDuration: 'Durata estimata (mins)',
    name: 'Nume',
    price: 'Pret',
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
