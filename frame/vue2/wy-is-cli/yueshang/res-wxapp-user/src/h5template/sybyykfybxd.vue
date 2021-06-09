<template>
	<!-- 事业部有预控费用报销单 -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">报销类别:</span>
				<span v-if="form.bizEntityJson.preType1 == 'true'" class="span-value">出差申请单</span>
				<span v-if="form.bizEntityJson.preType2 == 'true'" class="span-value">其他</span>
			</p>
			<p v-if="form.bizEntityJson.preType1 == 'true'">
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.positionLevel1 == 'true'" class="span-value">事业部总经理</span>
				<span v-if="form.bizEntityJson.positionLevel2 == 'true'" class="span-value">其他副总裁级人员</span>
				<span v-if="form.bizEntityJson.positionLevel3 == 'true'" class="span-value">事业部部门负责人</span>
				<span v-if="form.bizEntityJson.positionLevel4 == 'true'" class="span-value">其他人员</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">报销信息</h2>
			<p>
				<span class="span-title">报销/入账公司:</span>
				<span class="span-value">{{ form.bizEntityJson.acctUnitName }}</span>
			</p>
			<p>
				<span class="span-title"></span>
				<span class="span-value">{{ form.bizEntityJson.orgParentName + '-' + form.bizEntityJson.centerOrgName }}</span>
			</p>
			<p>
				<span class="span-title">网批查询号:</span>
				<span class="span-value">{{ form.bizEntityJson.preResDisplayNo }}</span>
			</p>
			<p>
				<span class="span-title">表单名称:</span>
				<span class="span-value">{{ form.bizEntityJson.preBillName }}</span>
			</p>
			<p v-if="form.bizEntityJson.contractReviewNo">
				<span class="span-title">合同评审编号:</span>
				<span class="span-value">{{ form.bizEntityJson.contractReviewNo }}</span>
			</p>
			<p>
				<span class="span-title">最后一单:</span>
				<span v-if="form.bizEntityJson.preType1 == 'true'" class="span-value">是</span>
				<span v-if="form.bizEntityJson.preType2 == 'true'" class="span-value">否</span>
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
			<p v-if="form.bizEntityJson.currencyAmt != 'CNY'">
				<span class="span-title">汇率:</span>
				<span class="span-value">{{ form.bizEntityJson.rate }}</span>
			</p>
			<p v-if="form.bizEntityJson.preWorkAssetNo">
				<span class="span-title">办公资产入库单:</span>
				<span class="span-value">{{ form.bizEntityJson.preWorkAssetNo }}</span>
			</p>
			<el-table :data="form.bizEntityJson.detailList" style="margin-bottom: 8px;">
				<el-table-column width="45" label="序号">
					<template slot-scope="scope">
						<span>{{ scope.$index + 1 }}</span>
					</template>
				</el-table-column>
				<el-table-column width="130" prop="fullPath" show-overflow-tooltip label="费用中心" />
				<el-table-column width="80" prop="displayName" show-overflow-tooltip label="费用名称" />
				<el-table-column width="80" prop="accountSubjectName" show-overflow-tooltip label="发票内容" />
				<el-table-column width="100" prop="budgetAmt" show-overflow-tooltip label="申请预算金额(元)" />
				<el-table-column width="80" prop="agreeAmt" show-overflow-tooltip label="已报销金额(元)" />
				<el-table-column width="100" prop="currencyAmt" show-overflow-tooltip :label="form.bizEntityJson.currencyAmt == 'CNY' ? '本次报销金额(A)(元)' : '本次报销金额(原币)(元)'" />
				<el-table-column v-if="form.bizEntityJson.currencyAmt == 'CNY'" width="80" show-overflow-tooltip label="增值税专用发票(元)">
					<template slot-scope="scope">
						<span v-if="scope.row.isZzszyfp1 == 'true'">是</span>
						<span v-if="scope.row.isZzszyfp2 == 'true'">否</span>
						<span v-if="scope.row.displayName == '交通'">/</span>
					</template>
				</el-table-column>
				<el-table-column v-if="form.bizEntityJson.currencyAmt == 'CNY'" width="100" prop="currencyAmt2" show-overflow-tooltip label="本次报销税额(B)(元)" />
				<el-table-column v-if="form.bizEntityJson.currencyAmt != 'CNY'" width="100" prop="standardMoney" show-overflow-tooltip label="折本位币(预算扣减金额)" />
				<el-table-column width="100" prop="accReduce" show-overflow-tooltip label="会计核减金额(元)" />
				<el-table-column width="100" prop="accReduce2" show-overflow-tooltip label="会计核减税额(元)" />
			</el-table>
			<p>
				<span class="span-title">价税合计(A+B)(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalAmt }}</span>
			</p>
			<p>
				<span class="span-title">是否冲预借款:</span>
				<span v-if="form.bizEntityJson.whethersLendAmt == 'true'" class="span-value">是</span>
				<span v-if="form.bizEntityJson.whethersLendAmt == 'false'" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.whethersLendAmt == 'true'">
				<span class="span-title">借款人:</span>
				<span class="span-value">{{ form.bizEntityJson.borrower }}</span>
			</p>
			<p>
				<span class="span-title">备注:</span>
				<span class="span-value">{{ form.bizEntityJson.remark }}</span>
			</p>
    </div>
		<div v-if="form.bizEntityJson.whethersLendAmt == 'true'" class="template-content">
			<h2 class="h2-title">还款明细</h2>
			<div v-for="(item, index) in form.bizEntityJson.rdList" :key="index">
				<p>
					<span class="span-title">借款网批查询号:</span>
					<span class="span-value">{{ item.wpId }}</span>
				</p>
				<p>
					<span class="span-title">剩余还款金额(元):</span>
					<span class="span-value">{{ item.balance }}</span>
				</p>
				<p>
					<span class="span-title">本次还款金额(元):</span>
					<span class="span-value">{{ item.repaymentAmount }}</span>
				</p>
			</div>
    </div>
		<div class="template-content">
			<h2 class="h2-title">付款信息</h2>
			<p>
				<span class="span-title"></span>
				<span v-if="form.bizEntityJson.personnelBoolean === '1'" class="span-value">员工</span>
				<span v-if="form.bizEntityJson.personnelBoolean === '0'" class="span-value">外部单位</span>
				<span v-if="form.bizEntityJson.personnelBoolean === '2'" class="span-value">内部单位</span>
			</p>
			<p>
				<span class="span-title">付款方式:</span>
				<span v-if="form.bizEntityJson.type1 == 'true'" class="span-value">现金</span>
				<span v-if="form.bizEntityJson.type2 == 'true'" class="span-value">电汇</span>
				<span v-if="form.bizEntityJson.type3 == 'true'" class="span-value">信用证</span>
				<span v-if="form.bizEntityJson.type4 == 'true'" class="span-value">转账</span>
				<span v-if="form.bizEntityJson.type5 == 'true'" class="span-value">票汇</span>
				<span v-if="form.bizEntityJson.type9 == 'true'" class="span-value">其他</span>
			</p>
			<p>
				<span class="span-title">收款人:</span>
				<span v-if="form.bizEntityJson.personnelBoolean === '1'" class="span-value">{{ form.bizEntityJson.receiveNameTrue }}</span>
				<span v-if="form.bizEntityJson.personnelBoolean === '0'" class="span-value">{{ form.bizEntityJson.receiveName }}</span>
				<span v-if="form.bizEntityJson.personnelBoolean === '2'" class="span-value">{{ form.bizEntityJson.receiveNameIn }}</span>
			</p>
			<p>
				<span class="span-title">账号:</span>
				<span class="span-value">{{ form.bizEntityJson.receiveAcctNo }}</span>
			</p>
			<p>
				<span class="span-title">开户行:</span>
				<span class="span-value">{{ form.bizEntityJson.receiveBank }}</span>
			</p>
			<p v-if="form.bizEntityJson.whethersLendAmt == 'true'">
				<span class="span-title">冲预借款(元):</span>
				<span class="span-value">{{ form.bizEntityJson.lendAmt }}</span>
			</p>
			<p>
				<span class="span-title">会计核减(元):</span>
				<span class="span-value">{{ form.bizEntityJson.checkAmt }}</span>
			</p>
			<p>
				<span class="span-title">公司已预付(元):</span>
				<span class="span-value">{{ form.bizEntityJson.advanceAmt }}</span>
			</p>
			<p>
				<span class="span-title">实付金额(元):</span>
				<span class="span-value">{{ form.bizEntityJson.realAmt }}</span>
			</p>
			<p>
				<span class="span-title">大写{{ form.bizEntityJson.currency2 }}币:</span>
				<span class="span-value">{{ form.bizEntityJson.realAmt === '' || form.bizEntityJson.realAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.realAmt) }}</span>
			</p>
			<p>
				<span class="span-title">代付信息(是否代付):</span>
				<span v-if="form.bizEntityJson.isReplacePay === 'true'" class="span-value">是</span>
				<span v-if="form.bizEntityJson.isReplacePay === 'false'" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.isReplacePay == 'true'">
				<span class="span-title">代支付公司:</span>
				<span class="span-value">{{ form.bizEntityJson.assumeCompany }}</span>
			</p>
		</div>
		<div v-if="form.bizEntityJson.businessType" class="template-content">
			<h2 class="h2-title">会计信息</h2>
			<p>
				<span class="span-title">业务类型:</span>
				<span class="span-value">{{ form.bizEntityJson.businessType }}</span>
			</p>
			<p>
				<span class="span-title">是否缺票:</span>
				<span v-if="form.bizEntityJson.isMissingTicket === 'true'" class="span-value">是</span>
				<span v-if="form.bizEntityJson.isMissingTicket === 'false'" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.isMissingTicket === 'true'">
				<span class="span-title">缺票金额:</span>
				<span class="span-value">{{ form.bizEntityJson.realAmt }}</span>
			</p>
			<p v-if="form.bizEntityJson.isMissingTicket === 'true'">
				<span class="span-title">预计归还日期:</span>
				<span class="span-value">{{ form.bizEntityJson.giveBackDate }}</span>
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