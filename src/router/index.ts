import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Assuming a Home.vue will be created or exists.
      // For now, let's redirect to messages if logged in, or login if not.
      redirect: () => {
        const authStore = useAuthStore()
        return authStore.isAuthenticated ? '/messages' : '/login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessageBoard.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // The init process in main.ts should complete before this runs.
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/messages')
  } else {
    next()
  }
})

export default router