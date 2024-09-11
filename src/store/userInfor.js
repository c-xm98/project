//存放用户信息状态
/* 需要知道 Store 是使用 defineStore() 定义的，并且它需要一个唯一名称，作为第一个参数传递： */
import { defineStore } from 'pinia'
import {getUserInfor} from '../api/userInfor'
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserInFor = defineStore('userinfor', {
  // 其他配置
  state:()=>{
    return {
        imageUrl:'',
        identity:'',
        account:'',
        department:'',
        name:'',
        gender:'',
        email:''
    }
  },
  /* 写逻辑 */
  actions: {
    /* 获取用户信息 */
    async userInfor(id){
        const res=await getUserInfor(id)
        console.log('333',res);
        this.imageUrl=res.data.image_url
        this.department=res.data.department
        this.name=res.data.name
        this.gender=res.data.gender
        this.email=res.data.email
        this.identity=res.data.identity
        this.account=res.data.account
    }
  },
  
},
{
  /* 持久化 */
    persist:{
        /* 存储全部数据 */
        enabled:true,
        key:'userinfor',
        storage:localStorage
    }
  }
)
/* Actions 相当于组件中的 methods。 它们可以使用 defineStore() 中的 actions 属性定义，并且它们非常适合定义业务逻辑： */