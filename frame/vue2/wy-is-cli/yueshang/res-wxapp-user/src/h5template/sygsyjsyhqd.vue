<template>
	<!-- 商业公司印鉴使用会签单 -->
	<div class="template-wrapper">
    <div class="template-content">
			<p>
				<span class="span-title">印鉴类型:</span>
				<span v-if="form.bizEntityJson.sealType == 1">商业公司印鉴、证照</span>
				<span v-if="form.bizEntityJson.sealType == 2">地产公司印鉴、证照</span>
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
				<span class="span-value">
					<span v-if="form.bizEntityJson.unitType == 1">行政人事、财务、成本</span>
					<span v-if="form.bizEntityJson.unitType == 2">通用</span>
				</span>
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
				<span v-if="form.bizEntityJson.sealMode == 5" class="span-value">商业</span>
				<span v-if="form.bizEntityJson.sealMode == 6" class="span-value">地产(移交商业)</span>
			</p>
			<p>
				<span class="span-title">印鉴类别:</span>
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
				<span class="span-title">事务类别:</span>
				<span class="span-value">
					<span v-if="form.bizEntityJson.sealUseScenes == 1">一般事务</span>
					<span v-if="form.bizEntityJson.sealUseScenes == 2">对外付款、法律纠纷或其它重大事项</span>
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

const data = {};
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
			form: data
    }
	},
	methods: {
	
	}
}
</script>>
<style lang="scss" scoped>
@import "~@/scss/h5template.scss";
</style>