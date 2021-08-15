<template>
  <!-- 计划完成审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>项目名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>成本分期</span>
          <el-input :class="{'novalue': !form.bizEntityJson.costStaging, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.costStaging" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>开发分期</span>
          <el-input :class="{'novalue': !form.bizEntityJson.developStaging, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.developStaging" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>节点名称与等级</span>
          <el-input :class="{'novalue': !form.bizEntityJson.nodeNameLevel, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.nodeNameLevel" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>
            计划开始时间
          </span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.planBeginDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.planBeginDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>
            计划结束时间
          </span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.planEndDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.planEndDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>
            实际开始时间
          </span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.realBeginDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.realBeginDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>
            实际结束时间
          </span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.realEndDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.realEndDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" style="overflow: hidden;">
          <span class="span-auto">成果附件</span>
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
import Approval from "@/apis/apis/approval";

export default {
  data() {
    return {
      form: {},
      disabled: true,
      showSearchOrg: false,
      userInfo: {}
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  watch: {
    data: {
      immediate: true,
      handler: function(val) {
        this.form = val
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgCd = val.id
        this.form.bizEntityJson.centerOrgName = val.text
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.centerOrgName) return this.$message.error('请选择项目'), false
      if(!this.form.bizEntityJson.costStaging) return this.$message.error('请输入成本分期'), false
      if(!this.form.bizEntityJson.developStaging) return this.$message.error('请输入开发分期'), false
      if(!this.form.bizEntityJson.nodeNameLevel) return this.$message.error('请输入节点名称与等级'), false
      if(!this.form.bizEntityJson.planBeginDate) return this.$message.error('请选择计划开始时间'), false
      if(!this.form.bizEntityJson.planEndDate) return this.$message.error('请选择计划结束时间'), false
      if(!this.form.bizEntityJson.realBeginDate) return this.$message.error('请选择实际开始时间'), false
      if(!this.form.bizEntityJson.realEndDate) return this.$message.error('请选择实际结束时间'), false
      if(!this.form.bizEntityJson.fileId) return this.$message.error('请上传情况说明附件'), false
    }
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>