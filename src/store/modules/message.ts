import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as api from '@/api'
import type { Message } from '@/types'

export const useMessageStore = defineStore('message', () => {
  // State
  const messages = ref<Message[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const total = ref(0)
  const currentPage = ref(1)
  const limit = ref(10)

  // Actions
  const setLoading = (loadingState: boolean) => {
    isLoading.value = loadingState
  }

  const setError = (newError: string | null) => {
    error.value = newError
  }

  async function fetchMessages(page = 1) {
    setLoading(true)
    setError(null)
    try {
      // This assumes the API will eventually support pagination.
      // For now, we fetch all messages and handle pagination client-side if needed,
      // or prepare for a future API that returns a paginated response.
      const response = await api.fetchMessages() // Assuming it returns Message[] for now
      messages.value = response
      total.value = response.length
      currentPage.value = page
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to fetch messages'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function createMessage(content: string) {
    setLoading(true)
    setError(null)
    try {
      const newMessage = await api.postMessage(content)
      messages.value.unshift(newMessage)
      total.value += 1
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to post message'
      setError(errorMessage)
      throw new Error(errorMessage) // Re-throw to be caught in the component
    } finally {
      setLoading(false)
    }
  }

  async function deleteMessage(id: number) {
    const originalMessages = [...messages.value]
    messages.value = messages.value.filter((msg) => msg.id !== id)
    total.value -= 1

    setError(null)
    try {
      await api.deleteMessage(id)
    } catch (e) {
      // Revert if the API call fails
      messages.value = originalMessages
      total.value += 1
      const errorMessage = e instanceof Error ? e.message : 'Failed to delete message'
      setError(errorMessage)
    }
  }

  return {
    messages,
    isLoading,
    error,
    total,
    currentPage,
    limit,
    fetchMessages,
    createMessage,
    deleteMessage,
  }
})