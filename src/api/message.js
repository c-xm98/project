import instance from '../http/index'
//消息发布
export const publishMessage=data=>{
    const {
        message_title,
        message_category,
        message_publish_department,
        message_receipt_object,
        message_publish_name,
        message_content,
        message_level,
    }=data
    return instance({
        url:'/mes/publishMessage',
        method:'POST',
        data:{
            message_title,
            message_category,
            message_publish_department,
            message_receipt_object,
            message_publish_name,
            message_content,
            message_level,  
        }
    })
}
//公司消息列表
export const companyMessageList=()=>{
    return instance({
        url:'/mes/companyMessageList',
        method:'POST',
    })
}
//系统消息列表
export const systemMessageList=()=>{
    return instance({
        url:'/mes/systemMessageList',
        method:'POST',
    })
}
//编辑消息                         
export const editMessage=data=>{
    const {
        message_title,
        message_receipt_object,
        message_content,
        message_level,
        id
    }=data
    return instance({
        url:'/mes/editMessage',
        method:'POST',
        data:{
            message_title,
            message_receipt_object,
            message_content,
            message_level,
            id  
        }
    })
}
//根据发布部门进行搜索
export const searchMessageBydepartment=message_publish_department=>{
    return instance({
        url:'/mes/searchMessageBydepartment',
        method:'POST',
        data:{
            message_publish_department
        }
    })
}
//根据发布部门进行搜索
export const searchMessageBylevel=message_level=>{
    return instance({
        url:'/mes/searchMessageBylevel',
        method:'POST',
        data:{
            message_level
        }
    })
}
//获取一条具体的消息
export const getMessage=id=>{
    return instance({
        url:'/mes/getMessage',
        method:'POST',
        data:{
            id
        }
    })
}
//点击量
export const updateClick=data=>{
    const {
        message_click_number,
        id
    }=data
    return instance({
        url:'/mes/updateClick',
        method:'POST',
        data:{
            message_click_number,
            id  
        }
    })
}
//第一次删除
export const firstDelete=id=>{
    
    return instance({
        url:'/mes/firstDelete',
        method:'POST',
        data:{
            id
        }
    })
}
//获取回收站的消息
export const recycleList=()=>{
    return instance({
        url:'/mes/recycleList',
        method:'POST',
    })
}
//还原
export const recover=id=>{
    return instance({
        url:'/mes/recover',
        method:'POST',
        data:{
            id
        }
    })
}
//彻底删除
export const deleteMessage=id=>{
    return instance({
        url:'/mes/deleteMessage',
        method:'POST',
        data:{
            id 
        }
    })
}