<template>
  <!-- 地产公司有预控费用报销单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row">
      <el-col :span="form.bizEntityJson.reimBursementCategory == 2 ? 12 : 24"  :class="form.bizEntityJson.reimBursementCategory == 2 ? '' : 'right-col'">
        <div class="d-min">
          <span>报销类别</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.reimBursementCategory, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.reimBursementCategory">
              <el-radio label="1">出差申请单</el-radio>
              <el-radio label="2">其他</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.reimBursementCategory == 2" :span="12" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.tripCategory, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.tripCategory">
              <el-radio label="1">总经理</el-radio>
              <el-radio label="2">其他人员</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>
          报销信息
          <el-tooltip class="item" effect="dark" content="入账公司可自行切换" placement="top-start">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>报销/入账公司</span>
          <el-autocomplete
            :class="{'novalue': !form.bizEntityJson.reimbursementCompany, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.reimbursementCompany"
            :fetch-suggestions="querySearch1"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :trigger-on-focus="false"
            @select="handleSelect1"
            @blur="handleBlur1"
            :disabled="form.bizEntityJson.disabled">
          </el-autocomplete>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input :class="{'novalue': !form.bizEntityJson.reimbursementParentCompany, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.reimbursementParentCompany" readonly></el-input>
          <el-input v-model="form.bizEntityJson.taxerText" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>网批查询号</span>
          <el-autocomplete
            popper-class="autocomplete-header"
            :class="{'novalue': !form.bizEntityJson.approveSelectNo, 'required': !form.bizEntityJson.disabled}"
            v-model="form.bizEntityJson.approveSelectNo"
            :fetch-suggestions="querySearch2"
            :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
            :trigger-on-focus="false"
            @select="handleSelect2"
            @blur="handleBlur2"
            :disabled="form.bizEntityJson.disabled">
            <template slot-scope="{ item }">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span>{{ item.resDisplayNo }}</span>
                </el-col>
                <el-col :span="17">
                  <span>{{ item.billName }}</span>
                </el-col>
              </el-row>
            </template>
          </el-autocomplete>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>表单名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.formName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.formName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="form.bizEntityJson.lastOrderFlg ? 12 : 24"  :class="form.bizEntityJson.lastOrderFlg ? '' : 'right-col'">
        <div class="d-min">
          <span>最后一单</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.lastOrderFlg == undefined, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.lastOrderFlg">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.lastOrderFlg" :span="12" class="right-col">
        <div class="explain-p">
          <p class="explain-p-one">最后一单报销完成后，预控申请即作废，您确认当前是最后一单报销吗？</p>
        </div>
      </el-col>
      <el-col :span="24" class="table-col right-col">
        <el-table ref="table" :data="form.bizEntityJson.reimbursementDetailList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="序号" prop="feeName">
            <template slot-scope="scope">
              <span>{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用中心" prop="costCenter">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.costCenter, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.costCenter" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="费用名称" prop="costName">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.costName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.costName" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="发票内容" prop="invoiceContent">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.invoiceContent, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.invoiceContent" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="申请预算金额(元)" prop="applyBudgetAmount">
            <template slot-scope="scope">
              <el-input :class="{'novalue': !scope.row.applyBudgetAmount, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.applyBudgetAmount" @change="projectAmountChange(scope.$index, $event)" v-filter-check-input :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="已报销金额(元)" prop="reimbursementdAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reimbursementdAmount" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="本次报销金额(A)(元)" prop="thisReimbursementAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.thisReimbursementAmount" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="增值税专用发票" prop="VATInvoiceFlg">
            <template slot-scope="scope">
              <el-input v-model="scope.row.VATInvoiceFlg" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="本次报销税额(B)(元)" prop="thisReimbursementTaxAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.thisReimbursementTaxAmount" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="会计核减金额" prop="nuclearReductionAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nuclearReductionAmount" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="会计核减税额" prop="nuclearReductionTaxAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nuclearReductionTaxAmount" readonly></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>价税合计(A+B)(元)</span>
          <el-input v-model="form.bizEntityJson.priceTaxTotalAmount" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="form.bizEntityJson.offsetLoanFlg ? 12 : 24"  :class="form.bizEntityJson.offsetLoanFlg ? '' : 'right-col'">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.offsetLoanFlg, 'required': !form.bizEntityJson.disabled}">
            <el-checkbox v-model="form.bizEntityJson.offsetLoanFlg" @change="offsetLoanFlgChange">是否冲预借款</el-checkbox>
          </div>
        </div>
      </el-col>
      <el-col v-if="form.bizEntityJson.offsetLoanFlg" :span="12" class="right-col">
        <div class="d-min">
          <span>借款人</span>
          <el-input :class="{'novalue': !form.bizEntityJson.borrowerName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.borrowerName" @focus="showSearchUser1 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <el-col :span="24" class="title-col right-col">
        <h2>付款信息</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.payMode, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.payMode">
              <el-radio label="1">员工</el-radio>
              <el-radio label="2">外部单位</el-radio>
              <el-radio label="3">内部单位</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>收款人</span>
          <el-input v-if="form.bizEntityJson.payMode == 1" :class="{'novalue': !form.bizEntityJson.receiveUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveUserName" @focus="showSearchUser2 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
          <el-input v-if="form.bizEntityJson.payMode == 2" :class="{'novalue': !form.bizEntityJson.receiveUserName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveUserName" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>
            <el-checkbox v-if="form.bizEntityJson.payMode == 1" v-model="form.bizEntityJson.isManualInput">手工录入</el-checkbox>
            账号
          </span>
          <el-input :class="{'novalue': !form.bizEntityJson.bankAccount, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bankAccount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>开户行</span>
          <el-input :class="{'novalue': !form.bizEntityJson.bankName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.bankName" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款方式</span>
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.payType, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.payType">
              <el-radio label="1">现金</el-radio>
              <el-radio label="2">电汇</el-radio>
              <el-radio label="3">信用证</el-radio>
              <el-radio label="4">转账</el-radio>
              <el-radio label="5">票汇</el-radio>
              <el-radio label="6">其他</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>冲预借款(元)</span>
          <el-input v-model="form.bizEntityJson.offsetLoanAmount" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>会计核减(元)</span>
          <el-input v-model="form.bizEntityJson.accountReductionAmount" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>公司代付(元)</span>
          <el-input v-model="form.bizEntityJson.companyPayAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="explain-p">
          <p>注意事项：当左边选择员工时，员工账户会自动带出，若带出的账号不对或者您想选择其它账号，请点击手工录入。</p>
          <p>开户行默认为中国工商银行，若您的开户行为其它银行，请点击框体进行修改。</p>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>实付金额(元)</span>
          <el-input v-model="form.bizEntityJson.realPayAmount" readonly></el-input>
        </div>
      </el-col>
      <div v-if="form.bizEntityJson.offsetLoanFlg">
        <el-col :span="7" class="title-col">
          <h2>还款明细</h2>
        </el-col>
        <el-col :span="17" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one"><span class="explain-btn-add" @click="add">添加</span>提醒：请务必关联【借款人】的借款网批，否则会导致财务无法入账</p>
          </div>
        </el-col>
        <div v-for="(item, index) in form.bizEntityJson.repaymentDetaiList" :key="index">
          <el-col :span="7">
            <div class="d-min">
              <span>借款网批查询号</span>
              <el-input :class="{'novalue': !item.loanApproveNo, 'required': !form.bizEntityJson.disabled}" v-model="item.loanApproveNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>剩余还款金额(元)</span>
              <el-input v-model="item.remainingPayAmount" readonly></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>本次还款金额(元)</span>
              <el-input :class="{'novalue': !item.thisPayAmount, 'required': !form.bizEntityJson.disabled}" v-model="item.thisPayAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="3" class="right-col">
            <div class="explain-p">
              <p class="explain-p-one" @click="del(index)"><span class="explain-btn-del">删除</span></p>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
    <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
    <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';

