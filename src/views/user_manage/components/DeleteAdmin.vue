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

import { onBeforeUnmount, reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance,FormRules} from 'element-plus'
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
})
import { bus } from "@/utils/mitt.js"


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
//const userid=ref()
import {getUserInfor} from '@/api/userInfor.js'
const userid=ref()
bus.on('deleteId',async(id:number)=>{
    /* const res=await getUserInfor(id)
    formData.id=res.id
    formData.account=res.account
    formData.name=res.name
    formData.sex=res.sex
    formData.email=res.email
    formData.department=res.department */
    userid.value=id
    console.log(id);
    
})

const emit=defineEmits(['success'])
const deleteAdmin=async()=>{
    const res=await changeIdentityToUser(userid.value)
    if(res.status==0){
    ElMessage({
        message:'降级成功',
        type:'success'
    })
    emit('success')
   }else{
    ElMessage.error('降级失败')
   }
    dialogVisible.value = false
    
}
//取消监听
onBeforeUnmount(()=>{
  bus.all.clear()
})
</script>

<style lang="scss" scoped>

</style>