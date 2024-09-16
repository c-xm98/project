<template>
  <!-- 登录页面 -->
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>后台管理系统</h3>
          <span class="welcome">欢迎登录</span>
        </div>
      </el-header>
      <!-- 中间内容 -->
      <el-main class="el-main">
        <div class="login-wrapped">
          <!-- 登录的卡片 -->
          <el-card class="box-card">
            <!-- 登录卡片的标签 -->
            <el-tabs  class="demo-tabs" @tab-click="handleClick" :stretch="true" v-model="activeNameL">
              <el-tab-pane label="登录" name="登录" >
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
                  </el-form-item>
                  <!-- 底部注册外壳 -->
                  <div class="footer-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="openForget">忘记密码</span>
                    </div>
                    <div class="footer-button">
                    <el-button type="primary" :round="true" @click="Login">登录</el-button>
                  </div>
                  <div class="footer-go-register">
                    还没有账号？
                    <span class="go-register">马上注册</span>
                  </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="账号长度6-12位" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="registerData.password" placeholder="密码长度6-12位含数字密码" />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="registerData.repassword" placeholder="请再次输入密码" />
                  </el-form-item>
                  <div class="footer-wrapped">
                    <div class="footer-button">
                    <el-button type="primary" :round="true" @click="Register">注册</el-button>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <a href="https://cn.vuejs.org/guide/quick-start#using-vue-from-cdn">友情链接</a> |
            <a href="https://cn.vuejs.org/guide/quick-start#using-vue-from-cdn">友情链接</a> |
            <a href="https://cn.vuejs.org/guide/quick-start#using-vue-from-cdn">友情链接</a> |
            <a href="https://cn.vuejs.org/guide/quick-start#using-vue-from-cdn">友情链接</a>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <forget ref="forgetP"></forget>
</template>
<script lang="ts" setup>
import { ref,reactive} from 'vue'
/* 引入忘记密码 */
import forget from '../login/components/forget_password.vue'
//登录接口
import {login,register} from '@/api/login'
import { ElMessage } from 'element-plus';
//跳转到首页的路由
import {useRouter} from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import {useUserInFor} from '@/store/userInfor'
const store =useUserInFor()

const activeName = ref('first')
const activeNameL=ref('登录')
const router=useRouter()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
/* 表单的接口 */
interface formData{
  account:number | null;
  password:string;
  /* ?就是没有这个属性也不会报错 */
  repassword?:string;
}
/* 登录表单数据 */
const loginData:formData = reactive({
  account: null,
  password:''
})
/* 注册表单数据 */
const registerData:formData=reactive({
  account: null,
  password:'',
  repassword:''
})
const forgetP=ref()

/* 忘记密码点击事件 */
const openForget=()=>{
  forgetP.value.open()

}
//点击注册
const Register=async()=>{
  if(registerData.password==registerData.repassword){
    //传入表单数据的账号和密码
  const res=await register(registerData)
  //提示用户注册成功
  if(res.message=='注册账号成功'){
    ElMessage({
      message:'注册成功',
      type:'success'
    })
    //注册成功后跳转到登录页面
    activeName.value='first'
  }else{
    ElMessage.error('注册失败，请检查是否符合规范')
  }
}else {ElMessage.error('注册失败，两次密码不一样')
  }
}
 
//点击登录
const Login=async()=>{
  //传入表单数据的账号和密码
  const res=await login(loginData)
  const {id} =res.results
  //存到本地
  const {token}=res
  //console.log('222',id);
  if(res.message=='登录成功'){
    ElMessage({
      message:'登录成功',
      type:'success'
    })
    localStorage.setItem('id',id)
    localStorage.setItem('token',token)
    /* 拿着id去pinia的store更新数据 */
    store.userInfor(id);  

// 现在 userStore 中的状态已经被更新，你可以直接使用这些状态  
    //登录成功跳转到首页
  router.push('/home')
  }else{
    ElMessage.error('登录失败')
  }
}
</script>

<style lang="scss" scoped>
/* 头部外壳 */

  .header-wrapped{
    /* 头部内容区一般1200px */
    .header-content{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .welcome{
        font-size: 13px;
      }
    }
  }

  .el-main{
    background-image:url('../../assets/bgm.png') ;
    height: 500px;
    background-repeat: no-repeat; 
    padding: 0;
    /* 登录外壳 */
    .login-wrapped{
      width: 1200px;
      height: 500px;
      margin:0 auto;
      /* 登录卡片样式  */
      .box-card{
        width: 350px;
        height: 375px;
        float: right;
        position: relative;
        top: 10%;
      }
      /* 登录底部外壳 */
      .footer-wrapped{
        display: flex;
        flex-direction: column;
        /* 忘记密码 */
        .forget-password{
          display: flex;
          justify-content: flex-end;
          margin: 10px;
          .forget-password-button{
            font-size: 12px;
            color: #409eff;
            cursor: pointer;
          }

        }/* 登陆样式 */
        .footer-button{
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .footer-go-register{
          font-size: 12px;
          margin: 12px 0;
          display: flex;
          justify-content: center;
          .go-register{
            color: #409eff;
            /* 鼠标移入的效果 */
            cursor: pointer;
          }
        }
      }
    }
  }
  /* 下方连接 */
  .footer-wrapped{
    margin-top: 8px;
    .footer-content{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        color:#666 ;
        font-size: 12px;
        text-decoration:none;
        
      }
      .title{
        color:#666 ;
      }
    }

  }
  .el-form{
    margin-top: 30px;
  }
  /* 样式穿透 登录注册文字样式 */
  :deep(.el-tabs__item){
    color: #333;
    font-size:18px ;
  }
  /* 样式穿透，输入框的高度 */
  :deep(.el-input-inner){
    height: 40px;
  }
  /* 样式穿透，输入框标签字体框高度 */
  :deep(.el-form-item__label){
    height: 40px;
    line-height: 40px;
  }
/* 样式穿透 登录按钮的样式 */
  :deep(.el-button){
    width: 300px;
    height: 45px;
    font-size: 16px;
  }
  :deep(.el-tab-pane){
    display: block;
  }
</style>