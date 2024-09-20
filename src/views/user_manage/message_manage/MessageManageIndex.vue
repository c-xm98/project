<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
</template>

<script lang="ts" setup>
/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref } from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'消息管理员',
 })
</script>

<style lang="scss" scoped>

</style>