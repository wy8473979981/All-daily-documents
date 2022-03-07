import { createApp } from 'vue'
import App from './App.vue'
import { naive } from './utils/demand-import'

const app = createApp(App as any)
app.use(naive)
app.mount('#app')
