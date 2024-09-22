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
//--------------------------------------------------用户管理
//添加管理员
export const createAdmin=data=>{
    const {
        password,
        account,
        name,
        sex,
        department,
        email,
        identity
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/user/createAdmin',
        method:'POST',
        data:{
            password,
            account,
            name,
            sex,
            department,
            email,
            identity  
        }
    })
}

//获取管理员列表 
export const getAdminList=identity=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/getAdminList',
        method:'POST',
        data:{
            identity 
        }
    })
}
//编辑管理员账号信息
export const editAdmin=data=>{
    const {
        id,
            name,
            sex,
            department,
            email,
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/user/editAdmin',
        method:'POST',
        data:{
            id,
            name,
            sex,
            department,
            email, 
        }
    })
}
//对管理员降职，取消赋权 参数：id
export const changeIdentityToUser=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changeIdentityToUser',
        method:'POST',
        data:{
            id 
        }
    })
}
//对管理员，赋权 参数：id identity
export const changeIdentityToAdmin=(id,identity)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/changeIdentityToAdmin',
        method:'POST',
        data:{
            id,
            identity
        }
    })
}
//通过账号进行搜索
export const searchUser=account=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/searchUser',
        method:'POST',
        data:{
            account
        }
    })
}
//冻结用户
export const banUser=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/banUser',
        method:'POST',
        data:{
            id
        }
    })
}
//解冻用户
export const hotUser=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/hotUser',
        method:'POST',
        data:{
            id
        }
    })
}
//获取冻结用户列表
export const getBanList=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/getBanList',
        method:'POST',
    })
}
//删除用户 
export const deleteUser=(id,identity)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/user/deleteUser',
        method:'POST',
        data:{
            id,
            identity
        }
    })
}