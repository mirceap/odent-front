
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/dashboard/Index.vue'),
        props: true
      },
      {
        path: '/appointments/:idItem?',
        name: 'appointments',
        component: () => import('pages/appointments/Index.vue'),
        props: true

      },
      {
        path: '/patients/:idItem?',
        name: 'patients',
        component: () => import('pages/patients/Index.vue'),
        props: true

      },
      {
        path: '/employees/:idItem?',
        name: 'employees',
        component: () => import('pages/employees/Index.vue'),
        props: true

      },
      {
        path: '/treatments/:idItem?',
        name: 'treatments',
        component: () => import('pages/treatments/Index.vue'),
        props: true

      }
      // {
      //   path: '/settings/:idItem?',
      //   name: 'settings',
      //   component: () => import('pages/settings/Index.vue'),
      //   props: true
      // }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
