<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { isAuthenticated, username } = storeToRefs(userStore);

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- 标题 -->
      <h1 class="text-xl font-bold text-gray-800">Message Board</h1>

      <!-- 用户信息/按钮 -->
      <div v-if="isAuthenticated" class="flex items-center space-x-4">
        <span class="hidden sm:inline text-gray-600">
          Welcome, <span class="font-semibold text-gray-800">{{ username }}</span>!
        </span>
        <button @click="handleLogout"
          class="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition text-sm">
          Logout
        </button>
      </div>

      <!-- 未登录时可放登录/注册按钮 -->
      <div v-else class="space-x-2">
        <router-link to="/login" class="text-sm font-medium text-blue-600 hover:underline">
          Login
        </router-link>
        <router-link to="/register" class="text-sm font-medium text-blue-600 hover:underline">
          Register
        </router-link>
      </div>
    </div>
  </header>
</template>
