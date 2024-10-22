import instance from '../http/index'
//上传文件
export const uploadFile=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/uploadFile',
        method:'POST',
    })
}
//绑定上传者
export const bindFileAndUser=(name,url)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/bindFileAndUser',
        method:'POST',
        data:{
            name,
            url
        }
    })
}
//下载次数
export const updateClick=( download_number,
    id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/updateClick',
        method:'POST',
        data:{
            download_number,
            id
        }
    })
}
//下载文件
export const downloadFile=(id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/downloadFile',
        method:'POST',
        data:{
            
            id
        }
    })
}
//获取文件列表
export const getFiles=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/getFiles',
        method:'POST',
    })
}
//搜索文件
export const searchFile=(file_name)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/searchFile',
        method:'POST',
        data:{
            file_name
        }
    })
}
//删除文件

export const deleteFile=(id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/file/deleteFile',
        method:'POST',
        data:{
            id
        }
    })
}
