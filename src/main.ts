import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from './http';
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
//全局挂载axios
app.config.globalProperties.$axios = axios;
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
