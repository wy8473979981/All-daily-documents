<template>
	<!-- 退房 -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">是否满足:</span>
				<span v-if="form.bizEntityJson.backRoom == 0" class="span-value">推盘量1%以内</span>
				<span v-if="form.bizEntityJson.backRoom == 1" class="span-value">推盘量1%以外</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">业主名称:</span>
				<span class="span-value">{{ form.bizEntityJson.owerName }}</span>
			</p>
			<p>
				<span class="span-title">身份证/护照号:</span>
				<span class="span-value">{{ form.bizEntityJson.idno }}</span>
			</p>
			<p>
				<span class="span-title">联系电话:</span>
				<span class="span-value">{{ form.bizEntityJson.phoneNo }}</span>
			</p>
			<p>
				<span class="span-title">通讯地址:</span>
				<span class="span-value">{{ form.bizEntityJson.address }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">退房资料</h2>
			<p>
				<span class="span-title">退租单元:</span>
				<span class="span-value">
					<span>{{ form.bizEntityJson.buildName }}栋</span>
					<span v-if="form.bizEntityJson.unitName">{{ form.bizEntityJson.unitName }}单元</span>
					<span>{{ form.bizEntityJson.floorName }}层</span>
					<span>{{ form.bizEntityJson.storeName }}住宅/店面</span>
				</span>
			</p>
			<p>
				<span class="span-title">建筑面积:</span>
				<span class="span-value">{{ form.bizEntityJson.buildSquare }}</span>
			</p>
			<p>
				<span class="span-title">原建筑单价(元):</span>
				<span class="span-value">{{ form.bizEntityJson.oldConsUnitPrice }}</span>
			</p>
			<p>
				<span class="span-title">新建筑单价(元):</span>
				<span class="span-value">{{ form.bizEntityJson.newConsUnitPrice }}</span>
			</p>
			<p>
				<span class="span-title">原总价(元):</span>
				<span class="span-value">{{ form.bizEntityJson.oldTotalPrice }}</span>
			</p>
			<p>
				<span class="span-title">新总价(元):</span>
				<span class="span-value">{{ form.bizEntityJson.newTotalPrice }}</span>
			</p>
			<p>
				<span class="span-title">认购时间:</span>
				<span class="span-value">{{ form.bizEntityJson.substribeDate }}</span>
			</p>
			<p>
				<span class="span-title">调价比例(%):</span>
				<span class="span-value">{{ form.bizEntityJson.priceAdjustProp }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">已付款项</h2>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.prePayDate }}</span>
			</p>
			<p>
				<span class="span-title">预订金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.prePayAmt }}</span>
			</p>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.firstPayDate }}</span>
			</p>
			<p>
				<span class="span-title">首付款(元):</span>
				<span class="span-value">{{ form.bizEntityJson.firstPayAmt }}</span>
			</p>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.repayDate }}</span>
			</p>
			<p>
				<span class="span-title">续款(元):</span>
				<span class="span-value">{{ form.bizEntityJson.repayAmt }}</span>
			</p>
			<p>
				<span class="span-title">物业现状:</span>
				<span v-if="form.bizEntityJson.selectReseBook == 1" class="span-value">预定书</span>
				<span v-if="form.bizEntityJson.selectReseBook == 2" class="span-value">签订买卖合同</span>
				<span v-if="form.bizEntityJson.selectReseBook == 3" class="span-value">办理按揭</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">声明</h2>
			<p>
				<span class="span-value">本人申请上述房产的退购，并愿意支付以下费用：</span>
			</p>
			<p>
				<span class="span-title">原房屋成交总价违约金/手续费:</span>
				<span class="span-value">{{ form.bizEntityJson.dealTotalPenalty }}元</span>
			</p>
			<p>
				<span class="span-title">业主签名:</span>
				<span class="span-value">{{ form.bizEntityJson.owerSignName }}</span>
			</p>
			<p>
				<span class="span-title">备注:</span>
				<span class="span-value">{{ form.bizEntityJson.contentDesc }}</span>
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