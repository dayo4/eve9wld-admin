import '@/globalStyles/deploy'
import { createApp } from 'vue'
import App from './App.vue'
import { $General } from './plugins'
import './registerServiceWorker'
import router from './router'

const app = createApp(App)

/* Add assets baseurl to global scope */
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://127.0.0.1:3000/'
app.config.globalProperties.$baseUrl = BASE_URL
app.config.globalProperties.$postBaseUrl = BASE_URL + 'pst/'
app.config.globalProperties.$userBaseUrl = BASE_URL + 'usr/'
app.config.globalProperties.$appLogo = $General.appLogo


app.use(router).mount('#app')
