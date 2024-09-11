//import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
const pathResolve = (dir: string)=>resolve(__dirname,dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs:[resolve(process.cwd(),'src/assets/svg')],
      symbolId:'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': pathResolve('./src')
    }
  },
 

  // 反向代理
  server: {
      
    port: 8080, //本地端口
    open:true,//允许自动打开默认浏览器
    cors:true//允许跨域

}
})
