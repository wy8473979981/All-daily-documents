<template>
  <!-- 证照办理（设立、注销） -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>标题</span>
          <el-input :class="{'novalue': !form.bizEntityJson.titleName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.titleName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.type, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.type">
              <el-radio label="0">地产总部</el-radio>
              <el-radio label="1">地产事业部</el-radio>
              <el-radio label="2">地产公司</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">项目</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.item[0], 'required': !form.bizEntityJson.disabled}">
            <el-checkbox-group v-model="form.bizEntityJson.item">
              <el-checkbox label="设立"></el-checkbox>
              <el-checkbox label="注销"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明一</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.reason1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reason1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明二</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.reason2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">申请原因说明三</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.reason3" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">
            申请内容
            <el-tooltip class="item" effect="dark" content="详细内容附后" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.applContent" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>需明确的事项</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>公司名称</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.companyName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.companyName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>公司性质</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.companyNature, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.companyNature">
              <el-radio label="0">内资</el-radio>
              <el-radio label="1">外资</el-radio>
              <el-radio label="2">海外公司</el-radio>
              <el-radio label="3">分公司</el-radio>
              <el-radio label="4">合伙企业</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2 || form.bizEntityJson.companyNature == 4" :span="24" class="title-col right-col">
        <h2 v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2">注册资本</h2>
        <h2 v-if="form.bizEntityJson.companyNature == 4">出资额</h2>
      </el-col>
      <el-col v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2 || form.bizEntityJson.companyNature == 4"  :span="12">
        <div class="d-min">
          <span>金额</span>
          <el-input :class="{'novalue': !form.bizEntityJson.amountMoney, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.amountMoney" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2 || form.bizEntityJson.companyNature == 4"  :span="12" class="right-col">
        <div class="d-min">
          <span>货币</span>
          <el-input :class="{'novalue': !form.bizEntityJson.currency, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.currency" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>备用名称1</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.backupName1, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.backupName1" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>备用名称2</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.backupName2, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.backupName2" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>经营期限</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.operationTerm, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.operationTerm" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>注册地址</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.registAddress, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.registAddress" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">经营范围</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.businessScope, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessScope" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <div v-if="form.bizEntityJson.companyNature == 0 || form.bizEntityJson.companyNature == 1 || form.bizEntityJson.companyNature == 2">
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">股东及持股比例</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.shareholdersRatio, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.shareholdersRatio" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">董事长/执行董事</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.chairman, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.chairman" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">法定代表人</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.representative, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.representative" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">董事会成员</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.boardMembers, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.boardMembers" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">经理</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.managers, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.managers" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">监事</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.supervisorsHad, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.supervisorsHad" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </div>
      <el-col v-if="form.bizEntityJson.companyNature == 3" :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">分公司负责人</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.branchOffice, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.branchOffice" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <div v-if="form.bizEntityJson.companyNature == 4">
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">出资比例</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.investmentRatio, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.investmentRatio" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">执行事务合伙人</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.implementPartner, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.implementPartner" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">普通合伙人</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.ordinaryPartner, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.ordinaryPartner" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">有限合伙人</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.limitedPartner, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.limitedPartner" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
        <el-col :span="24" class="right-col">
          <div class="d-min">
            <span class="span-auto">委派代表</span>
            <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.appointDelegates, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.appointDelegates" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
          </div>
        </el-col>
      </div>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">财务负责人</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.financePersonInCharge, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.financePersonInCharge" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">其他要求</span>
          <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.otherRequests, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.otherRequests" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <dl-col v-if="form.mapEdit.letterattachment" :span="24" title="工商申请材料" tip="如股东决定/决议、章程" place="right" :novalueAdmin="!form.bizEntityJson.letterattachment" :class="{adminIcon: form.mapEdit.letterattachment}">
        <one-file :form="form" value="letterattachment" :admin="form.mapEdit.letterattachment" />
      </dl-col>
      <dl-col v-if="form.mapEdit.letterattachment" :span="24" title="公司名称" place="right" :novalueAdmin="!form.bizEntityJson.companyNameNew">
        <el-input v-model="form.bizEntityJson.companyNameNew" placeholder="请输入" :name="form.mapEdit.letterattachment ? 'yykReadonly' : ''" />
      </dl-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
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
      this.$set(this.form.bizEntityJson, 'item', [])
    }
  },
  mounted() {
  },
  methods: {
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.titleName) return this.$message.error('请输入标题'), false
      if(!this.form.bizEntityJson.type) return this.$message.error('请选择类别'), false
      if(!this.form.bizEntityJson.item[0]) return this.$message.error('请选择项目'), false
      if(!this.form.bizEntityJson.reason1) return this.$message.error('请输入申请原因说明一'), false
      if(!this.form.bizEntityJson.companyName) return this.$message.error('请输入公司名称'), false
      if(!this.form.bizEntityJson.companyNature) return this.$message.error('请选择公司性质'), false
      if(this.form.bizEntityJson.companyNature != 3) {
        if(!this.form.bizEntityJson.amountMoney) return this.$message.error('请输入金额'), false
        if(!this.form.bizEntityJson.currency) return this.$message.error('请输入货币'), false
      }
      if(!this.form.bizEntityJson.backupName1) return this.$message.error('请输入备用名称1'), false
      if(!this.form.bizEntityJson.backupName2) return this.$message.error('请输入备用名称2'), false
      if(!this.form.bizEntityJson.operationTerm) return this.$message.error('请输入经营期限'), false
      if(!this.form.bizEntityJson.registAddress) return this.$message.error('请输入注册地址'), false
      if(!this.form.bizEntityJson.businessScope) return this.$message.error('请输入经营范围'), false
      if(this.form.bizEntityJson.companyNature == 0 || this.form.bizEntityJson.companyNature == 1 || this.form.bizEntityJson.companyNature == 2) {
        if(!this.form.bizEntityJson.shareholdersRatio) return this.$message.error('请输入股东及持股比例'), false
        if(!this.form.bizEntityJson.chairman) return this.$message.error('请输入董事长/执行董事'), false
        if(!this.form.bizEntityJson.businessScope) return this.$message.error('请输入经营范围'), false
        if(!this.form.bizEntityJson.representative) return this.$message.error('请输入法定代表人'), false
        if(!this.form.bizEntityJson.boardMembers) return this.$message.error('请输入董事会成员'), false
        if(!this.form.bizEntityJson.managers) return this.$message.error('请输入经理'), false
        if(!this.form.bizEntityJson.supervisorsHad) return this.$message.error('请输入监事'), false
      }
      if(this.form.bizEntityJson.companyNature == 3) {
        if(!this.form.bizEntityJson.branchOffice) return this.$message.error('请输入分公司负责人'), false
      }
      if(this.form.bizEntityJson.companyNature == 4) {
        if(!this.form.bizEntityJson.investmentRatio) return this.$message.error('请输入出资比例'), false
        if(!this.form.bizEntityJson.implementPartner) return this.$message.error('请输入执行事务合伙人'), false
        if(!this.form.bizEntityJson.ordinaryPartner) return this.$message.error('请输入普通合伙人'), false
        if(!this.form.bizEntityJson.limitedPartner) return this.$message.error('请输入有限合伙人'), false
        if(!this.form.bizEntityJson.appointDelegates) return this.$message.error('请输入委派代表'), false
      }
      if(!this.form.bizEntityJson.financePersonInCharge) return this.$message.error('请输入财务负责人'), false
      if(!this.form.bizEntityJson.otherRequests) return this.$message.error('请输入其他要求'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
