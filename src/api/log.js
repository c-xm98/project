import instance from '../http/index'
//上传文件
export const loginLog=(name,account,email)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/loginLog',
        method:'POST',
        data:{
            name,
        account,
        email
        }
    })
}
export const getLoginList=(id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/getLoginList',
        method:'POST',
        data:{
           id
        }
    })
}
export const getLoginListLength=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/getLoginListLength',
        method:'POST',
    })
}
export const returngetLoginLisData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/returngetLoginLisData',
        method:'POST',
    })
}
export const deleteLisData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/deleteLisData',
        method:'POST',
    })
}
export const searchLoginList=(account)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/lvlog/searchLoginList',
        method:'POST',
        data:{
            account
        }
    })
}
//上传文件
export const operationLog=(name,account,email)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/loginLog',
        method:'POST',
        data:{
            name,
        account,
        email
        }
    })
}
export const getoperationList=(id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/getoperationList',
        method:'POST',
        data:{
           id
        }
    })
}
export const getoperationListLength=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/getoperationListLength',
        method:'POST',
    })
}
export const returngetoperationLisData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/returngetoperationLisData',
        method:'POST',
    })
}
export const deleteoperationLisData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/deleteoperationLisData',
        method:'POST',
    })
}
export const searchOperationList=(operaton_person )=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/ovlog/deleteoperationLisData',
        method:'POST',
        data:{
            operaton_person 
        }
    })
}