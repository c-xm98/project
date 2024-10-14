<!--审核产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="审核操作"
     width="600px"
     align-center
     draggable
   >
  <span >确定审核此产品的出库吗？</span>
  <el-radio-group v-model="formData.product_out_status" class="ml-4">
      <el-radio value="同意" size="large">同意</el-radio>
      <el-radio value="不同意" size="large">不同意</el-radio>
    </el-radio-group>
    <el-input type="textarea" placeholder="请输入审核备注" v-model="formData.audit_memo"></el-input>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="auditproduct">确定</el-button>
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


   //接收数据  id
import { bus } from "@/utils/mitt.js"
bus.on('auditId',(row:any)=>{
    formData.id=row.id
    formData.product_out_id=row.product_out_id
    formData.product_out_status=row.product_out_status
    formData.product_out_price=row.product_out_price
    //formData.product_out_audit_person=row.product_out_audit_person
    formData.product_out_apply_person=row.product_out_apply_person
    formData.product_out_number=row.product_out_number
    formData.product_inwarehouse_number=row.product_inwarehouse_number
    formData.product_single_price=row.product_single_price
    formData.audit_memo=row.audit_memo
    
})

//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息

 const emit =defineEmits(['success'])
 import {auditProduct} from '@/api/product.js'
 const auditproduct=async()=>{
     const res=await auditProduct(formData)
    if(res.status==0){
     ElMessage({
         message:'审核产品成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('审核产品失败')
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