import { createApp } from 'vue'
import App from './App.vue'
//引入路由模块
import router from './router'
//图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
/* 导入svg组件 */
import 'virtual:svg-icons-register'
/* 导入pinia */
import pinia from './store/index'

//创建实例
const app=createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(pinia)
app.use(router).mount('#app')
