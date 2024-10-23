<template>
    <!-- 面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
    <div class="module-common-wrappped">
        <div class="module-common-content">
            <div class="table-header">
                <!-- 搜索框 -->
            <div class="search-wrapped">
                <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="输入操作者进行搜索"
                    :suffix-icon="Search"
                    @change="searchOperationLog"
                    />
             </div>
            <div class="button-wrapped">
                <el-button type="primary" plain @click="clearList">清空登录日志</el-button>
            </div>
            </div>
          <div class="module-common-product-tab">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="account" label="登录账号"  />
                    <el-table-column prop="name" label="姓名"  />
                    <el-table-column prop="email" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="login_time" label="登录时间" >
                        <template #default="{row}">
                            <div>
                                {{ row.login_time?.slice(0,16) }}
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
    <deletemessage ref="deletemessageP" @success="getloginloglist" ></deletemessage>
  </template>
  
  <script lang="ts" setup>
  /* 引入面包屑 */
  import breadCrumb from '@/components/breadCrumb.vue'
  import {ref,reactive} from 'vue'
  const breadcrumb=ref()
  const item=ref({
  frist:'登录日志',
   })
   //搜索框
   const input2 = ref()
    //输入框
 import { Search } from '@element-plus/icons-vue'



  //操作日志列表表格
  const tableData = ref([])
  
  import { bus } from "@/utils/mitt.js"
  
  //获取文件列表
  import {getLoginList} from '@/api/log.js'
  const getloginloglist=async()=>{
    tableData.value=await getLoginList()
  }
  getloginloglist()
 //搜索框

 import {searchLoginList} from '@/api/log.js'
const searchOperationLog=async()=>{
    //搜索完成后赋值到表格里
    tableData.value=await searchLoginList(input2.value)
}


  //清空登录日志
  import deletemessage from '@/views/log/compontents/TipsFile.vue'
  const deletemessageP=ref()
  const clearList=()=>{
    deletemessageP.value.open()
  }

  
  </script>
  
  <style lang="scss" scoped>
  .module-common-wrappped{
    padding: 8px;
    background: #f5f5f5;
    height: calc(100vh - 121px);
    
  }
  .module-common-content{
       padding: 0 10px; 
       height: 100%;
       background: #fff;
       .table-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
       }
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
  /* .el-table{
    padding:10px 0;
  } */
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
    .button-wrapped{
        padding:  10px;
        display: flex;
        flex-direction: row-reverse;
    }
     a{
    
    text-decoration: none;
 }
  </style>