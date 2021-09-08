<template>
  <!-- 商业公司未刷卡原因确认单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>选择</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.applyUserType0 && !form.bizEntityJson.applyUserType1, 'required': !form.bizEntityJson.disabled}">
            <el-checkbox v-model="form.bizEntityJson.applyUserType0">总经理</el-checkbox>
            <el-checkbox v-model="form.bizEntityJson.applyUserType1">其他人员</el-checkbox>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>中心</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.departmentName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.departmentName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>姓名</span>
          <el-input :class="{'novalue': !form.bizEntityJson.userName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.userName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>职位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.position, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>刷卡日期</span>
          <el-date-picker
            :class="{'novalue': !form.bizEntityJson.playCardDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.playCardDate"
            value-format="yyyy-MM-dd"
            clearable
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>班次</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.frequency0 && !form.bizEntityJson.frequency1 && !form.bizEntityJson.frequency2, 'required': !form.bizEntityJson.disabled}">
            <el-checkbox v-model="form.bizEntityJson.frequency0">上午上班</el-checkbox>
            <el-checkbox v-model="form.bizEntityJson.frequency1">中午</el-checkbox>
            <el-checkbox v-model="form.bizEntityJson.frequency2">下午下班</el-checkbox>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>原因</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.reason, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.reason">
              <el-radio label="0">公事外出</el-radio>
              <el-radio label="1">忘记刷卡</el-radio>
              <el-radio label="2">机器故障</el-radio>
              <el-radio label="3">私事外出</el-radio>
              <el-radio label="4">
                酌情请假
                <el-tooltip class="item" :value="form.bizEntityJson.reason == 4 && !form.bizEntityJson.disabled && !$route.query.id ? true : false" effect="dark" content="仅限1天以内" placement="top-start">
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.reason == 3" :span="12">
        <div class="d-min">
          <span>外出开始时间</span>
          <el-time-picker
            :class="{'novalue': !form.bizEntityJson.beOutStartDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.beOutStartDate"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-time-picker>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.reason == 3" :span="12" class="right-col">
        <div class="d-min">
          <span>外出截止时间</span>
          <el-time-picker
            :class="{'novalue': !form.bizEntityJson.beOutEndDate, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.beOutEndDate"
            format="HH:mm"
            value-format="HH:mm"
            :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
            :disabled="form.bizEntityJson.disabled">
          </el-time-picker>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">原因说明</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.reasons, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reasons" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      showSearchUser: false
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
      this.$set(this.form.bizEntityJson, 'applyUserType', [])
      this.$set(this.form.bizEntityJson, 'frequency', [])
      this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'departmentName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'userName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUser', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'position', this.userInfo.positionName)
    }
  },
  mounted() {
  },
  methods: {
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerOrgName = val.text
        this.form.bizEntityJson.centerOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.userName = val.userName
        this.form.bizEntityJson.applyUser = val.userCd
      }
      this.showSearchUser = false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
