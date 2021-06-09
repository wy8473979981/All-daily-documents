<template>
	<!-- 印鉴使用会签单 -->
	<div class="template-wrapper">
    <div class="template-content">
      <p>
				<span class="span-title">单位:</span>
				<span v-if="form.bizEntityJson.unitType == 1" class="span-value">总部</span>
				<span v-if="form.bizEntityJson.unitType == 2" class="span-value">事业部</span>
				<span v-if="form.bizEntityJson.unitType == 3" class="span-value">城市公司</span>
			</p>
			<p>
				<span class="span-title">申请部门:</span>
				<span class="span-value">{{ form.bizEntityJson.applyOrgName }}</span>
			</p>
			<p>
				<span class="span-title">申请人:</span>
				<span class="span-value">{{ form.bizEntityJson.applyUserName }}</span>
			</p>
			<p>
				<span class="span-title">事由:</span>
				<span class="span-value">{{ form.bizEntityJson.cause }}</span>
			</p>
			<p>
				<span class="span-title">印鉴名称:</span>
				<span class="span-value">{{ form.bizEntityJson.sealName }}</span>
			</p>
			<p>
				<span class="span-title">文件名称:</span>
				<span class="span-value">{{ form.bizEntityJson.fileName }}</span>
			</p>
			<p>
				<span class="span-title">文件份数:</span>
				<span class="span-value">{{ form.bizEntityJson.fileNumber }}</span>
			</p>
		</div>
		<div class="template-content">
			<h2 class="h2-title">用章种类</h2>
			<p>
				<span class="span-title">印鉴种类:</span>
				<span v-if="form.bizEntityJson.sealMode == 1" class="span-value">人力资源</span>
				<span v-if="form.bizEntityJson.sealMode == 2" class="span-value">行政</span>
				<span v-if="form.bizEntityJson.sealMode == 3" class="span-value">财务</span>
				<span v-if="form.bizEntityJson.sealMode == 7" class="span-value">营销</span>
				<span v-if="form.bizEntityJson.sealMode == 4" class="span-value">通用</span>
			</p>
			<p>
				<span class="span-title">印鉴类型:</span>
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
			<p v-if="form.bizEntityJson.otherSeal">
				<span class="span-title">其他:</span>
				<span class="span-value">{{ form.bizEntityJson.otherSealName }}</span>
			</p>
			<p>
				<span class="span-title">用章文件:</span>
				<span class="span-value">
					<download v-model="form.allEntityFileIds.fileId"></download>
				</span>
			</p>
			<p>
				<span class="span-title">备注<van-icon name="info" @click="$dialog.alert({message: '说明用印次数及其他'})" />:</span>
				<span class="span-value">{{ form.bizEntityJson.remark }}</span>
			</p>
			<p v-if="form.bizEntityJson.sealMode == 1 || form.bizEntityJson.sealMode == 3">
				<span class="span-title">使用范围:</span>
				<span class="span-value">{{ useRangeName }}</span>
			</p>
			<p v-if="useRangeOtherNameShow">
				<span class="span-title">其他:</span>
				<span class="span-value">{{ useRangeOtherName }}</span>
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

import approval from '@/apis/apis/approval';
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
			useRangeName: null,
			useRangeOtherNameShow: false,
    }
	},
	mounted() {
		if (this.form.bizEntityJson.sealMode == 1) {
			this.getSealEngravingApplySheetHr()
		}
		if (this.form.bizEntityJson.sealMode == 2) {
			this.getSealEngravingApplySheetFin()
		}
  },
	methods: {
		// 印鉴使用会签单-人力资源-使用范围-下拉选项
    getSealEngravingApplySheetHr() {
      let enterpriseId = this.$userInfo.enterpriseId
      approval.getSealEngravingApplySheetHr(enterpriseId).then(res => {
        if(res.code ==1) {
					res.data.forEach(item => {
            if (this.form.bizEntityJson.useRange == item.dictCd) {
              this.useRangeName = item.dictName
            }
          })
        }
      })
    },
    // 印鉴使用会签单-财务-使用范围
    getSealEngravingApplySheetFin() {
      let enterpriseId = this.$userInfo.enterpriseId
      approval.getSealEngravingApplySheetFin(enterpriseId).then(res => {
        if(res.code ==1) {
          res.data.forEach(item => {
            if (this.form.bizEntityJson.useRange == item.dictCd) {
							this.useRangeName = item.dictName
							if (item.dictName.search(/其他/) != -1) {
								this.useRangeOtherNameShow = true
							}
            }
          })
        }
      })
    },
	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>