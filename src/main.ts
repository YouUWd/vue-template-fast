import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import the new global stylesheet
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

async function bootstrap() {
  // 开发环境启用 MSW
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass', // 未处理的请求交给浏览器
    })
  }

  app.mount('#app')
}
bootstrap()
