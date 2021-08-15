<template>
  <!-- 往来款审批表(旧版) -->
  <div :class="['sp-temp',{'disabled': form.bizEntityJson.disabled}]">
    <table style="margin-top:25px;border:1px solid #aaa;width:100%;">
      <thead>
        <tr style="background-color:#F1F5F6;height:25px;font-weight:bold" >
          <th  >类别选择 {{form.bizEntityJson.status}} </th>
        </tr>
      </thead>
      <tbody>
        <tr style="border:0px solid #aaa;">
          <td style="border-right:0px solid #aaa;border-bottom:1px solid #aaa;border-left:0px solid #aaa; border-top:1px solid #aaa; text-align:left;width:20%">
            <el-form :inline="true" class="demo-form-inline" ref="form" :model="form">
            <el-radio-group v-model="form.bizEntityJson.categorySelection">
            <el-radio  label="1">集团内(上市) </el-radio>
            <el-radio  label="2">集团内(非上市) </el-radio>
            <el-radio  label="3">集团外</el-radio>
            </el-radio-group>
            </el-form>
          </td>
        </tr>
      </tbody>
    </table>
    <table style="margin-top:25px;border:0px solid #aaa;width:100%;">
      <thead>
        <tr style="background-color:#F1F5F6;height:25px;font-weight:bold" >
          <th colspan="4" >付款信息</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            付款单位全称：
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.fullNameOfPayer"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:0px solid #aaa;text-align:left;background-color:#F1F5F6;width:20%">
            收款单位全称：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.fullNameOfReceivingUnit"></el-input>
            </el-form>
          </td>
        </tr>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            付款单位开户银行：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.paymentUnitBank"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:0px solid #aaa;text-align:left;background-color:#F1F5F6;width:20%">
            收款单位开户银行：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.accountOpeningBank"></el-input>
            </el-form>
          </td>
        </tr>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            付款单位帐号：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.paymentUnitAccount"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:0px solid #aaa;text-align:left;background-color:#F1F5F6;width:20%">
            收款单位帐号：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.beneficiaryAccount"></el-input>
            </el-form>
          </td>
        </tr>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            付款金额(元)(小写)：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.paymentAmountYuanLower"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:0px solid #aaa;text-align:left;background-color:#F1F5F6;width:20%">
            (大写)：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.paymentAmountYuanUpper"></el-input>
            </el-form>
          </td>
        </tr>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
          付款事由：</td>
          <td style="border-right:0px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.paymentReason"></el-input>
            </el-form>
          </td>
          <td style="border-right:0px solid #aaa;border-bottom:1px solid #aaa;border-left:0px solid #aaa; border-top:1px solid #aaa; text-align:left;width:20%">
            <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" v-if="form.bizEntityJson.categorySelection==3">
            走账：
            <el-radio-group v-model="form.bizEntityJson.takeTheBill">
            <el-radio  label="1">是</el-radio>
            <el-radio  label="0">否 </el-radio>
            </el-radio-group>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:0px solid #aaa; border-top:1px solid #aaa; text-align:left;width:30%">
            <el-form :inline="true"  ref="form" :model="form" class="demo-form-inline" v-if="form.bizEntityJson.categorySelection==3 && form.bizEntityJson.takeTheBill==1" >
            <el-row>
            <el-col :span="8">
            例外事项网批号：
            </el-col>
            <el-col :span="8">
            <el-input v-model="form.bizEntityJson.exceptionNetLotNumber"></el-input>
            </el-col>
            </el-row>
            </el-form>
          </td>
          
        </tr>
        
      </tbody>
    </table>
    
    <table style="margin-top:25px;border:0px;width:100%;">
      <thead>
        <tr style="background-color:#F1F5F6;height:25px;font-weight:bold" >
          <th colspan="4">评审资料</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            凭证号码：
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.voucherNumber"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:0px solid #aaa;text-align:left;background-color:#F1F5F6;width:20%">
            报销单编号：
          </td>
          <td style="width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.claimNumber"></el-input>
            </el-form>
          </td>
        </tr>
        <tr style="border:0px;">
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;background-color:#F1F5F6;width:20%">
            关联资金申请：
          </td>
          <td style="border-right:0px solid #aaa;border-bottom:1px solid #aaa;border-left:1px solid #aaa; border-top:1px solid #aaa; text-align:left;width:30%">
            <el-form ref="form" :model="form" label-width="80px">
            <el-input v-model="form.bizEntityJson.applicationRelatedFunds"></el-input>
            </el-form>
          </td>
          <td style="border-right:1px solid #aaa;border-bottom:1px solid #aaa;border-left:0px solid #aaa; border-top:1px solid #aaa; text-align:left;width:50%" colspan="2">
            <el-checkbox v-model="form.bizEntityJson.unrelatedFundApplication">不关联资金申请</el-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      form: data,
      disabled: true,
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
  },
  methods: {
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
