<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const router = useRouter()
const { isAuthenticated, username } = storeToRefs(userStore)

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-md w-full">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-xl font-bold text-gray-800">
        <router-link to="/">Message Board</router-link>
      </h1>
      <div v-if="isAuthenticated" class="flex items-center space-x-4">
        <span class="text-gray-700">Welcome, {{ username }}</span>
        <button
          @click="handleLogout"
          class="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>