<!--审核产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="撤回提醒"
     width="600px"
     align-center
     draggable
   >
  <span >确定撤回此产品的出库申请吗？</span>
  
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="withdrawApplyproduct">确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 
 import { reactive, ref } from 'vue'
 import { ElMessage } from 'element-plus'

 //控制弹窗开关
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })
/*  //接口
 interface form {
    product_id?:number|null,
    id?:number|null,
    product_out_status:string,
    product_out_price:string,
    product_out_audit_person:string,
    product_out_apply_person:string,
    product_out_number?:number|null,
    product_inwarehouse_number?:number|null,
    product_single_price?:number|null,
    audit_memo:string,
 } */
 //数据
 import {useUserInFor} from '@/store/userInfor'
const userStore=useUserInFor()
 const formData=reactive({
    product_out_id:0,
    id:0,
    product_out_status:'',
    product_out_price:'',
    product_out_audit_person:userStore.name,
    product_out_apply_person:'',
    product_out_number:'',
    product_inwarehouse_number:0,
    product_single_price:0,
    audit_memo:''
 })

const withdrowid=ref()
   //接收数据  id
import { bus } from "@/utils/mitt.js"
bus.on('backId',(id:number)=>{
  withdrowid.value = id
})

//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息

 const emit =defineEmits(['success'])
 import {withdrawApplyProduct} from '@/api/product.js'
 const withdrawApplyproduct=async()=>{
     const res=await withdrawApplyProduct(withdrowid.value)
     
     
    if(res.status==0){
     ElMessage({
         message:'撤回成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('撤回失败')
    }
     dialogVisible.value = false
 }

 </script>
 
 <style lang="scss" scoped>
 .el-dialog{
     display: flex;
     padding: 20px 30px;
 }
 :deep(.el-form-item){
     margin:30px ;
 }
 </style>