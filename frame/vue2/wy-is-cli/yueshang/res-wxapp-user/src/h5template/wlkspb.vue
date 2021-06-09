<template>
	<!-- 往来款审批表 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">类别选择:</span>
				<span v-if="form.bizEntityJson.categorySelection == 1" class="span-value">集团内(上市)</span>
				<span v-if="form.bizEntityJson.categorySelection == 2" class="span-value">集团内(非上市)</span>
				<span v-if="form.bizEntityJson.categorySelection == 3" class="span-value">集团外</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">付款信息</h2>
      <p>
				<span class="span-title">付款单位全称:</span>
				<span class="span-value">{{ form.bizEntityJson.fullNameOfPayer }}</span>
			</p>
			<p>
				<span class="span-title">付款单位开户银行:</span>
				<span class="span-value">{{ form.bizEntityJson.paymentUnitBank }}</span>
			</p>
			<p>
				<span class="span-title">付款单位帐号:</span>
				<span class="span-value">{{ form.bizEntityJson.paymentUnitAccount }}</span>
			</p>
			<p>
				<span class="span-title">收款单位全称:</span>
				<span class="span-value">{{ form.bizEntityJson.fullNameOfReceivingUnit }}</span>
			</p>
			<p>
				<span class="span-title">收款单位开户银行:</span>
				<span class="span-value">{{ form.bizEntityJson.accountOpeningBank }}</span>
			</p>
			<p>
				<span class="span-title">收款单位帐号:</span>
				<span class="span-value">{{ form.bizEntityJson.beneficiaryAccount }}</span>
			</p>
			<p>
				<span class="span-title">付款金额(元)(小写):</span>
				<span class="span-value">{{ form.bizEntityJson.paymentAmountYuanLower }}</span>
			</p>
			<p>
				<span class="span-title">付款金额(元)(大写):</span>
				<span class="span-value">{{ form.bizEntityJson.paymentAmountYuanUpper }}</span>
			</p>
			<p>
				<span class="span-title">付款事由:</span>
				<span class="span-value">{{ form.bizEntityJson.paymentReason }}</span>
			</p>
			<p v-if="form.bizEntityJson.categorySelection == 3">
				<span class="span-title">走账:</span>
				<span v-if="form.bizEntityJson.takeTheBill == 1" class="span-value">是</span>
				<span v-if="form.bizEntityJson.takeTheBill == 0" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.takeTheBill == 1">
				<span class="span-title">例外事项网批号:</span>
				<span class="span-value">{{ form.bizEntityJson.exceptionNetLotNumber }}</span>
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