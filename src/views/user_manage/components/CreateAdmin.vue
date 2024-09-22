<template>
   <el-dialog
    v-model="dialogVisible"
    title="新建产品管理员"
    width="30%"
  >
    <!-- 表单内容 -->
    <el-form :model="formData" label-width="120px" :rules="rules">
        <el-form-item label="账号">
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="性别">
            <el-select v-model="formData.region" placeholder="请选择性别">
                <el-option label="男" value="man" />
                <el-option label="女" value="woman" />
            </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="部门">
            <el-select v-model="formData.region" placeholder="请选择部门">
                <el-option label="总裁办" value="man" />
                <el-option label="项目部" value="woman" />
            </el-select>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
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
    account:number,
    password:string,
    name:string,
    sex:string,
    email:string,
    department:string,
}
//数据
const formData=reactive({
    account:null,
    password:'',
    name:'',
    sex:'',
    email:'',
    department:'',
})
//自定义规则
const rules=reactive({

})
</script>

<style lang="scss" scoped>

</style>