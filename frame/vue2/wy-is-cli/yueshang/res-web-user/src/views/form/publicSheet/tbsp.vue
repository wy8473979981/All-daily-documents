<template>
  <!-- 投标审批 -->
  <div class="public-box">
    <el-row :gutter="24" type="flex" class="top-row" :class="{'disabled': form.bizEntityJson.disabled}">
      <el-col :span="4">
        <span class="span-100">投标产品</span>
      </el-col>
      <el-col :span="20" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.bidNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bidNo" :placeholder="form.bizEntityJson.disabled ? '' : '例如：成都世贸|飞识'"></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
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
            :on-error="handleErrorGlobal"
            :on-preview="downLoadFileGlobal"
            :file-list="form.allEntityFileIds.fileId"
            style="display: flex;">
            <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">添加附件</el-button>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12" class="title-col" style="calc(50% - 1px)">
        <h2>审批内容</h2>
      </el-col>
      <el-col :span="6" class="title-col" style="calc(25% + 1px)">
        <h2>经管部确认</h2>
      </el-col>
      <el-col :span="6" class="title-col right-col">
        <h2>决策意见</h2>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">招标公司</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyContractName" :placeholder="form.bizEntityJson.disabled ? '' : '提示：按标文件填写'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageContractName" :disabled="!form.mapEdit.manageContractName"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionContractName" :disabled="!form.mapEdit.deisionContractName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">项目名称</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPartyACompanyName" :placeholder="form.bizEntityJson.disabled ? '' : '提示：按标文件填写'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.managePartyACompanyName" :disabled="!form.mapEdit.managePartyACompanyName"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPartyACompanyName" :disabled="!form.mapEdit.deisionPartyACompanyName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">服务地点</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPartyBCompanyName" :placeholder="form.bizEntityJson.disabled ? '' : '提示：城市，是否需要驻场'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.managePartyBCompanyName" :disabled="!form.mapEdit.managePartyBCompanyName"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPartyBCompanyName" :disabled="!form.mapEdit.deisionPartyBCompanyName"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">竞标对手</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyTotalAmountConstitute" :placeholder="form.bizEntityJson.disabled ? '' : '提示：竞标对手及渠道信息'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageTotalAmountConstitute" :disabled="!form.mapEdit.manageTotalAmountConstitute"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionTotalAmountConstitute" :disabled="!form.mapEdit.deisionTotalAmountConstitute"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">评标方式</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyOurObligations" :placeholder="form.bizEntityJson.disabled ? '' : '提示：商务标与技术标比例，或其他评标方式'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageOurObligations" :disabled="!form.mapEdit.manageOurObligations"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionOurObligations" :disabled="!form.mapEdit.deisionOurObligations"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">投标策略</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyPayType" :placeholder="form.bizEntityJson.disabled ? '' : '提示：报价、谈判价、底价'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.managePayType" :disabled="!form.mapEdit.managePayType"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionPayType" :disabled="!form.mapEdit.deisionPayType"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">项目构成</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyA" :placeholder="form.bizEntityJson.disabled ? '' : '提示：软件标准产品/标准产品+定制功能/定制产品、硬件、实施服务、运维服务'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyA" :disabled="!form.mapEdit.manageBreachDutyA"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyA" :disabled="!form.mapEdit.deisionBreachDutyA"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">项目进度</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyB" :placeholder="form.bizEntityJson.disabled ? '' : '提示：项目何时启动，何时交付'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyB" :disabled="!form.mapEdit.manageBreachDutyB"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyB" :disabled="!form.mapEdit.deisionBreachDutyB"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">回款方式</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyBreachDutyAB" :placeholder="form.bizEntityJson.disabled ? '' : '提示：分期回款比例'" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageBreachDutyAB" :disabled="!form.mapEdit.manageBreachDutyAB"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionBreachDutyAB" :disabled="!form.mapEdit.deisionBreachDutyAB"></t-textarea>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="4">
        <span class="span-100">其他说明</span>
      </el-col>
      <el-col :span="8" :class="{'disabled': form.bizEntityJson.disabled}">
        <t-textarea v-model="form.bizEntityJson.applyContractFile" :disabled="form.bizEntityJson.disabled"></t-textarea>
      </el-col>
      <el-col :span="6">
        <t-textarea v-model="form.bizEntityJson.manageContractFile" :disabled="!form.mapEdit.manageContractFile"></t-textarea>
      </el-col>
      <el-col :span="6" class="right-col">
        <t-textarea v-model="form.bizEntityJson.deisionContractFile" :disabled="!form.mapEdit.deisionContractFile"></t-textarea>
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
      if(!this.form.bizEntityJson.bidNo) return this.$message.error('请输入投标产品'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
