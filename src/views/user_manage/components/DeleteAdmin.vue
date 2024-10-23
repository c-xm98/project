<template>
   <el-dialog
    v-model="dialogVisible"
    title="删除操作"
    width="600px"
    align-center
    draggable
  >
 <span v-if="adminid">是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
 <span v-else>是否删除此用户？删除后此用户</span>
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
import {changeIdentityToUser,deleteUser} from '@/api/userInfor.js'
//const userid=ref()
import {getUserInfor} from '@/api/userInfor.js'
const adminid=ref()
const userid=ref()
const account=ref()
const name=ref()
bus.on('deleteId',async(id:number)=>{
    adminid.value=id
    //console.log(id);
})
bus.on('deleteUserId',async(userinfor:any)=>{
  userid.value=userinfor.id
  account.value=userinfor.account
  name.value=userinfor.name
})
import {tracking} from '@/utils/operation.js'
/* const emit=defineEmits(['success']) */
const deleteAdmin=async()=>{
  if(adminid.value){
    const res=await changeIdentityToUser(adminid.value)
    if(res.status==0){
    ElMessage({
        message:'降级成功',
        type:'success'
    })
    bus.emit('adminDialogOff',3)
   }else{
    ElMessage.error('降级失败')
   }
    dialogVisible.value = false
  }
  if(userid.value){
    const res=await deleteUser(userid.value,account.value)
    if(res.status==0){
    ElMessage({
        message:'删除用户成功',
        type:'success'
    })
    //埋点
   //console.log(name.value);
    
    tracking('管理员',localStorage.getItem('name'),name.value,'高级')

    //假设用户第二页，我们的用户为第一条数据 删除之后 页面变为第一页
    //假设用户第二页，我们的用户不为第一条数据 删除之后 页面任然为第二页
    //bus.emit('adminDialogOff',3)
    bus.emit('offDialog',1)
    dialogVisible.value = false
   
   }else{
    ElMessage.error('删除用户失败')
   }
    dialogVisible.value = false
  }
    
}
//取消监听
onBeforeUnmount(()=>{
  bus.all.clear()
})
</script>

<style lang="scss" scoped>

</style>