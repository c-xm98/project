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
          <!-- 头像详情页面的外壳 -->
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
          <!-- 密码详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户密码：</span>
            <div class="account-infor-content">
              <el-button type="primary" @click="openChangePassword" >修改密码</el-button>
            </div>
          </div>
          <!-- 姓名详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户姓名：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.name" />
              <el-button type="primary" class="mybutton" @click="saveName">保存</el-button>
            </div>
          </div>
          <!--性别详情页面的外壳 -->
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
          <!-- 身份详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户身份：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.identity" disabled/>
            </div>
          </div>
          <!-- 部门详情页面的外壳 -->
          <div class="account-infor-wrapped">
            <span>用户部门：</span>
            <div class="account-infor-content">
              <el-input v-model="userStore.department" disabled/>
            </div>
          </div>
          <!-- 邮箱详情页面的外壳 -->
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
              <el-input v-model="companyName" />
              <el-button type="primary" class="mybutton" @click="changeCompanyname">编辑公司名称</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司介绍：</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(1)" >编辑公司介绍</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司架构：</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(2)">编辑公司架构</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司战略：</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(3)" >编辑公司战略</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司高层：</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(4)">编辑公司高层</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="首页管理" name="third">
          <div class="home-wrapped">
            <!-- 提示 -->
            <div class="tips">
              <span>提示：点击图片进行切换首页轮播图</span>
            </div>
            <!-- 轮播图部分 -->
             <div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
              <div class="swiper-name">轮播图{{index+1}}:&nbsp;&nbsp;</div>
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:3007/set/uploadSwiper"
                :show-file-list="false"
                :on-success="handleSwiperSuccess"
                :data="item"
              >
                <template #trigger>
                  <img v-if="imageSwiperUrl[index]" :src="imageSwiperUrl[index]" class="swiper" />
                  <img src="@/assets/bgm.png" alt="" v-else class="swiper">
                </template>  
            </el-upload>
             </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">
          <div class="other-set">
            <div class="department-set">
              <span>部门设置</span>
              <el-tag
                v-for="tag in dynamicTags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                添加其他部门
              </el-button>
            </div>
            <div class="product-set">
              <span>产品设置</span>
              <el-tag
                v-for="tag in dynamicTagsProduct"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleCloseProduct(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisibleP"
                ref="InputProductRef"
                v-model="inputValueP"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirmProduct"
                @blur="handleInputConfirmProduct"
              />
              <el-button v-else class="button-new-tag ml-1" size="small" @click="showInputProduct">
                添加其他产品类型
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <change ref="changeP"></change>
  <!-- 打开修改文本的组件 -->
   <editor ref="editorP"></editor>
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
  if(res.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
    }else{
    ElMessage.error('修改失败')
    }
  
}
const saveGender=async()=>{
  const res=await changeGender(userStore.gender,localStorage.getItem('id'))
  if(res.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
    }else{
    ElMessage.error('修改失败')
    }
  
}
const saveEmail=async()=>{
  const res=await changeEmail(userStore.email,localStorage.getItem('id'))
  if(res.status==0){
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
import {getCompanyName,changeCompanyName} from '@/api/setting'
const companyName=ref()
//获取公司名字
const getCompanyname=async()=>{
  companyName.value=await getCompanyName()
}
getCompanyname()
const changeCompanyname=async()=>{
  const res=await changeCompanyName(companyName.value)
  if(res.status==0){
    ElMessage({
      message:'修改公司名称成功',
      type:'success'
    })
  }else{
    ElMessage.error('修改公司名称失败')
  }
}
import editor from '@/views/set/components/EditorDialog.vue'
import { bus } from "@/utils/mitt.js"
//打开文本编辑器
const editorP=ref()
const openEditor=(id:number)=>{
  //第一个参数是标题，第二个参数是要传入的值
  bus.emit('editorTitle',id)
  editorP.value.open()
}
import {getAllSwiper} from '@/api/setting.js'
//首页管理
const swiperData=[{name:'swiper1'},{name:'swiper2'},{name:'swiper3'},
{name:'swiper4'},{name:'swiper5'},{name:'swiper6'},]
//上传轮播图
/* const bind=bindAccount() */
const handleSwiperSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  getAllswiper()
}
const imageSwiperUrl=ref([])
//获取轮播图
const getAllswiper=async ()=>{
  imageSwiperUrl.value=await getAllSwiper()
}
getAllswiper()
//其他设置
import {setDepartment,getDepartment,getProduct,setProduct} from '@/api/setting.js'
import { nextTick,toRaw} from 'vue'
import { ElInput } from 'element-plus'

const inputValue = ref('')
const inputValueP = ref('')
const dynamicTags = ref()
const dynamicTagsProduct = ref()
//获取部门数据
const getdepartment=async()=>{
  dynamicTags.value=await getDepartment()
}
getdepartment()
//获取产品数据
const getproduct=async()=>{
  dynamicTagsProduct.value=await getProduct()
}
getproduct()
const inputVisible = ref(false)
const inputVisibleP = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const InputProductRef = ref<InstanceType<typeof ElInput>>()
//关闭时的函数
const handleClose =async (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  //传入到后端的数据
  const res=await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
  if(res.status==0){
    ElMessage({
      message:'删除部门设置成功',
      type:'success'
    })
  }else{
    ElMessage.error('删除部门设置失败')
  }
  
}
const handleCloseProduct =async (tag: string) => {
  dynamicTagsProduct.value.splice(dynamicTagsProduct.value.indexOf(tag), 1)
  //传入到后端的数据
  const res=await setDepartment(JSON.stringify(toRaw(dynamicTagsProduct.value)))
  if(res.status==0){
    ElMessage({
      message:'删除产品设置成功',
      type:'success'
    })
  }else{
    ElMessage.error('删除产品设置失败')
  }
  
}
//点击按钮出现输入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
//点击按钮出现输入框 产品
const showInputProduct = () => {
  inputVisibleP.value = true
  nextTick(() => {
    InputProductRef.value!.input!.focus()
  })
}
//输入数据后的函数
const handleInputConfirm =async () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
    const res=await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
  if(res.status==0){
    ElMessage({
      message:'添加部门设置成功',
      type:'success'
    })
  }else{
    ElMessage.error('添加部门设置失败')
  }
  }
  inputVisible.value = false
  inputValue.value = ''
}
//输入数据后的函数  产品
const handleInputConfirmProduct =async () => {
  if (inputValueP.value) {
    dynamicTagsProduct.value.push(inputValueP.value)
    const res=await setProduct(JSON.stringify(toRaw(dynamicTagsProduct.value)))
  if(res.status==0){
    ElMessage({
      message:'添加产品设置成功',
      type:'success'
    })
  }else{
    ElMessage.error('添加产品设置失败')
  }
  }
  inputVisibleP.value = false
  inputValueP.value = ''
}

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
    /* 首页管理外壳 */
    .home-wrapped{
      padding-left: 50px;
      display: flex;
      flex-direction: column;
      //提示
      .tips{
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        span{
          font-size: 14px;
          color: silver;
        }
      }
      //轮播图
      .swiper-wrapped{
        display: flex;
        margin-bottom: 16px;
        .swiper-name{
          font-size: 14px;
          margin-bottom: 24px;
        }
        .swiper{
          width: 336px;
          height: 96px;
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
.other-set{
  padding-left: 50px;
  font-size: 14px;
  .department-set,.product-set{
    margin-bottom:24px ;
    span{
      margin-right: 24px;
    }
  }
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