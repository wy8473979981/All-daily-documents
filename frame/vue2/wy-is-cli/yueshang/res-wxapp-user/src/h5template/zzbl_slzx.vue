<template>
	<!-- 证照办理（设立、注销） -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">标题:</span>
				<span class="span-value">{{ form.bizEntityJson.titleName }}</span>
			</p>
			<p>
				<span class="span-title">类别:</span>
				<span v-if="form.bizEntityJson.renameType == 0" class="span-value">地产总部</span>
				<span v-if="form.bizEntityJson.renameType == 1" class="span-value">地产事业部</span>
				<span v-if="form.bizEntityJson.renameType == 2" class="span-value">地产公司</span>
			</p>
			<p>
				<span class="span-title">项目:</span>
				<span class="span-value">{{ form.bizEntityJson.item.join(',') }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明一:</span>
				<span class="span-value">{{ form.bizEntityJson.reason1 }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明二:</span>
				<span class="span-value">{{ form.bizEntityJson.reason2 }}</span>
			</p>
			<p>
				<span class="span-title">申请原因说明三:</span>
				<span class="span-value">{{ form.bizEntityJson.reason3 }}</span>
			</p>
			<p>
				<span class="span-title">申请内容:</span>
				<span class="span-value">{{ form.bizEntityJson.applContent }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">需明确的事项</h2>
			<p>
				<span class="span-title">公司名称:</span>
				<span class="span-value">{{ form.bizEntityJson.companyName }}</span>
			</p>
			<p>
				<span class="span-title">公司性质:</span>
				<span v-if="form.bizEntityJson.companyNature == 0" class="span-value">内资</span>
				<span v-if="form.bizEntityJson.companyNature == 1" class="span-value">外资</span>
				<span v-if="form.bizEntityJson.companyNature == 2" class="span-value">海外公司</span>
				<span v-if="form.bizEntityJson.companyNature == 3" class="span-value">分公司</span>
				<span v-if="form.bizEntityJson.companyNature == 4" class="span-value">合伙企业</span>
			</p>
			<h2 v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2" class="h2-title">注册资本</h2>
			<h2 v-if="form.bizEntityJson.companyNature == 4" class="h2-title">出资额</h2>
			<p>
				<span class="span-title">金额:</span>
				<span class="span-value">{{ form.bizEntityJson.amountMoney }}</span>
			</p>
			<p>
				<span class="span-title">货币:</span>
				<span class="span-value">{{ form.bizEntityJson.currency }}</span>
			</p>
			<p>
				<span class="span-title">备用名称1:</span>
				<span class="span-value">{{ form.bizEntityJson.backupName1 }}</span>
			</p>
			<p>
				<span class="span-title">备用名称2:</span>
				<span class="span-value">{{ form.bizEntityJson.backupName2 }}</span>
			</p>
			<p>
				<span class="span-title">经营期限:</span>
				<span class="span-value">{{ form.bizEntityJson.operationTerm }}</span>
			</p>
			<p>
				<span class="span-title">注册地址:</span>
				<span class="span-value">{{ form.bizEntityJson.registAddress }}</span>
			</p>
			<p>
				<span class="span-title">经营范围:</span>
				<span class="span-value">{{ form.bizEntityJson.businessScope }}</span>
			</p>
			<div v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2">
				<p>
					<span class="span-title">股东及持股比例:</span>
					<span class="span-value">{{ form.bizEntityJson.shareholdersRatio }}</span>
				</p>
				<p>
					<span class="span-title">董事长/执行董事:</span>
					<span class="span-value">{{ form.bizEntityJson.chairman }}</span>
				</p>
				<p>
					<span class="span-title">法定代表人:</span>
					<span class="span-value">{{ form.bizEntityJson.representative }}</span>
				</p>
				<p>
					<span class="span-title">董事会成员:</span>
					<span class="span-value">{{ form.bizEntityJson.boardMembers }}</span>
				</p>
				<p>
					<span class="span-title">经理:</span>
					<span class="span-value">{{ form.bizEntityJson.managers }}</span>
				</p>
				<p>
					<span class="span-title">监事:</span>
					<span class="span-value">{{ form.bizEntityJson.supervisorsHad }}</span>
				</p>
			</div>
			<p v-if="form.bizEntityJson.companyNature == 3">
				<span class="span-title">分公司负责人:</span>
				<span class="span-value">{{ form.bizEntityJson.branchOffice }}</span>
			</p>
			<div v-if="form.bizEntityJson.companyNature == 4">
				<p>
					<span class="span-title">出资比例:</span>
					<span class="span-value">{{ form.bizEntityJson.investmentRatio }}</span>
				</p>
				<p>
					<span class="span-title">执行事务合伙人:</span>
					<span class="span-value">{{ form.bizEntityJson.implementPartner }}</span>
				</p>
				<p>
					<span class="span-title">普通合伙人:</span>
					<span class="span-value">{{ form.bizEntityJson.ordinaryPartner }}</span>
				</p>
				<p>
					<span class="span-title">有限合伙人:</span>
					<span class="span-value">{{ form.bizEntityJson.limitedPartner }}</span>
				</p>
				<p>
					<span class="span-title">委派代表:</span>
					<span class="span-value">{{ form.bizEntityJson.appointDelegates }}</span>
				</p>
			</div>
			<p>
				<span class="span-title">财务负责人:</span>
				<span class="span-value">{{ form.bizEntityJson.financePersonInCharge }}</span>
			</p>
			<p>
				<span class="span-title">其他要求:</span>
				<span class="span-value">{{ form.bizEntityJson.otherRequests }}</span>
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