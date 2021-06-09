<template>
	<!-- 全部组件整理，需要复制到后台模板配置  start -->
	<div class="template-wrapper">
    <div class="template-content">
			<!-- 封装方法展示 -->
      <p-col title="普通输入框:" :value="form.bizEntityJson.center" />
      <p-col title="单选:" select>
				<span v-if="form.bizEntityJson.positionLevel1">总部</span>
				<span v-if="form.bizEntityJson.positionLevel2">事业部</span>
				<span v-if="form.bizEntityJson.positionLevel3">地产</span>
				<span v-if="form.bizEntityJson.positionLevel4">其他</span>
			</p-col>
      <!-- <p-col title="单选单字段:" :value="{'总部': form.bizEntityJson.positionLevel2}" />
      <p-col title="单选多字段:" :value="{'出差申请单': form.bizEntityJson.preType1 == 'true', '其他': form.bizEntityJson.preType2 == 'true'}" /> -->
      <p-col title="多选:" select>
				<span v-if="form.bizEntityJson.officialSeal">公章</span>
				<span v-if="form.bizEntityJson.contractSeal">合同专用章</span>
				<span v-if="form.bizEntityJson.financeSeal">财务专用章</span>
				<span v-if="form.bizEntityJson.legalPersonSeal">法人章</span>
				<span v-if="form.bizEntityJson.invoiceSeal">发票专用章</span>
				<span v-if="form.bizEntityJson.textApproveSeal">文本审核章</span>
				<span v-if="form.bizEntityJson.otherSeal">其他</span>
			</p-col>
      <p-col title="附件:" :value="form.allEntityFileIds.fileId" file />
			<!-- 原生方法展示 -->
      <p>
				<span class="span-title">单选单字段:</span>
				<span v-if="form.bizEntityJson.approvalProcess == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.approvalProcess == 2" class="span-value">事业部</span>
				<span v-if="form.bizEntityJson.approvalProcess == 3" class="span-value">地产</span>
			</p>
      <p>
				<span class="span-title">单选多字段:</span>
				<span v-if="form.bizEntityJson.preType1 == 'true'" class="span-value">出差申请单</span>
				<span v-if="form.bizEntityJson.preType2 == 'true'" class="span-value">其他</span>
			</p>
      <p>
				<span class="span-title">多选:</span>
				<span class="span-value">
					<span v-if="form.bizEntityJson.officialSeal">公章</span>
					<span v-if="form.bizEntityJson.contractSeal">合同专用章</span>
					<span v-if="form.bizEntityJson.financeSeal">财务专用章</span>
					<span v-if="form.bizEntityJson.legalPersonSeal">法人章</span>
					<span v-if="form.bizEntityJson.invoiceSeal">发票专用章</span>
					<span v-if="form.bizEntityJson.textApproveSeal">文本审核章</span>
					<span v-if="form.bizEntityJson.otherSeal">其他</span>
				</span>
			</p>
			<p>
				<span class="span-title">币种:</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'CNY'" class="span-value">人民币</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'USD'" class="span-value">美元</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'HKD'" class="span-value">港元</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'EUR'" class="span-value">欧元</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'SGD'" class="span-value">新加坡币</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'GBP'" class="span-value">英镑</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'MOP'" class="span-value">澳门币</span>
				<span v-if="form.bizEntityJson.currencyAmt == 'JPY'" class="span-value">日元</span>
			</p>
      <!-- 显示/隐藏判断 -->
			<p v-if="form.bizEntityJson.currencyAmt != 'CNY'">
				<span class="span-title">汇率:</span>
				<span class="span-value">{{ form.bizEntityJson.rate }}</span>
			</p>
    </div>
    <!-- 区域分开 -->
		<div class="template-content">
			<h2 class="h2-title">标题</h2>
      <!-- table，label是表头信息，prop是绑定字段，width控制宽度 -->
			<el-table :data="form.bizEntityJson.scenes" style="margin-bottom: 8px;">
				<el-table-column width="80" prop="feeName" show-overflow-tooltip label="申请人" />
				<el-table-column width="80" prop="applyUserName" show-overflow-tooltip label="费用名称" />
				<el-table-column width="80" prop="sceneConfigName" show-overflow-tooltip label="场景" />
				<el-table-column width="100" prop="centerName" show-overflow-tooltip label="费用承担部门" />
				<el-table-column width="80" prop="subjectName" show-overflow-tooltip label="预算科目" />
				<el-table-column width="100" prop="projectAmount" show-overflow-tooltip label="立项金额(元)" />
				<el-table-column width="100" prop="approveAmount" show-overflow-tooltip label="审批金额(元)" />
			</el-table>
      <!-- 附件 -->
			<p>
				<span class="span-title">框架合同附件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
			<p>
				<span class="span-title">立项总金额(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalProjectAmount }}</span>
			</p>
      <!-- 金额转换大写显示 -->
      <p>
				<span class="span-title">大写{{ form.bizEntityJson.currency2 }}币:</span>
				<span class="span-value">{{ form.bizEntityJson.totalProjectAmount === '' || form.bizEntityJson.totalProjectAmount === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.totalProjectAmount) }}</span>
			</p>
    </div>
  </div>
  <!-- end -->
</template>
<script>

// 复制到模板内容配置 逻辑信息里
// {
//   template,
//   data: function() {
//     return{
//       form: data,
//       disabled: true
//     }
//   }
// }

// 本地预览需要的方法，不需要复制到模板内容配置
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