<template>
  <!-- 商务条件审批 -->
  <div class="public-box">
    <el-row :gutter="24" type="flex" class="top-row" :class="{'disabled': form.bizEntityJson.disabled}">
      <el-col :span="4">
        <span class="span-100">销售产品</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.bidNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bidNo" :placeholder="form.bizEntityJson.disabled ? '' : '例如：程度世贸|飞识'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" :class="{'disabled': form.bizEntityJson.disabled}">
      <el-col :span="4">
        <span class="span-100">附件</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <el-upload
            name="fileName"
            :headers="{'Authorization': userInfo.token}"
            :accept="$action"
            :action="uploadUrl"
            :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.bizId}"
            :before-remove="beforeRemoveGlobal"
            :before-upload="beforeUploadGlobal"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">添加附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" :class="{'disabled': form.bizEntityJson.disabled}">
      <el-col :span="4">
        <span class="span-100">投标审批</span>
      </el-col>
      <el-col :span="8">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.tenderApproveFlg, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.tenderApproveFlg">
              <el-radio label="true">有</el-radio>
              <el-radio label="false">无</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input v-if="form.bizEntityJson.tenderApproveFlg == 'true'" :class="{'novalue': !form.bizEntityJson.tenderApproveNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.tenderApproveNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入审批编号'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="9" class="title-col">
        <h2>审批内容</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>关联合同</h2>
      </el-col>
      <el-col :span="5" class="title-col">
        <h2>经管部确认</h2>
      </el-col>
      <el-col :span="5" class="title-col right-col">
        <h2>决策意见</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">合同名称</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyContractName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedContractName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageContractName" :disabled="!form.mapEdit.manageContractName"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionContractName" :disabled="!form.mapEdit.deisionContractName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">甲方</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPartyACompanyName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedPartyACompanyName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.managePartyACompanyName" :disabled="!form.mapEdit.managePartyACompanyName"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPartyACompanyName" :disabled="!form.mapEdit.deisionPartyACompanyName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">乙方</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPartyBCompanyName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedPartyBCompanyName" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.managePartyBCompanyName" :disabled="!form.mapEdit.managePartyBCompanyName"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPartyBCompanyName" :disabled="!form.mapEdit.deisionPartyBCompanyName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">合同总额</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyTotalAmountConstitute" :placeholder="form.bizEntityJson.disabled ? '' : '提示：1、合同金额；2、分包金额(分包范围)；3、我司成本(成本计算)；4、合同毛利'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedTotalAmountConstitute" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageTotalAmountConstitute" :disabled="!form.mapEdit.manageTotalAmountConstitute"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionTotalAmountConstitute" :disabled="!form.mapEdit.deisionTotalAmountConstitute"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">我方权利/义务</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyOurObligations" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedOurObligations" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageOurObligations" :disabled="!form.mapEdit.manageOurObligations"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionOurObligations" :disabled="!form.mapEdit.deisionOurObligations"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">回款方式</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPayType" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedPayType" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.managePayType" :disabled="!form.mapEdit.managePayType"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPayType" :disabled="!form.mapEdit.deisionPayType"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">甲方违约</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyA" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedBreachDutyA" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyA" :disabled="!form.mapEdit.manageBreachDutyA"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyA" :disabled="!form.mapEdit.deisionBreachDutyA"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">乙方违约</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyB" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedBreachDutyB" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyB" :disabled="!form.mapEdit.manageBreachDutyB"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyB" :disabled="!form.mapEdit.deisionBreachDutyB"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">双向约束</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyD" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedBreachDutyD" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyD" :disabled="!form.mapEdit.manageBreachDutyD"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyD" :disabled="!form.mapEdit.deisionBreachDutyD"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">合同涉及附件</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyContractFile" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedContractFile" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageContractFile" :disabled="!form.mapEdit.manageContractFile"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionContractFile" :disabled="!form.mapEdit.deisionContractFile"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">特殊限制/突破条款</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applySpecialTerms" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedSpecialTerms" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageSpecialTerms" :disabled="!form.mapEdit.manageSpecialTerms"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionSpecialTerms" :disabled="!form.mapEdit.deisionSpecialTerms"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">其他说明</span>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyOtherExplain" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.associatedOtherExplain" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="5">
        <t-textarea v-model="form.bizEntityJson.manageOtherExplain" :disabled="!form.mapEdit.manageOtherExplain"></t-textarea>
      </el-col>
      <el-col :span="5" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionOtherExplain" :disabled="!form.mapEdit.deisionOtherExplain"></t-textarea>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      selectIndex: 0,
      uploadUrl,
      fileList: fileList || [],
      userInfo: {}
    }
  },
  props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
    },
	},
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  mounted() {
  },
  methods: {
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.bidNo) return this.$message.error('请输入销售产品'), false
      if(!this.form.bizEntityJson.tenderApproveFlg) return this.$message.error('请选择投标审批'), false
      if(this.form.bizEntityJson.tenderApproveFlg == 'true') {
        if(!this.form.bizEntityJson.tenderApproveNo) return this.$message.error('请输入审批编号'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
