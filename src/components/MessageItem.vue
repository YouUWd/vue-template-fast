<template>
  <div class="p-4 space-y-2 bg-white rounded-lg shadow">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="font-bold text-indigo-600">{{ message.author.username }}</span>
        <span class="text-xs text-gray-500">{{ formattedTime }}</span>
      </div>
      <button
        v-if="canDelete"
        @click="emit('delete')"
        class="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Delete message"
      >
        <!-- Heroicons: XMarkIcon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
    <p class="text-gray-800">
      {{ message.content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '@/types';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  message: Message;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();

const userStore = useUserStore();

const canDelete = computed(() => {
  return userStore.user?.id === props.message.author.id;
});

const formattedTime = computed(() => {
  return new Date(props.message.time).toLocaleString();
});
</script>