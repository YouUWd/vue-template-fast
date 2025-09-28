<template>
  <div class="message-form">
    <h3>发表留言</h3>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="newMessage"
        placeholder="请输入您的留言..."
        rows="4"
        required
      ></textarea>
      <button type="submit" :disabled="!newMessage.trim()">
        发布留言
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', content: string): void
}>()

const newMessage = ref('')

const handleSubmit = () => {
  if (newMessage.value.trim()) {
    emit('submit', newMessage.value)
    newMessage.value = ''
  }
}
</script>