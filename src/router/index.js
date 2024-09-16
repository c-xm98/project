//创建路由和历史记录
import {createRouter,createWebHashHistory} from 'vue-router'

const routes=[
    /* {
        path:'/',
        //redirect:'/login'
    }, */
    //登录页面组件的路由，之前是import引用组件的这里直接在下面写了一个函数引用
    {
    name:'loginIndex',
    path:'',
    component:()=>import('@/views/login/loginIndex.vue')
    },
    //右侧菜单的路由
    {
        name:'menu',
        path:'/menu',
        component:()=>import('@/views/menu/menuIndex.vue'),
        //嵌套路由
        children:[
            {//主页路由
                name:'home',
                path:'/home',
                component:()=>import('@/views/home/homeIndex.vue')
             },
             {//设置路由
                name:'set',
                path:'/set',
                component:()=>import('@/views/set/setIndex.vue')
             },
             {//系统概览
                name:'overvirew',
                path:'/overvirew',
                component:()=>import('@/views/overvirew/OverviewIndex.vue')
             }
        ]
    }
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router