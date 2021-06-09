<template>
	<!-- 更名 -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">是否满足:</span>
				<span v-if="form.bizEntityJson.satisfiedFlg" class="span-value">满足条件</span>
				<span v-else class="span-value">不满足条件</span>
			</p>
			<p>
				<span class="span-title">项目名称:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">类别:</span>
				<span v-if="form.bizEntityJson.renameType == 1" class="span-value">减名</span>
				<span v-if="form.bizEntityJson.renameType == 2" class="span-value">增名</span>
				<span v-if="form.bizEntityJson.renameType == 3" class="span-value">换名(转让)</span>
			</p>
			<p>
				<span class="span-title">原业主名称:</span>
				<span class="span-value">{{ form.bizEntityJson.originalOwnerName }}</span>
			</p>
			<p>
				<span class="span-title">身份证/护照号:</span>
				<span class="span-value">{{ form.bizEntityJson.originalIDNumber }}</span>
			</p>
			<p>
				<span class="span-title">联系电话:</span>
				<span class="span-value">{{ form.bizEntityJson.originalPhoneNum }}</span>
			</p>
			<p>
				<span class="span-title">通讯地址:</span>
				<span class="span-value">{{ form.bizEntityJson.originalAddr }}</span>
			</p>
			<p>
				<span class="span-title">现业主名称:</span>
				<span class="span-value">{{ form.bizEntityJson.newOwnerName }}</span>
			</p>
			<p>
				<span class="span-title">身份证/护照号:</span>
				<span class="span-value">{{ form.bizEntityJson.newIDNumber }}</span>
			</p>
			<p>
				<span class="span-title">联系电话:</span>
				<span class="span-value">{{ form.bizEntityJson.newPhoneNum }}</span>
			</p>
			<p>
				<span class="span-title">通讯地址:</span>
				<span class="span-value">{{ form.bizEntityJson.newAddr }}</span>
			</p>
			<p>
				<span class="span-title">认购单元:</span>
				<span class="span-value">
					<span>{{ form.bizEntityJson.building }}栋</span>
					<span v-if="form.bizEntityJson.unit">{{ form.bizEntityJson.unit }}单元</span>
					<span>{{ form.bizEntityJson.floor }}层</span>
					<span>{{ form.bizEntityJson.storefront }}住宅/店面</span>
				</span>
			</p>
			<p>
				<span class="span-title">认购时间:</span>
				<span class="span-value">{{ form.bizEntityJson.subscriptionDate }}</span>
			</p>
			<p>
				<span class="span-title">是否已额外申请优惠:</span>
				<span v-if="form.bizEntityJson.applyDiscountFlg" class="span-value">是</span>
				<span v-else class="span-value">否</span>
			</p>
			<p v-if="form.bizEntityJson.applyDiscountFlg">
				<span class="span-title">优惠:</span>
				<span class="span-value">{{ form.bizEntityJson.discountRate }}%</span>
			</p>
			<p>
				<span class="span-title">单价:</span>
				<span class="span-value">{{ form.bizEntityJson.price }}</span>
			</p>
			<p>
				<span class="span-title">总价:</span>
				<span class="span-value">{{ form.bizEntityJson.totalAmount }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">已付款项</h2>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.bookingFeeDate }}</span>
			</p>
			<p>
				<span class="span-title">预订金(元):</span>
				<span class="span-value">{{ form.bizEntityJson.bookingFee }}</span>
			</p>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.payInAdvanceDate }}</span>
			</p>
			<p>
				<span class="span-title">首付款(元):</span>
				<span class="span-value">{{ form.bizEntityJson.payInAdvanceFee }}</span>
			</p>
			<p>
				<span class="span-title">时间:</span>
				<span class="span-value">{{ form.bizEntityJson.renewDate }}</span>
			</p>
			<p>
				<span class="span-title">续款(元):</span>
				<span class="span-value">{{ form.bizEntityJson.renewFee }}</span>
			</p>
		</div>
		<div class="template-content">
			<p>
				<span class="span-title">物业现状:</span>
				<span v-if="form.bizEntityJson.propertyStatus == 1" class="span-value">预定书</span>
				<span v-if="form.bizEntityJson.propertyStatus == 2" class="span-value">签订买卖合同</span>
				<span v-if="form.bizEntityJson.propertyStatus == 3" class="span-value">办理按揭</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">声明</h2>
			<p>
				<span class="span-value">本人同意上述房产为本人名字，并愿意支付以下费用：</span>
			</p>
			<p>
				<span class="span-title">原成交总价1％的手续费用:</span>
				<span class="span-value">{{ form.bizEntityJson.handlingFee }}元</span>
			</p>
			<p>
				<span class="span-value">上述房屋因更名产生的法律纠纷一切与贵公司无关。</span>
			</p>
			<p>
				<span class="span-title">原业主签名:</span>
				<span class="span-value">{{ form.bizEntityJson.originalOwner }}</span>
			</p>
			<p>
				<span class="span-title">现业主签名:</span>
				<span class="span-value">{{ form.bizEntityJson.currentOwner }}</span>
			</p>
			<p>
				<span class="span-title">备注:</span>
				<span class="span-value">{{ form.bizEntityJson.remark }}</span>
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