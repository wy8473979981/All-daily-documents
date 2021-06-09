<template>
	<!-- 事业部对外发函审批表 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">是否涉及商业:</span>
				<span v-if="form.bizEntityJson.isInvolvingBusiness" class="span-value">涉及商业</span>
				<span v-else class="span-value">不涉及商业</span>
			</p>
			<p>
				<span class="span-title">审批路径:</span>
				<span v-if="form.bizEntityJson.region == 0" class="span-value">事业一部</span>
				<span v-if="form.bizEntityJson.region == 1" class="span-value">事业二部</span>
				<span v-if="form.bizEntityJson.region == 2" class="span-value">安徽</span>
				<span v-if="form.bizEntityJson.region == 3" class="span-value">置地</span>
				<span v-if="form.bizEntityJson.region == 4" class="span-value">浙江</span>
				<span v-if="form.bizEntityJson.region == 5" class="span-value">广东</span>
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
				<span v-if="form.bizEntityJson.sengLettersType == 0" class="span-value">解约函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 1" class="span-value">政府函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 2" class="span-value">投诉函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 3" class="span-value">供应商函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 4" class="span-value">营销函件</span>
				<span v-if="form.bizEntityJson.sengLettersType == 5" class="span-value">其他函件</span>
			</p>
			<p>
				<span class="span-title">发函内容及情况说明:</span>
				<span class="span-value">{{ form.bizEntityJson.lettersContent }}</span>
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