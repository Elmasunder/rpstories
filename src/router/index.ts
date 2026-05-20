import { createRouter, createWebHashHistory } from 'vue-router'
import { authState } from '@/store/auth'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hub',
      component: () => import('../views/HubView.vue'),
    },
    {
      path: '/fiche/:id',
      name: 'fiche',
      component: () => import('../views/FicheView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/CreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !authState.user) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authState.user) {
    next({ name: 'hub' })
  } else {
    next()
  }
})

export default router
