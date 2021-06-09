<template>
	<!-- 网批临时授权 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">授权人:</span>
				<span class="span-value">{{ form.bizEntityJson.authorizeUserName }}</span>
			</p>
      <p>
				<span class="span-title">职位:</span>
				<span class="span-value">{{ form.bizEntityJson.position }}</span>
			</p>
			<p>
				<span class="span-title">被授权人:</span>
				<span class="span-value">{{ form.bizEntityJson.authorizedUserName }}</span>
			</p>
			<p>
				<span class="span-title">授权原因:</span>
				<span class="span-value">{{ form.bizEntityJson.authorizeReason }}</span>
			</p>
			<p>
				<span class="span-title">开始日期:</span>
				<span class="span-value">{{ form.bizEntityJson.beginDate }}</span>
			</p>
			<p>
				<span class="span-title">结束日期:</span>
				<span class="span-value">{{ form.bizEntityJson.endDate }}</span>
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