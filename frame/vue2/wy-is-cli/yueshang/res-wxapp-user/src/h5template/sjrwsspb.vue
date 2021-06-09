// 设计任务书审批表 宝龙地产/地产/08-设计管理

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">项目名称:</span>
        <span class="span-value">{{form.bizEntityJson.centerOrgName}}</span>
			</p>
      <p>
				<span class="span-title">业务条线	:</span>
				<span v-if="form.bizEntityJson.businessLines == 1" class="span-value">三点一线</span>
				<span v-if="form.bizEntityJson.businessLines == 2" class="span-value">设计战略</span>
			</p>
      <p>
				<span class="span-title">审批权限:</span>
				<span v-if="form.bizEntityJson.commercePermissionFlg == true" class="span-value">与商业有关</span>
				<span v-if="form.bizEntityJson.hotelPermissionFlg == true" class="span-value">与酒店有关</span>
			</p>
      <p>
				<span class="span-title">文件类型:</span>
				<span v-if="form.bizEntityJson.fileType == 1" class="span-value">建筑概念-方案</span>
				<span v-if="form.bizEntityJson.fileType == 2" class="span-value">建筑施工图</span>
        <span v-if="form.bizEntityJson.fileType == 3" class="span-value">景观、装饰、泛光方案及施工图</span>
				<span v-if="form.bizEntityJson.fileType == 4" class="span-value">基坑支护</span>
        <span v-if="form.bizEntityJson.fileType == 5" class="span-value">专项</span>
			</p>
      <p v-show="form.bizEntityJson.fileType == 1">
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.fileType1Child1" class="span-value">建筑概念方案</span>
				<span v-if="form.bizEntityJson.fileType1Child2" class="span-value">建筑方案</span>
        <span v-if="form.bizEntityJson.fileType1Child3" class="span-value">建筑方案至施工图</span>
				<span v-if="form.bizEntityJson.fileType1Child4" class="span-value">建筑扩初及施工图</span>
        <span v-if="form.bizEntityJson.fileType1Child5" class="span-value">建筑立面方案及深化</span>
        <span v-if="form.bizEntityJson.fileType1Child6" class="span-value">其他</span>
			</p>
      <p v-show="form.bizEntityJson.fileType == 2">
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.fileType2Child1" class="span-value">建筑扩初及施工图</span>
				<span v-if="form.bizEntityJson.fileType2Child2" class="span-value">其他</span>
			</p>
      <p v-show="form.bizEntityJson.fileType == 3">
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.fileType3Child1" class="span-value">景观方案至施工图</span>
				<span v-if="form.bizEntityJson.fileType3Child2" class="span-value">装修装饰工程</span>
        <span v-if="form.bizEntityJson.fileType3Child3" class="span-value">泛光照明</span>
				<span v-if="form.bizEntityJson.fileType3Child4" class="span-value">其他</span>
			</p>
       <p v-show="form.bizEntityJson.fileType == 5">
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.fileType5Child1" class="span-value">人防</span>
				<span v-if="form.bizEntityJson.fileType5Child2" class="span-value">绿建</span>
        <span v-if="form.bizEntityJson.fileType5Child3" class="span-value">装配式(PC)</span>
        <span v-if="form.bizEntityJson.fileType5Child4" class="span-value">弱电(智能化)</span>
				<span v-if="form.bizEntityJson.fileType5Child5" class="span-value">钢结构</span>
        <span v-if="form.bizEntityJson.fileType5Child6" class="span-value">地质勘查</span>
        <span v-if="form.bizEntityJson.fileType5Child7" class="span-value">门窗及幕墙</span>
				<span v-if="form.bizEntityJson.fileType5Child8" class="span-value">其他</span>
			</p>
       <p>
				<span class="span-title">设计任务提要（设计任务书附后 ）1、如有分期需注明2、项目概况3、主要设计内容:</span>
        <span class="span-value">{{form.bizEntityJson.designTaskSummary}}</span>
			</p>
      <download v-model="form.allEntityFileIds.designTaskFileIds" title="设计任务书及附件"></download>
      <download v-model="form.allEntityFileIds.reportFileIds" title="签批版各阶段定位报告"></download>
      <download v-model="form.allEntityFileIds.basicConditionFileIds" title="各类设计基础条件"></download>
      <download v-model="form.allEntityFileIds.additionalFileIds" title="其他"></download>
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