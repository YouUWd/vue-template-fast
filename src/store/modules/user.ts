import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as api from '@/api'
import type { User, LoginForm } from '@/types'
import type { LoginResponse } from '@/types/api'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const setError = (newError: string | null) => {
    error.value = newError
  }

  const setLoading = (loadingState: boolean) => {
    isLoading.value = loadingState
  }

  async function login(credentials: LoginForm) {
    setLoading(true)
    setError(null)
    try {
      const response: LoginResponse = await api.login(credentials)
      setToken(response.token)
      setUser(response.user)
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function register(credentials: Omit<User, 'id'>) {
    setLoading(true)
    setError(null)
    try {
      await api.register(credentials)
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Registration failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function fetchUser() {
    if (!token.value) return
    setLoading(true)
    setError(null)
    try {
      const fetchedUser = await api.fetchUserProfile()
      setUser(fetchedUser)
    } catch (e) {
      // If fetching user fails, token might be invalid, so logout
      logout()
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch user profile'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
  }

  async function init() {
    if (token.value) {
      await fetchUser()
    }
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
    fetchUser,
    init,
  }
})