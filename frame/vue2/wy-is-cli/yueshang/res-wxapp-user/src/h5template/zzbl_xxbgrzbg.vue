<template>
	<!-- 证照办理（信息变更、任职变更） -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">标题:</span>
				<span class="span-value">{{ form.bizEntityJson.subject }}</span>
			</p>
			<p>
				<span class="span-title">所属项目:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">变更公司:</span>
				<span class="span-value">{{ form.bizEntityJson.companyName }}</span>
			</p>
			<p>
				<span class="span-title">类别:</span>
				<span v-if="form.bizEntityJson.classification == 1" class="span-value">地产总部</span>
				<span v-if="form.bizEntityJson.classification == 2" class="span-value">地产事业部</span>
				<span v-if="form.bizEntityJson.classification == 3" class="span-value">地产公司</span>
			</p>
			<p>
				<span class="span-title">项目:</span>
				<span class="span-value">{{ form.bizEntityJson.itemList.join(',') }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明一:</span>
				<span class="span-value">{{ form.bizEntityJson.applyReasonOne }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明二:</span>
				<span class="span-value">{{ form.bizEntityJson.applyReasonTwo }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明三:</span>
				<span class="span-value">{{ form.bizEntityJson.applyReasonThree }}</span>
			</p>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/公司名称/) != -1">
				<p>
					<span class="span-title">原公司名称:</span>
					<span class="span-value">{{ form.bizEntityJson.originalCompanyName }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetCompanyName }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/注册地址/) != -1">
				<p>
					<span class="span-title">原注册地址:</span>
					<span class="span-value">{{ form.bizEntityJson.originalRegisterAddress }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetRegisterAddress }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/公司性质/) != -1">
				<p>
					<span class="span-title">原公司性质:</span>
					<span class="span-value">{{ form.bizEntityJson.originalCompanyNature }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span v-if="form.bizEntityJson.targetCompanyNature == 1" class="span-value">内资</span>
					<span v-if="form.bizEntityJson.targetCompanyNature == 2" class="span-value">外资</span>
					<span v-if="form.bizEntityJson.targetCompanyNature == 3" class="span-value">海外公司</span>
					<span v-if="form.bizEntityJson.targetCompanyNature == 4" class="span-value">分公司</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/经营期限/) != -1">
				<p>
					<span class="span-title">原经营期限:</span>
					<span class="span-value">{{ form.bizEntityJson.originalOperationTerm }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetOperationTerm }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/经营范围/) != -1">
				<p>
					<span class="span-title">原经营范围:</span>
					<span class="span-value">{{ form.bizEntityJson.originalOperationScope }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetOperationScope }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/注册资本/) != -1">
				<h2 class="h2-title">注册资本</h2>
				<p>
					<span class="span-title">原金额:</span>
					<span class="span-value">{{ form.bizEntityJson.originalRegisterMoney }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetRegisterMoney }}</span>
				</p>
				<p>
					<span class="span-title">原货币:</span>
					<span class="span-value">{{ form.bizEntityJson.originalRegisterCurrency }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetRegisterCurrency }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/股东及持股比例/) != -1">
				<p>
					<span class="span-title">原股东持股比例:</span>
					<span class="span-value">{{ form.bizEntityJson.originalShareholderProportion }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetShareholderProportion }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/法定代表人/) != -1">
				<p>
					<span class="span-title">原法定代表人:</span>
					<span class="span-value">{{ form.bizEntityJson.originalLegalRepresentative }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetLegalRepresentative }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/董事成员/) != -1">
				<p>
					<span class="span-title">原董事成员:</span>
					<span class="span-value">{{ form.bizEntityJson.originalBoardOfficer }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetBoardOfficer }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/执行董事/) != -1">
				<p>
					<span class="span-title">原董事/执行董事:</span>
					<span class="span-value">{{ form.bizEntityJson.originalPresident }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetPresident }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/经理/) != -1">
				<p>
					<span class="span-title">原经理:</span>
					<span class="span-value">{{ form.bizEntityJson.originalManager }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetManager }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/监事/) != -1">
				<p>
					<span class="span-title">原监事:</span>
					<span class="span-value">{{ form.bizEntityJson.originalSupervisor }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetSupervisor }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/财务负责人/) != -1">
				<p>
					<span class="span-title">原财务负责人:</span>
					<span class="span-value">{{ form.bizEntityJson.originalFinanceChief }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetFinanceChief }}</span>
				</p>
			</div>
			<div v-if="form.bizEntityJson.itemList.join(',').search(/其他要求/) != -1">
				<p>
					<span class="span-title">原其他要求:</span>
					<span class="span-value">{{ form.bizEntityJson.originalOtherRequire }}</span>
				</p>
				<p>
					<span class="span-title">拟变更:</span>
					<span class="span-value">{{ form.bizEntityJson.targetOtherRequire }}</span>
				</p>
			</div>
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