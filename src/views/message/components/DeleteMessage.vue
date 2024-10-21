<!--删除消息的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     :title=title
     width="600px"
     align-center
     draggable
   >
  <span v-if="title=='删除消息'">确定删除此公告吗</span>
  <span v-else-if="title=='还原消息'">确定还原此公告吗</span>
  <span v-else-if="title=='彻底删除'">谨慎操作！确定彻底删除此公告吗？</span>
  
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="deletemessage">确定</el-button>
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
 const title=ref()
   //接收数据  id
import { bus } from "@/utils/mitt.js"
bus.on('deleteId',(row:any)=>{
    title.value="删除消息"
    formData.id=row.id
    
})
bus.on('recoverId',(row:any)=>{
    title.value="还原消息"
    formData.id=row.id
    
})
bus.on('redeleteId',(row:any)=>{
    title.value="彻底删除"
    formData.id=row.id
    
})
//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息
 //产品入库
 const emit =defineEmits(['success'])
 import {firstDelete,deleteMessage,recover} from '@/api/message.js'
 const deletemessage=async()=>{
    if(title.value=='删除消息'){
        const res=await firstDelete(formData.id)
    if(res.status==0){
     ElMessage({
         message:'已添加至回收站',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('添加至回收站失败')
    }
     dialogVisible.value = false

    }
    if(title.value=='还原消息'){
        const res=await recover(formData.id)
    if(res.status==0){
     ElMessage({
         message:'还原成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('还原失败')
    }
     dialogVisible.value = false

    }
    if(title.value=='彻底删除'){
        const res=await deleteMessage(formData.id)
    if(res.status==0){
     ElMessage({
         message:'已彻底删除',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('彻底删除失败')
    }
     dialogVisible.value = false

    }
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