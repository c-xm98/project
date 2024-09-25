<template>
   <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="600px"
    align-center
    draggable
  >
    <!-- 表单内容 -->
    <el-form ref="ruleFormRef" :model="formData" label-width="100px" :rules="rules">
        <el-form-item label="账号" prop="account">
            <el-input v-model="formData.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" />
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
        <el-button type="primary" @click="addAdmin" >确定</el-button>
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
    account:[
        {required:true,message:'请输入管理员的注册账号',trigger:'blur'},
    ],
    password:[
        {required:true,message:'请输入管理员的注册密码',trigger:'blur'},
    ],
    name:[
        {required:true,message:'请输入管理员的名字',trigger:'blur'},
    ],
    sex:[
        {required:true,message:'请输入管理员的性别',trigger:'blur'},
    ],
    email:[
        {required:true,message:'请输入管理员的邮箱',trigger:'blur'},
    ],
    department:[
        {required:true,message:'请输入管理员的部门',trigger:'blur'},
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
    account:string,
    password:string,
    name:string,
    sex:string,
    email:string,
    department:string,
}
//数据
const formData : form=reactive({
    account:'',
    password:'',
    name:'',
    sex:'',
    email:'',
    department:'',
    identity:'产品管理员'
})
//自定义规则

const title=ref()
//弹窗的标题
import { bus } from "@/utils/mitt.js"
bus.on('createId',(id:number)=>{
    if(id===1){
        title.value='新建产品管理员'
    }
    if(id===2){
        title.value='新建用户管理员'
    }
    if(id===3){
        title.value='新建消息管理员'
    }
})
//确定按钮，获取输入的信息
const emit=defineEmits(['success'])//确保页面的信息及时刷新
import {createAdmin} from '@/api/userInfor.js'
const addAdmin=async()=>{
    const res=await createAdmin(formData)
   if(res.status==0){
    ElMessage({
        message:'创建管理员成功',
        type:'success'
    })
    emit('success')
   }else{
    ElMessage.error('创建失败')
   }
    dialogVisible.value = false
}
//取消监听
onBeforeUnmount(()=>{
  bus.all.clear()
})
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