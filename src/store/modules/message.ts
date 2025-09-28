import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Message } from '@/types'
import * as api from '@/api'
import { useUserStore } from './user'

export const useMessageStore = defineStore('message', () => {
  // State
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchMessages() {
    isLoading.value = true
    error.value = null
    try {
      messages.value = await api.fetchMessages()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
    } finally {
      isLoading.value = false
    }
  }

  async function postMessage(content: string) {
    const userStore = useUserStore()
    if (!userStore.isAuthenticated) {
      throw new Error('User must be logged in to post a message.')
    }

    isLoading.value = true
    error.value = null
    try {
      // The backend will create the message and return the created object.
      // We add it to the top of our local list for an immediate UI update.
      const newMessage = await api.postMessage(content)
      messages.value.unshift(newMessage) // Add to the beginning of the array
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
    } finally {
      isLoading.value = false
    }
  }

  async function deleteMessage(messageId: number) {
    const userStore = useUserStore()
    if (!userStore.isAuthenticated) {
      throw new Error('User must be logged in to delete a message.')
    }

    const originalMessages = [...messages.value]
    // Optimistic update: remove the message from the UI immediately.
    messages.value = messages.value.filter((m) => m.id !== messageId)

    isLoading.value = true
    error.value = null
    try {
      // The backend will handle authorization.
      await api.deleteMessage(messageId)
    } catch (e) {
      // If the API call fails, revert the change and show an error.
      messages.value = originalMessages
      error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    isLoading,
    error,
    fetchMessages,
    postMessage,
    deleteMessage,
  }
})
