import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Message } from '@/types'
import * as api from '@/utils/request'
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
    if (!userStore.user) {
      throw new Error('User must be logged in to post a message.')
    }

    isLoading.value = true
    error.value = null
    try {
      // The API call will add the message to the mock data.
      // We then refetch all messages to get the updated list.
      await api.postMessage(content, userStore.user.username, userStore.user.id)
      await fetchMessages() // Refetch to ensure list is sorted and up-to-date
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
    } finally {
      isLoading.value = false
    }
  }

  async function deleteMessage(messageId: number) {
    const userStore = useUserStore()
    if (!userStore.user) {
      throw new Error('User must be logged in to delete a message.')
    }

    isLoading.value = true
    error.value = null
    try {
      await api.deleteMessage(messageId, userStore.user.id)
      // Remove the message from the local state directly for a faster UI update
      messages.value = messages.value.filter((m) => m.id !== messageId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unknown error occurred.'
      // If the API call fails, we might want to refetch to get the true state
      await fetchMessages()
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
