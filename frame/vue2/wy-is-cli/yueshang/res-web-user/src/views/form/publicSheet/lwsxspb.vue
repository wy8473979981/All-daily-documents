<template>
  <!-- 例外事项审批表(地产公司) -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>文件标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.fileTitle, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileTitle" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>审批路径</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.approvalPath, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.approvalPath">
              <el-radio label="1">技术类</el-radio>
              <el-radio label="2">成本类</el-radio>
              <el-radio label="3">工程类</el-radio>
              <el-radio label="4">营销类</el-radio>
              <el-radio label="5">财务类</el-radio>
              <el-radio label="6">行政人事类</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>　</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.involvingRelatedDept, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.involvingRelatedDept">
              <el-radio label="1">涉及相关部门</el-radio>
              <el-radio label="0">不涉及相关部门</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>发起中心/公司</span>
          <el-input :class="{'novalue': !form.bizEntityJson.sendOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.sendOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-checkbox v-model="form.bizEntityJson.urgency" true-label="0" false-label="1">急</el-checkbox>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">文件内容简述</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.fileDesc, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fileDesc" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.sendOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false
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
		}
	},
  created() {
    if (!this.$route.query.id) {
      this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
      this.$set(this.form.bizEntityJson, 'sendOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'sendOrgCd', this.userInfo.orgCd)
      this.$set(this.form.bizEntityJson, 'urgency', '1')
    }
  },
  mounted() {
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.sendOrgName = val.text
        this.form.bizEntityJson.sendOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.fileTitle) return this.$message.error('请输入文件标题'), false
      if(!this.form.bizEntityJson.approvalPath || !this.form.bizEntityJson.involvingRelatedDept) return this.$message.error('请选择审批路径'), false
      if(!this.form.bizEntityJson.sendOrgName) return this.$message.error('请选择发起中心/公司'), false
      if(!this.form.bizEntityJson.fileDesc) return this.$message.error('请输入文件内容简述'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
