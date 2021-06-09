<template>
	<!-- 申请提前解除合约 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">文件标题:</span>
				<span class="span-value">{{ form.bizEntityJson.fileTitle }}</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">合同编号:</span>
				<span class="span-value">{{ form.bizEntityJson.contractNo }}</span>
			</p>
			<p>
				<span class="span-title">商户名称:</span>
				<span class="span-value">{{ form.bizEntityJson.bisShopName }}</span>
			</p>
			<p>
				<span class="span-title">品牌名称:</span>
				<span class="span-value">{{ form.bizEntityJson.brandName }}</span>
			</p>
			<p>
				<span class="span-title">解约类型:</span>
				<span v-if="form.bizEntityJson.contentTerminationFlag" class="span-value">按合同解约</span>
				<span v-else class="span-value">不按合同解约</span>
			</p>
			<p>
				<span class="span-title">品牌类型:</span>
				<span v-if="form.bizEntityJson.brandType == 1" class="span-value">总部联发品牌</span>
				<span v-if="form.bizEntityJson.brandType == 2" class="span-value">区域联发品牌</span>
				<span v-if="form.bizEntityJson.brandType == 3" class="span-value">非联发品牌</span>
			</p>
			<p>
				<span class="span-title">商家性质:</span>
				<span v-if="form.bizEntityJson.bisShopNature == 1" class="span-value">主力店-百货</span>
				<span v-if="form.bizEntityJson.bisShopNature == 2" class="span-value">主力店-超市</span>
				<span v-if="form.bizEntityJson.bisShopNature == 3" class="span-value">主力店-影院</span>
				<span v-if="form.bizEntityJson.bisShopNature == 4" class="span-value">次主力店</span>
				<span v-if="form.bizEntityJson.bisShopNature == 5" class="span-value">大租户</span>
				<span v-if="form.bizEntityJson.bisShopNature == 6" class="span-value">中租户</span>
				<span v-if="form.bizEntityJson.bisShopNature == 7" class="span-value">小租户</span>
				<span v-if="form.bizEntityJson.bisShopNature == 8" class="span-value">商业街</span>
				<span v-if="form.bizEntityJson.bisShopNature == 9" class="span-value">住宅底商</span>
			</p>
			<p>
				<span class="span-title">项目类型:</span>
				<span v-if="form.bizEntityJson.projectType == 1" class="span-value">地产</span>
				<span v-if="form.bizEntityJson.projectType == 2" class="span-value">置地</span>
			</p>
			<p>
				<span class="span-title">商铺号:</span>
				<span class="span-value">{{ form.bizEntityJson.bisStoreNos }}</span>
			</p>
			<p>
				<span class="span-title">计租面积㎡:</span>
				<span class="span-value">{{ form.bizEntityJson.rentSquare }}</span>
			</p>
			<p>
				<span class="span-title">合同开始日期:</span>
				<span class="span-value">{{ form.bizEntityJson.contStartDate }}</span>
			</p>
			<p>
				<span class="span-title">合同结束日期:</span>
				<span class="span-value">{{ form.bizEntityJson.contEndDate }}</span>
			</p>
			<p>
				<span class="span-title">免租期:</span>
				<span class="span-value">{{ form.bizEntityJson.freePeriod }}</span>
			</p>
			<p>
				<span class="span-title">实付装补费用:</span>
				<span class="span-value">{{ form.bizEntityJson.actuallyPaidMoney }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">费用信息</h2>
      <p>
				<span class="span-title">申请解约日期:</span>
				<span class="span-value">{{ form.bizEntityJson.applyTerminationDate }}</span>
			</p>
			<p>
				<span class="span-title">租金解约权责月:</span>
				<span class="span-value">{{ form.bizEntityJson.rentTerminationMonth }}</span>
			</p>
			<p>
				<span class="span-title">物管解约权责月:</span>
				<span class="span-value">{{ form.bizEntityJson.manageTerminationMonth }}</span>
			</p>
			<p>
				<span class="span-title">最后经营日期:</span>
				<span class="span-value">{{ form.bizEntityJson.lastOperatingDate }}</span>
			</p>
			<p>
				<span class="span-title">解约当月租金:</span>
				<span class="span-value">{{ form.bizEntityJson.rentTerminationMonthAmount }}</span>
			</p>
			<p>
				<span class="span-title">解约当月物业费:</span>
				<span class="span-value">{{ form.bizEntityJson.manageTerminationMonthAmount }}</span>
			</p>
			<p>
				<span class="span-title">当月应收租金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.rentReceivableMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月应收物业费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.manageFeeReceivableMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月应收水费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.waterFeeReceivableMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月应收电费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.electricityFeeReceivableMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月已收租金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.rentReceivedMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月已收物业费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.manageFeeReceivedMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月已收水费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.waterFeeReceivedMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月已收电费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.electricityFeeReceivedMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月欠收租金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.rentArrearsMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月欠收物业费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.manageFeeArrearsMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月欠收水费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.waterFeeArrearsMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月欠收电费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.electricityFeeArrearsMonth }}</span>
			</p>
			<p>
				<span class="span-title">当月欠费汇总(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalArrearsMonth }}</span>
			</p>
			<p>
				<span class="span-title">其他欠费及说明:</span>
				<span class="span-value">{{ form.bizEntityJson.otherArrearsDescription }}</span>
			</p>
			<p>
				<span class="span-title">累计欠收租金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalRentArrears }}</span>
			</p>
			<p>
				<span class="span-title">累计欠收物业费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalManageFeeArrears }}</span>
			</p>
			<p>
				<span class="span-title">累计欠收水电费(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalUtilityFeeArrears }}</span>
			</p>
			<p>
				<span class="span-title">累计欠收合计(元):</span>
				<span class="span-value">{{ form.bizEntityJson.totalArrears }}</span>
			</p>
			<p>
				<span class="span-title">申报原因及后续调整安排:</span>
				<span class="span-value">{{ form.bizEntityJson.reasonDeclaration }}</span>
			</p>
			<p>
				<span class="span-title">已交租金保证金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.payedRentBondAmount }}</span>
			</p>
			<p>
				<span class="span-title">已交物业保证金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.payedManageFeeBondAmount }}</span>
			</p>
			<p>
				<span class="span-title">已交质量保证金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.payedQualityBondAmount }}</span>
			</p>
			<p>
				<span class="span-title">已交其他保证金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.payedOtherBondAmount }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">预售卡充值费用</h2>
			<p>
				<span class="span-title">预售卡充值是否全退换:</span>
				<span v-if="form.bizEntityJson.preSaleCardReturnFlag" class="span-value">有</span>
				<span v-else class="span-value">无</span>
			</p>
			<p>
				<span class="span-title">未退还预售卡充值费用(元):</span>
				<span class="span-value">{{ form.bizEntityJson.preSaleCardNotRefundedFee }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">工程条件和退铺约定</h2>
			<p>
				<span class="span-title">工程条件:</span>
				<span class="span-value">工程变更</span>
			</p>
			<p>
				<span class="span-title">退铺约定:</span>
				<span v-if="form.bizEntityJson.restoreFlag" class="span-value">恢复原状</span>
				<span v-else class="span-value">不恢复原状<van-icon name="info" @click="$dialog.alert({message: '本商铺下次租赁时不得以未恢复原状为由降低租金标准或增加装修期/免租期'})" /></span>
			</p>
			<p>
				<span class="span-title">商铺恢复原状金额(元):</span>
				<span class="span-value">{{ form.bizEntityJson.restoreFee }}</span>
			</p>
			<p>
				<span class="span-title">商务条件审批号:</span>
				<span class="span-value">{{ form.bizEntityJson.businessApproveNo }}</span>
			</p>
		</div>
		<div class="template-content">
			<p>
				<span class="span-title">履约保证金能否覆盖所有欠费:</span>
				<span v-if="form.bizEntityJson.coverFlag" class="span-value">能覆盖</span>
				<span v-else class="span-value">不能覆盖</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">其他</h2>
			<p>
				<span class="span-title">备注说明:</span>
				<span class="span-value">{{ form.bizEntityJson.remark }}</span>
			</p>
			<p v-if="form.bizEntityJson.categorySelection == 3">
				<span class="span-title">走账:</span>
				<span v-if="form.bizEntityJson.takeTheBill == 1" class="span-value">是</span>
				<span v-if="form.bizEntityJson.takeTheBill == 0" class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.takeTheBill == 1">
				<span class="span-title">例外事项网批号:</span>
				<span class="span-value">{{ form.bizEntityJson.exceptionNetLotNumber }}</span>
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