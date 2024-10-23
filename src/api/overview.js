import instance from '../http/index'
export const getCategoryAndNumber=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/overview/getCategoryAndNumber',
        method:'POST',
    })
}
export const getLevelAndNumber=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/overview/getLevelAndNumber',
        method:'POST',
    })
}
export const getAdminAndNumber=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/overview/getAdminAndNumber',
        method:'POST',
    })
}
export const getDayAndNumber=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/overview/getDayAndNumber',
        method:'POST',
    })
}