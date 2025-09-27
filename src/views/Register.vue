<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">Create an Account</h1>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Choose a username"
          />
        </div>
        <!-- In a real app, you would have a password field here -->
        <div v-if="userStore.error" class="text-sm text-red-600">
          {{ userStore.error }}
        </div>
        <button
          type="submit"
          :disabled="userStore.isLoading"
          class="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          <span v-if="userStore.isLoading">Registering...</span>
          <span v-else>Register</span>
        </button>
      </form>
      <p class="text-sm text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const username = ref('');
const userStore = useUserStore();
const router = useRouter();

async function handleRegister() {
  if (!username.value.trim()) {
    alert('Username cannot be empty.');
    return;
  }
  try {
    await userStore.register(username.value);
    alert('Registration successful! Please log in.');
    router.push('/login');
  } catch (err) {
    // Error is handled in the store, but you could add component-specific error handling here
    console.error('Registration failed:', err);
  }
}
</script>