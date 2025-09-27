<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
  <div id="app-container">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 1rem;
}
</style>
