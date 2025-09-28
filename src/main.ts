import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import the new global stylesheet
import './assets/main.css'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    // `worker.start()` returns a Promise that resolves
    // with a Service Worker registration instance.
    return worker.start()
  }
}

enableMocking().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})