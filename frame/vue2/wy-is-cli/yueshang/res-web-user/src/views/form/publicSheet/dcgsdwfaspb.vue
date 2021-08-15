<template>
  <!-- 地产公司对外发函审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>是否涉及商业</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.isInvolvingBusiness == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.isInvolvingBusiness">
              <el-radio :label="true">涉及商业</el-radio>
              <el-radio :label="false">不涉及商业</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>区域</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.region, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.region">
              <el-radio label="0">事业一部</el-radio>
              <el-radio label="1">事业二部</el-radio>
              <el-radio label="2">安徽</el-radio>
              <el-radio label="3">置地</el-radio>
              <el-radio label="4">浙江</el-radio>
              <el-radio label="5">广东</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>主送单位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.mainDeliveryUnit, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.mainDeliveryUnit" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>函件标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.lettersTitle, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.lettersTitle" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>发函类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.sendLettersType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.sendLettersType" @change="sendLettersTypeChange">
              <el-radio label="6">土地投资函件</el-radio>
              <el-radio label="1">政府函件</el-radio>
              <el-radio label="2">投诉函件</el-radio>
              <el-radio label="3">供应商函件</el-radio>
              <el-radio label="4">营销函件</el-radio>
              <el-radio label="5">其他函件</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.sendLettersType == 2 || form.bizEntityJson.sendLettersType == 3 || form.bizEntityJson.sendLettersType == 4" :span="24" class="right-col">
        <div class="d-min">
          <span></span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.companyType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.companyType">
              <el-radio label="1">地产公司权限</el-radio>
              <el-radio label="2">事业部权限</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">发函内容及情况说明</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.lettersContent, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.lettersContent" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col textBtn-col">
        <div class="d-min">
          <span style="height: auto;">附件</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.fileId, 'required': !form.bizEntityJson.disabled}">
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
              <el-button v-if="!form.bizEntityJson.disabled" type="text" size="mini">上传附件</el-button>
            </el-upload>
          </div>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: data,
      disabled: true,
      showSearchOrg: false,
      showSearchUser: false,
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
    sendLettersTypeChange() {
      if (this.form.bizEntityJson.sendLettersType == 2 || this.form.bizEntityJson.sendLettersType == 3 || this.form.bizEntityJson.sendLettersType == 4) {
        this.$set(this.form.bizEntityJson, 'companyType', '')
      }
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.applyOrgName = val.text
        this.form.bizEntityJson.applyOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.applyUserName = val.userName
        this.form.bizEntityJson.applyUserCd = val.userCd
      }
      this.showSearchUser = false
    },
    // 必填判断
    validate() {
      if(this.form.bizEntityJson.isInvolvingBusiness == undefined) return this.$message.error('请选择是否涉及商业'), false
      if(!this.form.bizEntityJson.region) return this.$message.error('请选择区域'), false
      if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请输入项目名称'), false
      if(!this.form.bizEntityJson.mainDeliveryUnit) return this.$message.error('请输入主送单位'), false
      if(!this.form.bizEntityJson.lettersTitle) return this.$message.error('请输入函件标题'), false
      if(!this.form.bizEntityJson.sendLettersType) return this.$message.error('请选择发函类型'), false
      if(!this.form.bizEntityJson.lettersContent) return this.$message.error('请输入发函内容及情况说明'), false
      if(!this.form.bizEntityJson.companyType && (this.form.bizEntityJson.sendLettersType == 2 || this.form.bizEntityJson.sendLettersType == 3 || this.form.bizEntityJson.sendLettersType == 4)) return this.$message.error('请选择一项权限类型'), false
    }
}
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>