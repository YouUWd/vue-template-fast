import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';
import * as api from '@/utils/request';

export const useUserStore = defineStore('user', () => {
  // --- State ---
  const user = ref<User | null>(JSON.parse(localStorage.getItem('__user__') || 'null'));
  const token = ref<string | null>(localStorage.getItem('__token__') || null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // --- Actions ---

  /**
   * Handles user login.
   */
  async function login(username: string) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.login(username);
      user.value = response.user;
      token.value = response.token;
      localStorage.setItem('__user__', JSON.stringify(response.user));
      localStorage.setItem('__token__', response.token);
    } catch (e: any) {
      error.value = e.message || 'Failed to login.';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Handles user registration.
   */
  async function register(username: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await api.register(username);
      // Optional: automatically log in after registration
      // await login(username);
    } catch (e: any) {
      error.value = e.message || 'Failed to register.';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Logs the user out.
   */
  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('__user__');
    localStorage.removeItem('__token__');
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  };
});