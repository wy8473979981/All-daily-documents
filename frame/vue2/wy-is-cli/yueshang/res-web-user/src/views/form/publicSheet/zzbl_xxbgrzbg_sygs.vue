<template>
  <!-- 证照办理（信息变更、任职变更） -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.subject, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.subject" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>所属项目</span>
          <el-input v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>变更公司</span>
          <el-select
            popper-class="select-header"
            :class="{'novalue': !form.bizEntityJson.companyName, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.companyName"
            filterable
            remote
            clearable
            @change="companyNameChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in companyNameOptions"
              :key="item.oldCompanyName"
              :label="item.oldCompanyName"
              :value="item.oldCompanyName">
              <el-row :gutter="24">
                <el-col :span="20">
                  <span>{{ item.oldCompanyName }}</span>
                </el-col>
                <el-col :span="4">
                  <span>{{ item.companyLegalRepresentative }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.classification, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.classification">
                <el-radio label="12">商业集团</el-radio>
                <el-radio label="13">商业公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>项目</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{'novalue': !form.bizEntityJson.itemList[0], 'required': !form.bizEntityJson.disabled}">
          <el-checkbox-group v-model="form.bizEntityJson.itemList">
            <el-checkbox label="公司名称"></el-checkbox>
            <el-checkbox label="注册地址"></el-checkbox>
            <el-checkbox label="公司性质"></el-checkbox>
            <el-checkbox label="经营期限"></el-checkbox>
            <el-checkbox label="经营范围"></el-checkbox>
            <el-checkbox label="注册资本"></el-checkbox>
            <el-checkbox label="股东及持股比例"></el-checkbox>
            <el-checkbox label="法定代表人"></el-checkbox>
            <el-checkbox label="董事成员"></el-checkbox>
            <el-checkbox label="董事长/执行董事"></el-checkbox>
            <el-checkbox label="经理"></el-checkbox>
            <el-checkbox label="监事"></el-checkbox>
            <el-checkbox label="财务负责人"></el-checkbox>
            <el-checkbox label="其他要求"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明一</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.applyReasonOne, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyReasonOne" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明二</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.applyReasonTwo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明三</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.applyReasonThree" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
    </el-row>
    <div v-if="form.bizEntityJson.itemList">
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/公司名称/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原公司名称</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalCompanyName" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetCompanyName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetCompanyName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/注册地址/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原注册地址</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalRegisterAddress" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetRegisterAddress, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetRegisterAddress" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/公司性质/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原公司性质</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalCompanyNature" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <el-radio-group v-model="form.bizEntityJson.targetCompanyNature">
              <el-radio label="1">内资</el-radio>
              <el-radio label="2">外资</el-radio>
              <el-radio label="3">海外公司</el-radio>
              <el-radio label="4">分公司</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/经营期限/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原经营期限</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalOperationTerm" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetOperationTerm, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetOperationTerm" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/经营范围/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原经营范围</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalOperationScope" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetOperationScope, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetOperationScope" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/注册资本/) != -1" :gutter="24" class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>注册资本</h2>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>原金额</span>
            <el-input v-model="form.bizEntityJson.originalRegisterMoney" disabled></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>拟变更</span>
            <el-input :class="{'novalue': !form.bizEntityJson.targetRegisterMoney, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetRegisterMoney" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d-min">
            <span>原货币</span>
            <el-input v-model="form.bizEntityJson.originalRegisterCurrency" disabled></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>拟变更</span>
            <el-input :class="{'novalue': !form.bizEntityJson.targetRegisterCurrency, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetRegisterCurrency" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/股东及持股比例/) != -1" :gutter="24" type="flex" class="top-row" style="margin-top: 15px !important;">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原股东持股比例</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalShareholderProportion" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetShareholderProportion, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetShareholderProportion" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/法定代表人/) != -1" :gutter="24">
        <el-col :span="12">
          <div class="d-min">
            <span>原法定代表人</span>
            <el-input v-model="form.bizEntityJson.originalLegalRepresentative" disabled></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>拟变更</span>
            <el-input :class="{'novalue': !form.bizEntityJson.targetLegalRepresentative, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetLegalRepresentative" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/董事成员/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原董事成员</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalBoardOfficer" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetBoardOfficer, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetBoardOfficer" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/执行董事/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原董事/执行董事</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalPresident" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetPresident, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetPresident" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/经理/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原经理</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalManager" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetManager, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetManager" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/监事/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原监事</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalSupervisor" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetSupervisor, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetSupervisor" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/财务负责人/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原财务负责人</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalFinanceChief" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetFinanceChief, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetFinanceChief" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="form.bizEntityJson.itemList.join(',').search(/其他要求/) != -1" :gutter="24" type="flex">
        <el-col :span="12">
          <div class="d-min d-min-100">
            <span class="span-auto">原其他要求</span>
            <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.originalOtherRequire" :disabled="true"></t-textarea>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min d-min-100">
            <span class="span-auto">拟变更</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.targetOtherRequire, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.targetOtherRequire" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </el-row>
    </div>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCode" @close="closeSearhOrg"></search-org>
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
      companyNameOptions: []
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
      this.$set(this.form.bizEntityJson, 'itemList', [])
      this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
    }
  },
  mounted() {
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        Approval.getListByName({companyName: query}).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data && res.data.length > 0) {
              this.companyNameOptions = res.data
              this.companyNameOptions.forEach((item, index) => {
                if (index == 0) {
                  item.value = '公司名称'
                  item.companyLegalRepresentative = '法人代表'
                }
              })
            } else {
              this.companyNameOptions = []
            }
          }
        })
      } else {
        this.companyNameOptions = []
      }
    },
    companyNameChange(val) {
      let obj = this.companyNameOptions.find(item => item.oldCompanyName == val)
      this.form.bizEntityJson.originalCompanyName = obj ? obj.oldCompanyName : ''
      this.form.bizEntityJson.originalRegisterAddress = obj ? obj.companyRegisteredAddress : ''
      this.form.bizEntityJson.originalCompanyNature = obj ? obj.companyNature : ''
      this.form.bizEntityJson.originalOperationTerm = obj ? obj.operationTerm : ''
      this.form.bizEntityJson.originalOperationScope = obj ? obj.companyScopeBusiness : ''
      this.form.bizEntityJson.originalRegisterMoney = obj ? obj.companyRegisteredAmount : ''
      this.form.bizEntityJson.originalRegisterCurrency = obj ? obj.companyRegisteredCurrency : ''
      this.form.bizEntityJson.originalShareholderProportion = obj ? obj.companyShareholderProportion : ''
      this.form.bizEntityJson.originalLegalRepresentative = obj ? obj.companyLegalRepresentative : ''
      this.form.bizEntityJson.originalBoardOfficer = obj ? obj.companyBoardOfficer : ''
      this.form.bizEntityJson.originalPresident = obj ? obj.companyPresident : ''
      this.form.bizEntityJson.originalManager = obj ? obj.companyManager : ''
      this.form.bizEntityJson.originalSupervisor = obj ? obj.companySupervisor : ''
      this.form.bizEntityJson.originalFinanceChief = obj ? obj.companyBoardMember : ''
      this.form.bizEntityJson.originalOtherRequire = obj ? obj.companyOtherRequirements : ''
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.projectName = val.text
        this.form.bizEntityJson.projectCode = val.id
      }
      this.showSearchOrg = false
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.subject) return this.$message.error('请输入标题'), false
      if(!this.form.bizEntityJson.companyName) return this.$message.error('请输入变更公司'), false
      if(!this.form.bizEntityJson.classification) return this.$message.error('请选择类别'), false
      if(!this.form.bizEntityJson.itemList[0]) return this.$message.error('请选择项目'), false
      if(!this.form.bizEntityJson.applyReasonOne) return this.$message.error('请输入申请原因说明一'), false
      if(this.form.bizEntityJson.itemList.join(',').search(/公司名称/) != -1) {
        if(!this.form.bizEntityJson.targetCompanyName) return this.$message.error('请输入拟变更公司名称'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/注册地址/) != -1) {
        if(!this.form.bizEntityJson.targetRegisterAddress) return this.$message.error('请输入拟变更注册地址'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/公司性质/) != -1) {
        if(!this.form.bizEntityJson.targetCompanyNature) return this.$message.error('请输入拟变更公司性质'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/经营期限/) != -1) {
        if(!this.form.bizEntityJson.targetOperationTerm) return this.$message.error('请输入拟变更经营期限'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/经营范围/) != -1) {
        if(!this.form.bizEntityJson.targetOperationScope) return this.$message.error('请输入拟变更经营范围'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/注册资本/) != -1) {
        if(!this.form.bizEntityJson.targetRegisterMoney) return this.$message.error('请输入拟变更注册资本'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/股东及持股比例/) != -1) {
        if(!this.form.bizEntityJson.targetShareholderProportion) return this.$message.error('请输入拟变更股东及持股比例'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/法定代表人/) != -1) {
        if(!this.form.bizEntityJson.targetLegalRepresentative) return this.$message.error('请输入拟变更法定代表人'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/董事成员/) != -1) {
        if(!this.form.bizEntityJson.targetBoardOfficer) return this.$message.error('请输入拟变更董事成员'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/执行董事/) != -1) {
        if(!this.form.bizEntityJson.targetPresident) return this.$message.error('请输入拟变更原董事/执行董事'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/经理/) != -1) {
        if(!this.form.bizEntityJson.targetManager) return this.$message.error('请输入拟变更经理'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/监事/) != -1) {
        if(!this.form.bizEntityJson.targetSupervisor) return this.$message.error('请输入拟变更监事'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/财务负责人/) != -1) {
        if(!this.form.bizEntityJson.targetFinanceChief) return this.$message.error('请输入拟变更财务负责人'), false
      }
      if(this.form.bizEntityJson.itemList.join(',').search(/其他要求/) != -1) {
        if(!this.form.bizEntityJson.targetOtherRequire) return this.$message.error('请输入拟变更其他要求'), false
      }
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
