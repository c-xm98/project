<template>
	<el-dialog v-model="state.dialogFormVisible"  :title="title" width="600px" destroy-on-close center>
		
		<el-container>
			<el-main>
				<div class="content" v-html="valueHtml"></div>
			</el-main>
		</el-container>
	</el-dialog>
</template>

<script lang="ts" setup>

import {ref,reactive	} from 'vue'
	import { bus } from "@/utils/mitt.js"
	// changecompanyintro
	import { getCompanyIntroduce} from '@/api/setting.js'
	const state = reactive({
		dialogFormVisible: false,
	});
	const title = ref()
	// 内容 HTML
	const valueHtml = ref()
	bus.on("introduce", async (id : number) => {
		if (id == 1) {
			title.value = '公司介绍'
			valueHtml.value = await getCompanyIntroduce('公司介绍')
      
		}
		if (id == 2) {
			title.value = '公司架构'
			valueHtml.value = await getCompanyIntroduce('公司架构')
		}
		if (id == 3) {
			title.value = '公司战略'
			valueHtml.value = await getCompanyIntroduce('公司战略')
		}
		if (id == 4) {
			title.value = '公司高层'
			valueHtml.value = await getCompanyIntroduce('公司高层')
		}
	})
	// 暴露open方法
	const open = () => {
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

</script>

<style lang="scss" scoped>
.content{
	text-align: center;
}
:deep(.el-main){
	min-height: 400px;
}
</style>