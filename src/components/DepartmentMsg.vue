<!-- 添加产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="部门消息"
     width="50%"
     align-center
     draggable
     :destroy-on-close="true"
   >
   <el-container>
      <el-aside width="416px">
        <div class="message-list-wrapped">
            <div class="list-table-content">
                <el-table :data="tableData" style="width: 100%;" highlight-current-row>
                    <el-table-column type="index"  width="50" />
                    <el-table-column prop="message_title" label="主题">
                        <template #default="{row}">
                            <div class="title-wrapped">
                                <div class="title">{{ row.message_title }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message_level" label="等级">
                        <template #default="{row}">
                            <div>
                                <el-tag type="primary" v-if="row.message_level='一般'">一般</el-tag>
                                <el-tag type="danger" v-if="row.message_level='重要'">重要</el-tag>
                                <el-tag type="success" v-if="row.message_level='必要'">必要</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message_publish_time" label="发布日期" width="180">
                        <template #default="{row}">
                            <div>
                                {{ row.message_publish_time?.slice(0,16) }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
      </el-aside>
      <el-main>
        <div class="datil-wrapped" v-if="messgaeInfor.message_title!==''">
            <div>{{ messgaeInfor.message_title }}</div>
            <div v-html="messgaeInfor.message_content"></div>
        </div>
        <div v-else>点击列表中的消息进行查看~</div>
      </el-main>
    </el-container>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
import {reactive, ref } from 'vue'
 
 //控制弹窗开关
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })
const tableData = ref([])
const messgaeInfor=reactive({
    message_title:'',
    message_content:''
})
import {getDepartmentMsg,getDepartmentMsgList,
    getReadListAndStatus,
    clickDelete} from '@/api/dep_msg.js'
//获取消息列表
//定义当前未读消息
const readlist=ref([])
const getdepartmentmsg=async()=>{
    //判断是否存在 用户是否有这个部门
    const id=localStorage.getItem('id')
    const department=localStorage.getItem('department')
    if(department!==null){
        const res= await getReadListAndStatus(id)
        tableData.value= await getDepartmentMsgList(department)
        if(res[0].read_list==0){
          const {read_list} =await getDepartmentMsg(id,department) 
        }else{
            readlist.value=res[0].read_list
        }
    }
}
getdepartmentmsg()
 </script>
 
 <style lang="scss" scoped>
 .el-aside{
    padding-left: 8px;
    min-height: 500px;
 }
 .el-main{
    min-height: 500px;
    --el-main-padding:0px;
    border-left: 1px solid #eee;
 }
 .message-list-wrapped{
    height: 500px;
 }
 .list-table-content{
    min-height: 10px;
    padding: 8px;
 }
 .el-dialog{
     display: flex;
     padding: 5px 10px;
 }
 .el-dialog_body{
padding: 0px;
 }
 :deep(.el-form-item){
     margin:10px ;
 }
.title{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.datil-wrapped{
    padding: 8px;
}
.el-table{
    height: 100%;
}
 </style>