<template>
	<!-- 销售合同/认购书非标准版本 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.centerOrgName }}</span>
			</p>
			<p>
				<span class="span-title">涉及返租:</span>
				<span v-if="form.bizEntityJson.leaseBack === true" class="span-value">是</span>
				<span v-if="form.bizEntityJson.leaseBack === false" class="span-value">否</span>
			</p>
			<p>
				<span class="span-title">文件名称:</span>
				<span class="span-value">{{ form.bizEntityJson.fileName }}</span>
			</p>
			<p>
				<span class="span-title">文件编号:</span>
				<span class="span-value">{{ form.bizEntityJson.fileCd }}</span>
			</p>
			<p>
				<span class="span-title">文件类型:</span>
				<span v-if="form.bizEntityJson.fileType === '0'" class="span-value">预定书</span>
				<span v-if="form.bizEntityJson.fileType === '1'" class="span-value">商品买卖合同范本</span>
				<span v-if="form.bizEntityJson.fileType === '2'" class="span-value">合同范本补充条款</span>
				<span v-if="form.bizEntityJson.fileType === '3'" class="span-value">交房装修标准</span>
				<span v-if="form.bizEntityJson.fileType === '4'" class="span-value">营销合同范本</span>
			</p>
			<p>
				<span class="span-title">编制或修订:</span>
				<span v-if="form.bizEntityJson.preparationAndRevision === '0'" class="span-value">编制</span>
				<span v-if="form.bizEntityJson.preparationAndRevision === '1'" class="span-value">开盘方案</span>
			</p>
			<p>
				<span class="span-title"></span>
				<span class="span-value">第{{ form.bizEntityJson.preparationAndRevisionCount }}次修订</span>
			</p>
			<p>
				<span class="span-title">标准版本合同主要条款:</span>
				<span class="span-value">{{ form.bizEntityJson.standardContractTerms }}</span>
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

const data = {};
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
			form: data
    }
	},
	methods: {
	
	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>