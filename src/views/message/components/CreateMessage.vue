<!-- 添加产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     :title="title"
     width="50%"
     align-center
     draggable
     :destroy-on-close="true"
   >
     <!-- 表单内容 -->
     <el-form ref="ruleFormRef" :model="formData" label-width="120px" :rules="rules" :label-position="labelPosition">
         <el-form-item label="主题" prop="message_title">
             <el-input v-model="formData.message_title" />
         </el-form-item>
         <el-form-item label="发布部门" prop="message_publish_department" v-if="title=='发布公告'||title=='编辑公告'">
            <el-select v-model="formData.message_publish_department" placeholder="请输入发布部门">
                <el-option label="组织部" value="组织部" />
                <el-option label="开发部" value="开发部" />
            </el-select>
         </el-form-item>
         <el-form-item label="发布人" prop="message_publish_name">
            <el-input v-model="formData.message_publish_name" />
         </el-form-item>
         <el-form-item label="消息类别" prop="message_category" v-if="title=='发布公告'||title=='编辑公告'">
             <el-select v-model="formData.message_category" placeholder="请选择消息类别" >
                 <el-option label="公司公告" value="公司公告" />
                 <el-option label="系统消息" value="系统消息" />
             </el-select>
         </el-form-item>
         <el-form-item label="接收部门" prop="message_receipt_object" v-if="title=='发布公告'||title=='编辑公告'">
            <el-select v-model="formData.message_receipt_object" placeholder="请选择接受部门">
                 <el-option label="开发部" value="开发部" />
                 <el-option label="件" value="件" />
             </el-select>
         </el-form-item>
         <el-form-item label="公告等级" prop="message_level" v-if="title=='发布公告'||titlee=='编辑公告'">
            <el-select v-model="formData.message_level" placeholder="请选择公告等级">
                 <el-option label="一般" value="一般" />
                 <el-option label="重要" value="重要" />
                 <el-option label="必要" value="必要" />
             </el-select>
         </el-form-item>
         <el-form-item label="内容" prop="message_content">
            <div style="border: 1px solid #ccc">
		<!-- wangEditor结构 --> 
			<Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
				:mode="mode" />
			<Editor style="height: 200px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
				:mode="mode" @onCreated="handleCreated" />
		</div>
         </el-form-item>
     </el-form>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="addProduct" >确定</el-button>
       </span>
     </template>
   </el-dialog>
 </template>
 
 <script lang="ts" setup>
 import '@wangeditor/editor/dist/css/style.css' // 引入 css
 import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
 import { reactive, ref,onBeforeUnmount,shallowRef, } from 'vue'
 import { ElMessage } from 'element-plus'
 import type { FormInstance,FormRules} from 'element-plus'
import { bus } from "@/utils/mitt.js"

bus.on('createMessageid',async(id:number)=>{
    if (id == 1) {
			title.value = '发布公告'
			//valueHtml.value = await getCompanyIntroduce('公司介绍')
      
		}
		if (id == 2) {
			title.value = '发布系统消息'
			//valueHtml.value = await getCompanyIntroduce('公司架构')
		}
      
})
bus.on('editMessageid',async(row:any)=>{
    title.value = '编辑公告'
    formData.id =row.id
    formData.message_title = row.message_title
    formData.message_category = row.message_category
    formData.message_publish_department = row.message_publish_department
    formData.message_publish_name = row.message_publish_name
    formData.message_receipt_object = row.message_receipt_object
    formData.message_level = row.message_level
    formData.message_content = row.message_content
    //valueHtml.value = await getCompanyIntroduce('公司介绍')
})
bus.on('editsystemMessageid',async(row:any)=>{
    title.value = '编辑系统消息'
    formData.id =row.id
    formData.message_title = row.message_title
    formData.message_publish_name = row.message_publish_name
    formData.message_content = row.message_content
    //valueHtml.value = await getCompanyIntroduce('公司介绍')
})
 //标题
 const title=ref()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// mode
