<!-- 赋权 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="赋权操作"
     width="30%"
     center
     draggable
   >
   <el-radio-group v-model="radio" class="ml-4">
      <el-radio value="产品管理员" size="large">产品管理员</el-radio>
      <el-radio value="用户管理员" size="large">用户管理员</el-radio>
      <el-radio value="消息管理员" size="large">消息管理员</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </span>
    </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 import {  ref, } from 'vue'
 import { bus } from "@/utils/mitt.js"
  //赋权的接口
 import {changeIdentityToAdmin} from '@/api/userInfor.js'
 //定义一个id
 const userid =ref()
 const radio = ref()
 bus.on('promoteId',async(id:number)=>{
    userid.value=id
})

import { ElMessage } from 'element-plus'
const yes =async()=>{
    const res=await changeIdentityToAdmin(userid.value,radio.value)
    if(res.status==0){
    ElMessage({
        message:'赋权成功',
        type:'success'
    })
    //关第一个弹窗
    bus.emit('offDialog',1)
    //关第二个弹窗
    dialogVisible.value=false
   }else{
    ElMessage.error('赋权失败')
   }
    
}

 //控制弹窗开关
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })

 
 </script>
 
 <style lang="scss" scoped>
    .el-radio-group{
      display: flex;  
      justify-content:center ;
    }
 </style>