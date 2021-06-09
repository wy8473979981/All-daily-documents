<template>
	<!-- 立项申请单(地产) -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">审批流程:</span>
				<span v-if="form.bizEntityJson.approvalProcess == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.approvalProcess == 2" class="span-value">事业部</span>
				<span v-if="form.bizEntityJson.approvalProcess == 3" class="span-value">地产</span>
			</p>
			<p>
				<span class="span-title">预算处理:</span>
				<span v-if="form.bizEntityJson.withinBudget == 1" class="span-value">预算内</span>
				<span v-if="form.bizEntityJson.withinBudget == 0" class="span-value">预算外</span>
			</p>
			<p v-if="form.bizEntityJson.withinBudget == 0">
				<span class="span-title">新增金额:</span>
				<span class="span-value">{{ form.bizEntityJson.extraBudgetNewAmount }}</span>
			</p>
			<el-table :data="form.bizEntityJson.scenes" style="margin-bottom: 8px;">
				<el-table-column width="80" prop="feeName" show-overflow-tooltip label="申请人" />
				<el-table-column width="80" prop="applyUserName" show-overflow-tooltip label="费用名称" />
				<el-table-column width="80" prop="sceneConfigName" show-overflow-tooltip label="场景" />
				<el-table-column width="100" prop="centerName" show-overflow-tooltip label="费用承担部门" />
				<el-table-column width="80" prop="subjectName" show-overflow-tooltip label="预算科目" />
				<el-table-column width="100" prop="projectAmount" show-overflow-tooltip label="立项金额(元)" />
				<el-table-column width="100" prop="approveAmount" show-overflow-tooltip label="审批金额(元)" />
			</el-table>
			<p>
				<span class="span-title">预算类别:</span>
				<span v-if="form.bizEntityJson.budgetCategory == 1" class="span-value">初步预算</span>
				<span v-if="form.bizEntityJson.budgetCategory == 2" class="span-value">精确费用</span>
			</p>
			<p>
				<span class="span-title">依据战略框架:</span>
				<span v-if="form.bizEntityJson.strFrame == 1" class="span-value">是</span>
				<span v-if="form.bizEntityJson.strFrame == 0" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.strFrame == 1">
				<span class="span-title">框架合同附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
			<p>
				<span class="span-title">申请事由:</span>
				<span class="span-value">{{ form.bizEntityJson.reason }}</span>
			</p>
			<p>
				<span class="span-title">立项总金额(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalProjectAmount }}</span>
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