import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Import views
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import MessageBoard from '@/views/MessageBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'MessageBoard',
      component: MessageBoard,
      meta: { requiresAuth: true }, // This route requires authentication
    },
    // Redirect to login if route not found
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires auth and the user is not authenticated,
    // redirect to the login page.
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    // If the user is authenticated, they should not access login/register pages.
    // Redirect them to the main message board.
    next('/')
  } else {
    // Otherwise, allow the navigation.
    next()
  }
})

export default router
