<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <!-- 表格外壳 -->
   <div class="table-wrapped">
    <!-- 顶部 -->
    <div class="table-top">
        <!-- 表格头部 -->
        <div class="table-header">
           <div class="searchandselect">
             <!-- 搜索框 -->
             <div class="search-wrapped">
                <el-input
                    v-model="input1"
                    class="w-50 m-2"
                    placeholder="输入账号进行搜索"
                    :suffix-icon="Search"
                    />
             </div>
             <div class="select-wrapped" >
                <el-select v-model="formData.department" placeholder="选择部门进行搜索">
                    <el-option v-for="item in departmentdData" :key="item" :label="item" :value="item" />
                </el-select>
             </div>
           </div>
             <div class="button-wrapped">
                <el-button type="primary"  plain>筛选冻结用户</el-button>
                <el-button type="primary" plain>显示全部用户</el-button>
                
             </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index"  width="50" />
                <el-table-column prop="account" label="账号"  />
                <el-table-column prop="name" label="姓名"  />
                <el-table-column prop="sex" label="性别"  />
                <el-table-column prop="identity" label="身份"  />
                <el-table-column prop="department" label="部门" />
                <el-table-column prop="email" label="邮箱"  />
                <el-table-column prop="status" label="状态">
                    <template #default="{row}">
                        <div>
                            
                            <el-tag v-if="row.status==1" class="ml-2" type="danger">冻结</el-tag>
                            <el-tag v-else class="ml-2" type="success">正常</el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="create_time" label="创建时间"  />
                <el-table-column  label="操作" width="200px">
                    <template #default="{row}">
                        <div>
                            <el-button type="primary">冻结</el-button>
                            <el-button type="success">解冻</el-button>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>
    </div>
    <!-- 底部 -->
    <div class="table-footer">
        <el-pagination
            :page-size="3"
            :pager-count="paginationData.pageCount"
            :current-page="paginationData.currentPage"
            @current-change="currentChange"
            layout="prev, pager, next"
            :total="1000"/>
    </div>
   </div>
   <!-- 弹窗组件 -->
   <create ref="createP"></create>
</template>

<script lang="ts" setup>


/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref,reactive } from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'用户列表',
 })
 //输入框
 import { Search } from '@element-plus/icons-vue'
 const input1 = ref()

 //表格
 
const tableData = ref([
    {
        index:1,
        status:0
    }
])
interface form {
    account:string,
    password:string,
    name:string,
    sex:string,
    email:string,
    department:string,
}
//数据
const formData : form=reactive({
    account:'',
    password:'',
    name:'',
    sex:'',
    email:'',
    department:'',
    identity:'产品管理员'
})
//分页
const paginationData=reactive({

    //总页数
    pageCount:1,
    //当前所处页数
    currentPage:1,
})
//监听
const currentChange=()=>{

}
//按钮 添加管理员
import create from '@/views/user_manage/components/CreateAdmin.vue'
const createP=ref()
const openCreate=()=>{
    createP.value.open()
}
//引入其他设置中的部门数据
const departmentdData=ref([])
import {getDepartment} from '@/api/setting.js' 
const getdepartment=async()=>{
    departmentdData.value=await getDepartment()
}
getdepartment()
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
           .searchandselect{
            display: flex;
            .select-wrapped{
                width: 200px;
                margin-left: 5px;
            }
           }
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