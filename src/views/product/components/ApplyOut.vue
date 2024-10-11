<!-- 申请出库的弹窗-->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="申请出库"
     width="600px"
     align-center
     draggable
   >
   <div class="product-name">您申请出库的产品是：{{formData.product_name}}</div>
     <!-- 表单内容 -->
    <el-form ref="ruleFormRef" :model="formData" label-width="120px" :rules="rules" :label-position="labelPosition">
         <el-form-item label="申请出库编号" prop="product_out_id">
             <el-input v-model="formData.product_out_id" />
         </el-form-item>
         <el-form-item label="出库数量" prop="product_out_number">
             <el-input v-model="formData.product_out_number" />
         </el-form-item>
         <el-form-item label="产品单价" prop="product_single_price">
             <el-input v-model="formData.product_single_price" disabled/>
         </el-form-item>
         <el-form-item label="出库申请人" prop="product_out_apply_person">
             <el-input v-model="formData.product_out_apply_person" />
         </el-form-item>
         <el-form-item label="申请备注" prop="apply_memo">
             <el-input
                v-model="formData.apply_memo"
                :rows="2"
                type="textarea"
            />
         </el-form-item>
     </el-form>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="addProduct" >确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 
 import { reactive, ref } from 'vue'
 import { ElMessage } from 'element-plus'
 import type { FormInstance,FormRules} from 'element-plus'
 
 
 const ruleFormRef = ref<FormInstance>()
 const rules=reactive<FormRules>({
    product_out_id:[
         {required:true,message:'请输入出库编号',trigger:'blur'},
     ],
     product_out_number:[
         {required:true,message:'请输入出库数量',trigger:'blur'},
     ],
     product_out_apply_person:[
         {required:true,message:'请填写出库申请人',trigger:'blur'},
     ],
     product_single_price:[
         {required:true,message:'请填写产品单价',trigger:'blur'},
     ],
 
 })
 //控制弹窗开关
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })
 //接口
 interface form {
    product_out_id?:number|null,
    id?:number|null,
    product_name:string,
    product_out_number?:number|null,
    product_single_price?:number|null,
    product_out_apply_person:string,
    apply_memo:string,
 }
 //数据
 const formData : form=reactive({
    product_out_id:null,
    id:null,
    product_name:'',
    product_out_number:null,
    product_single_price:null,
    product_out_apply_person:'',
    apply_memo:''
 })
  //接收数据
import { bus } from "@/utils/mitt.js"
bus.on('applyId',(row:any)=>{
    formData.id=row.id
    formData.product_name=row.product_name
    formData.product_single_price=row.product_single_price
})
//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息
 //产品入库
 const emit =defineEmits(['success'])
 import {applyOutProduct} from '@/api/product.js'
 const addProduct=async()=>{
     const res=await applyOutProduct(formData)
    if(res.status==0){
     ElMessage({
         message:'产品申请出库成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('产品申请出库失败')
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
 .product-name{
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #333;

 }
 </style>