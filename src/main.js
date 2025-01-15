import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VTable from '@/components/VTable.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('VTable', VTable)

app.mount('#app')
