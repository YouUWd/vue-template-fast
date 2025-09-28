<script setup lang="ts">
import type { Message } from '@/types'

defineProps<{
  message: Message
  currentUserId: number
}>()

const emit = defineEmits<{
  (e: 'deleteMessage', messageId: number): void
}>()

const handleDelete = (messageId: number) => {
  if (confirm('Are you sure you want to delete this message?')) {
    emit('deleteMessage', messageId)
  }
}
</script>

<template>
  <li class="flex justify-between items-start border-b border-gray-200 pb-3 last:border-b-0">
    <div class="flex-1">
      <p class="text-gray-800">{{ message.content }}</p>
      <small class="text-gray-500">
        by <span class="font-medium text-gray-700">{{ message.author }}</span>
        · {{ new Date(message.time).toLocaleString() }}
      </small>
    </div>
    <button
      v-if="currentUserId && currentUserId === message.userId"
      @click="handleDelete(message.id)"
      class="ml-4 text-sm text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  </li>
</template>