<!--删除消息的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     :title=title
     width="600px"
     align-center
     draggable
   >
  <span>谨慎操作！确定清除操作日志吗？</span>
  
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="deletemessage">确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 
 import { reactive, ref } from 'vue'
 import { ElMessage } from 'element-plus'
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })
 //接口
 interface form {
    id?:number|null,
    file_name:string,
    file_url:string,
    file_size:string,
    upload_person:string,
    upload_time:string,
    download_number:string,
 }
 //数据
 const formData : form=reactive({
    id:null,
    file_url:'',
    file_name:'',
    file_size:'',
    upload_person:'',
    upload_time:'',
    download_number:'',
 })
 const title=ref()
 const url=ref()
 const number=ref()
 const fileid=ref()
   //接收数据  id
import { bus } from "@/utils/mitt.js"


 //产品入库
 const emit =defineEmits(['success'])
 /* import {downloadFile,deleteFile,updateClick} from '@/api/files.js'
 const changeClick=async(download_number:number,id:number)=>{
    await updateClick (download_number,id)
 } */
import {deleteoperationLisData} from '@/api/log.js'
 const deletemessage=async()=>{
    const res=await deleteoperationLisData()
    if(res.status==0){
     ElMessage({
         message:'删除日志成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('删除日志失败')
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
/*  a{
    color: aliceblue;
    text-decoration: none;
 } */
 </style>