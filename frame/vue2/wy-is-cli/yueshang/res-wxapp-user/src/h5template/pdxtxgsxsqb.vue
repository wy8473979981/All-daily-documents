<template>
	<!-- PD系统相关事项申请表(pd) -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">申请修改的内容:</span>
				<span class="span-value">{{ form.bizEntityJson.applyContent }}</span>
			</p>
      <p>
				<span class="span-title">业务原因:</span>
				<span class="span-value">{{ form.bizEntityJson.businessReason }}</span>
			</p>
			<p>
				<span class="span-title">申请人:</span>
				<span class="span-value">{{ form.bizEntityJson.applyUserName }}</span>
			</p>
			<p>
				<span class="span-title">申请部门:</span>
				<span class="span-value">{{ form.bizEntityJson.applyOrgName }}</span>
			</p>
			<p>
				<span class="span-title">申请事项类型:</span>
				<span v-if="form.bizEntityJson.applyType == 1" class="span-value">已完成网批驳回</span>
				<span v-if="form.bizEntityJson.applyType == 2" class="span-value">数据调整</span>
				<span v-if="form.bizEntityJson.applyType == 3" class="span-value">邮箱事宜</span>
				<span v-if="form.bizEntityJson.applyType == 4" class="span-value">PD权限开通</span>
				<span v-if="form.bizEntityJson.applyType == 5" class="span-value">开发新功能(涉及权责)</span>
				<span v-if="form.bizEntityJson.applyType == 6" class="span-value">开发现有功能(涉及权责)</span>
				<span v-if="form.bizEntityJson.applyType == 7" class="span-value">官网相关事宜(非IT类)</span>
				<span v-if="form.bizEntityJson.applyType == 8" class="span-value">数据批量导出</span>
				<span v-if="form.bizEntityJson.applyType == 9" class="span-value">开发新功能(不涉及权责)</span>
				<span v-if="form.bizEntityJson.applyType == 10" class="span-value">开发现有功能(不涉及权责)</span>
			</p>
			<p v-if="form.bizEntityJson.applyType == 1">
				<span class="span-title">拟调整网批编号:</span>
				<span class="span-value">{{ form.bizEntityJson.adjustApproveNo }}</span>
			</p>
			<!-- <p v-if="form.bizEntityJson.applyType == 1 || form.bizEntityJson.applyType == 2 || form.bizEntityJson.applyType == 5 || form.bizEntityJson.applyType == 6 || form.bizEntityJson.applyType == 8">
				<span class="span-title">说明:</span>
				<span v-if="form.bizEntityJson.applyType == 1" class="span-value">1、驳回网批必须说明清楚业务原因。<br />2、已完成的网批不可修改任何内容，只能驳回重新发起。如需此操作，须由与该网批相关人员（发起人，审批人、被共享人或推送人）选择“已完成网批驳回”，填写网批号并下拉选择该网批。</span>
				<span v-if="form.bizEntityJson.applyType == 2" class="span-value">1、已完成网批的内容修改只能选“已完成网批驳回”。<br />2、如修改合同数据中和定标网批不一致的，必须选择“已完成网批驳回”，选定标网批。<br />3、“相关中心总经理”必须增加申请业务相关的负责的总经理级相关审批人，如涉及多个业务条线须多选，不得遗漏。</span>
				<span v-if="form.bizEntityJson.applyType == 5 || form.bizEntityJson.applyType == 6" class="span-value">此项属于编程开发类工作，如需要调整某个模块的数据，请选择“数据调整”</span>
				<span v-if="form.bizEntityJson.applyType == 8" class="span-value">离职人员数据交接请选择“数据调整”</span>
			</p> -->
			<p>
				<span class="span-title">是否商业需求:</span>
				<span v-if="form.bizEntityJson.businessNeedsFlag" class="span-value">是</span>
				<span v-else class="span-value">否</span>
			</p>
			<p>
				<span class="span-title">业务相关性:</span>
				<span v-if="form.bizEntityJson.businessRelated == 1" class="span-value">(非商业)成本/资金计划/合同/税率/变更 相关</span>
				<span v-if="form.bizEntityJson.businessRelated == 2" class="span-value">(非商业)财务/预算/报销/营销推广 相关</span>
				<span v-if="form.bizEntityJson.businessRelated == 3" class="span-value">商业相关</span>
				<span v-if="form.bizEntityJson.businessRelated == 4" class="span-value">其他</span>
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
	methods: {

	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>