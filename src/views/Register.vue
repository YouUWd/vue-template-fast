<template>
  <div class="register-container">
    <div class="register-form">
      <h2>用户注册</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="form.username" type="text" placeholder="请输入用户名" required />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input v-model="form.email" type="email" placeholder="请输入邮箱" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="form.password" type="password" placeholder="请输入密码" required />
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" required />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? '注册中...' : '注册' }}
        </button>
      </form>
      <p>
        已有账户？
        <router-link to="/login">立即登录</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { RegisterForm } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const error = ref<string | null>(null)

const handleSubmit = async () => {
  error.value = null
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  try {
    await authStore.register(form.value)
    router.push('/messages')
  } catch (err) {
    error.value = (err as Error).message || 'Registration failed.'
    console.error('注册失败:', err)
  }
}
</script>