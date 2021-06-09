<template>
	<!-- 印鉴外借单 -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">单位:</span>
				<span v-if="form.bizEntityJson.unitType == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.unitType == 2" class="span-value">各事业部及置地</span>
				<span v-if="form.bizEntityJson.unitType == 3" class="span-value">城市公司</span>
			</p>
			<p>
				<span class="span-title">印鉴种类:</span>
				<span class="span-value">
					<span v-if="form.bizEntityJson.officialSeal">公章</span>
					<span v-if="form.bizEntityJson.legalPersonSeal">法人章</span>
					<span v-if="form.bizEntityJson.financeSeal">财务专用章</span>
					<span v-if="form.bizEntityJson.chairmanSeal">董事局主席证件原件</span>
					<span v-if="form.bizEntityJson.presidentSeal">总裁证件原件</span>
					<span v-if="form.bizEntityJson.executiveDirectorSeal">执行董事证件原件</span>
				</span>
			</p>
			<p>
				<span class="span-title">所属项目:</span>
				<span class="span-value">{{ form.bizEntityJson.projectName }}</span>
			</p>
			<p>
				<span class="span-title">借用人:</span>
				<span class="span-value">{{ form.bizEntityJson.borrowUserName }}</span>
			</p>
			<p>
				<span class="span-title">借用日期:</span>
				<span class="span-value">{{ form.bizEntityJson.borrowDate }}</span>
			</p>
			<p>
				<span class="span-title">印鉴名称:</span>
				<span class="span-value">{{ form.bizEntityJson.sealName }}</span>
			</p>
			<p>
				<span class="span-title">使用地点:</span>
				<span class="span-value">{{ form.bizEntityJson.useAddr }}</span>
			</p>
			<p>
				<span class="span-title">使用事由:</span>
				<span class="span-value">{{ form.bizEntityJson.useCause }}</span>
			</p>
			<p>
				<span class="span-title">归还日期:</span>
				<span class="span-value">{{ form.bizEntityJson.returnDate }}</span>
			</p>
			<p v-if="form.bizEntityJson.userUnsealedSignature">
				<span class="span-title"></span>
				<span class="span-value">使用方启封签名</span>
			</p>
			<p>
				<span class="span-title">借用人:</span>
				<span class="span-value">{{ form.bizEntityJson.unsealedBorrowUserCd }}</span>
			</p>
			<p>
				<span class="span-title">监督人:</span>
				<span class="span-value">{{ form.bizEntityJson.unsealedSuperviseUserName }}</span>
			</p>
			<p v-if="form.bizEntityJson.userSealedSignature">
				<span class="span-title"></span>
				<span class="span-value">使用方密封签名</span>
			</p>
			<p>
				<span class="span-title">借用人:</span>
				<span class="span-value">{{ form.bizEntityJson.sealedBorrowUserName }}</span>
			</p>
			<p>
				<span class="span-title">监督人:</span>
				<span class="span-value">{{ form.bizEntityJson.sealedSuperviseUserName }}</span>
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
			form: {},
    }
	},
	mounted() {

  },
	methods: {

	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>