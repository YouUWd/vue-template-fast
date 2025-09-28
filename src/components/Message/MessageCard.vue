<script setup lang="ts">
import type { Message } from '@/types/message'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  message: Message
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const authStore = useAuthStore()

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

const handleDelete = () => {
  if (confirm('确定要删除这条留言吗？')) {
    emit('delete', props.message.id)
  }
}
</script>

<template>
  <div class="message-item">
    <div class="message-header">
      <span class="author">{{ message.authorName }}</span>
      <span class="time">{{ formatTime(message.createdAt) }}</span>
      <button
        v-if="message.authorId === authStore.user?.id"
        @click="handleDelete"
        class="delete-btn"
      >
        删除
      </button>
    </div>
    <div class="message-content">{{ message.content }}</div>
  </div>
</template>