import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Message } from '@/types';
import * as api from '@/utils/request';
import { useUserStore } from './user';

export const useMessageStore = defineStore('message', () => {
  // --- State ---
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- Actions ---

  /**
   * Fetches all messages from the API.
   */
  async function fetchMessages() {
    isLoading.value = true;
    error.value = null;
    try {
      messages.value = await api.fetchMessages();
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch messages.';
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Posts a new message.
   */
  async function postMessage(content: string) {
    isLoading.value = true;
    error.value = null;
    const userStore = useUserStore();
    if (!userStore.user?.id) {
      error.value = 'You must be logged in to post a message.';
      isLoading.value = false;
      return;
    }

    try {
      const newMessage = await api.postMessage(content, userStore.user.id);
      // Add the new message to the top of the list
      messages.value.unshift(newMessage);
    } catch (e: any) {
      error.value = e.message || 'Failed to post message.';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a message by its ID.
   */
  async function deleteMessage(messageId: number) {
    isLoading.value = true;
    error.value = null;
    const userStore = useUserStore();
    if (!userStore.user?.id) {
      error.value = 'You must be logged in to delete a message.';
      isLoading.value = false;
      return;
    }

    try {
      await api.deleteMessage(messageId, userStore.user.id);
      const index = messages.value.findIndex(m => m.id === messageId);
      if (index !== -1) {
        messages.value.splice(index, 1);
      }
    } catch (e: any) {
      error.value = e.message || 'Failed to delete message.';
      // Re-throw so the component can know about the error (e.g., to show a notification)
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    messages,
    isLoading,
    error,
    fetchMessages,
    postMessage,
    deleteMessage,
  };
});