<script setup lang="ts">
import { onMounted } from 'vue'
import { useMessageStore } from '@/store/modules/message'
import { useUserStore } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import MessageForm from '@/components/business/MessageForm.vue'
import MessageItem from '@/components/business/MessageItem.vue'

const messageStore = useMessageStore()
const userStore = useUserStore()

const { messages, isLoading, error } = storeToRefs(messageStore)
const { user } = storeToRefs(userStore)

onMounted(() => {
  messageStore.fetchMessages()
})

const handleCreateMessage = async (content: string) => {
  try {
    await messageStore.createMessage(content)
  } catch (e) {
    // The store now handles the error state. We can log it here for debugging.
    console.error('Failed to create message:', e)
  }
}

const handleDeleteMessage = async (messageId: number) => {
  await messageStore.deleteMessage(messageId)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
    <div v-if="isLoading && !messages.length" class="text-gray-500 text-lg">Loading messages...</div>

    <div v-if="error" class="text-red-500 font-medium bg-red-100 border border-red-300 rounded-md px-4 py-2 mb-4">
      {{ error }}
    </div>

    <MessageForm @createMessage="handleCreateMessage" />

    <div v-if="messages.length" class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Messages ({{ messageStore.total }})</h3>
      <ul v-if="user" class="space-y-4">
        <MessageItem
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :current-user-id="user.id"
          @delete-message="handleDeleteMessage"
        />
      </ul>
    </div>

    <div v-else-if="!isLoading && !error" class="text-gray-500 text-lg mt-6">
      No messages yet. Be the first to post!
    </div>
  </div>
</template>