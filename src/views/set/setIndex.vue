<template>
  <!-- 面包屑组件 -->
  <breadCrumb ref="breadcrumb" :item="item" ></breadCrumb>
  <!-- 外壳 -->
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <!-- table标签 -->
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户头像：</span>
            <div class="account-infor-content">
              <!-- action上传头像的接口
                   show-file-展示上传多少个文件 
              -->
              <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3007/user/uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :data="testdata"
            > 
                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户账号：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.account" disabled/>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户密码：</span>
            <div class="account-infor-content">
              <el-button type="primary" @click="openChangePassword" >修改密码</el-button>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户姓名：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.name" />
              <el-button type="primary" class="mybutton" @click="saveName">保存</el-button>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户性别：</span>
            <div class="account-infor-content">
              <el-select v-model="userStore.gender" placeholder="请选择">
                <el-option label="男" value="man" />
                <el-option label="女" value="woman" />
              </el-select>
              <el-button type="primary" class="mybutton"  @click="saveGender">保存</el-button>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户身份：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.identity" disabled/>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户部门：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.department" disabled/>
            </div>
          </div>
          <!-- 账号详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户邮箱：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.email"/>
              <el-button type="primary" class="mybutton"  @click="saveEmail">保存</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <div class="account-infor-wrapped">
            <span>公司名称：</span>
            <div class="account-infor-content">
              <el-input v-model="company" />
              <el-button type="primary" class="mybutton">保存</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司介绍：</span>
            <div class="account-infor-content">
              <el-button type="success"  >编辑公司介绍</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司架构：</span>
            <div class="account-infor-content">
              <el-button type="success">编辑公司架构</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司战略：</span>
            <div class="account-infor-content">
              <el-button type="success" >编辑公司战略</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司高层：</span>
            <div class="account-infor-content">
              <el-button type="success" >编辑公司高层</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <change ref="changeP"></change>
</template>

<script lang="ts" setup>

 /* 引入面包屑 */
import breadCrumb from '@/components/breadCrumb.vue'
import { reactive, ref } from 'vue'
 const breadcrumb=ref()
 const item=ref({
    frist:'系统设置',
 })
/* table标签 默认打开 */
const activeName = ref('first')
/* 头像相关 */
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

import {useUserInFor} from '@/store/userInfor'
import {bind,changeName,changeGender,changeEmail} from '@/api/userInfor'
import change from './components/ChangePassword.vue'

const userStore=useUserInFor()

/* const bind=bindAccount() */
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  if(response.status==0){
    userStore.$patch({
      imageUrl:response.url
    })
    ElMessage({
      message:'更新头像成功',
      type:'success'
    }),

    /* console.log('1111',userStore.account,response.url,response.onlyId); */
    /* 绑定账号和头像 */
    (async ()=>{
        await bind(userStore.account,response.onlyId,response.url)
    })()/* 匿名函数要加一个括号才能执行 */
  }else{
    ElMessage.error('更新头像失败！')
  }
}


/* 上传头像的格式规则 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片格式必须为JPG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片必须小于2MB!')
    return false
  }
  return true
}
/* 用户账号输入框 */

const accountData=reactive({
  identity:'',
  account:'',
  department:'',
  name:'',
  gender:'',
  email:''
})
/* 打开修改密码弹窗 */
const changeP=ref()
const openChangePassword=()=>{
  changeP.value.open()
}
const saveName=async()=>{
  const res=await changeName(userStore.name,localStorage.getItem('id'))
  if(res.data.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
    }else{
    ElMessage.error('修改失败')
    }
  
}
const saveGender=async()=>{
  const res=await changeName(userStore.gender,localStorage.getItem('id'))
  if(res.data.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
    }else{
    ElMessage.error('修改失败')
    }
  
}
const saveEmail=async()=>{
  const res=await changeName(userStore.email,localStorage.getItem('id'))
  if(res.data.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
    }else{
    ElMessage.error('修改失败')
    }
}
const testdata=ref('swiper1')
//公司
const company=ref()
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  display: none;
}
/* 外壳 */
.common-wrapped{
  padding: 8px;
  background-color: #f5f5f5;
  /* 减去头部和面包屑 */
  height: calc(100vh - 85px);
  /* 内容 */
  .common-content{
    padding:0 10px;
    //height: 100%;
    background: #fff;
    /* 账号信息  外壳和内容*/
    .account-infor-wrapped{
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      font-size: 14px;

      .account-infor-content{
        margin-left: 24px;
        margin-left: 16px;
        display: flex;
        .mybutton{
          margin-left: 24px;
        }

        /* 头像样式 */
        .avatar-uploader .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
    

  }

}
/* 标签样式 */
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
/* 输入框的长度 */
.el-input{
  width: 240px;
}
.el-select__wrapper{
  width: 240px;
}
</style>