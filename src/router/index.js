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
             },
             {//产品管理
                name:'product_manage',
                path:'/product_manage',
                component:()=>import('@/views/user_manage/product_manage/ProductManageIndex.vue')
             },
             {//用户管理
                name:'users_manage',
                path:'/users_manage',
                component:()=>import('@/views/user_manage/users_manage/UsersManageIndex.vue')
             },
             {//消息管理massage
                name:'massage_manage',
                path:'/massage_manage',
                component:()=>import('@/views/user_manage/message_manage/MessageManageIndex.vue')
             },
             {//用户列表
                name:'user_list',
                path:'/user_list',
                component:()=>import('@/views/user_manage/user_list/UserListIndex.vue')
             },
             {//产品管理
               name:'product_manage_list',
               path:'/product_manage_list',
               component:()=>import('@/views/product/product_manage/ProductManageIndex.vue')
            },
            {//产品管理
               name:'out_product_manage_list',
               path:'/out_product_manage_list',
               component:()=>import('@/views/product/out_product_manage_list/OutProductManageIndex.vue')
            },
            {//消息列表
               name:'message_list',
               path:'/message_list',
               component:()=>import('@/views/message/message_list/MessageListIndex.vue')
            },
            {//回收
               name:'recycle',
               path:'/recycle',
               component:()=>import('@/views/message/recycle/RecycleIndex.vue')
            },
        ]
    }
]
const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router