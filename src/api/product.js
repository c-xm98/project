//连接后端的接口
import instance from '../http/index'
//产品入库 创建产品
export const createProduct=data=>{
    const {
        product_id,
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,//库存数量
        product_single_price,//入库单价
        product_create_person,
        in_memo//入库备注
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/createProduct',
        method:'POST',
        data:{
            product_id,
            product_name,
            product_category,
            product_unit,
            product_inwarehouse_number,//库存数量
            product_single_price,//入库单价
            product_create_person,
            in_memo 
        }
    })
}
//删除产品
export const deleteProduct=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/deleteProduct',
        method:'POST',
        data:{
           id
        }
    })
}

//编辑产品信息
export const editProduct=data=>{
    const {
        product_name,
        ...id
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/editProduct',
        method:'POST',
        data:{
            product_name,
            ...id
        }
    })
}
//获取产品列表getProductList
export const getProductList=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/getProductList',
        method:'POST',
    })
}
//产品申请出库applyOutProduct
export const applyOutProduct=data=>{
    const {
        id,
        product_out_id,
        product_single_price,
        product_out_number,
        product_out_apply_person,
        apply_memo,
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/applyOutProduct',
        method:'POST',
        data:{
            id,
            product_out_id,
            product_single_price,
            product_out_number,
            product_out_apply_person,
            apply_memo,
        }
    })
}

//产品审核列表
export const applyProductList=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/applyProductList',
        method:'POST',
    })
}


//撤回  对产品进行撤回申请
export const withdrawApplyProduct=id=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/withdrawApplyProduct',
        method:'POST',
        data:{
            id
        }
    })
}


//产品审核
export const auditProduct=data=>{
    const {
        id,
        product_out_id,
        product_out_status,
        audit_memo,
        product_out_price,
        product_out_audit_person,
        product_out_apply_person,
        product_inwarehouse_number,
        product_single_price,
        product_out_number
    }=data
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/auditProduct',
        method:'POST',
        data:{
            id,
            product_out_id,
            product_out_status,
            audit_memo,
            product_out_price,
            product_out_audit_person,
            product_out_apply_person,
            product_inwarehouse_number,
            product_single_price,
            product_out_number
        }
    })
}





//通过入库编号对产品进行搜索
export const searchProductForId=(product_id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/searchProductForId',
        method:'POST',
        data:{
            product_id
        }
    })
}





//  通过出库申请编号对产品进行搜索  
export const searchProductForApplyId=(product_out_id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/searchProductForApplyId',
        method:'POST',
        data:{
            product_out_id
        }
    })
}





// 通过出库编号对产品进行搜索 
export const searchProductForOutId=(product_out_id)=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/searchProductForOutId',
        method:'POST',
        data:{
            product_out_id
        }
    })
}





//获取产品总数
export const getProductLength=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/getProductLength',
        method:'POST',
    })
}





//获取申请出库产品总数
export const getApplyProductLength=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/getApplyProductLength',
        method:'POST',
    })
}

//获取出库产品总数
export const getOutProductLength=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/getOutProductLength',
        method:'POST',
    })
}


//监听换页，产品页面
export const returnProductListData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/returnProductListData',
        method:'POST',
    })
}



//监听换页，申请出库页面 
export const returnApplyProductListData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/returnApplyProductListData',
        method:'POST',
    })
}



//监听换页，出库页面 
export const returnOutProductListData=()=>{
    return instance({
        /* 后端获取用户信息 */
        url:'/pro/returnOutProductListData',
        method:'POST',
    })
}


