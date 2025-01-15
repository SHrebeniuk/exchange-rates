import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainPage.vue'),
    },
    {
      path: '/changed-rates',
      name: 'changedRates',
      component: () => import('../views/ChangedRatesPage.vue'),
    },
    {
      path: '/changed-rates/:code',
      name: 'changeRate',
      component: () => import('../views/ChangedRatesPage.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue'),
    },
  ],
})

export default router
