/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/',
    name: 'home',
    components: { default: () => import('../pages/home.vue') },
   },
  {
    path: '/favorites',
    name: 'favorites',
    components: { default: () => import('../pages/favorites.vue') },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'home' },
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes
})
export default router
