// 管理岗位职务任免审批  宝龙地产/地产/04-行政人事/01-人力资源管理/04-通用

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">板块:</span>
				<span v-if="form.bizEntityJson.plateType == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.plateType == 2" class="span-value">事业部</span>
				<span v-if="form.bizEntityJson.plateType == 3" class="span-value">地产公司</span>
				<span v-if="form.bizEntityJson.plateType == 4" class="span-value">商业集团</span>
				<span v-if="form.bizEntityJson.plateType == 5" class="span-value">商业区域公司</span>
				<span v-if="form.bizEntityJson.plateType == 6" class="span-value">商业公司</span>
        <span v-if="form.bizEntityJson.plateType == 7" class="span-value">文化</span>
				<span v-if="form.bizEntityJson.plateType == 8" class="span-value">酒店</span>
				<span v-if="form.bizEntityJson.plateType == 9" class="span-value">规划设计研究院</span>
			</p>
      <p>
				<span class="span-title">职级:</span>
        <template v-show="form.bizEntityJson.plateType ==1">
          <span v-if="form.bizEntityJson.positionRank == 'M9'" class="span-value">M9及以上</span>
				  <span v-if="form.bizEntityJson.positionRank == 'O'" class="span-value">其他</span>
        </template>
         <template v-show="form.bizEntityJson.plateType ==2">
          <span v-if="form.bizEntityJson.positionRank == 'M9'" class="span-value">M9及以上</span>
				  <span v-if="form.bizEntityJson.positionRank == 'M48'" class="span-value">M4-M8</span>
        </template>
        <template v-show="form.bizEntityJson.plateType ==3">
          <span v-if="form.bizEntityJson.positionRank == 'M9'" class="span-value">M9及以上</span>
				  <span v-if="form.bizEntityJson.positionRank == 'M34'" class="span-value">M3-M4</span>
          <span v-if="form.bizEntityJson.positionRank == 'M12'" class="span-value">M1-M2</span>
        </template>
        <template v-show="form.bizEntityJson.plateType ==4 || form.bizEntityJson.plateType ==5 ||  form.bizEntityJson.plateType ==6">
          <span v-if="form.bizEntityJson.positionRank == 'A'" class="span-value">副总裁</span>
				  <span v-if="form.bizEntityJson.positionRank == 'B'" class="span-value">助理总裁/中心总经理</span>
          <span v-if="form.bizEntityJson.positionRank == 'C'" class="span-value">区域总经理</span>
          <span v-if="form.bizEntityJson.positionRank == 'D'" class="span-value">部门总经理/专业总经理</span>
          <span v-if="form.bizEntityJson.positionRank == 'E'" class="span-value">其他人员</span>
        </template>
        <template v-show="form.bizEntityJson.plateType ==7 || form.bizEntityJson.plateType ==8 || form.bizEntityJson.plateType ==9">
          <span v-if="form.bizEntityJson.positionRank == 'F'" class="span-value">副总裁级</span>
				  <span v-if="form.bizEntityJson.positionRank == 'G'" class="span-value">总经理级</span>
          <span v-if="form.bizEntityJson.positionRank == 'H'" class="span-value">副总经理级</span>
        </template>
			</p>
      <p>
				<span class="span-title">通知形式:</span>
				<span v-if="form.bizEntityJson.notifyModus == 1" class="span-value">PD公告</span>
				<span v-if="form.bizEntityJson.notifyModus == 2" class="span-value">邮件通知</span>
			</p>
      <p>
				<span class="span-title">生效时间:</span>
        <span class="span-value">{{form.bizEntityJson.effectiveDate}}</span>
			</p>
      <p>
				<span class="span-title">标题:</span>
        <span class="span-value">{{form.bizEntityJson.subjectTitle}}</span>
			</p>
       <p>
				<span class="span-title">调整内容:</span>
        <span class="span-value">{{form.bizEntityJson.changeContent}}</span>
			</p>
      <download v-model="form.allEntityFileIds.fileId" title="任免文件"></download>
      <p>
				<span class="span-title">备注:</span>
        <span class="span-value">{{form.bizEntityJson.remark}}</span>
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