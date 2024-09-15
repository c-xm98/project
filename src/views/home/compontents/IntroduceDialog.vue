<template>
	<el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" destroy-on-close>
		
	</el-dialog>
</template>

<script lang="ts" setup>

import {
		onBeforeUnmount, ref, shallowRef,
		reactive
	} from 'vue'
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
	import { bus } from "@/utils/mitt.js"
	import {
		ElMessage
	} from "element-plus"
	// changecompanyintro
	import { getCompanyIntroduce} from '@/api/setting.js'
	const title = ref()
	bus.on("editorTitle", async (id : number) => {
		if (id == 1) {
			title.value = '编辑公司介绍'
			valueHtml.value = await getCompanyIntroduce('公司介绍')
      
		}
		if (id == 2) {
			title.value = '编辑公司架构'
			valueHtml.value = await getCompanyIntroduce('公司架构')
		}
		if (id == 3) {
			title.value = '编辑公司战略'
			valueHtml.value = await getCompanyIntroduce('公司战略')
		}
		if (id == 4) {
			title.value = '编辑高层介绍'
			valueHtml.value = await getCompanyIntroduce('高层介绍')
		}
	})

	// 内容 HTML
	const valueHtml = ref()

	






</script>

<style lang="scss" scoped>

</style>