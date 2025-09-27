<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import TheHeader from '@/components/TheHeader.vue';

const userStore = useUserStore();
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
