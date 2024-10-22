<template>
    <!-- 面包屑组件 -->
    <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
    <div class="module-common-wrappped">
        <div class="module-common-content">
            <div class="button-wrapped">
                <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    action="http://127.0.0.1:3007/file/uploadFile"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :on-success="handlSuccess"
                    :show-file-list="false"
                >
                <el-button type="primary" plain >上传合同</el-button>
            </el-upload>
                
            </div>
          <div class="module-common-product-tab">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" width="50" />
                    <el-table-column prop="file_name" label="合同名"  />
                    <el-table-column prop="file_size" label="文件大小"  />
                    <el-table-column prop="upload_person" label="上传用户"  />
                    <el-table-column prop="download_number" label="下载次数"  />
                    <el-table-column prop="upload_time" label="上传时间" >
                        <template #default="{row}">
                            <div>
                                {{ row.upload_time?.slice(0,10) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" width="200px">
                        <template #default="{row}">
                            <div>
                                <el-button plain >
                                    <template #default>
                                        <a :href="row.file_url" download="row.file_url" @click="changeClick(row.download_number,row.id)">下载</a>
                                    </template>
                                </el-button>
                                <el-button type="danger" @click="DeleteMessageButton(row)" >删除文件</el-button>
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
    <deletemessage ref="deletemessageP" @success="getfilelist" ></deletemessage>
  </template>
  
  <script lang="ts" setup>
  /* 引入面包屑 */
  import breadCrumb from '@/components/breadCrumb.vue'
  import {ref,reactive} from 'vue'
  const breadcrumb=ref()
  const item=ref({
  frist:'合同管理',
   })
  
  //文件列表表格
  const tableData = ref([])
  
  import { bus } from "@/utils/mitt.js"
  
  //获取文件列表
  import {getFiles,bindFileAndUser} from '@/api/files.js'
  const getfilelist=async()=>{
    tableData.value=await getFiles()
  }
  getfilelist()
  //上传文件
  import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  
])
 import { ElMessage } from 'element-plus'
const handleExceed: UploadProps['onExceed'] = () =>{
    ElMessage.warning('最多上传三个文件')
}
const handlSuccess= (response:any) => {
//添加一个绑定的函数
/* console.log(response); */
    if(response.status==0){
        (async ()=>{
            await bindFileAndUser(localStorage.getItem('name'),response.url)
        })()
        ElMessage({
            message:'上传文件成功',
            type:'success'
        })
        getfilelist()
    }else{
        ElMessage.error('上传文件失败！')
    }
}
//下载 

//删除
  //删除按钮
  import deletemessage from '@/views/files/compontents/TipsFile.vue'
  const deletemessageP=ref()
  const DeleteMessageButton=(row:any)=>{
    /* bus传递参数，在组件里接收 */
    bus.emit('redeleteId',row)
    deletemessageP.value.open()
  }
  import {updateClick} from '@/api/files.js'
 const changeClick=async(download_number:number,id:number)=>{
    await updateClick (download_number,id)
      
    getfilelist()
 }
  
  
  
  
  </script>
  
  <style lang="scss" scoped>
  .module-common-wrappped{
    padding: 8px;
    background: #f5f5f5;
    height: calc(100vh - 121px);
    
  }
  .module-common-content{
       padding: 0 10px; 
       height: 100%;
       background: #fff;
    }
  .module-common-product-tab{
                min-height: 10px;
                padding: 10px 20px 20px;
                margin-bottom: 8px;
                background: #fff; 
            }
  /* 表格样式穿透 */
  :deep(.el-table .cell){
    font-weight: 400;
  }
  .search-wrapped{
    display: flex;
  }
  /* .el-table{
    padding:10px 0;
  } */
  .el-radio-group {
    align-items: center;
    display: inline-flex;
    font-size: 0;
    margin-left: 20px;
    flex-wrap: nowrap;
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
    .button-wrapped{
        padding:  10px;
        display: flex;
        flex-direction: row-reverse;
    }
     a{
    
    text-decoration: none;
 }
  </style>