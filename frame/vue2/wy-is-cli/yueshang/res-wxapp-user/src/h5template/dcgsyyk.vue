/*
*author: wjh
*date：2020-11-18
*desc：地产公司有预控费用报销单
*/
<template>
	<!-- 地产公司有预控费用报销单 -->
	<div class="template-wrapper">
		<div class="template-content">
			<h2 class="h2-title">报销信息</h2>
			<p>
				<span class="span-title">报销类别:</span>
				<span class="span-value" v-if="form.bizEntityJson.reimBursementCategory == 1">出差申请单</span>
        <span class="span-value" v-else>其他</span>
			</p>
      <p v-if="form.bizEntityJson.reimBursementCategory == 1">
				<span class="span-title">人员类别:</span>
				<span class="span-value" v-if="form.bizEntityJson.tripCategory == 1">总经理</span>
        <span class="span-value" v-else>其他人员</span>
			</p>
      <p>
				<span class="span-title">报销入账公司:</span>
        <span class="span-value">{{form.bizEntityJson.reimbursementCompany}}</span>
			</p>
      <p>
				<span class="span-title">上级公司:</span>
        <span class="span-value">{{form.bizEntityJson.reimbursementParentCompany}}</span>
			</p>
      <p>
				<span class="span-title">网批查询号:</span>
        <span class="span-value">{{form.bizEntityJson.approveSelectNo}}</span>
			</p>
      <p>
				<span class="span-title">表单名称:</span>
        <span class="span-value">{{form.bizEntityJson.formName}}</span>
			</p>
      <p>
				<span class="span-title">最后一单:</span>
        <span class="span-value">{{form.bizEntityJson.lastOrderFlg ? '是' : '否'}}</span>
			</p>
    </div>
    
    <div class="template-content">
      <data-table :data="form.bizEntityJson.reimbursementDetailList" :columns="columns"></data-table>
    </div>

    <div class="template-content">
			<h2 class="h2-title">付款信息</h2>
      <p>
				<span class="span-title">价税合计(A+B)(元):</span>
        <span class="span-value">{{form.bizEntityJson.priceTaxTotalAmount}}</span>
			</p>
      <p>
				<span class="span-title">备注:</span>
        <span class="span-value">{{form.bizEntityJson.remark}}</span>
			</p>
      <p>
				<span class="span-title">是否冲预借款:</span>
        <span class="span-value">{{form.bizEntityJson.offsetLoanFlg ? '是' : '否'}}</span>
			</p>
      <p v-if="form.bizEntityJson.offsetLoanFlg">
				<span class="span-title">借款人:</span>
        <span class="span-value">{{form.bizEntityJson.borrowerId}}</span>
			</p>
      <p>
				<span class="span-title">借款人类型:</span>
        <span class="span-value" v-if="form.bizEntityJson.payMode == 1">员工</span>
        <span class="span-value" v-if="form.bizEntityJson.payMode == 2">外部单位</span>
        <span class="span-value" v-if="form.bizEntityJson.payMode == 3">内部单位</span>
			</p>
      <p>
				<span class="span-title">收款人:</span>
        <span class="span-value">{{form.bizEntityJson.receiveUserName}}</span>
			</p>
      <p>
				<span class="span-title">付款方式:</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 1">现金</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 2">电汇</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 3">信用汇</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 4">转账</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 5">票汇</span>
        <span class="span-value" v-if="form.bizEntityJson.payType == 6">其它</span>
			</p>
      <p>
				<span class="span-title">冲预借款(元):</span>
        <span class="span-value">{{form.bizEntityJson.offsetLoanAmount}}</span>
			</p>
      <p>
				<span class="span-title">账号:</span>
        <span class="span-value">{{form.bizEntityJson.bankAccount}}</span>
			</p>
      <p>
				<span class="span-title">会计核减(元):</span>
        <span class="span-value">{{form.bizEntityJson.accountReductionAmount}}</span>
			</p>
      <p>
				<span class="span-title">开户行:</span>
        <span class="span-value">{{form.bizEntityJson.bankName}}</span>
			</p>
      <p>
				<span class="span-title">公司代付(元):</span>
        <span class="span-value">{{form.bizEntityJson.companyPayAmount}}</span>
			</p>
      <p>
				<span class="span-title">实付金额(元):</span>
        <span class="span-value">{{form.bizEntityJson.realPayAmount}}</span>
			</p>
      <p>
				<span class="span-title">大写:</span>
        <span class="span-value"></span>
			</p>
    </div>

     <!-- todo table开发还款明细 -->
    <div class="template-content">
      <h2 class="h2-title">还款明细</h2>
      <data-table :data="form.bizEntityJson.repaymentDetaiList" :columns="columns2"></data-table>
    </div>
  </div>
</template>
<script>

// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       columns: [
//         {label: '费用中心', prop: 'costCenter'},
//         {label: '费用名称', prop: 'costName'},
//         {label: '发票内容', prop: 'invoiceContent'},
//         {label: '申请预算金额', prop: 'applyBudgetAmount',width:100},
//         {label: '已报销金额', prop: 'reimbursementdAmount'},
//         {label: '本次报销金额', prop: 'thisReimbursementAmount',width:100},
//         {label: '增值税专用发票', prop: 'VATInvoiceFlg',width:110},
//         {label: '本次报销税额', prop: 'thisReimbursementTaxAmount',width:100},
//         {label: '会计核减金额(元)', prop: 'nuclearReductionAmount',width:120},
//         {label: '会计核减税额(元)', prop: 'nuclearReductionTaxAmount',width:120},
//       ],
//       columns2: [
//         {label: '借款网批查询号', prop: 'loanApproveNo'},
//         {label: '剩余还款金额', prop: 'remainingPayAmount'},
//         {label: '本次还款金额', prop: 'thisPayAmount'}
//       ]
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
        console.log(this.form,777)
			}
		}
	},
  data() {
    return {
	    form: {
        bizEntityJson: {
          repaymentDetaiList: []
        }
      },
      columns: [
        {label: '费用中心', prop: 'costCenter'},
        {label: '费用名称', prop: 'costName'},
        {label: '发票内容', prop: 'invoiceContent'},
        {label: '申请预算金额', prop: 'applyBudgetAmount',width:100},
        {label: '已报销金额', prop: 'reimbursementdAmount'},
        {label: '本次报销金额', prop: 'thisReimbursementAmount',width:100},
        {label: '增值税专用发票', prop: 'VATInvoiceFlg',width:110},
        {label: '本次报销税额', prop: 'thisReimbursementTaxAmount',width:100},
        {label: '会计核减金额(元)', prop: 'nuclearReductionAmount',width:120},
        {label: '会计核减税额(元)', prop: 'nuclearReductionTaxAmount',width:120},
      ],
      columns2: [
        {label: '借款网批查询号', prop: 'loanApproveNo'},
        {label: '剩余还款金额', prop: 'remainingPayAmount'},
        {label: '本次还款金额', prop: 'thisPayAmount'}
      ]
    }
  },
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>