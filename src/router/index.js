import { createRouter, createWebHashHistory } from 'vue-router'
import HubView from '@/views/HubView.vue'
import FicheView from '@/views/FicheView.vue'

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
