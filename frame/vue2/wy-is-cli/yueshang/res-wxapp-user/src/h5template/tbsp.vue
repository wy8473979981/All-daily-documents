<template>
	<!-- 投标审批 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">投标产品:</span>
				<span class="span-value">{{ form.bizEntityJson.bidNo }}</span>
			</p>
			<p>
				<span class="span-title">附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">审批内容</h2>
			<p>
				<span class="span-title">招标公司:</span>
				<span class="span-value">{{ form.bizEntityJson.applyContractName }}</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">服务地点:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">竞标对手:</span>
				<span class="span-value">{{ form.bizEntityJson.applyTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">评标方式:</span>
				<span class="span-value">{{ form.bizEntityJson.applyOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">投标策略:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPayType }}</span>
			</p>
			<p>
				<span class="span-title">项目构成:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">项目进度:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.applyContractFile }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">经管部确认</h2>
			<p>
				<span class="span-title">招标公司:</span>
				<span class="span-value">{{ form.bizEntityJson.manageContractName }}</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.managePartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">服务地点:</span>
				<span class="span-value">{{ form.bizEntityJson.managePartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">竞标对手:</span>
				<span class="span-value">{{ form.bizEntityJson.manageTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">评标方式:</span>
				<span class="span-value">{{ form.bizEntityJson.manageOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">投标策略:</span>
				<span class="span-value">{{ form.bizEntityJson.managePayType }}</span>
			</p>
			<p>
				<span class="span-title">项目构成:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">项目进度:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.manageContractFile }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">决策意见</h2>
			<p>
				<span class="span-title">招标公司:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionContractName }}</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">服务地点:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">竞标对手:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">评标方式:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">投标策略:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPayType }}</span>
			</p>
			<p>
				<span class="span-title">项目构成:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">项目进度:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionContractFile }}</span>
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