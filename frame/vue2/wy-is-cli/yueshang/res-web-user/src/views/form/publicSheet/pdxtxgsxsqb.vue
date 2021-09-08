<template>
  <!-- PD系统相关事项申请表(pd) -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span class="span-auto">申请修改的内容</span>
          <!-- <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.applyContent, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyContent" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea> -->
          <el-input :class="{'novalue': !form.bizEntityJson.applyContent, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyContent" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">
            业务原因
            <el-tooltip class="item" effect="dark" content="请详细描述" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <!-- <t-textarea class="t-textarea-auto" :class="{'novalue': !form.bizEntityJson.businessReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessReason" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea> -->
          <el-input :class="{'novalue': !form.bizEntityJson.businessReason, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.businessReason" type="textarea" autosize :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>申请人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyUserName" @focus="showSearchUser = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>申请部门</span>
          <el-input :class="{'novalue': !form.bizEntityJson.applyOrgName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.applyOrgName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>申请事项类型</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min" :class="{'novalue': !form.bizEntityJson.applyType, 'required': !form.bizEntityJson.disabled}">
          <el-radio-group v-model="form.bizEntityJson.applyType">
            <el-radio label="1">已完成网批驳回</el-radio>
            <el-radio label="2">数据调整</el-radio>
            <el-radio label="3">邮箱事宜</el-radio>
            <el-radio label="4">PD权限开通</el-radio>
            <el-radio label="7">官网相关事宜(非IT类)</el-radio>
            <el-radio label="8">数据批量导出</el-radio>
            <el-radio label="5">开发新功能(涉及权责)</el-radio>
            <el-radio label="6">开发现有功能(涉及权责)</el-radio>
            <el-radio label="9">开发新功能(不涉及权责)</el-radio>
            <el-radio label="10">开发现有功能(不涉及权责)</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.applyType == 1" :span="12">
        <div class="d-min">
          <span>拟调整网批编号</span>
          <el-select
            v-if="!form.bizEntityJson.disabled"
            ref="selectNo"
            :class="{'novalue': !form.bizEntityJson.adjustApproveNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.adjustApproveNo"
            filterable
            remote
            clearable
            @change="adjustApproveNoChange"
            :remote-method="remoteMethod"
            :loading="loading"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :disabled="form.bizEntityJson.disabled">
            <el-option
              v-for="item in adjustApproveNoOptions"
              :key="item.approveNo"
              :label="item.approveNo"
              :value="item.approveNo">
              <el-row :gutter="24">
                <el-col :span="6">
                  <span>{{ item.approveNo }}</span>
                </el-col>
                <el-col :span="18">
                  <span>{{ item.subject }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
          <p v-else class="openUrl-p" @click="openUrl">{{ form.bizEntityJson.adjustApproveNo }}</p>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.applyType == 1" :span="12" class="right-col">
        <div class="d-min">
        </div>
      </el-col>
      <el-col v-if="!form.bizEntityJson.disabled && (form.bizEntityJson.applyType == 1 || form.bizEntityJson.applyType == 2 || form.bizEntityJson.applyType == 5 || form.bizEntityJson.applyType == 6 || form.bizEntityJson.applyType == 8)" :span="24" class="title-col right-col">
        <h2>说明</h2>
      </el-col>
      <el-col v-if="!form.bizEntityJson.disabled && (form.bizEntityJson.applyType == 1 || form.bizEntityJson.applyType == 2 || form.bizEntityJson.applyType == 5 || form.bizEntityJson.applyType == 6 || form.bizEntityJson.applyType == 8)" :span="24" class="right-col">
        <div v-if="form.bizEntityJson.applyType == 1" class="explain-p">
          <p>1、驳回网批必须说明清楚业务原因。</p>
          <p>2、已完成的网批不可修改任何内容，只能驳回重新发起。如需此操作，须由与该网批相关人员（发起人，审批人、被共享人或推送人）选择“已完成网批驳回”，填写网批号并下拉选择该网批。</p>
        </div>
        <div v-if="form.bizEntityJson.applyType == 2" class="explain-p">
          <p>1、已完成网批的内容修改只能选“已完成网批驳回”。</p>
          <p>2、如修改合同数据中和定标网批不一致的，必须选择“已完成网批驳回”，选定标网批。</p>
          <p>3、“相关中心总经理”必须增加申请业务相关的负责的总经理级相关审批人，如涉及多个业务条线须多选，不得遗漏。</p>
        </div>
        <div v-if="form.bizEntityJson.applyType == 5 || form.bizEntityJson.applyType == 6" class="explain-p">
          <p class="explain-p-one">此项属于编程开发类工作，如需要调整某个模块的数据，请选择“数据调整”</p>
        </div>
        <div v-if="form.bizEntityJson.applyType == 8" class="explain-p">
          <p class="explain-p-one">离职人员数据交接请选择“数据调整”</p>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>是否商业需求</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.businessNeedsFlag, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.businessNeedsFlag">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>业务相关性</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.businessRelated, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.businessRelated" @change="businessRelatedChange">
              <el-radio label="1">（非商业）成本/资金计划/合同/税率/变更 相关</el-radio>
              <el-radio label="2">（非商业）财务/预算/报销/营销推广 相关</el-radio>
              <el-radio label="3">商业相关</el-radio>
              <el-radio label="4">其他</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.applyOrgCd" @close="closeSearhOrg"></search-org>
    <search-user :open="showSearchUser && !form.bizEntityJson.disabled" @close="closeSearhUser"></search-user>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: {},
      showSearchOrg: false,
      showSearchUser: false,
      loading: false,
      adjustApproveNoOptions: [],
      selectBusinessRelated: null,
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
    if (!this.$route.query.id) {
      this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
      this.$set(this.form.bizEntityJson, 'applyUserName', this.userInfo.username)
      this.$set(this.form.bizEntityJson, 'applyUserCd', this.userInfo.userid)
      this.$set(this.form.bizEntityJson, 'applyOrgName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'applyOrgCd', this.userInfo.centerOrgCd)
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        const param = {
          approveNo: query,
          status: '2'
        }
        Approval.quickSearchAdjustCont(param).then(res => {
          if(res.code == 1) {
            this.loading = false
            if (res.data.content.length > 0) {
              this.adjustApproveNoOptions = res.data.content
            } else {
              this.adjustApproveNoOptions = []
            }
          }
        })
      } else {
        this.adjustApproveNoOptions = []
      }
    },
    adjustApproveNoChange(val) {
      if (val) {
        let obj = this.adjustApproveNoOptions.find(item => item.approveNo == val)
        if (obj.status == '完成') {
          this.$alert('已完成的网批不可修改任何内容，只能驳回重新发起。', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$refs.selectNo.blur()
              this.$set(this.form.bizEntityJson, 'adjustApproveId', obj.approveId)
              this.$set(this.form.bizEntityJson, 'adjustProcessId', obj.processId)
            }
          })
        }
      } else {
        this.$set(this.form.bizEntityJson, 'adjustApproveId', '')
        this.$set(this.form.bizEntityJson, 'adjustProcessId', '')
      }
    },
    openUrl() {
      if (window.location.href.search(/resdev/) != -1) {
        if (this.form.bizEntityJson.adjustApproveNo.substr(0, 1) != 9) {
          this.$message.closeAll()
          this.$message.error('无对应老网批环境')
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else if (window.location.href.search(/resdemo/) != -1) {
        if (this.form.bizEntityJson.adjustApproveNo.substr(0, 1) != 9) {
          window.open(`http://demo.powerlong.com/PowerDesk/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else {
        if (this.form.bizEntityJson.adjustApproveNo.substr(0, 1) != 9) {
          window.open(`http://pd.powerlong.com/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      }
    },
    closeSearhUser(val) {
      if (val) {
        this.form.bizEntityJson.applyUserName = val.userName
        this.form.bizEntityJson.applyUserCd = val.userCd
      }
      this.showSearchUser = false
    },
    closeSearhOrg(val) {
      if (val) {
        this.form.bizEntityJson.applyOrgName = val.text
        this.form.bizEntityJson.applyOrgCd = val.id
      }
      this.showSearchOrg = false
    },
    businessRelatedChange(val) {
      if (val == '4') {
        this.$confirm('确定不属于 成本/资金计划/合同/税率/变更 或 财务/预算/报销/营销推广 相关 吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.bizEntityJson.businessRelated = '4'
        }).catch(() => {
          this.form.bizEntityJson.businessRelated = this.selectBusinessRelated
        })
      } else {
        this.selectBusinessRelated = val
      }
    },
    // 必填判断
    validate() {
      if(!this.form.bizEntityJson.applyContent) return this.$message.error('请输入申请修改的内容'), false
      if(!this.form.bizEntityJson.businessReason) return this.$message.error('请输入业务原因'), false
      if(!this.form.bizEntityJson.applyUserName) return this.$message.error('请选择申请人'), false
      if(!this.form.bizEntityJson.applyOrgName) return this.$message.error('请选择申请部门'), false
      if(!this.form.bizEntityJson.applyType) return this.$message.error('请选择申请事项类型'), false
      if(this.form.bizEntityJson.applyType == 1) {
        if(!this.form.bizEntityJson.adjustApproveNo) return this.$message.error('请输入拟调整网批编号'), false
      }
      if(!this.form.bizEntityJson.businessNeedsFlag) return this.$message.error('请选择是否商业需求'), false
      if(!this.form.bizEntityJson.businessRelated) return this.$message.error('请选择业务相关性'), false
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
