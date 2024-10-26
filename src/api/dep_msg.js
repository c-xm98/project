import instance from '../http/index'
export const getDepartmentMsg=(id,department)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/getDepartmentMsg',
        method:'POST',
        data:{
            id,
            department
        }
    })
}
export const getDepartmentMsgList=(department)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/getDepartmentMsgList',
        method:'POST',
        data:{
            department
        }
    })
}
export const getReadListAndStatus=(id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/getReadListAndStatus',
        method:'POST',
        data:{
            id
        }
    })
}
export const clickDelete=(readid,id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/clickDelete',
        method:'POST',
        data:{
            readid,
            id
        }
    })
}
export const changeUserReadList=(newid,department)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/changeUserReadList',
        method:'POST',
        data:{newid,department}
    })
}
export const changeUserReadListButDelte=(deleteid,id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/departmentmsg/changeUserReadListButDelte',
        method:'POST',
        data:{
            deleteid,id
        }
    })
}