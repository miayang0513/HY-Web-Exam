import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  sensitive: true,
  routes: [
    {
      path: '/',
      name: 'ForYou',
      alias: '/foryou',
      component: () => import('@/views/PageForYou.vue'),
    },
    {
      path: '/following',
      name: 'Following',
      component: () => import('@/views/PageFollowing.vue'),
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/PageError.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/foryou',
    },
  ],
})

export default router
