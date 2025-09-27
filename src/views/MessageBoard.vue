<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const newMessageContent = ref('');
const messageStore = useMessageStore();
const userStore = useUserStore();

const { messages, isLoading, error } = storeToRefs(messageStore);
const { user } = storeToRefs(userStore);

onMounted(() => {
  messageStore.fetchMessages();
});

const handlePostMessage = async () => {
  if (newMessageContent.value.trim() === '') return;
  await messageStore.postMessage(newMessageContent.value);
  newMessageContent.value = '';
};

const handleDeleteMessage = async (messageId: number) => {
  if (confirm('Are you sure you want to delete this message?')) {
    await messageStore.deleteMessage(messageId);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
    <!-- 加载中 -->
    <div v-if="isLoading" class="text-gray-500 text-lg">Loading messages...</div>

    <!-- 错误提示 -->
    <div v-if="error" class="text-red-500 font-medium bg-red-100 border border-red-300 rounded-md px-4 py-2 mb-4">
      {{ error }}
    </div>

    <!-- 发布消息 -->
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Post a new message</h3>
      <form @submit.prevent="handlePostMessage" class="space-y-4">
        <textarea v-model="newMessageContent" placeholder="What's on your mind?" required rows="3"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        <button type="submit"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
          Post
        </button>
      </form>
    </div>

    <!-- 消息列表 -->
    <div v-if="!isLoading && messages.length" class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Messages</h3>
      <ul class="space-y-4">
        <li v-for="message in messages" :key="message.id"
          class="flex justify-between items-start border-b border-gray-200 pb-3 last:border-b-0">
          <div class="flex-1">
            <p class="text-gray-800">{{ message.content }}</p>
            <small class="text-gray-500">
              by <span class="font-medium text-gray-700">{{ message.author }}</span>
              · {{ new Date(message.time).toLocaleString() }}
            </small>
          </div>
          <button v-if="user && user.id === message.userId" @click="handleDeleteMessage(message.id)"
            class="ml-4 text-sm text-red-500 hover:text-red-700">
            Delete
          </button>
        </li>
      </ul>
    </div>

    <!-- 空消息提示 -->
    <div v-else-if="!isLoading && messages.length === 0" class="text-gray-500 text-lg mt-6">
      No messages yet. Be the first to post!
    </div>
  </div>
</template>
