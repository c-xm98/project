<template>
   <el-dialog
    v-model="dialogVisible"
    title="删除操作"
    width="600px"
    align-center
    draggable
  >
 <span>是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteAdmin">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance,FormRules} from 'element-plus'
//接口
interface form {
    id?:number,
    account:string,
    name:string,
    sex:string,
    email:string,
    department:string,
}
//数据
const formData : form=reactive({
    id:undefined,
    account:'',
    name:'',
    sex:'',
    email:'',
    department:'',
})
import { bus } from "@/utils/mitt.js"
import {getUserInfor} from '@/api/userInfor.js'

//控制弹窗开关
const dialogVisible = ref(false)
const open=()=>{
    dialogVisible.value=true
}
defineExpose({
    open
})
import { ElMessage } from 'element-plus'
import {changeIdentityToUser} from '@/api/userInfor.js'
const userid=ref()
bus.on('deleteId',async(id:number)=>{
    userid.value=id
})
const deleteAdmin=async()=>{
    const res=await changeIdentityToUser()
    console.log(res,userid.value);
    dialogVisible.value = false
    
}
</script>

<style lang="scss" scoped>

</style>