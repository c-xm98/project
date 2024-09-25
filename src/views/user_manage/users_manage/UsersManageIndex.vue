<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <!-- 表格外壳 -->
   <div class="table-wrapped">
    <!-- 顶部 -->
    <div class="table-top">
        <!-- 表格头部 -->
        <div class="table-header">
            <!-- 搜索框 -->
             <div class="search-wrapped">
                <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="输入账号进行搜索"
                    :suffix-icon="Search"
                    />
             </div>
             <div class="button-wrapped">
                <el-button type="primary" @click="openCreate(2)">添加用户管理员</el-button>
             </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index"  width="50" />
                <el-table-column prop="account" label="账号"  />
                <el-table-column prop="name" label="姓名"  />
                <el-table-column prop="department" label="部门" />
                <el-table-column prop="email" label="邮箱"  />
                <el-table-column  label="操作" >
                    <template #default="{row}">
                        <div>
                            <el-button type="success" @click="openEdit(2)">编辑</el-button>
                            <el-button type="danger">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>
    </div>
    <!-- 底部 -->
    <div class="table-footer">
        <el-pagination
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"
        />
    </div>
   </div>
   <!-- 弹窗组件 -->
   <create ref="createP"></create>
   <edit ref="editP"></edit>
</template>

<script lang="ts" setup>
/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref } from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'用户管理员',
 })
 //输入框
 import { Search } from '@element-plus/icons-vue'
import { id } from 'element-plus/es/locale/index.mjs';
 const input2 = ref('')
 //表格
 
const tableData = ref([
    {
        index:1
    }
])
//按钮 添加管理员

import create from '@/views/user_manage/components/CreateAdmin.vue'
import { bus } from "@/utils/mitt.js"

const createP=ref()
const openCreate=(id:number)=>{
    //第一个参数是标题，第二个参数是要传入的值
  bus.emit('createId',id)
    createP.value.open()
}
//按钮 编辑
import edit from '@/views/user_manage/components/EditAdmin.vue'
import EditAdmin from '@/views/user_manage/components/EditAdmin.vue';
const editP=ref()
const openEdit=(id:number)=>{
    //第一个参数是标题，第二个参数是要传入的值
  bus.emit('editId',id)
  editP.value.open()
}
</script>

<style lang="scss" scoped>
.table-wrapped{
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table-top{
        .table-header{
            padding:0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 48px;
            background: #fff;
        }
        .table-content{
            padding:0 24px;
            background: #fff;
        }
    }
    .table-footer{
        display: flex;
        justify-content: flex-end;
    }
}
</style>