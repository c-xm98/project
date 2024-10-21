<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <div class="module-common-wrappped">
      <div class="module-common-content">
        <div class="module-common-product-tab">
              <el-table :data="tableData" border style="width: 100%">
                  <el-table-column type="index" width="50" />
                  <el-table-column prop="message_title" label="公告主题"  />
                  <el-table-column prop="message_category" label="类别"  />
                  <el-table-column prop="message_publish_department" label="发布部门"  />
                  <el-table-column prop="message_receipt_object" label="接收对象"  />
                  <el-table-column prop="message_delete_time" label="删除时间" >
                      <template #default="{row}">
                          <div>
                              {{ row.message_delete_time?.slice(0,10) }}
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column  label="操作" >
                      <template #default="{row}">
                          <div>
                              <el-button type="success" @click="RecoverMessageButton(row)" >还原</el-button>
                              <el-button type="danger" @click="DeleteMessageButton(row)" >删除</el-button>
                          </div>
                      </template>
                  </el-table-column>
              </el-table>

          </div>
<!-- 底部分页 -->
          <div class="table-footer">
              <el-pagination layout="prev, pager, next" :total="50" />
          </div>
      </div>
  </div>
<recovermessage ref="recovermessageP" @success="getrecyclelist"></recovermessage>
<deletemessage ref="deletemessageP"  @success="getrecyclelist"></deletemessage>
</template>

<script lang="ts" setup>
/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref,reactive} from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'消息管理',
second:'回收站',
 })

//公司公告表格
const tableData = ref([])

import { bus } from "@/utils/mitt.js"

//获取公告列表
import {recycleList} from '@/api/message.js'
const getrecyclelist=async()=>{
  tableData.value=await recycleList()
}
getrecyclelist()

//还原按钮
import recovermessage from '@/views/message/components/DeleteMessage.vue'
const recovermessageP=ref()
const RecoverMessageButton=(row:any)=>{
  /* bus传递参数，在组件里接收 */
  bus.emit('recoverId',row)
  recovermessageP.value.open()
}
//删除按钮
import deletemessage from '@/views/message/components/DeleteMessage.vue'
const deletemessageP=ref()
const DeleteMessageButton=(row:any)=>{
  /* bus传递参数，在组件里接收 */
  bus.emit('redeleteId',row)
  deletemessageP.value.open()
}





</script>

<style lang="scss" scoped>
.module-common-wrappped{
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 101px);
  
}
.module-common-content{
     padding: 0 10px; 
     height: 100%;
     background: #fff;
  }
.module-common-product-tab{
              min-height: 10px;
              padding: 10px 20px 20px;
              margin-bottom: 8px;
              background: #fff; 
          }
/* 表格样式穿透 */
:deep(.el-table .cell){
  font-weight: 400;
}
.search-wrapped{
  display: flex;
}
.el-table{
  padding:10px 0;
}
.el-radio-group {
  align-items: center;
  display: inline-flex;
  font-size: 0;
  margin-left: 20px;
  flex-wrap: nowrap;
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
</style>