export default {
  data() {
    return {
      form: {},
      isNoValue: false,
      showSearchUser1: false,
      showSearchUser2: false,
      showSelectBank: false
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
      this.$set(this.form.bizEntityJson, 'reimbursementParentCompany', this.userInfo.centerOrgName + '-' + this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'reimbursementDetailList', [])
      this.$set(this.form.bizEntityJson, 'repaymentDetaiList', [])
      this.$set(this.form.bizEntityJson, 'payMode', '1')
      this.$set(this.form.bizEntityJson, 'bankName', '中国工商银行')
    }
  },
  mounted() {
  },
  methods: {
    querySearch1(queryString, cb) {
      var restaurants = [{value: '审批'}]
      if (queryString) {
        Approval.postFinCompanyList({companyName: queryString}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              restaurants = res.data
              restaurants.forEach(item=> {
                item.value = item.acctUnitName
              })
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
              // 调用 callback 返回建议列表的数据
              cb(results)
              this.isNoValue = false
            } else {
              cb([])
              this.isNoValue = true
            }
          }
        })
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value
      }
    },
    handleSelect1(item) {
      if (item.taxMessage) {
        this.form.bizEntityJson.taxerText = item.taxMessage
      }
    },
    handleBlur1() {
      if (this.isNoValue) {
        this.form.bizEntityJson.reimbursementCompany = ''
      }
    },
    querySearch2(queryString, cb) {
      var restaurants = [{value: '审批'}]
      if (queryString) {
        Approval.quickSearchPreBill({resDisplayNo: queryString}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              restaurants = res.data
              restaurants.forEach(item=> {
                item.value = item.resDisplayNo
              })
              var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
              // 调用 callback 返回建议列表的数据
              cb(results)
              this.isNoValue = false
            } else {
              cb([])
              this.isNoValue = true
            }
          }
        })
      }
    },
    handleSelect2(item) {
      this.form.bizEntityJson.formName = item.billName
      Approval.quickSearchPreBillDetail({resDisplayNo: item.resDisplayNo}).then(res => {
        if(res.code == 1){
          if (res.data.checkLastByPreDisNo == 1) {
            this.$message.error('此网批申请已存在最后一单！')
          }
          if (res.data.checkLastByPreDisNo == 1) {
            this.$message.error('该申请单已自动关闭。出差和接待按行政制度，自发生日（非网批发生日）起30天内需完成报销。如有异议，请邮件至行政人事中心行政部总经理陈岩松(chenys2@powerlong.com)')
          }
          if (res.data.checkLastByPreDisNo == 3) {
            this.$message.error('该网批查询号已不存在，请检查！')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleBlur2() {
      if (this.isNoValue) {
        this.form.bizEntityJson.approveSelectNo = ''
      }
    },
    offsetLoanFlgChange(val) {
      if(!this.form.bizEntityJson.reimbursementCompany) {
        this.$message.error('请先输入报销/入账公司')
      }
    },
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.borrowerName = val.userName
        this.form.bizEntityJson.borrowerId = val.userCd
      }
      this.showSearchUser1 = false
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.receiveUserName = val.userName
        // this.form.bizEntityJson.borrowUserCd = val.userCd
      }
      this.showSearchUser2 = false
    },
    closeSelectBank(val) {
      if (val) {
        this.form.bizEntityJson.bankName = val
      }
      this.showSelectBank = false
    },
    add(index) {
      const newData = {
        loanApproveNo: '',
        remainingPayAmount: '',
        thisPayAmount: ''
      }
      this.form.bizEntityJson.repaymentDetaiList.push(newData)
    },
    del(index) {
      this.form.bizEntityJson.repaymentDetaiList.splice(index, 1)
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
