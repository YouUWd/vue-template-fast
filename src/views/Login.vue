<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>用户名</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <p>
        还没有账户？
        <router-link to="/register">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginForm } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    await authStore.login(form.value)
    router.push('/messages')
  } catch (error) {
    console.error('登录失败:', error)
    // Here you can add user-facing error messages
  }
}
</script>