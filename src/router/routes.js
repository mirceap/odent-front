
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
        component: () => import('pages/dashboard/index')
      },
      {
        path: '/appointments',
        name: 'appointments',
        component: () => import('pages/appointments/index')
      },
      {
        path: '/patients',
        name: 'patients',
        component: () => import('pages/patients/index')
      },
      {
        path: '/employees',
        name: 'employees',
        component: () => import('pages/employees/index')
      },
      {
        path: '/treatments',
        name: 'treatments',
        component: () => import('pages/treatments/index')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/settings/index')
      }
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
