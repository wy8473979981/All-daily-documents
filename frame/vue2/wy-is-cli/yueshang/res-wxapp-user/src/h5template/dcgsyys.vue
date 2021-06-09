/*
*author: wjh
*date：2020-11-24
*desc：地产公司月预算外支出
*/
<template>
	<!-- 地产公司月预算外支出 -->
	<div class="template-wrapper">
		<div class="template-content">
      <p><van-checkbox v-model="form.bizEntityJson.degApproveFlg" shape="square" disabled>需成本审核</van-checkbox></p>
      <p><van-checkbox v-model="form.bizEntityJson.techApproveFlg" shape="square" disabled>需技术审核</van-checkbox></p>
      <p><van-checkbox v-model="form.bizEntityJson.hrApproveFlg" shape="square" disabled>需人力审核</van-checkbox></p>
      <p><van-checkbox v-model="form.bizEntityJson.ohterFlag" shape="square" disabled>其他</van-checkbox></p>
      <p><van-radio-group v-model="form.bizEntityJson.adjustmentAttr" direction="horizontal" disabled>
        <van-radio name="1" shape="square">项目内部调剂</van-radio>
        <van-radio name="2" shape="square">事业部内部调剂</van-radio>
        <van-radio name="3" shape="square">新增</van-radio>
      </van-radio-group></p>
      <p>
				<span class="span-title">不含本单事业部内本月已累计调剂:</span>
        <span class="span-value">{{form.bizEntityJson.totalAdjustAmount + '万元'}}</span>
			</p>
      <p>
				<span class="span-title">项目本月累计预算外单数:</span>
        <span class="span-value">{{form.bizEntityJson.projectNum}}</span>
			</p>
      <p>
				<span class="span-title">金额:</span>
        <span class="span-value">{{form.bizEntityJson.projectAdjustAmount + '万元'}}</span>
			</p>
      <p>
				<span class="span-title">项目:</span>
        <span class="span-value">{{form.bizEntityJson.projectName}}</span>
			</p>
      <p>
				<span class="span-title">收款单位:</span>
        <span class="span-value">{{form.bizEntityJson.receiveCompanyName}}</span>
			</p>
      <p>
				<span class="span-title">公司名称:</span>
        <span class="span-value">{{form.bizEntityJson.companyName}}</span>
			</p>
      <p>
				<span class="span-title">预算支付日期:</span>
        <span class="span-value">{{form.bizEntityJson.adjustDate | timeFormat('yyyy-mm-dd')}}</span>
			</p>
    </div>
    
    <!-- 项目内部调剂 -->
    <div class="template-content"  v-show="form.bizEntityJson.adjustmentAttr == 1">
      <p>
				<span class="span-title">需调剂科目:</span>
        <span class="span-value">{{form.bizEntityJson.adjustmentSubject}}</span>
			</p>
      <p>
				<span class="span-title">调入金额:</span>
        <span class="span-value">{{form.bizEntityJson.adjustAmount}}</span>
			</p>
      <data-table :data="form.bizEntityJson.cashFlowAccountVoList" :columns="columns1"></data-table>
    </div>

     <!-- 事业部内部调剂 -->
    <div class="template-content"  v-show="form.bizEntityJson.adjustmentAttr == 2">
      <p>
				<span class="span-title">调入资金计划组织:</span>
        <span class="span-value">{{form.bizEntityJson.organizationNameA}}</span>
			</p>
      <p>
				<span class="span-title">需调剂科目:</span>
        <span class="span-value">{{form.bizEntityJson.adjustmentSubject}}</span>
			</p>
      <p>
				<span class="span-title">调入金额:</span>
        <span class="span-value">{{form.bizEntityJson.adjustAmount}}</span>
			</p>
      <data-table :data="form.bizEntityJson.cashFlowAccountVoList" :columns="columns2"></data-table>
    </div>

     <!-- 新增 -->
    <div class="template-content"  v-show="form.bizEntityJson.adjustmentAttr == 3">
      <p>
				<span class="span-title">调入资金计划组织:</span>
        <span class="span-value">{{form.bizEntityJson.organizationNameA}}</span>
			</p>
      <data-table :data="form.bizEntityJson.cashFlowAccountVoList" :columns="columns3"></data-table>
    </div>

    <div class="template-content">
			<p>
				<span class="span-title">合同总金额(元):</span>
        <span class="span-value">{{form.bizEntityJson.totalAmount}}</span>
			</p>
      <p>
				<span class="span-title">合同已付金额(元):</span>
        <span class="span-value">{{form.bizEntityJson.paydAmount}}</span>
			</p>
      <p>
				<span class="span-title">申请支付金额(元):</span>
        <span class="span-value">{{form.bizEntityJson.applyPayAmount}}</span>
			</p>
      <p>
				<span class="span-title">批准支付金额(元):</span>
        <span class="span-value">{{form.bizEntityJson.approvePayAmount}}</span>
			</p>
      <p><van-radio-group v-model="form.bizEntityJson.formalitFlg" disabled>
        <van-radio :name="true" shape="square">付款审批手续已完成(附后续)</van-radio>
        <van-radio style="margin-top:10px" :name="false" shape="square">付款审批手续未完成(需同时报)</van-radio>
      </van-radio-group></p>
      <p>
				<span class="span-title">支出用途及预算外原因:</span>
        <span class="span-value">{{form.bizEntityJson.adjustRemark}}</span>
			</p>
      <p>
				<span class="span-title">附件:</span>
        <span class="span-value">{{form.bizEntityJson.fileId}}</span>
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
//       columns1: [
//         {label: '被调剂科目', prop: 'cashFlowAccount'},
//         {label: '调出金额', prop: 'adjustOutAmount'}
//       ],
//       columns2: [
//         {label: '项目', prop: 'cashProjectName'},
//         {label: '调出资金计划组织', prop: 'organizationNameB',width:120},
//         {label: '被调剂科目', prop: 'cashFlowAccount'},
//         {label: '调出金额', prop: 'adjustOutAmount'}
//       ],
//       columns3: [
//         {label: '新增预算科目', prop: 'cashFlowAccount',width:100},
//         {label: '新增金额', prop: 'adjustOutAmount'},
//         {label: '合同号', prop: 'contNo'},
//         {label: '付款单号', prop: 'paymentDisplayNo'}
//       ],
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
      columns1: [
        {label: '被调剂科目', prop: 'cashFlowAccount'},
        {label: '调出金额', prop: 'adjustOutAmount'}
      ],
      columns2: [
        {label: '项目', prop: 'cashProjectName'},
        {label: '调出资金计划组织', prop: 'organizationNameB',width:120},
        {label: '被调剂科目', prop: 'cashFlowAccount'},
        {label: '调出金额', prop: 'adjustOutAmount'}
      ],
      columns3: [
        {label: '新增预算科目', prop: 'cashFlowAccount',width:100},
        {label: '新增金额', prop: 'adjustOutAmount'},
        {label: '合同号', prop: 'contNo'},
        {label: '付款单号', prop: 'paymentDisplayNo'}
      ],
    }
  },
}
</script>>
<style lang="scss" scoped>
</style>