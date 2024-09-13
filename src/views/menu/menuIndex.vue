<template>
  <!-- 右侧菜单栏 -->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="side_text">后台管理系统</div>
        <el-menu  class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="home" >
            <el-icon><House /></el-icon>
          <span>首页</span>
          </el-menu-item>
            <el-menu-item index="2" >
              <el-icon><Document /></el-icon>
              <span>系统概览</span>
            </el-menu-item>
            <el-sub-menu index="3">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
            <el-menu-item index="3-1">产品管理员</el-menu-item>
            <el-menu-item index="3-2">用户管理员</el-menu-item>
            <el-menu-item index="3-3">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
            <el-menu-item index="3-4">用户列表</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
            <template #title>
              <el-icon><TakeawayBox /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
            <el-menu-item index="4-1">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
            <el-menu-item index="4-2">出库列表</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
            <template #title>
              <el-icon><ChatSquare /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
            <el-menu-item index="5-1">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
            <el-menu-item index="5-2">回收站</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>
              <el-menu-item index="6">
                <el-icon><Files /></el-icon>
                <span>合同管理</span>
              </el-menu-item>
              <el-menu-item index="7">
                <el-icon><DocumentCopy /></el-icon>
                <span>操作日志</span>
              </el-menu-item>
              <el-menu-item index="8">
                <el-icon><Notebook /></el-icon>
                <span>登录日志</span>
              </el-menu-item>
              <el-menu-item index="set">
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的 {{userStore.name}} 欢迎登录！ </span>
          <div class="header-right-conten">
            <el-icon><Message /></el-icon>
            <!-- 右上角的小头像 -->
            <el-avatar :size="24" :src="userStore.imageUrl" />
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
/* import {
  Menu as IconMenu,
} from '@element-plus/icons-vue' */

import {useRouter} from 'vue-router'

const router=useRouter()
const goLogin=()=>{
  router.push('/')
}
import {useUserInFor} from '@/store/userInfor'
/* import {bind} from '@/api/userInfor' */
const userStore=useUserInFor()

</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  display: none;
}
/* 侧边栏样式 */
  .el-aside{
    height: 105vh;
    background-color: #2b303b;
    width: 200px;
    //overflow: hidden;
    .side_text{
      background-color: #2b303b;
      padding: 20px;
      display: flex;
      justify-content: center;
      color: #fff;
    }
    .el-menu{
      background-color: #2b303b;
      width: 210px;
      height: 100px;
      border-block: 0px;
    }
    .el-menu-item{
      color: #fff;
    }
    
  }
  .el-menu-item:hover{
      background-color:#006eff ;
    }
    :deep(.el-sub-menu__title:hover){
      background-color:#006eff ;
    } 
    :deep(.el-sub-menu__title){
      color: #fff;
    }
    :deep(.el-menu--inline){
      background-color: #2b303b;
    }
/* 头部样式 */
.el-header{
  color: #fff;
  display: flex;
  height: 55px;
  background-color: #2b303b;
  align-items: center;
  justify-content: space-between;
  .header-right-conten{
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }

}

.el-main {
    --el-main-padding: 0px;
    background-color:#f3f4fa ;
}
</style>