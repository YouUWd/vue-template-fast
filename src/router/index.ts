import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import MessageBoard from '@/views/MessageBoard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MessageBoard',
      component: MessageBoard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true },
    },
    // Redirect unknown paths to the main page
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // This route requires auth, but the user is not logged in.
    // Redirect to the login page.
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // This route is for guests, but the user is logged in.
    // Redirect to the message board.
    next({ name: 'MessageBoard' });
  } else {
    // The user is allowed to proceed.
    next();
  }
});

export default router;