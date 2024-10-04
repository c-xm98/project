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
                    @change="searchAdmin"
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
                <el-table-column prop="identity" label="身份"  />
                <el-table-column prop="department" label="部门" />
                <el-table-column prop="email" label="邮箱"  />
                <el-table-column prop="update_time" label="更新时间">
                    <template #default="{row}">
                        <div>
                            {{ row.update_time?.slice(0,10) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作"  width="200px" >
                    <template #default="{row}">
                        <div>
                            <el-button type="success" @click="openEdit(row.id)">编辑</el-button>
                            <el-button type="danger" @click="openDelete(row.id)" >删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>
    </div>
    <!-- 底部 -->
    <div class="table-footer">
        <el-pagination
            :page-size="10"
            :pager-count="paginationData.pageCount"
            :current-page="paginationData.currentPage"
            @current-change="currentChange"
            layout="prev, pager, next"
            :total="adminTotal"
            />
    </div>
   </div>
   <!-- 弹窗组件 -->
   <create ref="createP" ></create>
   <edit ref="editP"></edit>
   <deleteButton ref="deleteP"></deleteButton>
</template>

<script lang="ts" setup>
/* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import {ref,reactive} from 'vue'
const breadcrumb=ref()
const item=ref({
frist:'用户管理员',
 })
 //输入框
 import { Search } from '@element-plus/icons-vue'
 const input2 = ref('')
 //表格
 
const tableData = ref([
    {
        index:1
    }
])
import {searchUser,returnListData,getAdminListLength} from '@/api/userInfor.js'
const searchAdmin=async()=>{
    //搜索完成后赋值到表格里
    tableData.value=await searchUser(input2.value)
}
//分页
const paginationData=reactive({
//总页数
pageCount:1,
//当前所处页数
currentPage:1,
})
//总数 获取管理员数量
const adminTotal=ref<number>(0)
const getAdminlistLength=async()=>{
    const res=await getAdminListLength('用户管理员')
    adminTotal.value=res.length
    //console.log(adminTotal.value);
    
    //页数等于向上取整
    paginationData.pageCount=Math.ceil(res.length/10)
}
getAdminlistLength()
//获取默认的第一页的数据
const getFirstPageList=async()=>{
    tableData.value=await returnListData(1,'用户管理员')
}
getFirstPageList()
//监听 换页
const currentChange=async(value:number)=>{
    paginationData.currentPage=value
    tableData.value=await returnListData(paginationData.currentPage,'用户管理员')
}


/* //获取管理员列表
//import {getAdminList} from '@/api/userInfor.js'
const getAdminlist=()=>{
    getFirstPageList()
}
getAdminlist() */
//按钮 添加管理员
bus.on('adminDialogOff',async(id:number)=>{
    //当前页数
    const current=paginationData.currentPage
    //1 创建管理员 2  编辑管理员 3 对管理员进行降职
        if(id==1){
            getAdminListLength()
        }
        if(id==2){
        tableData.value=await returnListData(paginationData.currentPage,'用户管理员')
        }
        if(id==3){
            tableData.value=await returnListData(paginationData.currentPage,'用户管理员')  
            if(tableData.value.length==0){
                paginationData.currentPage -= current - 1
                getAdminListLength()
            }
        }
})
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
//删除按钮 降级管理员
import deleteButton from '@/views/user_manage/components/DeleteAdmin.vue'
const deleteP=ref()
const openDelete=(id:number)=>{
    //第一个参数是标题，第二个参数是要传入的值
    bus.emit('deleteId',id)
    //console.log('dddd',id); 
    deleteP.value.open()
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