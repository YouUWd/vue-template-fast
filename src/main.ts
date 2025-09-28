import { createApp } from 'vue'
import pinia from './store'
import App from './App.vue'
import router from './router'

// Import the new global stylesheet
import './assets/styles/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')