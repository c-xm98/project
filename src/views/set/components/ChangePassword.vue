
<script lang="ts" setup>
 import { reactive,ref} from 'vue'
    //导入忘记密码
    import {changePassword} from '@/api/userInfor.js'
    import { ElMessage } from 'element-plus';
    import {useRouter} from 'vue-router'
    const router=useRouter()
    const labelPosition = ref('top')
    /* 表单的接口 */
    interface formsData{
        oldPassword:string;
        newPassword:string;
    }
    /* 忘记密码的表单数据 */
    const passwordData:formsData = reactive({
        oldPassword:'',
        newPassword:'',
    })
 /* 表单校验规则 */
 const rules = reactive({
        newPassword: [
            {
            required: true,
            message: '请输入你的新密码',
            trigger: 'blur',
            },
        ],
        oldPassword: [
            {
            required: true,
            message: '请输入你的旧密码',
            trigger: 'blur',
            },
        ], 
    })
    /* 用一个对象去包裹对话框，默认对话框关闭，这样就可以暴露出去了 */
    const state=reactive({
        changePasswordDialog:false
    })
//确认修改的密码
const rPassword=async()=>{
    //const id=localStorage.getItem('id')
  if(passwordData.oldPassword && passwordData.newPassword){
    
   const res= await changePassword(localStorage.getItem('id'),passwordData.oldPassword,passwordData.newPassword)
   console.log(res);
   
    if(res.status==0){
        ElMessage({
          message:'修改成功',
          type:'success'
        })
        state.changePasswordDialog=false
        //修改完之后跳转到登录页面
        router.push('')
    }else{
    ElMessage.error('修改失败')
    }
  }else{
    ElMessage.error('修改失败')
    }
}

    /* 定义一个方法 ,打开弹窗 */
    const open=()=>{
        state.changePasswordDialog=true
    }
    /* 暴露 */
    defineExpose({
        open
    })
   
</script>
<template>
   <!-- 修改密码 -->
   <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
    <!-- 两个表单 -->
    <el-form class="login-form" :label-position="labelPosition"  :rules="rules">
        <el-form-item label="输入您的新密码" prop="oldPassword">
        <el-input v-model="passwordData.oldPassword" placeholder="输入您的旧密码" show-password/>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="newPassword">
        <el-input v-model="passwordData.newPassword" placeholder="输入您的新密码" show-password/>
        </el-form-item>
        <!-- 底部注册外壳 -->
        <el-form-item>
            <el-button @click="state.changePasswordDialog=false">取消</el-button>
            <el-button type="primary" @click="rPassword">确认</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>


<style lang="scss" scoped>

</style>