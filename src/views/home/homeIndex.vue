<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <!-- 首页外壳 -->
  <div class="home-wrapped">
    <!-- 轮播图外壳 -->
    <div class="swiper-wrapped">
      <el-carousel :interval="2000" type="card" height="320px" indicator-position="outside">
        <el-carousel-item v-for="(item,index) in imageSwiperUrl" :key="index">
          <img :src="item" class="swiper" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 栅格布局外壳 -->
    <div class="layout-wrapped">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in companyintroduce" :key="index"  @click="openIntroduce(index+1)">
          <div class="company-massage-area" >
          <span>{{item.set_name}}</span>
          <div v-html="item.set_text" class="company-introduce"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 表格外壳 -->
    <div class="two-table-wrapped">
      <!-- 公司公告 -->
       
      <div class="company-notice">
        <span>公司公告</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      </div>
      <!-- 系统消息 -->
      <div class="system-message">
        <span>系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      </div>
    </div>
  </div>
  <introduce ref="intro"></introduce>
</template>

<script lang="ts" setup>
 /* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {  ref } from 'vue'
 const breadcrumb=ref()
 const item=ref({
    frist:'首页',
 })
//获取轮播图
import {getAllSwiper,getAllCompanyIntroduce} from '@/api/setting.js'
const imageSwiperUrl=ref([])
//获取轮播图
const getAllswiper=async ()=>{
  imageSwiperUrl.value=await getAllSwiper()
}
getAllswiper()
//获取公司介绍
const companyintroduce=ref([])
const getAllCompanyintroduce=async ()=>{
  const res=await getAllCompanyIntroduce()
  const[name,...intro]=res
  companyintroduce.value=intro
}
getAllCompanyintroduce()
//打开介绍信息
import introduce from '@/views/home/compontents/IntroduceDialog.vue'
import { bus } from "@/utils/mitt.js" 
//介绍弹窗
const intro=ref()
const openIntroduce=(id:number)=>{
  bus.emit('introduce',id)
  //console.log(introduceP.value.open);
  intro.value.open()
}

 const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

</script>

<style lang="scss" scoped>
@mixin table-class{
  height: 240px;
  width: 48%;
  display: flex;
  flex-direction: column;
  span{
    border-bottom:1px solid #ea0709 ;
    font-size: 14px;
    margin-bottom: 5px;
    padding:6px;
  }
}
.home-wrapped{
  padding: 8px;
  background-color: #f5f5f5;
  /* 减去头部和面包屑 */
  height: calc(100vh - 101px);
  .swiper-wrapped{
    padding: 0 20px;
    background-color:#fff ;
    margin-bottom: 8px;
    .swiper{
      width: 100%;
      height: 100%;
    }
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }


  }
  .layout-wrapped{
    padding: 8px;
    margin-bottom: 8px;
    background-color:#fff ;
    .company-massage-area{
      background-color: #f5f5f5;
      height: 200px;
      padding: 8px;
      cursor: pointer;
      span{
        border-bottom:1px solid #409eff ;
        font-size: 14px;
      }
      .company-introduce{
        text-indent: 24px;
        font-size: 14px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .company-massage-area:hover{
      background-color: #eef5ff;
      cursor: pointer;
    }
  }
  .two-table-wrapped{
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    .company-notice{
      @include table-class
    }
    .system-message{
      @include table-class
    }
  }
}
</style>