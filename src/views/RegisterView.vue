<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Adjust the import path as necessary

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const router = useRouter()
const userStore = useAuthStore()

const handleRegister = async () => {
  error.value = null
  successMessage.value = null
  try {
    await userStore.register({ username: username.value, password: password.value })
    successMessage.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <!-- 标题 -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

      <!-- 表单 -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- 用户名 -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- 密码 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- 错误提示 -->
        <p
          v-if="error"
          class="text-red-500 bg-red-100 border border-red-300 rounded-md px-3 py-2 text-sm"
        >
          {{ error }}
        </p>

        <!-- 成功提示 -->
        <p
          v-if="successMessage"
          class="text-green-600 bg-green-100 border border-green-300 rounded-md px-3 py-2 text-sm"
        >
          {{ successMessage }}
        </p>

        <!-- 注册按钮 -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      <!-- 登录引导 -->
      <p class="text-center text-gray-600 text-sm mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>
