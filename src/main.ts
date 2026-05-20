import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authState } from './store/auth'
import './assets/main.css'

const init = async () => {
  await authState.initialize()

  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}

init()
