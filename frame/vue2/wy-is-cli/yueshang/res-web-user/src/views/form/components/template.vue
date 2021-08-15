<template>
	<div :class="['sp-temp',{'disabled': form.bizEntityJson.disabled}]">
    <el-row style="margin-bottom:15px">
      <el-checkbox v-model="form.bizEntityJson.degApproveFlg">需成本审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.techApproveFlg">需技术审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.hrApproveFlg">需人力审核</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.ohterFlag">其他</el-checkbox>
    </el-row>
    <el-row>
      <el-checkbox v-model="form.bizEntityJson.projectAdjustFlg">项目内部调剂</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.divisionAdjustFlg">事业部内部调剂</el-checkbox>
      <el-checkbox v-model="form.bizEntityJson.newFlg">新增</el-checkbox>
    </el-row>
     <el-row style="margin: 10px 0" class="amount">
      <el-col :span="12">
        不含本单事业部内本月已累计调剂<input class="inline-input" v-model="form.bizEntityJson.totalAdjustAmount"/>万元
      </el-col>
       <el-col :span="12">
        项目本月累计预算外单数<input class="inline-input" v-model="form.bizEntityJson.projectNum"/>金额<input class="inline-input" v-model="form.bizEntityJson.projectAdjustAmount"/>万元
      </el-col>
    </el-row>
    <table class="border-table">
      <tr>
        <td class="title">项目</td>
        <td><el-input v-model="form.bizEntityJson.projectName" size="mini"></el-input></td>
        <td class="title">收款单位</td>
        <td> <el-input v-model="form.bizEntityJson.receiveCompanyName" size="mini"></el-input></td>
      </tr>
       <tr>
        <td class="title">公司名称</td>
        <td><el-input v-model="form.bizEntityJson.companyName" size="mini"></el-input></td>
        <td class="title">预算支付日期</td>
        <td> <el-date-picker
              v-model="form.bizEntityJson.adjustDate"
              type="date"
              size="mini"
              style="width:100%"
            ></el-date-picker></td>
      </tr>
      <tr>
        <td class="title">合同总金额(元)</td>
        <td> <el-input v-model="form.bizEntityJson.totalAmount" size="mini"></el-input></td>
        <td class="title">合同已付金额(元)</td>
        <td> <el-input v-model="form.bizEntityJson.paydAmount" size="mini"></el-input></td>
      </tr>
       <tr>
        <td class="title">申请支付金额(元)</td>
        <td><el-input v-model="form.bizEntityJson.applyPayAmount" size="mini"></el-input></td>
        <td class="title">批准支付金额(元)</td>
        <td><el-input v-model="form.bizEntityJson.approvePayAmount" size="mini"></el-input></td>
      </tr>
       <tr>
        <td class="title">付款办理审批情况</td>
        <td colspan="3">
            <el-radio v-model="form.bizEntityJson.formalitFlg" :label="true">付款审批手续已完成(附后续)</el-radio>
            <el-radio v-model="form.bizEntityJson.formalitFlg" :label="false">付款审批手续未完成(需同时报)</el-radio>
        </td>
      </tr>
      <tr>
        <td class="title" style="vertical-align:top">支出用途及预算外原因</td>
        <td colspan="3">
             <el-input
              type="textarea"
              v-model="form.bizEntityJson.adjustRemark"
              rows="3"
            />
        </td>
      </tr>
      <tr>
        <td class="title">附件</td>
        <td colspan="3">
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
        </td>
      </tr>
    </table>
    </div>
</template>
<script>
export default {
	props: ['data'],
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
		}
	},
  data() {
    return {
	    form: {}
    }
  },
  methods: {

  }
}
</script>>
<style lang="scss" scoped>
	
</style>