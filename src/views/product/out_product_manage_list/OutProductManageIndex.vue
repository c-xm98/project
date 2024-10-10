<template>
    <!-- 面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
    <div class="module-common-wrappped">
        <div class="module-common-content">
            <div class="pane-content">
                <div class="pane-top">
                    <div class="module-common-product-header">
                        <div class="search-wrapped">
                            <el-input
                                v-model="input1"
                                class="w-50 m-2"
                                placeholder="输入产品入库编号进行搜索"
                                :suffix-icon="Search"
                                @change="searchAdmin"
                                />
                        </div>
                        <!-- <div class="button-wrapped">
                            <el-button type="primary">添加产品</el-button>
                        </div> -->
                    </div>
                    <div class="module-common-product-tab">
                        <el-table :data="applyTableData" border style="width: 100%">
                            <el-table-column type="index" width="50" />
                            <el-table-column prop="product_out_id" label="出库编号" width="200" />
                            <el-table-column prop="product_name" label="产品名称"  width="200"/>
                            <el-table-column prop="product_out_number" label="申请数量" width="180" />
                            <el-table-column prop="product_out_price" label="申请出库总价" width="180" />
                            <el-table-column prop="product_out_apply_person" label="出库申请人" width="100" />
                            <el-table-column prop="apply_memo" label="申请出库备注" width="180"  />
                            <el-table-column prop="product_apply_time" label="申请出库时间" width="180">
                                <template #default="{row}">
                                    <div>
                                        {{ row.product_apply_time?.slice(0,10) }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
                            <el-table-column prop="product_out_status" label="审核状态" width="100"  />
                            <el-table-column prop="product_audit_time" label="审核时间" width="180">
                                <template #default="{row}">
                                    <div>
                                        {{ row.product_audit_time?.slice(0,10) }}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="audit_memo" label="审核备注" width="180"  />
                            
                        </el-table>
                    </div>
                </div>
                <!-- 底部分页 -->
                <div class="table-footer">
                    <el-pagination layout="prev, pager, next" :total="50" />
                </div>
                </div>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  /* 引入面包屑 */
  import breadCrumb from '@/components/breadCrumb.vue'
  import {ref} from 'vue'
  const breadcrumb=ref()
  const item=ref({
  frist:'产品管理',
  second:'出库列表',
   })
   //搜索框
 import { Search } from '@element-plus/icons-vue'
//产品表格
  const tableData = ref([])
 //输入的产品编号
 const input1 = ref('')
 const searchAdmin=async()=>{
    //搜索完成后赋值到表格里
    //tableData.value=await searchUser(input2.value)
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
        height: calc(100vh - 112px);
        background: #fff;
        .pane-top{
            .module-common-product-header{
                padding: 5px 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .module-common-product-tab{
                min-height: 10px;
                padding: 10px 10px 20px;
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
  </style>