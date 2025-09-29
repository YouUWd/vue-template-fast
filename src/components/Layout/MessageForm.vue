<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'postMessage', content: string): void
}>()

const newMessageContent = ref('')
const isLoading = ref(false)

const handlePostMessage = async () => {
  if (newMessageContent.value.trim() === '') return

  isLoading.value = true
  try {
    // Emit the event for the parent component to handle the API call
    emit('postMessage', newMessageContent.value)
    // Clear the input field after successful post
    newMessageContent.value = ''
  } finally {
    // The parent will control the overall loading state,
    // but we can manage a local loading for the button.
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Post a new message</h3>
    <form @submit.prevent="handlePostMessage" class="space-y-4">
      <textarea
        v-model="newMessageContent"
        placeholder="What's on your mind?"
        required
        rows="3"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        :disabled="isLoading"
      ></textarea>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        :disabled="isLoading || newMessageContent.trim() === ''"
      >
        {{ isLoading ? 'Posting...' : 'Post' }}
      </button>
    </form>
  </div>
</template>
