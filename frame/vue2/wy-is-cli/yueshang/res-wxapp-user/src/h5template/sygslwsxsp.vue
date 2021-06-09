// 商业公司例外事项审批

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">文件标题	:</span>
        <span class="span-value">{{form.bizEntityJson.fileTitle}}</span>
			</p>
      <p>
				<span class="span-title">类型	:</span>
        <span class="span-value" v-if="form.bizEntityJson.type == 0">重资产项目</span>
        <span class="span-value" v-if="form.bizEntityJson.type == 1">轻资产项目</span>
        <span class="span-value" v-if="form.bizEntityJson.type == 2">收购公司</span>
        <span class="span-value" v-if="form.bizEntityJson.type == 3">住宅物业</span>
			</p>
      <p>
				<span class="span-title">机密程度	:</span>
        <span class="span-value" v-if="form.bizEntityJson.secretLevel == 0">绝密</span>
        <span class="span-value" v-if="form.bizEntityJson.secretLevel == 1">机密</span>
        <span class="span-value" v-if="form.bizEntityJson.secretLevel == 2">保密</span>
        <span class="span-value" v-if="form.bizEntityJson.secretLevel == 3">内部公开</span>
			</p>
      <p>
				<span class="span-title">发起中心/公司	:</span>
        <span class="span-value">{{form.bizEntityJson.instigatedCompany}}</span>
			</p>
      <p>
				<span class="span-title">急/缓	:</span>
        <span class="span-value" v-if="form.bizEntityJson.urgencyLevel == true">急</span>
        <span class="span-value" v-if="form.bizEntityJson.urgencyLevel == false">缓</span>
			</p>
       <p>
				<span class="span-title">文件内容简述(详细内容附后)	:</span>
        <span class="span-value" v-html="form.bizEntityJson.fileDesc"></span>
			</p>
    </div>
  </div>
</template>
<script>
import download from '../components/download.vue';
const data = {};
export default {
  components: { download },
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