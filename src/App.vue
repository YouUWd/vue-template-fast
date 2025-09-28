<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import TheHeader from '@/components/Layout/TheHeader.vue';

const userStore = useAuthStore();
const { isAuthenticated } = storeToRefs(userStore);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <TheHeader v-if="isAuthenticated" />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>
