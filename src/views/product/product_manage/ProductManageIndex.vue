<template>
    <!-- 面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
    <div class="module-common-wrappped">
        <div class="module-common-content">
            <el-tabs v-model="activeName" class="demo-tabs" >
                <el-tab-pane label="产品列表" name="first">
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
                                <div class="button-wrapped">
                                    <el-button type="primary" @click="productInWarehouse">添加产品</el-button>
                                </div>
                            </div>
                            <div class="module-common-product-tab">
                                <el-table :data="tableData" border style="width: 100%">
                                    <el-table-column type="index" width="50" />
                                    <el-table-column prop="product_id" label="入库编号" width="200" />
                                    <el-table-column prop="product_name" label="产品名称"  width="160"/>
                                    <el-table-column prop="product_category" label="产品类别" width="100" />
                                    <el-table-column prop="product_unit" label="单位" />
                                    <el-table-column prop="product_inwarehouse_number" label="库存数量" width="100" />
                                    <el-table-column prop="product_single_price" label="产品单价" width="150" />
                                    <el-table-column prop="product_all_price" label="库存总价" width="100"  />
                                    <el-table-column prop="" label="库存状态" width="100">
                                        <template #default="{row}">
                                            <el-tag type="danger" v-if="row.product_inwarehouse_number<30">库存较少</el-tag>
                                            <el-tag type="success" v-else-if="row.product_inwarehouse_number>30 && row.product_inwarehouse_number<300">库存充足</el-tag>
                                            <el-tag type="primary" v-else-if="row.product_inwarehouse_number>300">库存过剩</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="product_create_person" label="入库负责人" width="100" />
                                    <el-table-column prop="product_create_time" label="入库时间" width="200">
                                        <template #default="{row}">
                                            <div>
                                                {{ row.product_create_time?.slice(0,10) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="product_update_time" label="最后修改时间" width="200">
                                        <template #default="{row}">
                                            <div>
                                                {{ row.product_update_time?.slice(0,10) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="in_memo" label="入库备注"  width="200"/>
                                    <el-table-column  label="操作" width="300px" fixed="right">
                                        <template #default="{row}">
                                            <div>
                                                <el-button type="primary" @click="ApplyOutButton(row)" :disabled='row.product_out_status=="申请出库"'>申请出库</el-button>
                                                <el-button type="success" @click="EditProductButton(row)" :disabled='row.product_out_status=="申请出库"'>修改</el-button>
                                                <el-button type="danger" @click="DeleteProductButton(row)" :disabled='row.product_out_status=="申请出库"'>删除</el-button>
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
                </el-tab-pane>
                <el-tab-pane label="审核列表" name="second">
                    <div class="pane-content">
                        <div class="pane-top">
                            <div class="module-common-product-header">
                                <div class="search-wrapped">
                                    <el-input
                                        v-model="input2"
                                        class="w-50 m-2"
                                        placeholder="输入出库编号进行搜索"
                                        :suffix-icon="Search"
                                        @change="searchAdmin"
                                        />
                                </div>
                                <div class="button-wrapped">
                                </div>
                            </div>
                            <div class="module-common-product-tab">
                                <el-table :data="applyTableData" border style="width: 100%">
                                    <el-table-column type="index" width="50" />
                                    <el-table-column prop="product_out_id" label="申请出库编号" width="200" />
                                    <el-table-column prop="product_name" label="产品名称"  width="200"/>
                                    <el-table-column prop="product_out_number" label="申请出库数量" width="180" />
                                    <el-table-column prop="product_out_price" label="申请出库总价" width="180" />
                                    <el-table-column prop="product_out_apply_person" label="申请人" width="100" />
                                    <el-table-column prop="apply_memo" label="申请出库备注" width="180"  />
                                    <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
                                    <el-table-column prop="product_out_status" label="审核状态" width="100"  />
                                    <el-table-column prop="product_apply_time" label="申请出库时间" width="180">
                                        <template #default="{row}">
                                            <div>
                                                {{ row.product_apply_time?.slice(0,10) }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="audit_memo" label="审核备注" width="180"  />
                                    
                                    <el-table-column  label="操作" width="300px" fixed="right">
                                        <template #default="{row}">
                                            <div>
                                                <el-button type="primary" >申请出库</el-button>
                                                <el-button type="success" >修改</el-button>
                                                <el-button type="danger" >删除</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <inwarehouse ref="inware" @success="getproductlist"></inwarehouse>
    <applyout ref="applyoutP"></applyout>
    <editproduct ref="editproductP"></editproduct>
    <deleteproduct ref="deleteproductP"></deleteproduct>
  </template>
  
  <script lang="ts" setup>
  /* 引入面包屑 */
  import breadCrumb from '@/components/breadCrumb.vue'
  import {ref,reactive} from 'vue'
  const breadcrumb=ref()
  const item=ref({
  frist:'产品管理',
  second:'产品列表',
   })
  const activeName=ref('first')
   //搜索框
 import { Search } from '@element-plus/icons-vue'
//产品表格
  const tableData = ref([])
//产品申请出库表格
  const applyTableData = ref([])
 //输入的产品编号
 const input1 = ref('')
 //产品出库编号
 const input2 = ref('')
 const searchAdmin=async()=>{
    //搜索完成后赋值到表格里
    //tableData.value=await searchUser(input2.value)
}
//新建产品  入库
import inwarehouse from '@/views/product/components/ProductInWarehouse.vue'
const inware=ref()
const productInWarehouse=()=>{
    inware.value.open()
}
//获取产品列表
 import {getProductList} from '@/api/product.js'
const getproductlist=async()=>{
    tableData.value=await getProductList()
}
getproductlist()
//申请出库 按钮
import { bus } from "@/utils/mitt.js"
import applyout from '@/views/product/components/ApplyOut.vue'
const applyoutP=ref()
const ApplyOutButton=(row:any)=>{
    /* bus传递参数，在组件里接收 */
    bus.emit('applyId',row)
    applyoutP.value.open()
}
//获取审核列表
import {applyProductList} from '@/api/product.js'
const applyProductlist=async()=>{
    applyTableData.value=await applyProductList()
}
applyProductlist()
//修改按钮
import editproduct from '@/views/product/components/EditProduct.vue'
const editproductP=ref()
const EditProductButton=(row:any)=>{
    /* bus传递参数，在组件里接收 */
    bus.emit('editId',row)
    editproductP.value.open()
}
//删除按钮
import deleteproduct from '@/views/product/components/DeleteProduct.vue'
const deleteproductP=ref()
const DeleteProductButton=(row:any)=>{
    /* bus传递参数，在组件里接收 */
    bus.emit('deleteId',row)
    deleteproductP.value.open()
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
        height: calc(100vh - 166px);
        background: #fff;
        .pane-top{
            .module-common-product-header{
                padding: 0 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .module-common-product-tab{
                min-height: 10px;
                padding: 10px 20px 20px;
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