const mode = ref('default')
// 内容 HTML
const valueHtml = ref()
const handleCreated = (editor : any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
const toolbarConfig = {
		excludeKeys: []
	}
    const editorConfig = {
		placeholder: '请输入内容...',
	}
	// 上传图片，修改 uploadImage 菜单配置
	// 需要注意的是，如何去修改参数？
	toolbarConfig.excludeKeys = [
		'blockquote',
		'bgColor',
		'color',
		'group-more-style',
		'fontFamily',
		'bulletedList',
		'numberedList',
		'lineHeight',
		'todo',
		'emotion',
		'insertLink',
		'group-video',
		'insertTable',
		'codeBlock',
		'divider',
		'fullScreen',
		// 'group-image',

		// 排除菜单组，写菜单组 key 的值即可
	]
 const ruleFormRef = ref<FormInstance>()
 const rules=reactive<FormRules>({
    message_title:[
         {required:true,message:'请输入消息标题',trigger:'blur'},
     ],
     message_category:[
         {required:true,message:'请选择消息类别',trigger:'blur'},
     ],
     message_publish_department:[
         {required:true,message:'请选择发布部门',trigger:'blur'},
     ],
     message_publish_name:[
         {required:true,message:'请输入消息发布人',trigger:'blur'},
     ],
     message_receipt_object:[
         {required:true,message:'请选择接收部门',trigger:'blur'},
     ],
     message_level:[
         {required:true,message:'请选择消息等级',trigger:'blur'},
     ],
     message_content:[
         {required:true,message:'请输入消息内容',trigger:'blur'},
     ],
 
 })
 //控制弹窗开关
 const dialogVisible = ref(false)
 const open=()=>{
     dialogVisible.value=true
 }
 defineExpose({
     open
 })
 //接口
 interface form {
    id?:number|null;
    message_title:string;
    message_category:string;
    message_publish_department:string;
    message_publish_name:string;
    message_receipt_object:string;
    message_level:string;
    message_content:string;
    
 }
 //数据
 const formData :form=reactive({
    id:0,
    message_title:'',
    message_category:'',
    message_publish_department:'',
    message_publish_name:'',
    message_receipt_object:'',
    message_level:'',
    message_content:''
 })
//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息
 //发布公告
 const emit =defineEmits(['success'])
 import {publishMessage,editMessage} from '@/api/message.js'
 const addProduct=async()=>{
    if(title.value=='发布公告'){
        formData.message_category='公司公告'
        const res=await publishMessage(formData)
    if(res.status==0){
     ElMessage({
         message:'发布公告成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('发布公告失败')
    }
     dialogVisible.value = false
    }
    if(title.value=='编辑公告'){
        const res=await editMessage(formData)
        if(res.status==0){
        ElMessage({
            message:'编辑公告成功',
            type:'success'
        })
        /* bus.emit('adminDialogOff',1) */
        emit('success')
        }else{
        ElMessage.error('编辑公告失败')
        }
        dialogVisible.value = false
    }
    if(title.value=='发布系统消息'){
        formData.message_category='系统消息'
        const res=await publishMessage(formData)
        if(res.status==0){
        ElMessage({
            message:'发布系统消息成功',
            type:'success'
        })
        /* bus.emit('adminDialogOff',1) */
        emit('success')
        }else{
        ElMessage.error('发布系统消息失败')
        }
        dialogVisible.value = false
    }
    if(title.value=='编辑系统消息'){
        const res=await editMessage(formData)
        if(res.status==0){
        ElMessage({
            message:'编辑系统消息成功',
            type:'success'
        })
        /* bus.emit('adminDialogOff',1) */
        emit('success')
        }else{
        ElMessage.error('编辑系统消息失败')
        }
        dialogVisible.value = false
    }
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
 .el-dialog{
     display: flex;
     padding: 5px 10px;
 }
 .el-dialog_body{
padding: 0px;
 }
 :deep(.el-form-item){
     margin:10px ;
 }

 </style>