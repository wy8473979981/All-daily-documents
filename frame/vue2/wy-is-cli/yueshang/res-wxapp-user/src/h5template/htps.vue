// 合同评审（Ｏ）（新）   宝龙地产/地产/新成本/其他事物/合同评审（O）

<template>
	<div class="template-wrapper">
		<div class="template-content">
      <p>
				<span class="span-title">项目名称:</span>
        <span class="span-value">{{form.bizEntityJson.projectName}}</span>
			</p>
      <p>
				<span class="span-title">期数	:</span>
        <span class="span-value">{{form.bizEntityJson.phasesName}}</span>
			</p>
       <p>
				<span class="span-title">合约控价科目	:</span>
        <span class="span-value">{{form.bizEntityJson.contractPlanSubjectsName}}</span>
			</p>
       <p>
				<span class="span-title">工程名称:</span>
        <span class="span-value">{{form.bizEntityJson.engineering}}</span>
			</p>
       <p>
				<span class="span-title">甲方:</span>
        <span class="span-value">{{form.bizEntityJson.PartyA}}</span>
			</p>
       <p>
				<span class="span-title">乙方:</span>
        <span class="span-value">{{form.bizEntityJson.PartyB}}</span>
			</p>
       <p>
				<span class="span-title">单位名称:</span>
        <span class="span-value">{{form.bizEntityJson.companyName}}</span>
			</p> <p>
				<span class="span-title">合同金额(含税总价):</span>
        <span class="span-value">{{form.bizEntityJson.contentTotalAmount}}</span>
			</p>
       <p>
				<span class="span-title">税率:</span>
        <span class="span-value">{{form.bizEntityJson.rate}}</span>
			</p>
       <p>
				<span class="span-title">税额:</span>
        <span class="span-value">{{form.bizEntityJson.taxAmount}}</span>
			</p>
       <p>
				<span class="span-title">不含税价:</span>
        <span class="span-value">{{form.bizEntityJson.noTaxPrice}}</span>
			</p>
       <p>
				<span class="span-title">开具发票种类:</span>
        <span class="span-value">{{form.bizEntityJson.invoiceType}}</span>
			</p>
       <p>
				<span class="span-title">合同编号:</span>
        <span class="span-value">{{form.bizEntityJson.contractNo}}</span>
			</p>
       <p>
				<span class="span-title">合同类型:</span>
        <span class="span-value">{{form.bizEntityJson.contractType}}</span>
			</p>
       <p>
				<span class="span-title">备注:</span>
        <span class="span-value">{{form.bizEntityJson.remark}}</span>
			</p>
    </div>

    <div class="template-content">
      <h2 class="h2-title">招标主要内容</h2>
      <p>
				<span class="span-title">招标范围:</span>
        <span class="span-value">{{form.bizEntityJson.scopeBidding}}</span>
			</p>
      <p>
				<span class="span-title">设计周期	:</span>
        <span class="span-value">{{form.bizEntityJson.designBeginDate}}至{{orm.bizEntityJson.designEndDate}}共{{form.bizEntityJson.designDays}}天</span>
			</p>
       <p>
				<span class="span-title">质量要求	:</span>
        <span class="span-value">{{form.bizEntityJson.qualityRequirements}}</span>
			</p>
      <p>
				<span class="span-title">招标模式:</span>
				<span v-if="form.bizEntityJson.tenderMode == 1" class="span-value">邀请招标单</span>
				<span v-if="form.bizEntityJson.tenderMode == 2" class="span-value">竞争性谈判</span>
        <span v-if="form.bizEntityJson.tenderMode == 3" class="span-value">直接委托(战略合作单位)</span>
			</p>
      <p>
				<span class="span-title">计价模式:</span>
				<span v-if="form.bizEntityJson.pricingModel == 1" class="span-value">总价包干</span>
				<span v-if="form.bizEntityJson.pricingModel == 2" class="span-value">单价包干(按当地政府测绘部门最终确认的各业态建筑面积，按实结算)</span>
			</p>
      <p>
				<span class="span-title">付款方式	:</span>
        <span class="span-value">{{form.bizEntityJson.payType}}</span>
			</p>
      <download v-model="form.allEntityFileIds.fileId" title="合同文本"></download>
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