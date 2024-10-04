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
                    @change="searchAdmin"
                    />
             </div>
             <div class="select-wrapped" >
                <el-select v-model="Department" 
                placeholder="选择部门进行搜索"  
                
                @change="searchForDepartment"
                
                 >
                    <el-option v-for="item in departmentdData" :key="item" :label="item" :value="item" />
                </el-select>
             </div>
           </div>
             <div class="button-wrapped">
                <el-button type="primary"  plain  @click="banuserlist">筛选冻结用户</el-button>
                <el-button type="primary" plain @click="getFirstPageList">显示全部用户</el-button>
                
             </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
            <el-table :data="tableData" border style="width: 100%" @row-dblclick="openUser">
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
                <el-table-column prop="create_time" label="创建时间">
                    <template #default="{row}">
                        <div>
                            {{ row.create_time?.slice(0,10) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                    <template #default="{row}">
                        <div>
                            {{ row.update_time?.slice(0,10) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="200px">
                    <template #default="{row}">
                        <div>
                            <el-button type="primary" @click="banuser(row.id)" :disabled="row.status==1">冻结</el-button>
                            <el-button type="success" @click="hotuser(row.id)" :disabled="row.status==0">解冻</el-button>
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
   <userinfor ref="useri"></userinfor>
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
 //搜索框
import {searchUser,
    returnListData,
    getAdminListLength,
    searchUserBydepartment,
    banUser,
    hotUser,
    getBanList} from '@/api/userInfor.js'
 const input1 = ref()
 //表格
 
const tableData = ref([])



//引入其他设置中的部门数据
const departmentdData=ref([])
import {getDepartment} from '@/api/setting.js' 
const getdepartment=async()=>{
    departmentdData.value=await getDepartment()
}
getdepartment()
//部门筛选
const Department=ref()
const searchForDepartment=async()=>{
    tableData.value=await searchUserBydepartment(Department.value)
}  
/* 问题描述

    在Element UI的`el-select`组件中，当使用`clearable`属性允许用户清除选择时，默认情况下，
    清除操作会触发`change`事件。如果你希望在清除选项时不触发常规的`change`事件处理逻辑，
    可以采用中间变量和自定义逻辑以下策略进行处理。
    另，如果发现clear事件和change事件几乎是同时触发，
    我们可以采用Vue的异步更新队列特性来确保事件处理函数执行。
    这里的关键是使用`$nextTick`方法来适当延迟处理逻辑，确保DOM更新和数据变化完成后再执行接下来的步骤。
 */
//清空选择框
/*const clearOperation=async()=>{
    getFirstPageList()
} */ 

const searchAdmin=async()=>{
    //搜索完成后赋值到表格里
    tableData.value=await searchUser(input1.value)
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
    const res=await getAdminListLength('用户')
    //console.log('用户的长度？',res);
    
    /* adminTotal.value=res.length */
    adminTotal.value=res.length
    //页数等于向上取整
    paginationData.pageCount=Math.ceil(res.length/10)
}
getAdminlistLength()
//获取默认的第一页的数据
const getFirstPageList=async()=>{
    tableData.value=await returnListData(1,'用户')
    //console.log('111',tableData.value);
}
getFirstPageList()
//监听 换页
const currentChange=async(value:number)=>{
    paginationData.currentPage=value
    tableData.value=await returnListData(value,'用户')
}
//获取管理员列表
//import {getAdminList} from '@/api/userInfor.js'
/* const getAdminlist=()=>{
    getFirstPageList()
} */
bus.on('offDialog',async(id:number)=>{
 /* if(id==1){
    getAdminlist()
 } */
//当前页数
const current=paginationData.currentPage
    if(id){
        tableData.value=await returnListData(paginationData.currentPage,'用户')  
        if(tableData.value.length==0){
            paginationData.currentPage -= current - 1
            getAdminListLength()
        }
    }
})

//筛选冻结用户
const banuserlist=async()=>{
    tableData.value=await getBanList()
}
import { ElMessage } from 'element-plus'
//冻结
const banuser=async(id:number)=>{
    const res=await banUser(id)
    if(res.status==0){
    ElMessage({
        message:'冻结成功',
        type:'success'
    })
    getFirstPageList()
   }else{
    ElMessage.error('冻结失败')
   }
}
//解冻

const hotuser=async(id:number)=>{
    const res=await hotUser(id)
    if(res.status==0){
    ElMessage({
        message:'解冻成功',
        type:'success'
    })
    getFirstPageList()
   }else{
    ElMessage.error('解冻失败')
   }
}
import { bus } from "@/utils/mitt.js"
//双击用户出现弹窗
import userinfor from '@/views/user_manage/components/UserInfor.vue'
const useri=ref()
const openUser=(row:any)=>{
    //第一个参数是标题，第二个参数是要传入的值
  bus.emit('userId',row)
  useri.value.open()
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