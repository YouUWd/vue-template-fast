<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div class="container max-w-4xl px-4 py-3 mx-auto">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-indigo-600">Message Board</h1>
          <div class="flex items-center space-x-4">
            <span class="text-gray-800">Welcome, <span class="font-semibold">{{ userStore.user?.username }}</span>!</span>
            <button
              @click="handleLogout"
              class="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container max-w-4xl px-4 pt-24 pb-8 mx-auto">
      <!-- Post Message Form -->
      <div class="p-4 mb-6 bg-white rounded-lg shadow">
        <form @submit.prevent="handlePostMessage">
          <h2 class="mb-2 text-lg font-semibold text-gray-800">Post a new message</h2>
          <textarea
            v-model="newMessageContent"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="What's on your mind?"
            required
          ></textarea>
          <div class="flex justify-end mt-2">
            <button
              type="submit"
              :disabled="messageStore.isLoading"
              class="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              <span v-if="messageStore.isLoading && isPosting">Posting...</span>
              <span v-else>Post</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Message List -->
      <div class="space-y-4">
        <div v-if="messageStore.isLoading && !isPosting" class="text-center text-gray-500">
          Loading messages...
        </div>
        <div v-else-if="messageStore.error" class="p-4 text-red-700 bg-red-100 rounded-md">
          Error: {{ messageStore.error }}
        </div>
        <div v-else-if="messageStore.messages.length === 0" class="text-center text-gray-500">
          No messages yet. Be the first to post!
        </div>
        <MessageItem
          v-for="message in messageStore.messages"
          :key="message.id"
          :message="message"
          @delete="handleDeleteMessage(message.id)"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useMessageStore } from '@/stores/message';
import MessageItem from '@/components/MessageItem.vue';

const userStore = useUserStore();
const messageStore = useMessageStore();
const router = useRouter();

const newMessageContent = ref('');
const isPosting = ref(false);

onMounted(() => {
  messageStore.fetchMessages();
});

function handleLogout() {
  userStore.logout();
  router.push('/login');
}

async function handlePostMessage() {
  if (!newMessageContent.value.trim()) return;
  isPosting.value = true;
  try {
    await messageStore.postMessage(newMessageContent.value);
    newMessageContent.value = '';
  } catch (err) {
    console.error('Failed to post message:', err);
    alert('Could not post your message. Please try again.');
  } finally {
    isPosting.value = false;
  }
}

async function handleDeleteMessage(messageId: number) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  try {
    await messageStore.deleteMessage(messageId);
  } catch (err) {
    console.error('Failed to delete message:', err);
    alert('You are not authorized to delete this message.');
  }
}
</script>