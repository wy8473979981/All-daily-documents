<template>
	<!-- 例外事项审批表(地产公司) -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">文件标题:</span>
				<span class="span-value">{{ form.bizEntityJson.fileTitle }}</span>
			</p>
      <p>
				<span class="span-title">审批路径:</span>
				<span v-if="form.bizEntityJson.approvalPath === '1'" class="span-value">技术类</span>
				<span v-if="form.bizEntityJson.approvalPath === '2'" class="span-value">成本类</span>
				<span v-if="form.bizEntityJson.approvalPath === '3'" class="span-value">工程类</span>
				<span v-if="form.bizEntityJson.approvalPath === '4'" class="span-value">营销类</span>
				<span v-if="form.bizEntityJson.approvalPath === '5'" class="span-value">财务类</span>
				<span v-if="form.bizEntityJson.approvalPath === '6'" class="span-value">行政人事类</span>
			</p>
			<p>
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.involvingRelatedDept === '1'" class="span-value">涉及相关部门</span>
				<span v-if="form.bizEntityJson.involvingRelatedDept === '0'" class="span-value">不涉及相关部门</span>
			</p>
			<p>
				<span class="span-title">发起中心/公司:</span>
				<span class="span-value">{{ form.bizEntityJson.sendOrgName }}</span>
			</p>
			<p v-if="form.bizEntityJson.urgency === '0'">
				<span class="span-title"></span>
				<span class="span-value">急</span>
			</p>
			<p>
				<span class="span-title">文件内容简述:</span>
				<span class="span-value">{{ form.bizEntityJson.fileDesc }}</span>
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