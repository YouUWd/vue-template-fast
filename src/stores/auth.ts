import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth'
import { storage } from '@/utils/storage'
import type { User, LoginForm, RegisterForm } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const user = ref<User | null>(null)
  const loading = ref(false)

  // getters
  const isAuthenticated = computed(() => !!token.value)

  // actions
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
    initAuth,
  }
})
