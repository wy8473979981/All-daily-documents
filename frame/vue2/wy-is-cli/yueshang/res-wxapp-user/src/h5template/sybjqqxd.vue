<template>
	<!-- 事业部请假取消单 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.company1 == 'true'" class="span-value">事业一部</span>
				<span v-if="form.bizEntityJson.company2 == 'true'" class="span-value">事业二部</span>
				<span v-if="form.bizEntityJson.company3 == 'true'" class="span-value">置地</span>
				<span v-if="form.bizEntityJson.company4 == 'true'" class="span-value">浙江事业部</span>
				<span v-if="form.bizEntityJson.company5 == 'true'" class="span-value">安徽事业部</span>
				<span v-if="form.bizEntityJson.company6 == 'true'" class="span-value">广东事业部</span>
			</p>
			<p>
				<span class="span-title">选择:</span>
        <span class="span-value" v-if="form.bizEntityJson.dayType == 1">短期（3天及以内）</span>
        <span class="span-value" v-if="form.bizEntityJson.dayType == 2">长期（3天以上）</span>
			</p>
      <p>
				<span class="span-title">选择:</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel1 == 'true'">事业部总经理</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel2 == 'true'">事业部副总经理</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel12 == 'true'">事业部部门负责人(双线)</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel13 == 'true'">事业部部门负责人(非双线)</span>
        <span class="span-value" v-if="form.bizEntityJson.positionLevel9 == 'true'">其他人员</span>
			</p>
			<p>
				<span class="span-title">中心/公司:</span>
				<span class="span-value">{{ form.bizEntityJson.center }}</span>
			</p>
			<p>
				<span class="span-title">部门:</span>
				<span class="span-value">{{ form.bizEntityJson.dept }}</span>
			</p>
			<p>
				<span class="span-title">姓名:</span>
				<span class="span-value">{{ form.bizEntityJson.userName }}</span>
			</p>
			<p>
				<span class="span-title">职位:</span>
				<span class="span-value">{{ form.bizEntityJson.position }}</span>
			</p>
			<p>
				<span class="span-title">关联请假单查询号:</span>
				<span class="span-value">{{ form.bizEntityJson.displayNo }}</span>
			</p>
			<p>
				<span class="span-title">备注:</span>
				<span class="span-value">{{ form.bizEntityJson.remark }}</span>
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

const data = {};
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
			form: data
    }
	},
	methods: {
	
	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>