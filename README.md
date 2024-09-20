# project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
# git 管理
- git init
- git add .
- git commit -m "init"
# 系统设置
## 。。。。。。
# 首页
## 首页布局
```
<!-- 首页外壳 -->
  <div class="home-wrapped">
    <!-- 轮播图外壳 -->
    <div class="swiper-wrapped"></div>
    <!-- 栅格布局外壳 -->
    <div class="layout-wrapped"></div>
    <!-- 表格外壳 -->
    <div class="two-table-wrappe"></div>
  </div>
```
### 面包屑
```<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <div>这是首页</div>
</template>

<script lang="ts" setup>
 /* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {  ref } from 'vue'
 const breadcrumb=ref()
 const item=ref({
    frist:'首页',
 })
</script>
```

### 轮播图
element 走马灯
### 栅格布局
element 布局-分栏间隔
### 表格
## 首页与系统设置的数据联动
公司信息/首页管理（轮播图图片）
### 上传轮播图
得配置后端的数据
### 文本编辑器
wangEditor
## 系统设置/首页管理布局
# 系统概览 包括：用户管理、产品管理、消息管理
- 使用了ECharts、element栅格布局
### 基础布局
## 用户管理

## 产品管理
- ProductManageIndex.vue
- 布局
```
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
```
- 
## 消息管理
























