<template>
   <div class="bread-crumb">
    <el-icon><Location /></el-icon>
    <!-- <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ props.item.frist }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.item.second">{{ props.item.second }}</el-breadcrumb-item>
        </el-breadcrumb>
   </div>
</template>

<script lang="ts" setup>

/* import SvgIcon from '@/components/svgIcon.vue' */
    const props=defineProps(['item'])
</script>

<style lang="scss" scoped>
    .bread-crumb{
        height: 30px;
        padding:0 20px ;
        display: flex;
        align-items: center;
    }
    .el-breadcrumb{
        margin-right: 4px;
    }
    /* 样式穿透 */
    :deep(.el-breadcrumb-item){
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
    :deep(.el-breadcrumb__inner){
        font-weight: 500;
    }
</style>