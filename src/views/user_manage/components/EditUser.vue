<template>
    <el-dialog
     v-model="dialogVisible"
     title="编辑用户信息"
     width="600px"
     align-center
     draggable
   >
     <!-- 表单内容 -->
     <el-form ref="ruleFormRef" :model="formData" label-width="100px" :rules="rules">
         <el-form-item label="账号" prop="account">
             <el-input v-model="formData.account" disabled />
         </el-form-item>
         <el-form-item label="姓名" prop="name">
             <el-input v-model="formData.name" />
         </el-form-item>
         <el-form-item label="性别" prop="sex">
             <el-select v-model="formData.sex" placeholder="请选择性别">
                 <el-option label="男" value="男" />
                 <el-option label="女" value="女" />
             </el-select>
         </el-form-item>
         <el-form-item label="邮箱" prop="email">
             <el-input v-model="formData.email" />
         </el-form-item>
         <el-form-item label="部门" prop="department">
             <el-select v-model="formData.department" placeholder="请选择部门">
                 <el-option label="总裁办" value="总裁办" />
                 <el-option label="项目部" value="项目部" />
             </el-select>
         </el-form-item>
         
     </el-form>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click=updateAdmin>确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 
 import { reactive, ref } from 'vue'
 import { ElMessageBox } from 'element-plus'
 import type { FormInstance,FormRules} from 'element-plus'
 
 
 const ruleFormRef = ref<FormInstance>()
 const rules=reactive<FormRules>({
     name:[
         {required:true,message:'请输入用户要修改的名字',trigger:'blur'},
     ],
     sex:[
         {required:true,message:'请输入用户的性别',trigger:'blur'},
     ],
     email:[
         {required:true,message:'请输入用户的邮箱',trigger:'blur'},
     ],
     department:[
         {required:true,message:'请输入用户的部门',trigger:'blur'},
     ]
 
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
     id?:number|null,
     account:string,
     name:string,
     sex:string,
     email:string,
     department:string,
 }
 //数据
 const formData : form=reactive({
     id:null,
     account:'',
     name:'',
     sex:'',
     email:'',
     department:'',
     identity:'用户'
 })
 //自定义规则
 
 //弹窗的标题
 import { bus } from "@/utils/mitt.js"
 import {getUserInfor} from '@/api/userInfor.js'
 bus.on('editId',async(id:number)=>{
     const res=await getUserInfor(id)
     formData.id=res.id
     formData.account=res.account
     formData.name=res.name
     formData.sex=res.sex
     formData.email=res.email
     formData.department=res.department
 })
 import { ElMessage } from 'element-plus'
 //点击编辑弹窗的确定按钮，更新修改信息
 import {editAdmin} from '@/api/userInfor.js'
 const updateAdmin=async()=>{
     const res=await editAdmin(formData)
     if(res.status==0){
     ElMessage({
         message:'编辑用户成功',
         type:'success'
     })
     bus.emit('offDialog',1)
     dialogVisible.value = false
    }else{
     ElMessage.error('编辑用户信息失败')
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