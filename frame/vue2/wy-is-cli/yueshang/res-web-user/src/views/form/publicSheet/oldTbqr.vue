<template>
  <!-- 投标确认(旧版) -->
  <div :class="['zhaobiao',{'disabled': form.bizEntityJson.disabled}]" >
    <el-row :gutter="10">
    <el-col :span="2" class="ht-30">项目名称：</el-col>
    <el-col :span="6">
      <el-input :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.projectName" placeholder="请输入项目名称"></el-input>
    </el-col>
    <el-col :span="2" class="ht-30">项目系统：</el-col>
    <el-col :span="6">
      <el-input :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.projectSystem" placeholder="请输入项目系统"></el-input>
    </el-col>
    <el-col :span="2" class="ht-30">投标编号：</el-col>
    <el-col :span="6">
      <el-input :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.bidNo" placeholder="请输入投标编号"></el-input>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="ht-30 title">
    <el-col :span="5">合同商务条件</el-col>
    <el-col :span="7"> &nbsp;</el-col>
    <el-col :span="6">经管部确认</el-col>
    <el-col :span="6">决策意见</el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">1 合同名称</el-col>
    <el-col :span="7">
      <t-textarea :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyContractName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.manageContractName" v-model="form.bizEntityJson.manageContractName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.deisionContractName" v-model="form.bizEntityJson.deisionContractName"></t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">2 甲方</el-col>
    <el-col :span="7">
      <t-textarea :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyPartyACompanyName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.managePartyACompanyName" v-model="form.bizEntityJson.managePartyACompanyName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.deisionPartyACompanyName" v-model="form.bizEntityJson.deisionPartyACompanyName"></t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">3 乙方</el-col>
    <el-col :span="7">
      <t-textarea :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyPartyBCompanyName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.managePartyBCompanyName" v-model="form.bizEntityJson.managePartyBCompanyName"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.deisionPartyACompanyName" v-model="form.bizEntityJson.deisionPartyBCompanyName"></t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">4 合同总额构成（税率）</el-col>
    <el-col :span="7">
      <t-textarea :disabled="form.bizEntityJson.disabled"  v-model="form.bizEntityJson.applyTotalAmountConstitute"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.manageTotalAmountConstitute" v-model="form.bizEntityJson.manageTotalAmountConstitute"></t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea :disabled="!form.mapEdit.deisionTotalAmountConstitute" v-model="form.bizEntityJson.deisionTotalAmountConstitute"></t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">5 我方权利/义务</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyOurObligations">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize  :disabled="!form.mapEdit.manageOurObligations" v-model="form.bizEntityJson.manageOurObligations">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize    :disabled="!form.mapEdit.deisionOurObligations" v-model="form.bizEntityJson.deisionOurObligations">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">6 付款回款方式</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize   :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyPayType">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize    :disabled="!form.mapEdit.managePayType" v-model="form.bizEntityJson.managePayType">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize   :disabled="!form.mapEdit.deisionPayType" v-model="form.bizEntityJson.deisionPayType">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">7 违约责任（甲方约束）</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize   :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyBreachDutyA">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize   :disabled="!form.mapEdit.manageBreachDutyA" v-model="form.bizEntityJson.manageBreachDutyA">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize  :disabled="!form.mapEdit.deisionBreachDutyA" v-model="form.bizEntityJson.deisionBreachDutyA">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">  违约责任（乙方约束）</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyBreachDutyB">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize  :disabled="!form.mapEdit.manageBreachDutyB" v-model="form.bizEntityJson.manageBreachDutyB">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize :disabled="!form.mapEdit.deisionBreachDutyB" v-model="form.bizEntityJson.deisionBreachDutyB">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">  违约责任（双向约束）</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize  :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyBreachDutyAB">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize    :disabled="!form.mapEdit.manageBreachDutyAB" v-model="form.bizEntityJson.manageBreachDutyAB">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize   :disabled="!form.mapEdit.deisionBreachDutyAB" v-model="form.bizEntityJson.deisionBreachDutyAB">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">8 合同涉及的附件</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize   :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applyContractFile">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize :disabled="!form.mapEdit.manageContractFile" v-model="form.bizEntityJson.manageContractFile">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize :disabled="!form.mapEdit.deisionContractFile" v-model="form.bizEntityJson.deisionContractFile">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row :gutter="20" type="flex">
    <el-col :span="5">9 特殊限制/突破条款</el-col>
    <el-col :span="7">
      <t-textarea type="textarea" autosize   :disabled="form.bizEntityJson.disabled" v-model="form.bizEntityJson.applySpecialTerms">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize   :disabled="!form.mapEdit.manageSpecialTerms" v-model="form.bizEntityJson.manageSpecialTerms">
      </t-textarea>
    </el-col>
    <el-col :span="6">
      <t-textarea type="textarea" autosize  :disabled="!form.mapEdit.deisionSpecialTerms" v-model="form.bizEntityJson.deisionSpecialTerms">
      </t-textarea>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="5">附件</el-col>
    <el-col :span="12">
        <el-upload
        name="fileName"
        :action="uploadUrl"
        :data="{userName: form.userInfo.username,bizFileName: 'fileId',bizId:form.pid}"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-preview="downLoadFile"
        :file-list="fileList"
        style="display: inline-block;">
        <el-button v-if="!form.bizEntityJson.disabled" size="mini" type="success" plain>添加</el-button>
      </el-upload>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: data,
      disabled: true,
      uploadUrl,
      fileList: fileList || []
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
  },
  mounted() {
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleRemove(file, fileList) {
      let nowfile
      if(file.response) {
        nowfile = file.response.data.fileId
      }else {
        nowfile = file.id + ','
      }
      let fileId = this.form.bizEntityJson.fileId
      this.form.bizEntityJson.fileId = fileId.replace(nowfile,'')
    },
    handleSuccess(response, file, fileList) {
      const fileId = response.data.fileId
      this.form.bizEntityJson.fileId += fileId
    },
    downLoadFile(file) {
      if(file.showUrl) {
        window.open(file.showUrl, '_blank')
        return
      }
      const fileIds = file.response.data.fileId
      this.$file.loadFiles({fileIds}).then(res => {
        if(res.code ==1 && res.data) {
          const showUrl = res.data.fileShowVoList[0].showUrl
          window.open(showUrl, '_blank')
        }
      })
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
