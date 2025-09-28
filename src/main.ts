import { createApp } from 'vue'
import pinia from './store'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/modules/user'

// Import the global stylesheet
import './assets/styles/index.css'

const app = createApp(App)

app.use(pinia)

// Initialize user store before mounting the app
const userStore = useUserStore()
userStore.init().then(() => {
  // Now that the user state is potentially restored, we can use the router
  app.use(router)
  app.mount('#app')
})