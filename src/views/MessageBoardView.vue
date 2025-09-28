<script setup lang="ts">
import { onMounted } from 'vue';
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import MessageForm from '@/components/Layout/MessageForm.vue';
import MessageItem from '@/components/Layout/MessageItem.vue';

const messageStore = useMessageStore();
const userStore = useAuthStore();

const { loading, messages } = storeToRefs(messageStore);
const { user } = storeToRefs(userStore);

onMounted(() => {
  messageStore.fetchMessages();
});

const handlePostMessage = async (content: string) => {
  await messageStore.createMessage({ content });
};

const handleDeleteMessage = async (messageId: number) => {
  await messageStore.deleteMessage(messageId);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
    <!-- 加载中 -->
    <div v-if="loading" class="text-gray-500 text-lg">Loading messages...</div>

    <!-- 错误提示 -->
    <!-- <div v-if="error" class="text-red-500 font-medium bg-red-100 border border-red-300 rounded-md px-4 py-2 mb-4">
      {{ error }}
    </div> -->

    <!-- 发布消息 -->
    <MessageForm @postMessage="handlePostMessage" />

    <!-- 消息列表 -->
    <div v-if="!loading && messages.length" class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Messages</h3>
      <ul v-if="user" class="space-y-4">
        <MessageItem v-for="message in messages" :key="message.id" :message="message" :current-user-id="user.id"
          @delete-message="handleDeleteMessage" />
      </ul>
    </div>

    <!-- 空消息提示 -->
    <div v-else-if="!loading && messages.length === 0" class="text-gray-500 text-lg mt-6">
      No messages yet. Be the first to post!
    </div>
  </div>
</template>
