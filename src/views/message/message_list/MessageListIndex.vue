<template>
    <!-- 面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
    <div class="module-common-wrappped">
        <div class="module-common-content">
            <el-tabs v-model="activeName" class="demo-tabs" >
                <el-tab-pane label="公告管理" name="first">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-product-header">
                                <div class="search-wrapped">
                                    <el-select v-model="Department" 
                                        placeholder="选择部门进行搜索"  
                                        @change="searchForDepartment"
                                        >
                                            <el-option v-for="item in departmentdData" :key="item" :label="item" :value="item" />
                                        </el-select>
                                    <el-radio-group v-model="level" class="ml-4" @change="searchmessagebylevel">
                                        <el-radio value="一般" size="large">一般</el-radio>
                                        <el-radio value="重要" size="large">重要</el-radio>
                                        <el-radio value="必要" size="large">必要</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" plain @click="getmessagelist">全部公告</el-button>
                                    <el-button type="primary" @click="createCompanyMessage(1)">发布公告</el-button>
                                </div>
                            </div>
                            <div class="module-common-product-tab">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column type="index" width="50" />
                                    <el-table-column prop="message_title" label="公告主题" width="100" />
                                    <el-table-column prop="message_category" label="类别"  width="100"/>
                                    <el-table-column prop="message_publish_department" label="发布部门" width="100" />
                                    <el-table-column prop="message_publish_name" label="发布人" />
                                    <el-table-column prop="message_receipt_object" label="接收对象" width="100" />
                                    <el-table-column prop="message_level" label="公告等级" width="100" />
                                    <el-table-column prop="message_create_time" label="发布时间" width="100">
                                        <template #default="{row}">
                                            <div>
                                                {{ row.message_create_time?.slice(0,10) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_update_time" label="最新编辑时间" width="120">
                                        <template #default="{row}">
                                            <div>
                                                {{ row.message_update_time?.slice(0,10) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="message_click_number" label="阅读人数"  width="100"/>
                                    <el-table-column  label="操作" width="200px">
                                        <template #default="{row}">
                                            <div>
                                                <el-button type="success" @click="editMessage(row)" >编辑</el-button>
                                                <el-button type="danger" @click="DeleteMessageButton(row)" >删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    
                                </el-table>
                            </div>
                        </div>
                        <!-- 底部分页 -->
                        <div class="table-footer">
                            <el-pagination layout="prev, pager, next" :total="50" />
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="系统消息" name="second">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-product-header">
                                <div class="search-wrapped">
                                    <el-select v-model="department" placeholder="请输入发布部门">
                                        <el-option label="Zone one" value="shanghai" />
                                        <el-option label="Zone two" value="beijing" />
                                    </el-select>
                                </div>
                                <div class="button-wrapped">
                                    <el-button type="primary" plain @click="createCompanyMessage(2)">发布系统消息</el-button>
                                </div>
                            </div>
                            <div class="module-common-product-tab">
                                <el-table :data="applyTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50" />
                                    <el-table-column prop="message_title" label="消息主题"  />
                                    <el-table-column prop="message_publish_name" label="发布者"  />
                                    <el-table-column prop="message_click_number" label="阅读人数"  />
                                    <el-table-column prop="message_create_time" label="发布时间" >
                                        <template #default="{row}">
                                            <div>
                                                {{ row.message_create_time?.slice(0,16) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="操作" width="200px">
                                        <template #default="{row}">
                                            <div>
                                                <el-button type="success"  @click="editsystemMessage(row)">编辑</el-button>
                                                <el-button type="danger" @click="DeleteMessageButton(row)">删除</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    
                                </el-table>
                            </div>
                        </div>
                        <!-- 底部分页 -->
                        <div class="table-footer">
                            <el-pagination layout="prev, pager, next" :total="50" />
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
<!-- 公司公告 -->
 <createCompanymessage ref="createCM" @success="getnewlist"></createCompanymessage>
 <!-- <createCompanymessage ref="editCM" @success="getmessagelist"></createCompanymessage> -->
 <deletemessage ref="deletemessageP" @success="getnewlist"></deletemessage>
  </template>
  
  <script lang="ts" setup>
  /* 引入面包屑 */
  import breadCrumb from '@/components/breadCrumb.vue'
  import {ref,reactive} from 'vue'
  const breadcrumb=ref()
  const item=ref({
  frist:'消息管理',
  second:'消息列表',
   })
  const activeName=ref('first')
//公司公告表格
  const tableData = ref([])
//系统消息表格
  const applyTableData = ref([])

//根据部门进行筛选消息
const department=ref()
//根据消息等级进行筛选
const level =ref()
import { bus } from "@/utils/mitt.js"
//发布公告
import createCompanymessage from '@/views/message/components/CreateMessage.vue'
const createCM=ref()
const createCompanyMessage=(id:number)=>{
    bus.emit('createMessageid',id)
    createCM.value.open()
}


const editMessage=(row:any)=>{
    bus.emit('editMessageid',row)
    createCM.value.open()
}
const editsystemMessage=(row:any)=>{
    bus.emit('editsystemMessageid',row)
    createCM.value.open()
}
//获取公告列表
 import {companyMessageList} from '@/api/message.js'
const getmessagelist=async()=>{
    tableData.value=await companyMessageList()
}
getmessagelist()
//获取系统消息列表
import {systemMessageList} from '@/api/message.js'
const getsystemlist=async()=>{
    applyTableData.value=await systemMessageList()
}
getsystemlist()
//刷新两个列表
const getnewlist=()=>{
    getsystemlist()
    getmessagelist()  
}
//删除按钮
import deletemessage from '@/views/message/components/DeleteMessage.vue'
const deletemessageP=ref()
const DeleteMessageButton=(row:any)=>{
    /* bus传递参数，在组件里接收 */
    bus.emit('deleteId',row)
    deletemessageP.value.open()
}
//按照部门筛选
//引入其他设置中的部门数据
const departmentdData=ref([])
import {getDepartment} from '@/api/setting.js' 
import {searchMessageBydepartment,searchMessageBylevel} from '@/api/message.js' 

const getdepartment=async()=>{
    departmentdData.value=await getDepartment()
}
getdepartment()
//部门筛选
const Department=ref()
const searchForDepartment=async()=>{
    tableData.value=await searchMessageBydepartment(Department.value)
}  
//消息等级筛选
const searchmessagebylevel=async()=>{
    tableData.value=await searchMessageBylevel(level.value)
} 





  </script>
  
  <style lang="scss" scoped>
 .module-common-wrappped{
    padding: 8px;
    background: #f5f5f5;
    height: calc(100vh - 101px);
    .module-common-content{
       padding: 0 10px; 
       height: 100%;
       background: #fff;
       /* 分页内容 */
       .pane-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100vh - 166px);
        background: #fff;
        .pane-top{
            .module-common-product-header{
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .module-common-product-tab{
                min-height: 10px;
                padding: 10px 20px 20px;
                margin-bottom: 8px;
                background: #fff; 
            }
        }
        //底部分页
        .table-footer{
            display: flex;
            justify-content: flex-end;
            background: #fff;
            /* min-height: 10px;
            padding: 10px 20px 20px;
            margin-bottom: 8px;
            background: #fff; */
        }
       }
    }
 }
 /* 表格样式穿透 */
 :deep(.el-table .cell){
    font-weight: 400;
 }
 .search-wrapped{
    display: flex;
 }
 /* .el-select {
    width: 150px;
 } */
 .el-radio-group {
    align-items: center;
    display: inline-flex;
    font-size: 0;
    margin-left: 20px;
    flex-wrap: nowrap;
}
  </style>