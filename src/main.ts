import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

// 全局样式
import '@less/global.less'
import 'amfe-flexible'
import 'normalize.css'

createApp(App)
  .use(createPinia()) // 启用 Pinia
  .use(router)
  .mount('#app')
