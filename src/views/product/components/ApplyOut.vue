<!-- 添加产品的弹窗 -->
<template>
    <el-dialog
     v-model="dialogVisible"
     title="申请出库"
     width="600px"
     align-center
     draggable
   >
     <!-- 表单内容 -->
     <el-form ref="ruleFormRef" :model="formData" label-width="120px" :rules="rules" :label-position="labelPosition">
         <el-form-item label="申请出库编号" prop="product_id">
             <el-input v-model="formData.product_id" />
         </el-form-item>
         <el-form-item label="产品名称" prop="product_name">
             <el-input v-model="formData.product_name" />
         </el-form-item>
         <el-form-item label="产品类别" prop="product_category">
             <el-select v-model="formData.product_category" placeholder="请选择产品类别">
                 <el-option label="食品类" value="食品类" />
                 <el-option label="服装类" value="服装类" />
             </el-select>
         </el-form-item>
         <el-form-item label="产品单位" prop="product_unit">
             <el-select v-model="formData.product_unit" placeholder="请选择产品单位">
                 <el-option label="个" value="个" />
                 <el-option label="件" value="件" />
             </el-select>
         </el-form-item>
         <el-form-item label="库存数量" prop="product_inwarehouse_number">
             <el-input v-model="formData.product_inwarehouse_number" />
         </el-form-item>
         <el-form-item label="产品单价(单位)" prop="product_single_price">
                <el-input v-model="formData.product_single_price" />
         </el-form-item>
         <el-form-item label="入库负责人" prop="product_create_person">
             <el-input v-model="formData.product_create_person" />
         </el-form-item>
         <el-form-item label="入库备注" prop="in_memo">
             <el-input
                v-model="formData.in_memo"
                :rows="2"
                type="textarea"
            />
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
 
 import { reactive, ref,onBeforeUnmount } from 'vue'
 import { ElMessage } from 'element-plus'
 import type { FormInstance,FormRules} from 'element-plus'
 
 
 const ruleFormRef = ref<FormInstance>()
 const rules=reactive<FormRules>({
    product_id:[
         {required:true,message:'请输入产品编号',trigger:'blur'},
     ],
     product_name:[
         {required:true,message:'请输入产品名称',trigger:'blur'},
     ],
     product_category:[
         {required:true,message:'请选择产品种类',trigger:'blur'},
     ],
     product_unit:[
         {required:true,message:'请选择产品单位',trigger:'blur'},
     ],
     product_inwarehouse_number:[
         {required:true,message:'请输入库存数量',trigger:'blur'},
     ],
     product_single_price:[
         {required:true,message:'请输入产品单价',trigger:'blur'},
     ],
     product_create_person:[
         {required:true,message:'请输入入库负责人',trigger:'blur'},
     ],
     in_memo:[
         {required:true,message:'请输入入库备注',trigger:'blur'},
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
    product_id?:number|null,
    product_name:string,
    product_category:string,
    product_unit:string,
    product_inwarehouse_number?:number|null,
    product_single_price?:number|null,
    product_create_person:string,
    in_memo:string,
 }
 //数据
 const formData : form=reactive({
    product_id:null,
    product_name:'',
    product_category:'',
    product_unit:'',
    product_inwarehouse_number:null,
    product_single_price:null,
    product_create_person:'',
    in_memo:''
 })
//向右对齐
const labelPosition=ref('left')
 //确定按钮，获取输入的信息
 //产品入库
 const emit =defineEmits(['success'])
 import {createProduct} from '@/api/product.js'
 const addProduct=async()=>{
     const res=await createProduct(formData)
    if(res.status==0){
     ElMessage({
         message:'产品入库成功',
         type:'success'
     })
     /* bus.emit('adminDialogOff',1) */
     emit('success')
    }else{
     ElMessage.error('产品入库失败')
    }
     dialogVisible.value = false
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
     padding: 20px 30px;
 }
 :deep(.el-form-item){
     margin:30px ;
 }
 </style>