<template>
  <!-- 资金申请表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>预算类型</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.budgetType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.budgetType">
              <el-radio label="1">预算内</el-radio>
              <el-radio label="2">预算外</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>所属单位</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.unitType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.unitType">
              <el-radio label="1">事业部</el-radio>
              <el-radio label="2">城市公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.unitType == 1" :span="24" class="right-col">
        <div class="d-min">
          <span>所属事业部</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.unitDeptType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.unitDeptType">
              <el-radio label="1">事业一部</el-radio>
              <el-radio label="2">事业二部</el-radio>
              <el-radio label="3">置地</el-radio>
              <el-radio label="4">浙江事业部</el-radio>
              <el-radio label="5">事业三部</el-radio>
              <el-radio label="6">广东事业部</el-radio>
              <el-radio label="7">安徽事业部</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>申请项目</span>
          <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>申请单位</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyUnitType, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyUnitType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>开户行账户信息</span>
          <el-input :class="{'novalue': !form.bizEntityJson.accountBank, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.accountBank" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>资金用途</span>
          <el-input :class="{'novalue': !form.bizEntityJson.useOfFunds, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.useOfFunds" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>列支科目</span>
          <el-input :class="{'novalue': !form.bizEntityJson.listedSubjects, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.listedSubjects" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>资金数额(元)</span>
          <el-input v-if="this.$route.query.id && form.status != '草稿'" :value="(parseFloat(form.bizEntityJson.fundsAmount).toFixed(2)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')"></el-input>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.fundsAmount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.fundsAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>用款时间</span>
          <el-date-picker
              :class="{'novalue': !form.bizEntityJson.timeSpentDate, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.timeSpentDate"
              value-format="yyyy-MM-dd"
              clearable
              :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
              :disabled="form.bizEntityJson.disabled">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请事由</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.applyReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyReason" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: {},
      userInfo: {},
      showSearchOrg: false,
      loading: false,
      blCapitalapplicationOptions: []
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
    this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        Approval.getFinanceApplyOfBaoLong({inputValue: query, userCd: this.userInfo.userid}).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.length > 0) {
              this.blCapitalapplicationOptions = res.data
            } else {
              this.blCapitalapplicationOptions = []
            }
          }
        })
      } else {
        this.blCapitalapplicationOptions = []
      }
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.centerName = val.text
        this.form.bizEntityJson.centerCd = val.id
      }
      this.showSearchOrg = false
    },
    // 提交前数据处理
    validate() {
      this.form.bizEntityJson.amount = Number(this.form.bizEntityJson.amount).toFixed(2)
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
