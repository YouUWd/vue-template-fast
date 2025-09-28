import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth'
import { storage } from '@/utils/storage'
import type { User, LoginForm, RegisterForm } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // Initialize state as empty. initAuth will populate it from storage.
  const token = ref<string>('')
  const user = ref<User | null>(null)
  const loading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  const login = async (form: LoginForm) => {
    loading.value = true
    try {
      const response = await authAPI.login(form)
      token.value = response.token
      user.value = response.user
      storage.set('token', response.token)
      storage.set('user', response.user)
      return response
    } finally {
      loading.value = false
    }
  }

  const register = async (form: RegisterForm) => {
    loading.value = true
    try {
      const response = await authAPI.register(form)
      token.value = response.token
      user.value = response.user
      storage.set('token', response.token)
      storage.set('user', response.user)
      return response
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = ''
    user.value = null
    storage.remove('token')
    storage.remove('user')
  }

  const initAuth = () => {
    // This function is called from App.vue to initialize the state from localStorage.
    const storedToken = storage.get<string>('token')
    const storedUser = storage.get<User>('user')
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = storedUser
    }
  }

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth
  }
})