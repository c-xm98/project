<template>
   <el-dialog
    v-model="dialogVisible"
    title="用户信息"
    width="500px"
    align-center
    draggable
  >
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-avatar shape="square" :size="120" :src="userdata.imageUrl " />
      </el-aside>
      <el-main>
        <div>账号：{{ userdata.account }}</div>
        <div>姓名：{{ userdata.name }}</div>
        <div>性别：{{ userdata.sex }}</div>
        <div>部门：{{ userdata.department }}</div>
        <div>邮箱：{{ userdata.email }}</div>
        <div>状态：
            <span v-if="userdata.status==0">正常</span>
            <span v-else>冻结</span>
        </div>
      </el-main>
    </el-container>
    <el-footer>
        <span @click="openEdit(userdata.id)">编辑</span>
        <span @click="openPromote(userdata.id)">赋权</span>
        <span @click="openDelete(userdata.id)">删除用户</span>
    </el-footer>
  </div>
  </el-dialog>
  <promote ref="promoteP"></promote>
  <edit ref="editP"></edit>
  <DeleteD ref="deleteP"></DeleteD>
</template>

<script lang="ts" setup>
import { reactive, ref,toRefs } from 'vue'
import { bus } from "@/utils/mitt.js"
//接收用户的数据

bus.on('userId',async(row:any)=>{
  userdata.imageUrl=row.imageUrl
  userdata.id=row.id
    userdata.account=row.account
    userdata.name=row.name
    userdata.sex=row.sex
    userdata.department=row.department
    userdata.email=row.email
    userdata.status=row.status
    
})
const userdata=reactive({
    id:0,
    imageUrl:'',
    name:'',
    sex:'',
    department:'',
    account:'',
    email:'',
    status:null,
})
//控制弹窗开关
const dialogVisible = ref(false)
const open=()=>{
    dialogVisible.value=true
}
defineExpose({
    open
})

import promote from '@/views/user_manage/components/PromotiveAdmin.vue'
import { number } from 'echarts';
const promoteP=ref()
//赋权
const openPromote=(id:number)=>{
  bus.emit('promoteId',id)
  promoteP.value.open()
}
//编辑
import edit from '@/views/user_manage/components/EditUser.vue'
const editP=ref()
const openEdit=(id:number)=>{
  bus.emit('editId',id)
  editP.value.open()
}
//删除用户
import DeleteD from '@/views/user_manage/components/DeleteAdmin.vue'
const deleteP=ref()
const openDelete=(id:number)=>{
  let userinfor={
    id:id,
    account:userdata.account
  }
  bus.emit('deleteUserId',userinfor)
  deleteP.value.open()
}
bus.on('offDialog',async()=>{
  dialogVisible.value=false
})
</script>

<style lang="scss" scoped>
.el-main{
    --el-main-padding:0px;
}
.el-main>div{
    margin-bottom: 8px;
}
.el-footer{
    display: flex;
    justify-content: flex-end;
    --el-footer-height:8px;
    span{
        margin-left: 8px;
        color: #409eff;
        cursor: pointer;
    }
}
</style>