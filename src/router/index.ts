import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hub',
      component: () => import('@/views/HubView.vue')
    },
    {
      path: '/fiche/:id',
      name: 'fiche',
      component: () => import('@/views/FicheView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
