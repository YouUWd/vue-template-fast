import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User, LoginResponse } from '@/types'
import * as api from '@/utils/request'

// Helper to get initial state from localStorage
const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('user')
  return storedUser ? JSON.parse(storedUser) : null
}

const getInitialToken = (): string | null => {
  return localStorage.getItem('token')
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(getInitialUser())
  const token = ref<string | null>(getInitialToken())

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const username = computed(() => user.value?.username)

  // Actions
  async function login(credentials: Omit<User, 'id'>) {
    const response: LoginResponse = await api.login(credentials)
    user.value = response.user
    token.value = response.token
    localStorage.setItem('user', JSON.stringify(response.user))
    localStorage.setItem('token', response.token)
  }

  async function register(credentials: Omit<User, 'id'>) {
    await api.register(credentials)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // Optionally, redirect to login page
    // This is better handled in the component or router guard
  }

  return {
    user,
    token,
    isAuthenticated,
    username,
    login,
    register,
    logout,
  }
})
