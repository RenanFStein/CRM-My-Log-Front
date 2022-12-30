import { createRouter, createWebHistory } from 'vue-router'
import dashboard from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: dashboard,
      children: [
        {
          path: '/veiculos',
          name: 'veiculos',
          component: () => import(/* webpackChunkName: "Overview" */ '../views/dashboard/Veiculos.vue')
        },
        {
          path: '/fretes',
          name: 'fretes',
          component: () => import(/* webpackChunkName: "Messages" */ '../views/dashboard/Fretes.vue')
        },
        {
          path: '/financeiro',
          name: 'financeiro',
          component: () => import(/* webpackChunkName: "Profile" */ '../views/dashboard/Financeiro.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "Settings" */ '../views/dashboard/Dashboard.vue')
        }
      ]
    }

  ]
})

export default router
