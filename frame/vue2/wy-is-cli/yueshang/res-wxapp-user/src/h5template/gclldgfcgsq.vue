<template>
	<!-- 工程类垄断供方采购申请 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">招标计划编号:</span>
				<span class="span-value">{{ form.bizEntityJson.ccbpNo }}</span>
			</p>
      <p>
				<span class="span-title">区域:</span>
				<span v-if="form.bizEntityJson.areaType == 1" class="span-value">宝龙置地</span>
				<span v-if="form.bizEntityJson.areaType == 2" class="span-value">事业二部</span>
				<span v-if="form.bizEntityJson.areaType == 3" class="span-value">事业一部</span>
				<span v-if="form.bizEntityJson.areaType == 4" class="span-value">安徽事业部</span>
				<span v-if="form.bizEntityJson.areaType == 5" class="span-value">浙江事业部</span>
				<span v-if="form.bizEntityJson.areaType == 6" class="span-value">广东事业部</span>
			</p>
			<p>
				<span class="span-title">项目:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">工程名称:</span>
				<span class="span-value">{{ form.bizEntityJson.engineeringName }}</span>
			</p>
			<p>
				<span class="span-title">乙方:</span>
				<span class="span-value">{{ form.bizEntityJson.partB }}</span>
			</p>
			<p>
				<span class="span-title">工程含税金额:</span>
				<span class="span-value">{{ form.bizEntityJson.engineeringTaxMoney }}</span>
			</p>
			<p>
				<span class="span-title">税率:</span>
				<span class="span-value">{{ form.bizEntityJson.taxRate }}</span>
			</p>
			<p>
				<span class="span-title">工程不含税金额:</span>
				<span class="span-value">{{ form.bizEntityJson.engineeringNoTaxMoney }}</span>
			</p>
			<p>
				<span class="span-title">税金:</span>
				<span class="span-value">{{ form.bizEntityJson.tax }}</span>
			</p>
			<p>
				<span class="span-title">垄断原因:</span>
				<span class="span-value">{{ form.bizEntityJson.monopolyReason }}</span>
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