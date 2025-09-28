import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

// Import pages from the new 'pages' directory
import LoginPage from '@/pages/Login/index.vue'
import RegisterPage from '@/pages/Register/index.vue'
import MessageBoardPage from '@/pages/MessageBoard/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginView', // The name can remain for logic purposes
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'RegisterView', // The name can remain for logic purposes
      component: RegisterPage,
    },
    {
      path: '/',
      name: 'MessageBoard',
      component: MessageBoardPage,
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
  } else if ((to.name === 'LoginView' || to.name === 'RegisterView') && isAuthenticated) {
    // If the user is authenticated, they should not access login/register pages.
    // Redirect them to the main message board.
    next('/')
  } else {
    // Otherwise, allow the navigation.
    next()
  }
})

export default router