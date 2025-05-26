import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import store from './store'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
store.use(piniaPluginPersistedstate)
app.use(router)
app.use(store)
app.mount('#app')
