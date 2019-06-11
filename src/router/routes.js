
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
        component: () => import('pages/dashboard/Index.vue')
      },
      {
        path: '/appointments',
        name: 'appointments',
        component: () => import('pages/appointments/Index.vue')
      },
      {
        path: '/patients',
        name: 'patients',
        component: () => import('pages/patients/Index.vue')
      },
      {
        path: '/employees',
        name: 'employees',
        component: () => import('pages/employees/Index.vue')
      },
      {
        path: '/treatments',
        name: 'treatments',
        component: () => import('pages/treatments/Index.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/settings/Index.vue')
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
