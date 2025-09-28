<template>
  <div class="message-board">
    <header class="board-header">
      <h1>留言板</h1>
      <div class="user-info" v-if="authStore.user">
        <span>欢迎, {{ authStore.user.username }}</span>
        <button @click="handleLogout">退出登录</button>
      </div>
    </header>

    <MessageForm @submit="handleSubmit" />

    <div class="message-list">
      <h3>所有留言 ({{ messageStore.total }}条)</h3>
      <div v-if="messageStore.loading" class="loading">
        加载中...
      </div>
      <div v-else>
        <MessageCard
          v-for="message in messageStore.messages"
          :key="message.id"
          :message="message"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import MessageCard from '@/components/Message/MessageCard.vue'
import MessageForm from '@/components/Message/MessageForm.vue'

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()

const handleSubmit = async (content: string) => {
  try {
    await messageStore.createMessage({ content })
  } catch (error) {
    console.error('发布留言失败:', error)
  }
}

const handleDelete = async (id: number) => {
  // Confirmation is now handled in the MessageCard component
  try {
    await messageStore.deleteMessage(id)
  } catch (error) {
    console.error('删除留言失败:', error)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  messageStore.fetchMessages()
})
</script>