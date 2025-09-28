<template>
  <div class="home-container">
    <h1>Welcome to the Message Board</h1>
    <p v-if="!authStore.isAuthenticated">
      Please <router-link to="/login">login</router-link> or
      <router-link to="/register">register</router-link> to continue.
    </p>
    <p v-else>
      Go to the <router-link to="/messages">message board</router-link>.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>