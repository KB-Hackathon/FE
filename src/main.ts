import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'bootstrap-icons/font/bootstrap-icons.css'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueApexCharts from 'vue3-apexcharts'
import App from './app/App.vue'
import router from './app/router'
import './style.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.component('Apexchart', VueApexCharts)

app.mount('#app')
