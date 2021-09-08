<template>
  <!--土地类协议/合同审批表-->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>单位</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.unitType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.unitType">
              <el-radio label="1">总部</el-radio>
              <el-radio label="2">事业部</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>合同类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.contractType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.contractType">
              <el-radio label="1">合作项目框架协议</el-radio>
              <el-radio label="2">土地出让合同、保密协议、战略合作协议、代持协议、股权协议、合作协议/补充协议、咨询服务协议</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">名称</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.contractName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.contractName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">
            内容简述
            <el-tooltip class="item" effect="dark" content="" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.contentDescription, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.contentDescription" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
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
      showSearchOrg: false,
      fileDetail: null,
      fileList: fileList || [],
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'applyUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'applyOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'applyOrgCd', this.userInfo.orgCd)
    }
  },
  methods: {
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.unitType) return this.$message.error('请选择单位'), false
      if(!this.form.bizEntityJson.contractType) return this.$message.error('请选择合同类型'), false
      if(!this.form.bizEntityJson.contractName) return this.$message.error('请输入名称'), false
      if(!this.form.bizEntityJson.contentDescription) return this.$message.error('请输入内容简述'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
