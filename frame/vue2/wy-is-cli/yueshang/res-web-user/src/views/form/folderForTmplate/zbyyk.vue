//总部有预控费用报销单

<template>
		<div class="public-box">
      <el-row class="padding-row">
        <el-col :span="24" class="title-col topRight-col">
          <h2>报销信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <d-col title="报销类别" :novalue="!form.bizEntityJson.reimBursementCategory">
          <el-radio-group v-model="form.bizEntityJson.reimBursementCategory">
            <el-radio :label="'1'">出差申请单</el-radio>
            <el-radio :label="'2'">其他</el-radio>
            </el-radio-group>
        </d-col>
        <d-col place="right" title="人员类别">
          <el-radio-group v-if="form.bizEntityJson.reimBursementCategory == 1" v-model="form.bizEntityJson.tripCategory">
            <el-radio :label="'1'">总经理</el-radio>
            <el-radio :label="'2'">其他人员</el-radio>
          </el-radio-group>
        </d-col>
      </el-row>
      <el-row>
        <d-col title="报销入账公司">
          <el-input placeholder="" v-model="form.bizEntityJson.reimbursementCompany" size="mini"></el-input>
        </d-col>
        <d-col place="right" title="上级公司">
          <el-input placeholder="" v-model="form.bizEntityJson.reimbursementParentCompany" size="mini"></el-input>
        </d-col>
      </el-row>
      <el-row>
        <d-col title="网批查询号" :novalue="!form.bizEntityJson.approveSelectNo">
          <el-input placeholder="" v-model="form.bizEntityJson.approveSelectNo" size="mini"></el-input>
        </d-col>
        <d-col place="right" title="表单名称" :novalue="!form.bizEntityJson.formName">
          <el-input placeholder="" v-model="form.bizEntityJson.formName" size="mini"></el-input>
        </d-col>
      </el-row>
      <el-row>
        <d-col title="最后一单" row="1" :novalue="form.bizEntityJson.lastOrderFlg === undefined">
          <el-radio style="margin-left:15px" v-model="form.bizEntityJson.lastOrderFlg" :label="true">是</el-radio>
          <el-radio v-model="form.bizEntityJson.lastOrderFlg" :label="false">否</el-radio>
          <span style="color:red" v-if="form.bizEntityJson.lastOrderFlg && !form.bizEntityJson.disabled">最后一单报销完成后，预控申请即作废，您确认当前是最后一单报销吗？</span>
        </d-col>
      </el-row>

      <div class="public-box" style="padding-top：0 !important">
        <el-row :gutter="24">
      <el-col :span="24" class="table-col right-col">
        <el-table ref="table" :data="form.bizEntityJson.reimbursementDetailList" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="序号" prop="feeName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.feeName" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="费用中心" prop="costCenter">
            <template slot-scope="scope">
              <el-input v-model="scope.row.costCenter" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="费用名称" prop="costName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.costName" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="发票内容" prop="invoiceContent">
            <template slot-scope="scope">
              <el-input v-model="scope.row.invoiceContent" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="申请预算金额" prop="applyBudgetAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.applyBudgetAmount" @change="projectAmountChange(scope.$index, $event)" v-filter-check-input placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="已报销金额" prop="reimbursementdAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reimbursementdAmount" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="本次报销金额" prop="thisReimbursementAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.thisReimbursementAmount" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
           <el-table-column label="增值税专用发票" prop="VATInvoiceFlg">
            <template slot-scope="scope">
              <el-input v-model="scope.row.VATInvoiceFlg" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
           <el-table-column label="本次报销税额" prop="thisReimbursementTaxAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.thisReimbursementTaxAmount" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
           <el-table-column label="会计核减金额（元）" prop="nuclearReductionAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nuclearReductionAmount" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
           <el-table-column label="会计核减税额（元）" prop="nuclearReductionTaxAmount">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nuclearReductionTaxAmount" readonly placeholder="请输入"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
      </div>

    <el-row class="padding-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>付款信息</h2>
      </el-col>
    </el-row>
    <el-row>
      <d-col title="价税合计（A+B）(元)" :novalue="!form.bizEntityJson.priceTaxTotalAmount">
        <el-input v-model="form.bizEntityJson.priceTaxTotalAmount " size="mini" placeholder=""></el-input>
      </d-col>
      <d-col place="right" title="借款人">
        <el-input v-model="form.bizEntityJson.borrowerId" size="mini" placeholder=""></el-input>
      </d-col>
    </el-row>
    <el-row>
      <d-col row="1" title="收款人" :novalue="!form.bizEntityJson.receiveUserName">
        <el-input v-model="form.bizEntityJson.receiveUserName" size="mini" placeholder=""></el-input>
      </d-col>
    </el-row>
    <el-row>
      <d-col title="付款方式">
        <el-radio-group v-model="form.bizEntityJson.payType">
          <el-radio class="line-radio" :label="'1'">现金</el-radio>
          <el-radio class="line-radio" :label="'2'">电汇</el-radio>
          <el-radio class="line-radio" :label="'3'">信用汇</el-radio>
          <el-radio class="line-radio" :label="'4'">转账</el-radio>
          <el-radio class="line-radio" :label="'5'">票汇</el-radio>
          <el-radio class="line-radio" :label="'6'">其它</el-radio>
        </el-radio-group>
      </d-col>
      <d-col place="right" title="冲预借款(元)">
        <el-input v-model="form.bizEntityJson.offsetLoanAmount " size="mini" placeholder=""></el-input>
      </d-col>
    </el-row>

    <el-row>
      <d-col title="账号" :novalue="!form.bizEntityJson.bankAccount">
        <el-input v-model="form.bizEntityJson.bankAccount" size="mini" placeholder=""></el-input>
      </d-col>
      <d-col place="right" title="会计核减（元）">
        <el-input v-model="form.bizEntityJson.accountReductionAmount" size="mini" placeholder=""></el-input>
      </d-col>
    </el-row>
    <el-row>
      <d-col title="开户行" :novalue="!form.bizEntityJson.bankName">
        <el-input v-model="form.bizEntityJson.bankName" size="mini" placeholder=""></el-input>
      </d-col>
      <d-col place="right" title="公司代付（元）">
        <el-input v-model="form.bizEntityJson.companyPayAmount" size="mini" placeholder=""></el-input>
      </d-col>
    </el-row>
    <el-row>
      <d-col title="实付金额（元）">
        <el-input v-model="form.bizEntityJson.realPayAmount" size="mini" placeholder=""></el-input>
      </d-col>
      <d-col place="right" title="大写">
        
      </d-col>
    </el-row>

  </div>
</template>
<script>
export default {
	props: ['data'],
	watch: {
		// data: {
		// 	immediate: true,
		// 	handler: function(val) {
		// 		console.log(val)
		// 		this.form = val;
		// 	}
		// }
	},
  data() {
    return {
	    form: {
        bizEntityJson: {
          reimBursementCategory: '1'
        }
      }
    }
  },
  methods: {
    addDetail() {
      this.form.bizEntityJson.RepaymentDetai.push({});
    },
    deleteDetail(j) {
      this.form.bizEntityJson.RepaymentDetai.splice(j,1);
    },
    changeOffsetLoanFlg(val) {
      this.$set(this.form.bizEntityJson,'RepaymentDetai',[])
    },
  }
}
</script>>