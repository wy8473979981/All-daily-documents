// 商业公司法律事务审批  宝龙地产/商业/商业公司/02-人力行政/法务管理
<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">阶段	:</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 1">仲裁</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 2">讼诉(一审)</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 3">讼诉(二审)</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 4">讼诉(再审)</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 5">调解</span>
        <span class="span-value" v-if="form.bizEntityJson.affairsType == 6">执行</span>
			</p>
      <p>
				<span class="span-title">主办公司	:</span>
        <span class="span-value">{{form.bizEntityJson.projectName}}</span>
			</p>
       <p>
				<span class="span-title">案件名称	:</span>
        <span class="span-value">{{form.bizEntityJson.caseName}}</span>
			</p>
      <p>
				<span class="span-title">案件归类	:</span>
        <span class="span-value" v-if="form.bizEntityJson.caseClassify == 1">商业</span>
        <span class="span-value" v-if="form.bizEntityJson.caseClassify == 2">地产</span>
        <span class="span-value" v-if="form.bizEntityJson.caseClassify == 3">置地</span>
			</p>
       <p>
				<span class="span-title">案件类型	:</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 1">逾期交房纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 2">逾期付款纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 3">施工合同纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 4">采购合同纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 5">房屋质量问题</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 6">租赁纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 7">劳动纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 8">办证问题</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 9">人身伤害</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 10">侵权</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 11">群体纠纷</span>
        <span class="span-value" v-if="form.bizEntityJson.caseMode == 12">其他</span>
			</p>
      <p v-if="form.bizEntityJson.caseMode == 6">
				<span class="span-title">是否涉及总部联发品牌	:</span>
        <span class="span-value" v-if="form.bizEntityJson.brandFlg">涉及总部联发品牌</span>
        <span class="span-value" v-else>不涉及总部联发品牌</span>
			</p>
      <p v-if="form.bizEntityJson.brandFlg">
				<span class="span-title">品牌名称:</span>
        <span class="span-value">{{form.bizEntityJson.shopName}}</span>
			</p>
      <p>
				<span class="span-title">委托类型	:</span>
        <span class="span-value" v-if="form.bizEntityJson.commissionType == 5">律师</span>
        <span class="span-value" v-if="form.bizEntityJson.commissionType == 10">内部自办</span>
			</p>
      <p>
				<span class="span-title">起诉时间:</span>
        <span class="span-value">{{form.bizEntityJson.prosecutionDate}}</span>
			</p>
       <p>
				<span class="span-title">代理律师事务所及代理律师:</span>
        <span class="span-value">{{form.bizEntityJson.attorney}}</span>
			</p>
       <p>
				<span class="span-title">律师费(元):</span>
        <span class="span-value">{{form.bizEntityJson.lawyerFee}}</span>
			</p>
       <p>
				<span class="span-title">诉讼费(元):</span>
        <span class="span-value">{{form.bizEntityJson.litigationCosts}}</span>
			</p> <p>
				<span class="span-title">原告:</span>
        <span class="span-value">{{form.bizEntityJson.plaintiff}}</span>
			</p>
       <p>
				<span class="span-title">被告:</span>
        <span class="span-value">{{form.bizEntityJson.defendant}}</span>
			</p>
       <p>
				<span class="span-title">开庭时间:</span>
        <span class="span-value">{{form.bizEntityJson.courtDate}}</span>
			</p>
       <p>
				<span class="span-title">举证期限:</span>
        <span class="span-value">{{form.bizEntityJson.proofLimit}}</span>
			</p>
       <p>
				<span class="span-title">诉讼标的额(元):</span>
        <span class="span-value">{{form.bizEntityJson.litigationAmount}}</span>
			</p>
       <p>
				<span class="span-title">案情简述:</span>
        <span class="span-value">{{form.bizEntityJson.caseDescription}}</span>
			</p>
        <p>
				<span class="span-title">诉讼目标:</span>
        <span class="span-value">{{form.bizEntityJson.litigationTarget}}</span>
			</p>
        <p>
				<span class="span-title">诉讼目标依据说明:</span>
        <span class="span-value">{{form.bizEntityJson.litigationExplain}}</span>
			</p>
    </div>

    <div class="template-content">
      <h2 class="h2-title">评审材料</h2>
      <download title="1.起诉状" v-model="form.allEntityFileIds.complaintFileIds"></download>
      <download title="2.反诉状" v-model="form.allEntityFileIds.counterclaimFileIds"></download>
      <download title="3.上诉状" v-model="form.allEntityFileIds.petitionFileIds"></download>
      <download title="4.法律意见书" v-model="form.allEntityFileIds.legalOpinionFileIds"></download>
      <download title="5.证据材料" v-model="form.allEntityFileIds.evidenceFileIds"></download>
      <download title="6.调解书" v-model="form.allEntityFileIds.mediationFileIds"></download>
      <download title="7.其他" v-model="form.allEntityFileIds.affairsOtherFileIds"></download>
      <download title="8.诉讼目标的依据材料" v-model="form.allEntityFileIds.litigationIds"></download>
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