import { defineStore } from 'pinia'
import { ref } from 'vue'
import { messageAPI } from '@/api/message'
import type { Message, CreateMessageForm } from '@/types/message'

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const total = ref(0)
  const currentPage = ref(1)
  const limit = ref(10)

  // actions
  const fetchMessages = async (page = 1) => {
    loading.value = true
    try {
      const response = await messageAPI.getMessages(page, limit.value)
      messages.value = response.messages
      total.value = response.total
      currentPage.value = page
    } finally {
      loading.value = false
    }
  }

  const createMessage = async (form: CreateMessageForm) => {
    const newMessage = await messageAPI.createMessage(form)
    messages.value.unshift(newMessage)
    total.value += 1
    return newMessage
  }

  const deleteMessage = async (id: number) => {
    await messageAPI.deleteMessage(id)
    const index = messages.value.findIndex((msg) => msg.id === id)
    if (index > -1) {
      messages.value.splice(index, 1)
      total.value -= 1
    }
  }

  return {
    messages,
    loading,
    total,
    currentPage,
    limit,
    fetchMessages,
    createMessage,
    deleteMessage,
  }
})
