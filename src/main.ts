import { createApp } from 'vue'
import pinia from './store' // Import the centralized Pinia instance
import App from './App.vue'
import router from './router'

// Remove the old CSS import, assuming styles are handled by Tailwind or a new global style entry point
// import './assets/main.css'

const app = createApp(App)

app.use(pinia) // Use the imported Pinia instance
app.use(router)

app.mount('#app')