<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { LoginForm } from '@/types'

const form = ref<LoginForm>({
  username: '',
  password: '',
})

const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    await userStore.login(form.value)
    router.push('/')
  } catch (e) {
    // Error is now handled in the store, and the component can react to it.
    // The error will be displayed via `userStore.error`.
    console.error('Login failed:', e)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input id="username" v-model="form.username" type="text" required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" v-model="form.password" type="password" required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <p v-if="userStore.error" class="text-red-500 bg-red-100 border border-red-300 rounded-md px-3 py-2 text-sm">
          {{ userStore.error }}
        </p>
        <button type="submit" :disabled="userStore.isLoading"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400">
          {{ userStore.isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-4">
        Don’t have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>