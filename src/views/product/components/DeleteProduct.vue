<!--删除产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="删除操作"
     width="600px"
     align-center
     draggable
   >
  <span >确定删除此产品吗？删除后将失去此产品的记录</span>
  
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="deleteproduct">确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 
 import { reactive, ref,onBeforeUnmount } from 'vue'
 import { ElMessage } from 'element-plus'
 import type { FormInstance,FormRules} from 'element-plus'
 
 
 const ruleFormRef = ref<FormInstance>()
 const rules=reactive<FormRules>({
    product_id:[
         {required:true,message:'请输入产品编号',trigger:'blur'},
     ],
     product_name:[
         {required:true,message:'请输入产品名称',trigger:'blur'},
     ],
     product_category:[
         {required:true,message:'请选择产品种类',trigger:'blur'},
     ],
     product_unit:[
         {required:true,message:'请选择产品单位',trigger:'blur'},
     ],
     product_inwarehouse_number:[
         {required:true,message:'请输入库存数量',trigger:'blur'},
     ],
     product_single_price:[
         {required:true,message:'请输入产品单价',trigger:'blur'},
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
    product_id?:number|null,
    id?:number|null,
    product_name:string,
    product_category:string,
    product_unit:string,
    product_inwarehouse_number?:number|null,
    product_single_price?:number|null,
    product_create_person:string,
    in_memo:string,
 }
 //数据
 const formData : form=reactive({
    product_id:null,
    id:null,
    product_name:'',
    product_category:'',
    product_unit:'',
    product_inwarehouse_number:null,
    product_single_price:null,
    product_create_person:'',
    in_memo:''
 })
   //接收数据  id
import { bus } from "@/utils/mitt.js"
bus.on('deleteId',(row:any)=>{
    formData.id=row.id
    
})
//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息
 //产品入库
 const emit =defineEmits(['success'])
 import {deleteProduct} from '@/api/product.js'
 const deleteproduct=async()=>{
     const res=await deleteProduct(formData.id)
    if(res.status==0){
     ElMessage({
         message:'删除产品成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('删除产品失败')
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