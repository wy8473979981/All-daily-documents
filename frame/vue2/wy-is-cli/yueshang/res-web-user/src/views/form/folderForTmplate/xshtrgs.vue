// 销售合同认购书（中介、分销、电商、代理）   宝龙地产/地产/11-营销管理/案场事务

<template>
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>项目名称</span>
         <el-input :class="{'novalue': !form.bizEntityJson.centerOrgName}" v-model="form.bizEntityJson.centerOrgName" @focus="showSearchOrg = true" readonly></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>项目文本编号</span>
          <el-select
            :class="{'novalue': !form.bizEntityJson.contNo}"
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.contNo"
            filterable
            remote
            reserve-keyword
            :remote-method="searchContract"
            >
            <el-option
              v-for="item in options"
              :key="item.projectCd"
              :label="item.contractNo"
              :value="item.contractNo"
            >
              <el-row>
                <el-col @click.native="setContractTempletInfoId(item)">
                  {{item.contractName}}({{item.contractNo}})
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <el-button style="height:36px" @click="loginOldPd" :disabled="form.bizEntityJson.disabled" size="mini">合同文本库</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="form.bizEntityJson.disabled ? '' : 'required'">
          <span>单项营销方案(销售类)</span>
          <el-select
            :class="{'novalue': !form.bizEntityJson.ysNo}"
            :disabled="form.bizEntityJson.disabled"
            v-model="form.bizEntityJson.ysNo"
            filterable
            remote
            reserve-keyword
            :remote-method="financeMarketingProgram"
            >
            <el-option
              v-for="item in options2"
              :key="item.displayNo"
              :label="item.displayNo"
              :value="item.displayNo">
              <el-row>
                <el-col>
                  {{item.displayNo}}({{item.titleName}})
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>房源信息</span>
           <el-input 
            v-model="form.bizEntityJson.houseSourceMSg" 
            type="textarea"
            autosize
            :rows="3">
          </el-input>
        </div>
      </el-col>
    </el-row>
     <el-row :gutter="24">
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>主要商务条件</span>
          <el-input 
            v-model="form.bizEntityJson.businessConditions" 
            type="textarea"
            autosize
            :rows="3">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.centerOrgCd" @close="closeSearhOrg"></search-org>
  </div>
</template>

<script>
const data = {};
const uploadUrl = '';
export default {
  data: function() {
    return {
      form: data,
      uploadUrl,
      // 以下为本身需要数据
      showSearchOrg: false,
      options: [],
      options2: []
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
  methods: {
    loginOldPd() {
      const param = {
        loginUiid : JSON.parse(localStorage.getItem('ys_contract_token')).userid
      }
      this.$approval.loginOldPd(param).then(res => {
        if(res.code == 1 && res.data){
          let url = res.data.data.ssoPdUserUrlList[0].url;
          window.open(url, '_blank')
        }
      }).catch(err => {
        this.$message.error('系统错误，请稍后重试');
      });
    },
    closeSearhOrg(val) {
      if (val) {
        this.$set(this.form.bizEntityJson,'centerOrgName',val.text)
        this.$set(this.form.bizEntityJson,'centerOrgCd',val.id)
      }
      this.showSearchOrg = false
    },
    // 模糊搜索合同文本编号
    searchContract(query) {
      if (query !== '') {
        const params = query;
        this.$approval.searchContract(params).then(res => {
          if(res.code == 1 && res.data){
            this.options = res.data;
          } else {
            this.options = [];
          }
        });
      } else {
        this.options = [];
      }
    },
    // 模糊搜索营销方案
    financeMarketingProgram(query) {
      if (query !== '') {
        const params = {
          value: query
        }
        this.$approval.financeMarketingProgram(params).then(res => {
          if(res.code == 1 && res.data){
            this.options2 = res.data;
          } else {
            this.options2 = [];
          }
        });
      } else {
        this.options2 = [];
      }
    },
    setContractTempletInfoId(item) {
      this.$set(this.form.bizEntityJson,'contractTempletInfoId',item.contractTempletInfoId)
      console.log(item,this.form.bizEntityJson.contractTempletInfoId)
    },
    changeProject(val) {
      this.form.bizEntityJson.contractPlanSubjectsCd = val.contractPlanSubjectsCd;
      this.form.bizEntityJson.contractPlanSubjectsName = val.contractPlanSubjectsName;
    }
  }
}
</script>
