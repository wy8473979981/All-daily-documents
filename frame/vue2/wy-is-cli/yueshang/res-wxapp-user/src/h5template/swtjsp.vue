<template>
	<!-- 商务条件审批 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">销售产品:</span>
				<span class="span-value">{{ form.bizEntityJson.bidNo }}</span>
			</p>
			<p>
				<span class="span-title">附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
			<p>
				<span class="span-title">投标审批:</span>
				<span v-if="form.bizEntityJson.tenderApproveFlg == 'true'" class="span-value">有</span>
				<span v-else class="span-value">无</span>
			</p>
			<p v-if="form.bizEntityJson.tenderApproveFlg == 'true'">
				<span class="span-value">{{ form.bizEntityJson.tenderApproveNo }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">审批内容</h2>
			<p>
				<span class="span-title">合同名称:</span>
				<span class="span-value">{{ form.bizEntityJson.applyContractName }}</span>
			</p>
			<p>
				<span class="span-title">甲方:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">乙方:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">合同总额:</span>
				<span class="span-value">{{ form.bizEntityJson.applyTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">我方权利/义务:</span>
				<span class="span-value">{{ form.bizEntityJson.applyOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.applyPayType }}</span>
			</p>
			<p>
				<span class="span-title">甲方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">乙方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">双向约束:</span>
				<span class="span-value">{{ form.bizEntityJson.applyBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">合同涉及附件:</span>
				<span class="span-value">{{ form.bizEntityJson.applyContractFile }}</span>
			</p>
			<p>
				<span class="span-title">特殊限制/突破条款:</span>
				<span class="span-value">{{ form.bizEntityJson.applySpecialTerms }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.applyOtherExplain }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">关联合同</h2>
			<p>
				<span class="span-title">合同名称:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedContractName }}</span>
			</p>
			<p>
				<span class="span-title">甲方:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedPartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">乙方:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedPartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">合同总额:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">我方权利/义务:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedPayType }}</span>
			</p>
			<p>
				<span class="span-title">甲方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">乙方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">双向约束:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedBreachDutyD }}</span>
			</p>
			<p>
				<span class="span-title">合同涉及附件:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedContractFile }}</span>
			</p>
			<p>
				<span class="span-title">特殊限制/突破条款:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedSpecialTerms }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.associatedOtherExplain }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">经管部确认</h2>
			<p>
				<span class="span-title">合同名称:</span>
				<span class="span-value">{{ form.bizEntityJson.manageContractName }}</span>
			</p>
			<p>
				<span class="span-title">甲方:</span>
				<span class="span-value">{{ form.bizEntityJson.managePartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">乙方:</span>
				<span class="span-value">{{ form.bizEntityJson.managePartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">合同总额:</span>
				<span class="span-value">{{ form.bizEntityJson.manageTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">我方权利/义务:</span>
				<span class="span-value">{{ form.bizEntityJson.manageOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.managePayType }}</span>
			</p>
			<p>
				<span class="span-title">甲方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">乙方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">双向约束:</span>
				<span class="span-value">{{ form.bizEntityJson.manageBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">合同涉及附件:</span>
				<span class="span-value">{{ form.bizEntityJson.manageContractFile }}</span>
			</p>
			<p>
				<span class="span-title">特殊限制/突破条款:</span>
				<span class="span-value">{{ form.bizEntityJson.manageSpecialTerms }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.manageOtherExplain }}</span>
			</p>
    </div>
		<div class="template-content">
			<h2 class="h2-title">决策意见</h2>
			<p>
				<span class="span-title">合同名称:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionContractName }}</span>
			</p>
			<p>
				<span class="span-title">甲方:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPartyACompanyName }}</span>
			</p>
			<p>
				<span class="span-title">乙方:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPartyBCompanyName }}</span>
			</p>
			<p>
				<span class="span-title">合同总额:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionTotalAmountConstitute }}</span>
			</p>
			<p>
				<span class="span-title">我方权利/义务:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionOurObligations }}</span>
			</p>
			<p>
				<span class="span-title">回款方式:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionPayType }}</span>
			</p>
			<p>
				<span class="span-title">甲方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyA }}</span>
			</p>
			<p>
				<span class="span-title">乙方违约:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyB }}</span>
			</p>
			<p>
				<span class="span-title">双向约束:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionBreachDutyAB }}</span>
			</p>
			<p>
				<span class="span-title">合同涉及附件:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionContractFile }}</span>
			</p>
			<p>
				<span class="span-title">特殊限制/突破条款:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionSpecialTerms }}</span>
			</p>
			<p>
				<span class="span-title">其他说明:</span>
				<span class="span-value">{{ form.bizEntityJson.deisionOtherExplain }}</span>
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