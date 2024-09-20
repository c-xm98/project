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
             <div class="search-wrapped"></div>
             <div class="button-wrapped"></div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content"></div>
    </div>
    <!-- 底部 -->
    <div class="table-footer"></div>
   </div>
</template>

<script lang="ts" setup>
/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref } from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'产品管理员',
 })
</script>

<style lang="scss" scoped>
.table-wrapped{
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f3f3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table-top{
        .table-header{
            background: #f4f4f4f4;
        }
    }
}
</style>