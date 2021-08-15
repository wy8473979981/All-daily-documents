<template>
  <!-- 总部加班补休取消表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row">
      <el-col :span="12">
        <div class="d-min">
          <span>中心/公司</span>
          <el-input :class="{'novalue': !form.bizEntityJson.center, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.center" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.dept, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.dept" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>姓名</span>
          <el-input :class="{'novalue': !form.bizEntityJson.userName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.userName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>职位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.position, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.position" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>职级</span>
          <el-input :class="{'novalue': !form.bizEntityJson.positionLevel, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.positionLevel" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>关联请假单查询号</span>
          <el-select
            popper-class="select-header"
            :class="{'novalue': !form.bizEntityJson.displayNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.displayNo"
            filterable
            remote
            clearable
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in displayNoOptions"
              :key="item.approveNo"
              :label="item.approveNo"
              :value="item.approveNo">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: data,
      showSearchOrg: false,
      showSearchUser: false,
      loading: false,
      userInfo: {},
      displayNoOptions: []
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'applyUserType', [])
      this.$set(this.form.bizEntityJson, 'frequency', [])
      this.$set(this.form.bizEntityJson, 'center', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerCd', this.userInfo.centerOrgCd)
      this.$set(this.form.bizEntityJson, 'dept', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'userName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'userCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'position', this.userInfo.positionName)
      this.$set(this.form.bizEntityJson, 'positionLevel', this.userInfo.permissionLevelName)
    }
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.findOverTimeEs(query).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.content.length > 0) {
              this.displayNoOptions = res.data.content
              this.displayNoOptions.unshift({approveNo: '请假单号'})
            } else {
              this.displayNoOptions = []
            }
          }
        })
      } else {
        this.displayNoOptions = []
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.center = val.text
        this.form.bizEntityJson.centerCd = val.id
      }
      this.showSearchOrg = false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
