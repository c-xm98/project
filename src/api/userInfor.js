//登录和注册的接口
import instance from '../http/index'
//获取用户信息
export const getUserInfor=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/getUserInfo',
        method:'POST',
        data:{
            id 
        }
    })
}
//修改密码
export const changePassword=(id,oldPassword,newPassword)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changePassword',
        method:'POST',
        data:{
            id,
            newPassword,
            oldPassword
        }
    })
}
//修改用户名
export const changeName=(name,id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changeName',
        method:'POST',
        data:{
            id,
            name
        }
    })
}
//修改性别
export const changeGender=(gender,id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changeGender',
        method:'POST',
        data:{
            id,
            gender
        }
    })
}
//修改邮箱
export const changeEmail=(email,id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changeEmail',
        method:'POST',
        data:{
            id,
            email
        }
    })
}
//绑定账号头像
export const bind=(account,onlyId,url)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/bindAccount',
        method:'POST',
        data:{
            account,
            onlyId,
            url
        }
    })
}