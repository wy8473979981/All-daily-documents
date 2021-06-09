// 销售合同/认购书（中介、分销、电商、代理）   宝龙地产/地产/11-营销管理/案场事务

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">项目名称:</span>
        <span class="span-value">{{form.bizEntityJson.centerOrgName}}</span>
			</p>
      <p>
				<span class="span-title">合同文本编号	:</span>
        <span class="span-value">{{form.bizEntityJson.contNo}}</span>
			</p>
       <p>
				<span class="span-title">单项营销方案（销售类）	:</span>
        <span class="span-value">{{form.bizEntityJson.ysNo}}</span>
			</p>
       <p>
				<span class="span-title">房源信息:</span>
        <span class="span-value">{{form.bizEntityJson.houseSourceMSg}}</span>
			</p>
      <p>
				<span class="span-title">主要商务条件:</span>
        <span class="span-value">{{form.bizEntityJson.businessConditions}}</span>
			</p>
    </div>
  </div>
</template>
<script>
const data = {};
export default {
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
        this.form = val;
        console.log(this.form,777)
			}
		}
	},
  data() {
    return {
	    form: data
    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>