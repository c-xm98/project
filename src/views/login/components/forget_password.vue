<template>
    <!-- 忘记密码 -->
    <el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px">
    <!-- 两个表单 -->
    <el-form class="login-form" :label-position="labelPosition"  :rules="rules">
        <el-form-item label="输入您的账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的账号" />
        </el-form-item>
        <el-form-item label="输入个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="输入个人邮箱" />
        </el-form-item>
        <!-- 底部注册外壳 -->
        <el-form-item>
            <el-button @click="state.forgetPasswordDialog=false">取消</el-button>
            <el-button type="primary" @click='verifyAccount'>下一步</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 修改密码 -->
  <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
    <!-- 两个表单 -->
    <el-form class="login-form" :label-position="labelPosition"  :rules="rules">
        <el-form-item label="输入您的新密码" prop="password">
        <el-input v-model="forgetData.password" placeholder="输入您的新密码" show-password/>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="password">
        <el-input v-model="forgetData.repassword" placeholder="再次输入密码" show-password/>
        </el-form-item>
        <!-- 底部注册外壳 -->
        <el-form-item>
            <el-button @click="state.changePasswordDialog=false">取消</el-button>
            <el-button type="primary" @click="rPassword">确认</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
    import { reactive,ref} from 'vue'
    //导入忘记密码
    import {verify,resetPassword} from '@/api/login.js'
    import { ElMessage } from 'element-plus';
    const labelPosition = ref('top')
    /* 表单的接口 */
    interface formsData{
        account:number | null;
        email:string;
        password:string;
        repassword:string;
    }
    /* 忘记密码的表单数据 */
    const forgetData:formsData = reactive({
        account: null,
        email:'',
        password:'',
        repassword:''
    })

    /* 用一个对象去包裹对话框，默认对话框关闭，这样就可以暴露出去了 */
    const state=reactive({
        forgetPasswordDialog:false,
        changePasswordDialog:false
    })
    

    
    /* 修改密码的弹窗 1.打开验证窗口 先验证账号和邮箱*/
    const verifyAccount=async()=>{
      const res =await verify(forgetData)
      console.log(res);
      if(res.data.status==0){
        ElMessage({
          message:'验证成功',
          type:'success'
        })
        //需要用到后端返回的id，先将id本地存储
        localStorage.setItem('id',res.data.id)
        //验证成功  页面跳转
        state.forgetPasswordDialog=false
      state.changePasswordDialog=true  
      }else{
    ElMessage.error('验证失败')
  }
    }
//重置密码
/*2. 账号邮箱验证成功后，修改密码，就是两次输入的密码是否一样，然后传给后端 */
const rPassword=async()=>{
  if(forgetData.password==forgetData.repassword){
    const newPassword=forgetData.repassword
    await resetPassword(localStorage.getItem('id'),newPassword)
    ElMessage({
          message:'修改成功',
          type:'success'
        })
  }else{
    ElMessage.error('修改失败')
  }
}

    /* 定义一个方法 ,打开弹窗*/
    const open=()=>{
        state.forgetPasswordDialog=true
    }
    /* 暴露 */
    defineExpose({
        open
    })
    /* 表单校验 */
    const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入你的注册账号',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入你的注册邮箱',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      required: true,
      message: '再次输入密码',
      trigger: 'blur',
    },
  ],

})
//



</script>

<style lang="scss" scoped>

</style>