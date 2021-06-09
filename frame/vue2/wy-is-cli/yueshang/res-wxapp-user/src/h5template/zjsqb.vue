<template>
	<!-- 资金申请表 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">预算类型:</span>
				<span v-if="form.bizEntityJson.budgetType == 1" class="span-value">预算内</span>
				<span v-if="form.bizEntityJson.budgetType == 2" class="span-value">预算外</span>
			</p>
      <p>
				<span class="span-title">宝龙集团资金申请表:</span>
				<span class="span-value">{{ form.bizEntityJson.blCapitalapplication }}</span>
			</p>
			<p>
				<span class="span-title">所属单位:</span>
				<span v-if="form.bizEntityJson.companyType == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.companyType == 2" class="span-value">事业部</span>
				<span v-if="form.bizEntityJson.companyType == 3" class="span-value">地产公司</span>
			</p>
			<p v-if="form.bizEntityJson.companyType == 2">
				<span class="span-title">所属事业部:</span>
				<span v-if="form.bizEntityJson.areaType == 1" class="span-value">事业一部</span>
				<span v-if="form.bizEntityJson.areaType == 2" class="span-value">事业二部</span>
				<span v-if="form.bizEntityJson.areaType == 3" class="span-value">置地</span>
				<span v-if="form.bizEntityJson.areaType == 4" class="span-value">浙江事业部</span>
				<span v-if="form.bizEntityJson.areaType == 5" class="span-value">安徽事业部</span>
				<span v-if="form.bizEntityJson.areaType == 6" class="span-value">广东事业部</span>
			</p>
			<p>
				<span class="span-title">申请项目:</span>
				<span class="span-value">{{ form.bizEntityJson.centerName }}</span>
			</p>
			<p>
				<span class="span-title">申请单位:</span>
				<span class="span-value">{{ form.bizEntityJson.unit }}</span>
			</p>
			<p>
				<span class="span-title">开户行账户信息:</span>
				<span class="span-value">{{ form.bizEntityJson.openAccount }}</span>
			</p>
			<p>
				<span class="span-title">资金用途:</span>
				<span class="span-value">{{ form.bizEntityJson.usage }}</span>
			</p>
			<p>
				<span class="span-title">列支科目:</span>
				<span class="span-value">{{ form.bizEntityJson.subject }}</span>
			</p>
			<p>
				<span class="span-title">资金数额(元):</span>
				<span class="span-value">{{ form.bizEntityJson.amount }}</span>
			</p>
			<p>
				<span class="span-title">用款时间:</span>
				<span class="span-value">{{ form.bizEntityJson.useDate }}</span>
			</p>
			<p>
				<span class="span-title">申请事由:</span>
				<span class="span-value">{{ form.bizEntityJson.reason }}</span>
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