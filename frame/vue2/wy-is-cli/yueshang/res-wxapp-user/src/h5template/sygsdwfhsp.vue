<template>
	<!-- 商业公司对外发函审批 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">审批路径:</span>
				<span v-if="form.bizEntityJson.approvePath == 0" class="span-value">总部权限、涉及地产</span>
				<span v-if="form.bizEntityJson.approvePath == 1" class="span-value">商业集团权限</span>
				<span v-if="form.bizEntityJson.approvePath == 2" class="span-value">区域权限</span>
				<span v-if="form.bizEntityJson.approvePath == 3" class="span-value">商业公司权限</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">主送单位:</span>
				<span class="span-value">{{ form.bizEntityJson.mainDeliveryUnit }}</span>
			</p>
			<p>
				<span class="span-title">函件标题:</span>
				<span class="span-value">{{ form.bizEntityJson.lettersTitle }}</span>
			</p>
			<p>
				<span class="span-title">发函类型:</span>
				<span v-if="form.bizEntityJson.sengLettersType == 0" class="span-value">商户函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 1" class="span-value">供应商函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 2" class="span-value">政府回函</span>
				<span v-if="form.bizEntityJson.sengLettersType == 3" class="span-value">投诉回件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 4" class="span-value">劳动关系类</span>
				<span v-if="form.bizEntityJson.sengLettersType == 5" class="span-value">其他</span>
			</p>
			<p>
				<span class="span-title">发函内容及情况说明:</span>
				<span class="span-value">{{ form.bizEntityJson.reason }}</span>
			</p>
			<p>
				<span class="span-title">附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
    </div>
  </div>
</template>
<script>

// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       disabled: true,
//       uploadUrl,
//       fileList: fileList || []
//     }
//   }
// }

export default {
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val;
			}
		}
	},
  data() {
    return {
	    form: {}
    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>