<template>
	<!-- 总部未刷卡原因确认单 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">中心:</span>
				<span class="span-value">{{ form.bizEntityJson.coreName }}</span>
			</p>
			<p>
				<span class="span-title">部门:</span>
				<span class="span-value">{{ form.bizEntityJson.departmentName }}</span>
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
				<span class="span-title">未刷卡日期:</span>
				<span class="span-value">{{ form.bizEntityJson.noPlayCardDate }}</span>
			</p>
			<p>
				<span class="span-title">班次:</span>
				<span class="span-value">
					<span v-if="form.bizEntityJson.frequency0">上午上班</span>
					<span v-if="form.bizEntityJson.frequency1">下午下班</span>
				</span>
			</p>
			<p>
				<span class="span-title">原因:</span>
				<span v-if="form.bizEntityJson.reason == 0" class="span-value">公事外出</span>
				<span v-if="form.bizEntityJson.reason == 1" class="span-value">忘记刷卡</span>
				<span v-if="form.bizEntityJson.reason == 3" class="span-value">私事外出</span>
				<span v-if="form.bizEntityJson.reason == 2" class="span-value">机器故障</span>
			</p>
			<p v-if="form.bizEntityJson.reason == 3">
				<span class="span-title">外出开始时间:</span>
				<span class="span-value">{{ form.bizEntityJson.beOutStartDate }}</span>
			</p>
			<p v-if="form.bizEntityJson.reason == 3">
				<span class="span-title">外出截止时间:</span>
				<span class="span-value">{{ form.bizEntityJson.beOutEndDate }}</span>
			</p>
			<p>
				<span class="span-title">原因说明:</span>
				<span class="span-value">{{ form.bizEntityJson.reasons }}</span>
			</p>
			<p v-if="form.bizEntityJson.reason == 2">
				<span class="span-title">附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
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