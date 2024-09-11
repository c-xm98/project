/* 与后端数据的交互？ */

//登录和注册的接口
import instance from '../http/index'

//注册接口
export const register=data=>{
    const {
        account,
        password,
    }=data
    return instance({
        url:'/api/register',
        method:'POST',
        data:{
            account,
            password,  
        }
    })
}
//登录接口
export const login=data=>{
    const {
        account,
        password,

    }=data
    return instance({
        url:'/api/login',
        method:'POST',
        data:{
            account,
            password,  
        }
    })
}
//忘记密码验证
export const verify=data=>{
    const {
        account,
        email,

    }=data
    return instance({
        url:'/user/verifyAccountAndEmail',
        method:'POST',
        data:{
            account,
            email,  
        }
    })
}
//密码重置
export const resetPassword=(id,newPassword)=>{
    
    return instance({
        url:'/user/changePasswordInLogin',
        method:'POST',
        data:{
            id,
            newPassword
        }
    })
}


