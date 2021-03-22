<template>
  <div>
    <el-drawer
      :visible.sync="fast"
      direction="rtl"
      :append-to-body="true"
      :withHeader="false"
      :wrapperClosable="false"
      size="1155px">
      <div class="dialog-close-icon" @click="fast=false">
        <i></i>
      </div>
      <div class="detail">
        <el-row class="fast-top-bar" type="flex" justify="space-between" align="middle">
          <el-col>
            <h3 v-show="!id && type == 1">新建开发新项目</h3>
            <h3 v-show="id && type == 1">编辑开发新项目</h3>
            <h3 v-show="!id && type == 2">新建收购项目</h3>
            <h3 v-show="id && type == 2">编辑收购项目</h3>
          </el-col>
          <el-col style="text-align: right;">
            <el-upload
              name="fileName"
              :action="uploadUrl"
              :show-file-list="false"
              accept=".xls"
              :before-upload="beforeAvatarUpload"
              :on-success="handleSuccess"
              :disabled="!project_id"
              style="display: inline-block;">
              <el-button v-show="type == 2 && !id" :disabled="!project_id" plain>导入数据</el-button>
            </el-upload>
            <!-- <el-upload
              action="123"
              :show-file-list="false"
              accept=".xls"
              :before-upload="beforeAvatarUpload"
              :http-request="uploadFile"
              :disabled="!project_id"
              style="display: inline-block;">
              <el-button v-show="type == 2 && !id" :disabled="!project_id" plain>导入数据</el-button>
            </el-upload> -->
            <el-button plain @click="downExcel" style="margin-left: 10px;">导出Excel</el-button>
            <el-button type="success" @click="submit">提交</el-button>
            <!-- <el-button plain @click="fast=false">暂存</el-button> -->
            <el-button plain @click="fast=false">取消</el-button>
          </el-col>
        </el-row>
        <div class="con">
          <div>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="6">
                <div class="d-min">
                  <span>方案名称</span>
                  <el-input class="required" v-model="head.plan_name" placeholder="请输入"></el-input>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="d-min type-p">
                  <span>类别</span>
                  <!-- <el-input v-model="head.plan_type" placeholder="请输入"></el-input> -->
                  <p v-if="this.type == 1">新开发项目</p>
                  <p v-else>收购项目</p>
                </div>
              </el-col>
              <el-col v-if="type == 2" :span="6">
                <div class="d-min">
                  <span>项目</span>
                  <el-select class="required" clearable v-model="project_id" @change="pmsChange" placeholder="请选择" :disabled="importProject">
                    <el-option
                      v-for="item in projectList"
                      :key="item.project_id"
                      :label="item.project_name"
                      :value="item.project_id">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div v-if="id">
            <h3 class="min-title">核心测算</h3>
            <div class="data-bar">
              <div>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="d-min">
                      <span>IRR(%)</span>
                      <el-input v-model="head.irr" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>净现值(万元)</span>
                      <el-input v-model="head.net_prs_value" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>增值(万元)</span>
                      <el-input v-model="head.increment" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col v-show="type == 1" :span="6">
                    <div class="d-min">
                      <span>总土地成本(万元)</span>
                      <el-input v-model="head.total_land_cost" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col v-show="type == 2" :span="6">
                    <div class="d-min">
                      <span>收购价(万元)</span>
                      <el-input v-model="head.purchasing_price" disabled></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top:14px;">
                <el-row :gutter="20">
                  <el-col v-show="type == 1" :span="6">
                    <div class="d-min">
                      <span>开发成本(万元)</span>
                      <el-input v-model="head.development_cost" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>贷款(万元)</span>
                      <el-input v-model="head.loan" disabled></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="d-min">
                      <span>退出年数(年)</span>
                      <el-input v-model="head.years_of_withdrawal" disabled></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <!-- 切换 项目概况 / 面积 -->
          <div class="tab-label">
            <label :class="{'active':tab===1}" @click="tabSwitch(1)">项目概况</label>|
            <label v-show="type == 1" :class="{'active':tab===2}" @click="tabSwitch(2)">关键日期<span style="color:#778CA2;">&nbsp;&nbsp;|</span></label>
            <label :class="{'active':tab===3}" @click="tabSwitch(3)">面积</label>
          </div>
          <!-- 项目概况 -->
          <project-msg v-show="tab===1" :data="pmData" :type="type" :projectName="projectName" @totalCost="total_cost" @landLoanAmount="land_loan_amount" @developmentLoanAmount="development_loan_amount" @operatingLoanAmount="operating_loan_amount" @loanAmount="loan_amount" ref="project_msg_data"></project-msg>
          <!-- 关键日期-->
          <key-data v-show="tab===2" :data="keyData" ref="key_data"></key-data>
          <!-- 面积 -->
          <area-data v-show="tab===3" :data="areaData" :type="type" :parkingArea="parkingArea" :totalRentalArea="totalRentalArea" ref="area_data"></area-data>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">回报测算</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-if="pmsList.year.length != 0">合计</th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                  <th v-if="type == 1">
                    <span style="color: #468CEB;cursor: pointer; margin-right: 10px;" @click="addYear">新增年</span>
                    <span style="color: #FF4746;cursor: pointer;" @click="delYear">删除年</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">NOI(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="noiSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.noi" disabled></el-input>
                  </td>
                </tr>
                <tr>
                  <td>ROI</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="roiSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.roi" disabled></el-input>
                  </td>
                </tr>
                <tr>
                  <td>总经营费用(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="total_ope_expensesSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.total_ope_expenses" @focus="total_ope_expensesFocus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>折旧摊销(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="depr_and_amSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.depr_and_am" @focus="depr_and_amFocus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>税(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="taxSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.tax" @focus="taxFocus" placeholder="请输入" readonly></el-input>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>EBITDA</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="ebitdaSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.return_measurement" :key="index">
                    <el-input v-model="item.ebitda" disabled></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">总收入</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-if="pmsList.year.length != 0">合计</th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">租金(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="rental_incomeSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.total_income" :key="index">
                    <el-input v-model="item.rental_income" placeholder="请输入" @focus="rental_incomeFocus" readonly :disabled="type == 2"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>物管(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="management_feeSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.total_income" :key="index">
                    <el-input v-model="item.management_fee" placeholder="请输入" @focus="management_feeFocus" readonly :disabled="type == 2"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>多经(万元)</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="economic_incomeSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.total_income" :key="index">
                    <el-input v-model="item.economic_income" placeholder="请输入" @focus="economic_incomeFocus" readonly :disabled="type == 2"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>总收入</td>
                  <td v-if="pmsList.year.length != 0"><el-input v-model="total_revenueSum" disabled></el-input></td>
                  <td v-for="(item, index) in body.total_income" :key="index">
                    <el-input v-model="item.total_revenue" placeholder="请输入" @focus="total_revenueFocus" readonly :disabled="type == 2"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">销售所得分析</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">销售价格(元)</td>
                  <td v-for="(item, index) in body.income_analysis" :key="index">
                    <el-input v-model="item.selling_price" v-filter-check-input placeholder="请输入" @input="selling_priceInput(index)"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>销售成本(元)</td>
                  <td v-for="(item, index) in body.income_analysis" :key="index">
                    <el-input v-model="item.cost_of_sales" v-filter-check-input placeholder="请输入" @input="cost_of_salesInput(index)"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>贷款余额(元)</td>
                  <td v-for="(item, index) in body.income_analysis" :key="index">
                    <el-input v-model="item.loan_balance" v-filter-check-input placeholder="请输入" @input="loan_balanceInput(index)"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>净销售所得(元)</td>
                  <td v-for="(item, index) in body.income_analysis" :key="index">
                    <el-input v-model="item.net_sales_income" disabled></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 v-if="type == 1" class="min-title">土地贷款</h3>
            <h3 v-if="type == 2" class="min-title">贷款</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">还款额(元)</td>
                  <td v-for="(item, index) in body.land_loan" :key="index">
                    <el-input v-model="item.repayment_amount" @focus="repayment_amountFocus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>本金(元)</td>
                  <td v-for="(item, index) in body.land_loan" :key="index">
                    <el-input v-model="item.principal" @focus="principalFocus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>利息(元)</td>
                  <td v-for="(item, index) in body.land_loan" :key="index">
                    <el-input v-model="item.interest" @focus="interestFocus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>剩余贷款本金(元)</td>
                  <td v-for="(item, index) in body.land_loan" :key="index">
                    <el-input v-model="item.re_loan_principal" disabled></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div v-show="type == 1">
            <h3 class="min-title">开发贷款</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">还款额(元)</td>
                  <td v-for="(item, index) in body.development_loan" :key="index">
                    <el-input v-model="item.repayment_amount" @focus="repayment_amount2Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>本金(元)</td>
                  <td v-for="(item, index) in body.development_loan" :key="index">
                    <el-input v-model="item.principal" @focus="principal2Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>利息(元)</td>
                  <td v-for="(item, index) in body.development_loan" :key="index">
                    <el-input v-model="item.interest" @focus="interest2Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>剩余贷款本金(元)</td>
                  <td v-for="(item, index) in body.development_loan" :key="index">
                    <el-input v-model="item.re_loan_principal" disabled></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div v-show="type == 1">
            <h3 class="min-title">经营贷款</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">还款额(元)</td>
                  <td v-for="(item, index) in body.operating_loan" :key="index">
                    <el-input v-model="item.repayment_amount" @focus="repayment_amount3Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>本金(元)</td>
                  <td v-for="(item, index) in body.operating_loan" :key="index">
                    <el-input v-model="item.principal" @focus="principal3Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>利息(元)</td>
                  <td v-for="(item, index) in body.operating_loan" :key="index">
                    <el-input v-model="item.interest" @focus="interest3Focus" placeholder="请输入" readonly></el-input>
                  </td>
                </tr>
                <tr>
                  <td>剩余贷款本金(元)</td>
                  <td v-for="(item, index) in body.operating_loan" :key="index">
                    <el-input v-model="item.re_loan_principal" disabled></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">输出资本化率</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width="150px">输出资本化率(%)</td>
                  <td v-for="(item, index) in body.output_capitalization_rate" :key="index">
                    <el-input v-model="item.output_rate" v-filter-check-input placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">目标利润率
              <el-button style="margin-left: 10px;" size="mini" type="success" @click="target_profit_marginFocus">月度目标利润率</el-button>
            </h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">目标利润率(%)</td>
                  <td v-for="(item, index) in body.target_profit_margin" :key="index">
                    <el-input v-model="item.target_profit_margin" v-filter-check-input placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 表数据 -->
          <div>
            <h3 class="min-title">折现率</h3>
            <table class="prediction-table">
              <thead>
                <tr>
                  <th></th>
                  <th v-for="(item, index) in pmsList.year" :key="index">{{ item }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- 地块类型 -->
                <tr>
                  <td width="150px">折现率(%)</td>
                  <td v-for="(item, index) in body.discount_rate" :key="index">
                    <el-input v-model="item.discount_rate" v-filter-check-input placeholder="请输入"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-dialog :title="dialogTitle" width="80%" @close="handleClose" :visible.sync="dialogTableVisible">
      <div>
        <table class="diglog-table">
          <thead>
            <tr>
              <th>年份</th>
              <th>1月</th>
              <th>2月</th>
              <th>3月</th>
              <th>4月</th>
              <th>5月</th>
              <th>6月</th>
              <th>7月</th>
              <th>8月</th>
              <th>9月</th>
              <th>10月</th>
              <th>11月</th>
              <th>12月</th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="month_type == 1" v-for="(item, index) in body.total_ope_expenses_month" :key="index + 'a'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 2" v-for="(item, index) in body.depr_and_am_month" :key="index + 'b'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 3" v-for="(item, index) in body.tax_month" :key="index + 'c'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 4" v-for="(item, index) in body.target_profit_month" :key="index + 'd'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 5" v-for="(item, index) in body.rental_income_month" :key="index + 'e'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 6" v-for="(item, index) in body.management_fee_month" :key="index + 'f'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 7" v-for="(item, index) in body.economic_income_month" :key="index + 'g'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 8" v-for="(item, index) in body.total_revenue_month" :key="index + 'h'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 9" v-for="(item, index) in body.land_loan_repayment_amount_month" :key="index + 'i'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 10" v-for="(item, index) in body.land_loan_principal_month" :key="index + 'j'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 11" v-for="(item, index) in body.land_loan_interest_month" :key="index + 'k'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 12" v-for="(item, index) in body.development_loan_repayment_amount_month" :key="index + 'l'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 13" v-for="(item, index) in body.development_loan_principal_month" :key="index + 'm'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 14" v-for="(item, index) in body.development_loan_interest_month" :key="index + 'n'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 15" v-for="(item, index) in body.operating_loan_repayment_amount_month" :key="index + 'o'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 16" v-for="(item, index) in body.operating_loan_principal_month" :key="index + 'p'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
            <tr v-show="month_type == 17" v-for="(item, index) in body.operating_loan_interest_month" :key="index + 'q'">
              <td width="50px">{{ item.years }}</td>
              <td>
                <el-input v-model="item.month_1" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_2" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_3" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_4" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_5" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_6" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_7" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_8" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_9" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_10" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_11" v-filter-check-input placeholder="请输入"></el-input>
              </td>
              <td>
                <el-input v-model="item.month_12" v-filter-check-input placeholder="请输入"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProjectMsg from './components/projectMag';
import KeyData from './components/keyData';
import AreaData from './components/areaData';
import GlobalApi from '@/apis/apis/global';
import Prediction from '@/apis/apis/prediction'

export default {
  name: 'CreateBuy',
  props: ['open', 'id', 'type'],
  components: {
    ProjectMsg,
    KeyData,
    AreaData,
  },
  data() {
    return {
      dialogTableVisible: false,
      projectList: [],
      tab: 1,
      head: {
        plan_name: null, //方案名称
        plan_type: null, //方案类别
        project_id: null, //方案类别
        // irr: null, //IRR
        // net_prs_value: null, //净现值
        // increment: null, //增值
        // total_land_cost: null, //总土地成本type1
        // purchasing_price: null, //收购价type2
        // development_cost: null, //开发成本type1
        // loan: null, //贷款
        // years_of_withdrawal: null //退出年数
      },
      project_id: null,
      body: {
        return_measurement: [], //回报预算
        total_income: [], //总收入
        income_analysis: [], //销售所得分析
        land_loan: [], //土地贷款
        development_loan: [], //开发贷款
        operating_loan: [], //经营贷款
        output_capitalization_rate: [], //输出资本化率
        target_profit_margin: [], //目标利润率
        discount_rate: [], //折现率
        target_profit_month: [], //月度目标利润率
        total_ope_expenses_month: [], //总经营费用月份
        depr_and_am_month: [], //折旧摊销月份
        tax_month: [], //税月份
        rental_income_month: [], //租金月份
        management_fee_month: [], //物管月份
        economic_income_month: [], //多经月份
        total_revenue_month: [], //总收入月份
        land_loan_repayment_amount_month: [], //土地贷款还款额
        land_loan_principal_month: [], //土地贷款本金
        land_loan_interest_month: [], //土地贷款利息
        development_loan_repayment_amount_month: [], //开发贷款还款额
        development_loan_principal_month: [], //开发贷款本金
        development_loan_interest_month: [], //开发贷款利息
        operating_loan_repayment_amount_month: [], //经营贷款还款额
        operating_loan_principal_month: [], //经营贷款本金
        operating_loan_interest_month: [], //经营贷款利息
      },
      noiSum: null, //noi合计
      roiSum: null, //roi合计
      total_ope_expensesSum: null, //总经营费用合计
      depr_and_amSum: null, //折旧摊销合计
      taxSum: null, //税合计
      ebitdaSum: null, //EBITDA合计
      rental_incomeSum: null, //租金合计
      management_feeSum: null, //物管合计
      economic_incomeSum: null, //多经合计
      total_revenueSum: null, //总收入合计
      total_costValue: null, //项目概况总成本回传
      land_loan_amountValue: null, //土地贷款金额回传
      development_loan_amountValue: null, //开发贷款金额回传
      operating_loan_amountValue: null, //经营贷款金额回传
      loan_amountValue: null, //贷款金额回传
      pmsList: {
        year: []
      },
      pmData: null, //项目概况数据
      projectName: null, //type2选择项目传值
      keyData: null, //关键日期数据
      areaData: null, //面积数据
      parkingArea: null, //导入后停车场面积回传
      totalRentalArea: null, //导入总租赁后面积回传
      survers: {},
      month_type: 1,
      dialogTitle: '',
      importProject: false,
      uploadUrl: `/modelPrediction/import?token=${localStorage.getItem('ys_contract_token')}`
    }
  },
  created() {
    this.getProList()
  },
  computed: {
    fast: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close', val)
      }
    }
  },
  watch: {
    id(nv) {
      console.log(nv, 111)
      this.tab = 1;
      if(nv) {
        this.getList()
        this.importProject = true
      }else{
        this.projectName = null
        this.pmData = {}
        this.keyData = {}
        this.areaData = {}
        this.parkingArea = null
        this.totalRentalArea = null
        this.head = {
          plan_name: null,
          plan_type: null,
          project_id: null,
          // irr: null,
          // net_prs_value: null,
          // increment: null,
          // purchasing_price: null,
          // loan: null,
          // years_of_withdrawal: null
        }
        this.project_id = null
        this.body = {
          return_measurement: [], //回报预算
          total_income: [], //总收入
          income_analysis: [], //销售所得分析
          land_loan: [], //土地贷款
          development_loan: [], //开发贷款
          operating_loan: [], //经营贷款
          output_capitalization_rate: [], //输出资本化率
          target_profit_margin: [], //目标利润率
          discount_rate: [], //折现率
          target_profit_month: [], //月度目标利润率
          total_ope_expenses_month: [], //总经营费用月份
          depr_and_am_month: [], //折旧摊销月份
          tax_month: [], //税月份
          rental_income_month: [], //租金月份
          management_fee_month: [], //物管月份
          economic_income_month: [], //多经月份
          total_revenue_month: [], //总收入月份
          land_loan_repayment_amount_month: [], //土地贷款还款额
          land_loan_principal_month: [], //土地贷款本金
          land_loan_interest_month: [], //土地贷款利息
          development_loan_repayment_amount_month: [], //开发贷款还款额
          development_loan_principal_month: [], //开发贷款本金
          development_loan_interest_month: [], //开发贷款利息
          operating_loan_repayment_amount_month: [], //经营贷款还款额
          operating_loan_principal_month: [], //经营贷款本金
          operating_loan_interest_month: [], //经营贷款利息
        }
        this.pmsList = {
          year: []
        }
        this.noiSum = null
        this.roiSum = null
        this.total_ope_expensesSum = null
        this.depr_and_amSum = null
        this.taxSum = null
        this.ebitdaSum = null
        this.rental_incomeSum = null
        this.management_feeSum = null
        this.economic_incomeSum = null
        this.total_revenueSum = null
        this.importProject = false
        // this.addYear()
      }
    },
    type(nv) {
      console.log(nv, 222)
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    // 获取项目列表
    getProList() {
      GlobalApi.getProjectList().then(res => {
        console.log("proList:",res)
        if(res.code === 200 && res.result){
          this.projectList = res.result.data
          console.log(this.projectList)
        }
      })
    },
    tabSwitch(n) {
      this.tab = n;
    },
    // 加载详情
    getList() {
      Prediction.findDetail({plan_id: this.id,plan_type: this.type}).then(res => {
        console.log(res)
        if(res.code === 200 && res.result){
          console.log(res.result)
          // this.pmData = {
          //   lands: res.result.module.lands,
          //   others: res.result.module.others,
          // };
          // this.areaData = {
          //   config: res.result.config
          // };
          this.head = res.result.head
          this.pmData = res.result.survey
          this.keyData = res.result.survey
          this.areaData = res.result.survey
          this.project_id = res.result.survey.project_id
          this.body = res.result.body
          for (var key in this.body.return_measurement) {
            this.pmsList.year.push(this.body.return_measurement[key].years)
          }
          // 请求详情求回报测算、总收入sum
          this.noiSum = null
          this.roiSum = null
          this.total_ope_expensesSum = null
          this.depr_and_amSum = null
          this.taxSum = null
          this.ebitdaSum = null
          this.rental_incomeSum = null
          this.management_feeSum = null
          this.economic_incomeSum = null
          this.total_revenueSum = null
          for (let key in this.body.return_measurement) {
            this.noiSum += Number(this.body.return_measurement[key].noi)
            this.roiSum += Number(this.body.return_measurement[key].roi)
            this.total_ope_expensesSum += Number(this.body.return_measurement[key].total_ope_expenses)
            this.depr_and_amSum += Number(this.body.return_measurement[key].depr_and_am)
            this.taxSum += Number(this.body.return_measurement[key].tax)
            this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
          }
          for (let key in this.body.total_income) {
            this.rental_incomeSum += Number(this.body.total_income[key].rental_income)
            this.management_feeSum += Number(this.body.total_income[key].management_fee)
            this.economic_incomeSum += Number(this.body.total_income[key].economic_income)
            this.total_revenueSum += Number(this.body.total_income[key].total_revenue)
          }
        }
      })
    },
    // 获取项目详情年份等信息
    pmsChange(val) {
      let obj = {}
      obj = this.projectList.find((item)=>{
        return item.project_id === val
      })
      this.projectName = obj.project_name
      this.uploadUrl = `/modelPrediction/import?token=${localStorage.getItem('ys_contract_token')}&project_id=${val}`
      Prediction.pmsList({project_id: val}).then(res => {
        console.log(res)
        if(res.code === 200 && res.result){
          console.log(res.result)
          this.pmsList = res.result
          this.body = {
            return_measurement: [], //回报预算
            total_income: [], //总收入
            income_analysis: [], //销售所得分析
            land_loan: [], //土地贷款
            development_loan: [], //开发贷款
            operating_loan: [], //经营贷款
            output_capitalization_rate: [], //输出资本化率
            target_profit_margin: [], //目标利润率
            discount_rate: [], //折现率
            target_profit_month: [], //月度目标利润率
            total_ope_expenses_month: [], //总经营费用月份
            depr_and_am_month: [], //折旧摊销月份
            tax_month: [], //税月份
            rental_income_month: [], //租金月份
            management_fee_month: [], //物管月份
            economic_income_month: [], //多经月份
            total_revenue_month: [], //总收入月份
            land_loan_repayment_amount_month: [], //土地贷款还款额
            land_loan_principal_month: [], //土地贷款本金
            land_loan_interest_month: [], //土地贷款利息
            development_loan_repayment_amount_month: [], //开发贷款还款额
            development_loan_principal_month: [], //开发贷款本金
            development_loan_interest_month: [], //开发贷款利息
            operating_loan_repayment_amount_month: [], //经营贷款还款额
            operating_loan_principal_month: [], //经营贷款本金
            operating_loan_interest_month: [], //经营贷款利息
          }
          for (var key in this.pmsList.year) {
            let aa = {
              noi: null,
              roi: null,
              total_ope_expenses: null,
              depr_and_am: null,
              tax: null,
              ebitda: null,
              years: this.pmsList.year[key]
            }
            this.body.return_measurement.push(aa)
            let bb = {
              rental_income: null,
              management_fee: null,
              economic_income: null,
              total_revenue: null,
              years: this.pmsList.year[key]
            }
            this.body.total_income.push(bb)
            let cc = {
              selling_price: null,
              cost_of_sales: null,
              loan_balance: null,
              net_sales_income: null,
              years: this.pmsList.year[key]
            }
            this.body.income_analysis.push(cc)
            let dd = {
              repayment_amount: null,
              principal: null,
              interest: null,
              re_loan_principal: null,
              years: this.pmsList.year[key]
            }
            this.body.land_loan.push(dd)
            let ee = {
              repayment_amount: null,
              principal: null,
              interest: null,
              re_loan_principal: null,
              years: this.pmsList.year[key]
            }
            this.body.development_loan.push(ee)
            let ff = {
              repayment_amount: null,
              principal: null,
              interest: null,
              re_loan_principal: null,
              years: this.pmsList.year[key]
            }
            this.body.operating_loan.push(ff)
            let gg = {
              output_rate: null,
              years: this.pmsList.year[key]
            }
            this.body.output_capitalization_rate.push(gg)
            let hh = {
              target_profit_margin: null,
              years: this.pmsList.year[key]
            }
            this.body.target_profit_margin.push(hh)
            let ii = {
              discount_rate: null,
              years: this.pmsList.year[key]
            }
            this.body.discount_rate.push(ii)
            let jj = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.target_profit_month.push(jj)
            let kk = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.total_ope_expenses_month.push(kk)
            let ll = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.depr_and_am_month.push(ll)
            let mm = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.tax_month.push(mm)
            let nn = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.rental_income_month.push(nn)
            let oo = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.management_fee_month.push(oo)
            let pp = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.economic_income_month.push(pp)
            let qq = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.total_revenue_month.push(qq)
            let rr = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.land_loan_repayment_amount_month.push(rr)
            let ss = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.land_loan_principal_month.push(ss)
            let tt = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.land_loan_interest_month.push(tt)
            let uu = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.development_loan_repayment_amount_month.push(uu)
            let vv = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.development_loan_principal_month.push(vv)
            let ww = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.development_loan_interest_month.push(ww)
            let xx = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.operating_loan_repayment_amount_month.push(xx)
            let yy = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.operating_loan_principal_month.push(yy)
            let zz = {
              month_1: null,
              month_2: null,
              month_3: null,
              month_4: null,
              month_5: null,
              month_6: null,
              month_7: null,
              month_8: null,
              month_9: null,
              month_10: null,
              month_11: null,
              month_12: null,
              years: this.pmsList.year[key]
            }
            this.body.operating_loan_interest_month.push(zz)
          }
          this.areaData = res.result.pms_mall_statistics
          this.body.total_income = res.result.pms_received_statistics
          this.rental_incomeSum = null
          this.management_feeSum = null
          this.economic_incomeSum = null
          this.total_revenueSum = null
          for (let key in this.body.total_income) {
            this.rental_incomeSum += Number(this.body.total_income[key].rental_income)
            this.management_feeSum += Number(this.body.total_income[key].management_fee)
            this.economic_incomeSum += Number(this.body.total_income[key].economic_income)
            this.total_revenueSum += Number(this.body.total_income[key].total_revenue)
          }
          // if (!res.result.pms_received_statistics[0]) {
          //   this.actual_income = 0
          // }
        }
      })
    },
    // 新增年
    addYear() {
      this.pmsList.year.push(`第${this.pmsList.year.length + 1}年`)
      let aa = {
        noi: null,
        roi: null,
        total_ope_expenses: null,
        depr_and_am: null,
        tax: null,
        ebitda: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.return_measurement.push(aa)
      let bb = {
        rental_income: null,
        management_fee: null,
        economic_income: null,
        total_revenue: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.total_income.push(bb)
      let cc = {
        selling_price: null,
        cost_of_sales: null,
        loan_balance: null,
        net_sales_income: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.income_analysis.push(cc)
      let dd = {
        repayment_amount: null,
        principal: null,
        interest: null,
        re_loan_principal: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.land_loan.push(dd)
      let ee = {
        repayment_amount: null,
        principal: null,
        interest: null,
        re_loan_principal: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.development_loan.push(ee)
      let ff = {
        repayment_amount: null,
        principal: null,
        interest: null,
        re_loan_principal: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.operating_loan.push(ff)
      let gg = {
        output_rate: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.output_capitalization_rate.push(gg)
      let hh = {
        target_profit_margin: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.target_profit_margin.push(hh)
      let ii = {
        discount_rate: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.discount_rate.push(ii)
      let jj = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.target_profit_month.push(jj)
      let kk = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.total_ope_expenses_month.push(kk)
      let ll = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.depr_and_am_month.push(ll)
      let mm = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.tax_month.push(mm)
      let nn = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.rental_income_month.push(nn)
      let oo = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.management_fee_month.push(oo)
      let pp = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.economic_income_month.push(pp)
      let qq = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.total_revenue_month.push(qq)
      let rr = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.land_loan_repayment_amount_month.push(rr)
      let ss = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.land_loan_principal_month.push(ss)
      let tt = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.land_loan_interest_month.push(tt)
      let uu = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.development_loan_repayment_amount_month.push(uu)
      let vv = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.development_loan_principal_month.push(vv)
      let ww = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.development_loan_interest_month.push(ww)
      let xx = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.operating_loan_repayment_amount_month.push(xx)
      let yy = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.operating_loan_principal_month.push(yy)
      let zz = {
        month_1: null,
        month_2: null,
        month_3: null,
        month_4: null,
        month_5: null,
        month_6: null,
        month_7: null,
        month_8: null,
        month_9: null,
        month_10: null,
        month_11: null,
        month_12: null,
        years: `第${this.pmsList.year.length}年`
      }
      this.body.operating_loan_interest_month.push(zz)
    },
    // 删除年
    delYear() {
      this.pmsList.year.pop()
      this.body.return_measurement.pop()
      this.body.total_income.pop()
      this.body.income_analysis.pop()
      this.body.land_loan.pop()
      this.body.development_loan.pop()
      this.body.operating_loan.pop()
      this.body.output_capitalization_rate.pop()
      this.body.target_profit_margin.pop()
      this.body.discount_rate.pop()
      // 删除年后求回报测算、总收入sum
      this.noiSum = null
      this.roiSum = null
      this.total_ope_expensesSum = null
      this.depr_and_amSum = null
      this.taxSum = null
      this.ebitdaSum = null
      this.rental_incomeSum = null
      this.management_feeSum = null
      this.economic_incomeSum = null
      this.total_revenueSum = null
      for (let key in this.body.return_measurement) {
        this.noiSum += Number(this.body.return_measurement[key].noi)
        this.roiSum += Number(this.body.return_measurement[key].roi.split('%').join(''))
        this.total_ope_expensesSum += Number(this.body.return_measurement[key].total_ope_expenses)
        this.depr_and_amSum += Number(this.body.return_measurement[key].depr_and_am)
        this.taxSum += Number(this.body.return_measurement[key].tax)
        this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
      }
      for (let key in this.body.total_income) {
        this.rental_incomeSum += Number(this.body.total_income[key].rental_income)
        this.management_feeSum += Number(this.body.total_income[key].management_fee)
        this.economic_incomeSum += Number(this.body.total_income[key].economic_income)
        this.total_revenueSum += Number(this.body.total_income[key].total_revenue)
      }
    },
    total_ope_expensesFocus() {
      this.dialogTableVisible = true
      this.month_type = 1
      this.dialogTitle = '总经营费用'
    },
    // 项目概况-总成本 监听
    total_cost(val) {
      this.total_costValue = val.total_cost
      if (!this.total_costValue) {
        for (let key in this.body.return_measurement) {
          this.body.return_measurement[key].roi = 0.00 + '%'
        }
      } else {
        for (let key in this.body.return_measurement) {
          this.body.return_measurement[key].roi = (Number(this.body.return_measurement[key].noi) / Number(this.total_costValue) * 100000000 / 10000).toFixed(2) + '%'
        }
      }
    },
    // 项目概况-土地贷款金额 监听 type2
    land_loan_amount(val) {
      this.land_loan_amountValue = val.land_loan_amount
      for (let key in this.body.land_loan) {
        this.body.land_loan[key].re_loan_principal = (Number(this.land_loan_amountValue) * 100000000 - Number(this.body.land_loan[key].repayment_amount)).toFixed(2)
      }
    },
    // 项目概况-开发贷款金额 监听 type2
    development_loan_amount(val) {
      this.development_loan_amountValue = val.development_loan_amount
      for (let key in this.body.development_loan) {
        this.body.development_loan[key].re_loan_principal = (Number(this.development_loan_amountValue) * 100000000 - Number(this.body.development_loan[key].repayment_amount)).toFixed(2)
      }
    },
    // 项目概况-经营贷款金额 监听 type2
    operating_loan_amount(val) {
      this.operating_loan_amountValue = val.operating_loan_amount
      for (let key in this.body.operating_loan) {
        this.body.operating_loan[key].re_loan_principal = (Number(this.operating_loan_amountValue) * 100000000 - Number(this.body.operating_loan[key].repayment_amount)).toFixed(2)
      }
    },
    // 项目概况-贷款金额 监听 type2
    loan_amount(val) {
      this.loan_amountValue = val.loan_amount
      for (let key in this.body.land_loan) {
        this.body.land_loan[key].re_loan_principal = (Number(this.loan_amountValue) * 100000000 - Number(this.body.land_loan[key].repayment_amount)).toFixed(2)
      }
    },
    selling_priceInput(index) {
      this.body.income_analysis[index].net_sales_income = (Number(this.body.income_analysis[index].selling_price) - Number(this.body.income_analysis[index].cost_of_sales) - Number(this.body.income_analysis[index].loan_balance)).toFixed(2)
    },
    cost_of_salesInput(index) {
      this.body.income_analysis[index].net_sales_income = (Number(this.body.income_analysis[index].selling_price) - Number(this.body.income_analysis[index].cost_of_sales) - Number(this.body.income_analysis[index].loan_balance)).toFixed(2)
    },
    loan_balanceInput(index) {
      this.body.income_analysis[index].net_sales_income = (Number(this.body.income_analysis[index].selling_price) - Number(this.body.income_analysis[index].cost_of_sales) - Number(this.body.income_analysis[index].loan_balance)).toFixed(2)
    },
    depr_and_amFocus() {
      this.dialogTableVisible = true
      this.month_type = 2
      this.dialogTitle = '折旧摊销'

    },
    taxFocus() {
      this.dialogTableVisible = true
      this.month_type = 3
      this.dialogTitle = '税'
    },
    rental_incomeFocus() {
      this.dialogTableVisible = true
      this.month_type = 5
      this.dialogTitle = '租金'
    },
    management_feeFocus() {
      this.dialogTableVisible = true
      this.month_type = 6
      this.dialogTitle = '物管'
    },
    economic_incomeFocus() {
      this.dialogTableVisible = true
      this.month_type = 7
      this.dialogTitle = '多经'
    },
    total_revenueFocus() {
      this.dialogTableVisible = true
      this.month_type = 8
      this.dialogTitle = '总收入'
    },
    repayment_amountFocus() {
      this.dialogTableVisible = true
      this.month_type = 9
      this.dialogTitle = '土地贷款还款额'
    },
    principalFocus() {
      this.dialogTableVisible = true
      this.month_type = 10
      this.dialogTitle = '土地贷款本金'
    },
    interestFocus() {
      this.dialogTableVisible = true
      this.month_type = 11
      this.dialogTitle = '土地贷款利息'
    },
    repayment_amount2Focus() {
      this.dialogTableVisible = true
      this.month_type = 12
      this.dialogTitle = '开发贷款还款额'
    },
    principal2Focus() {
      this.dialogTableVisible = true
      this.month_type = 13
      this.dialogTitle = '开发贷款本金'
    },
    interest2Focus() {
      this.dialogTableVisible = true
      this.month_type = 14
      this.dialogTitle = '开发贷款利息'
    },
    repayment_amount3Focus() {
      this.dialogTableVisible = true
      this.month_type = 15
      this.dialogTitle = '经营贷款还款额'
    },
    principal3Focus() {
      this.dialogTableVisible = true
      this.month_type = 16
      this.dialogTitle = '经营贷款本金'
    },
    interest3Focus() {
      this.dialogTableVisible = true
      this.month_type = 17
      this.dialogTitle = '经营贷款利息'
    },
    target_profit_marginFocus() {
      this.dialogTableVisible = true
      this.month_type = 4
      this.dialogTitle = '月度目标利润率'
    },
    // 月份弹窗消失回调
    handleClose() {
      // console.log(this.body.total_ope_expenses_month)
      if (this.month_type == 1) {
        this.total_ope_expensesSum = null
        this.noiSum = null
        this.roiSum = null
        this.ebitdaSum = null
        for (let key in this.body.total_ope_expenses_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.total_ope_expenses_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          // 总经营费用
          this.body.return_measurement[key].total_ope_expenses = sum
          this.total_ope_expensesSum += Number(sum)
          if (this.type == 1) {
            // NOI=总收入-总经营费用
            this.body.return_measurement[key].noi = (Number(this.body.total_income[key].total_revenue) - Number(this.body.return_measurement[key].total_ope_expenses)).toFixed(2)
          } else {
            // NOI=整场实收-总经营费用
            this.body.return_measurement[key].noi = (Number(this.body.total_income[key].actual_income) -  Number(this.body.return_measurement[key].total_ope_expenses)).toFixed(2)
          }
          this.noiSum += Number(this.body.return_measurement[key].noi)
          // ROI=NOI/总成本*1亿/1万*100%
          if (!this.total_costValue) {
            this.body.return_measurement[key].roi = 0.00 + '%'
          } else {
            this.body.return_measurement[key].roi = (Number(this.body.return_measurement[key].noi) / Number(this.total_costValue) * 100000000 / 10000).toFixed(2) + '%'
          }
          this.roiSum += Number(this.body.return_measurement[key].roi.split('%').join(''))
          // EBITDA=NOI+折旧摊销+税
          this.body.return_measurement[key].ebitda =  (Number(this.body.return_measurement[key].noi) +  Number(this.body.return_measurement[key].depr_and_am) +  Number(this.body.return_measurement[key].tax)).toFixed(2)
          this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
        }
      }
      if (this.month_type == 2) {
        this.depr_and_amSum = null
        this.ebitdaSum = null
        for (let key in this.body.depr_and_am_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.depr_and_am_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.return_measurement[key].depr_and_am = sum
          this.depr_and_amSum += Number(sum)
          // EBITDA=NOI+折旧摊销+税
          this.body.return_measurement[key].ebitda =  (Number(this.body.return_measurement[key].noi) +  Number(this.body.return_measurement[key].depr_and_am) +  Number(this.body.return_measurement[key].tax)).toFixed(2)
          this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
        }
      }
      if (this.month_type == 3) {
        this.taxSum = null
        this.ebitdaSum = null
        for (let key in this.body.tax_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.tax_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.return_measurement[key].tax = sum
          this.taxSum += Number(sum)
          // EBITDA=NOI+折旧摊销+税
          this.body.return_measurement[key].ebitda =  (Number(this.body.return_measurement[key].noi) +  Number(this.body.return_measurement[key].depr_and_am) +  Number(this.body.return_measurement[key].tax)).toFixed(2)
          this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
        }
      }
      if (this.month_type == 5) {
        this.rental_incomeSum = null
        for (let key in this.body.rental_income_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.rental_income_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.total_income[key].rental_income = sum
          this.rental_incomeSum += Number(sum)
        }
      }
      if (this.month_type == 6) {
        this.management_feeSum = null
        for (let key in this.body.management_fee_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.management_fee_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.total_income[key].management_fee = sum
          this.management_feeSum += Number(sum)
        }
      }
      if (this.month_type == 7) {
        this.economic_incomeSum = null
        for (let key in this.body.economic_income_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.economic_income_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.total_income[key].economic_income = sum
          this.economic_incomeSum += Number(sum)
        }
      }
      if (this.month_type == 8) {
        this.total_revenueSum = null
        this.noiSum = null
        for (let key in this.body.total_revenue_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.total_revenue_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          // 总收入
          this.body.total_income[key].total_revenue = sum
          this.total_revenueSum += Number(sum)
          // NOI=总收入-总经营费用
          this.body.return_measurement[key].noi = (Number(this.body.total_income[key].total_revenue) - Number(this.body.return_measurement[key].total_ope_expenses)).toFixed(2)
          this.noiSum += Number(this.body.return_measurement[key].noi)
        }
      }
      if (this.month_type == 9) {
        for (let key in this.body.land_loan_repayment_amount_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.land_loan_repayment_amount_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.land_loan[key].repayment_amount = sum
          if (this.type == 1) {
            // 剩余贷款本金=土地贷款金额*1亿-还款额
            this.body.land_loan[key].re_loan_principal = (Number(this.land_loan_amountValue) * 100000000 - Number(this.body.land_loan[key].repayment_amount)).toFixed(2)
          } else {
            // 剩余贷款本金=贷款金额*1亿-还款额
            this.body.land_loan[key].re_loan_principal = (Number(this.loan_amountValue) * 100000000 - Number(this.body.land_loan[key].repayment_amount)).toFixed(2)
          }
        }
      }
      if (this.month_type == 10) {
        for (let key in this.body.land_loan_principal_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.land_loan_principal_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.land_loan[key].principal = sum
        }
      }
      if (this.month_type == 11) {
        for (let key in this.body.land_loan_interest_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.land_loan_interest_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.land_loan[key].interest = sum
        }
      }
      if (this.month_type == 12) {
        for (let key in this.body.development_loan_repayment_amount_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.development_loan_repayment_amount_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.development_loan[key].repayment_amount = sum
          // 剩余贷款本金=开发贷款金额*1亿-还款额
          this.body.development_loan[key].re_loan_principal = (Number(this.development_loan_amountValue) * 100000000 - Number(this.body.development_loan[key].repayment_amount)).toFixed(2)
        }
      }
      if (this.month_type == 13) {
        for (let key in this.body.development_loan_principal_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.development_loan_principal_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.development_loan[key].principal = sum
        }
      }
      if (this.month_type == 14) {
        for (let key in this.body.development_loan_interest_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.development_loan_interest_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.development_loan[key].interest = sum
        }
      }
      if (this.month_type == 15) {
        for (let key in this.body.operating_loan_repayment_amount_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.operating_loan_repayment_amount_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.operating_loan[key].repayment_amount = sum
          // 剩余贷款本金=经营贷款金额*1亿-还款额
          this.body.operating_loan[key].re_loan_principal = (Number(this.operating_loan_amountValue) * 100000000 - Number(this.body.operating_loan[key].repayment_amount)).toFixed(2)
        }
      }
      if (this.month_type == 16) {
        for (let key in this.body.operating_loan_principal_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.operating_loan_principal_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.operating_loan[key].principal = sum
        }
      }
      if (this.month_type == 17) {
        for (let key in this.body.operating_loan_interest_month) {
          let sum = 0
          let sum1_12month = JSON.parse(JSON.stringify(this.body.operating_loan_interest_month))
          if (this.id) {
            delete sum1_12month[key].id
            delete sum1_12month[key].plan_id
            delete sum1_12month[key].type
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          } else {
            delete sum1_12month[key].years
            for (let i in Object.values(sum1_12month[key])) {
              sum += Number(Object.values(sum1_12month[key])[i])
            }
          }
          this.body.operating_loan[key].interest = sum
        }
      }
    },
    // 提交
    submit() {
      if(!this.head.plan_name) return this.$message.error('请输入方案名称')
      if(!this.$refs.project_msg_data.survey.project_name) return this.$message.error('请输入项目名称')
      if(!this.$refs.project_msg_data.survey.project_companny) return this.$message.error('请输入项目公司')
      if(!this.$refs.project_msg_data.survey.city) return this.$message.error('请输入城市')
      if(!this.$refs.project_msg_data.survey.asset_package_owner) return this.$message.error('请输入资产包归属')
      if(!this.$refs.project_msg_data.survey.total_cost) return this.$message.error('请输入总成本')
      if(!this.$refs.project_msg_data.survey.term) return this.$message.error('请选择期限')
      if(!this.$refs.area_data.survey.parking_area) return this.$message.error('请输入停车场面积')
      if(!this.$refs.area_data.survey.total_rental_area) return this.$message.error('请输入总租赁面积')
      if (this.type == 1) {
        if(!this.$refs.project_msg_data.survey.land_transfer_fee) return this.$message.error('请输入土地出让金')
        if(!this.$refs.project_msg_data.survey.floor_price) return this.$message.error('请输入楼板价')
        if(!this.$refs.project_msg_data.survey.ps_index) return this.$message.error('请输入车位指标')
        if(!this.$refs.project_msg_data.survey.total_land_cost) return this.$message.error('请输入总土地成本')
        if(!this.$refs.project_msg_data.survey.development_cost) return this.$message.error('请输入开发成本')
        if(!this.$refs.project_msg_data.survey.land_loan_amount) return this.$message.error('请输入土地贷款金额')
        if(!this.$refs.project_msg_data.survey.land_lending_rate) return this.$message.error('请输入土地贷款利率')
        if(!this.$refs.project_msg_data.survey.development_loan_amount) return this.$message.error('请输入开发贷款金额')
        if(!this.$refs.project_msg_data.survey.development_lending_rate) return this.$message.error('请输入开发贷款利率')
        if(!this.$refs.project_msg_data.survey.operating_loan_amount) return this.$message.error('请输入经营贷款金额')
        if(!this.$refs.project_msg_data.survey.operating_lending_rate) return this.$message.error('请输入经营贷款利率')
        if(!this.$refs.project_msg_data.survey.years_of_withdrawal) return this.$message.error('请输入退出年数')
        if(!this.$refs.key_data.survey.start_date) return this.$message.error('请选择项目投资启动')
        if(!this.$refs.key_data.survey.project_started_date) return this.$message.error('请选择项目开工日期')
        if(!this.$refs.key_data.survey.project_opening_date) return this.$message.error('请选择项目开业日期')
        if(!this.$refs.key_data.survey.project_cpl_date) return this.$message.error('请选择项目竣工日期')
        if(!this.$refs.key_data.survey.project_exit_date) return this.$message.error('请选择项目退出日期')
        if(!this.$refs.area_data.survey.ground_floor_area) return this.$message.error('请输入地上楼层经营面积')
        if(!this.$refs.area_data.survey.total_building_area) return this.$message.error('请输入总建筑面积')
        if(!this.$refs.area_data.survey.oper_area_ungd_floor) return this.$message.error('请输入地下楼层经营面积')
      } else {
        if(!this.$refs.project_msg_data.survey.input_cpz_rate) return this.$message.error('请输入输入资本化率')
        if(!this.$refs.project_msg_data.survey.total_recovery_cost) return this.$message.error('请输入总回收成本')
        if(!this.$refs.project_msg_data.survey.purchasing_price) return this.$message.error('请输入收购价')
        if(!this.$refs.project_msg_data.survey.acquisition_costs) return this.$message.error('请输入收购费用')
        if(!this.$refs.project_msg_data.survey.loan_fees) return this.$message.error('请输入贷款费用')
        if(!this.$refs.project_msg_data.survey.loan_amount) return this.$message.error('请输入贷款金额')
        if(!this.$refs.project_msg_data.survey.lending_rate) return this.$message.error('请输入贷款利率')
        if(!this.$refs.project_msg_data.survey.due_date) return this.$message.error('请选择到期日')
        if(!this.$refs.project_msg_data.survey.sign_out_year) return this.$message.error('请输入退出年数')
      }
      this.head.plan_type = this.type
      this.head.project_id = this.project_id
      this.$refs.project_msg_data.survey.project_id = this.project_id
      if (this.type == 1) {
        this.survers = {...this.$refs.project_msg_data.survey, ...this.$refs.key_data.survey, ...this.$refs.area_data.survey}
      }
      if (this.type == 2) {
        this.survers = {...this.$refs.project_msg_data.survey, ...this.$refs.area_data.survey}
      }
      const jsonData = {
        head: this.head,
        survey: this.survers,
        body: this.body
      }
      const params = {
        data: JSON.stringify(jsonData),
        type: this.type
      }
      if(this.id) {
        // 修改
        Prediction.update(params).then(res => {
          console.log("投模预测更新:",res)
          this.$emit('close', {
            fast: false,
            reload: true
          })
        })
      }else{
        // 新建
        Prediction.add(params).then(res => {
          console.log("投模预测新增:",res)
          this.$emit('close', {
            fast: false,
            reload: true
          })
        })
      }
    },
    // 导入数据
    handleSuccess(res, file, fileList) {
      console.log("res==",res)
      if(res){
        if(res.code === 999){
          router.push({ name: 'login' })
        }else if(res.code === 3002){
          this.$message.error(res.msg)
        }else if(res.code === 200){
          // this.$message.success(res.msg)
          console.log(res)
          this.importProject = true
          this.pmData = res.result.survey
          this.keyData = res.result.survey
          // this.areaData = res.result.survey
          this.parkingArea = res.result.survey.parking_area
          this.totalRentalArea = res.result.survey.total_rental_area
          // this.body = res.result.body
          // 回报测算
          for (let key in res.result.body.return_measurement) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.return_measurement[key].years) == Number(this.pmsList.year[index])) {
                this.body.return_measurement[index] = res.result.body.return_measurement[key]
              }
            }
          }
          this.noiSum = null
          this.roiSum = null
          this.total_ope_expensesSum = null
          this.depr_and_amSum = null
          this.taxSum = null
          this.ebitdaSum = null
          for (let key in this.body.return_measurement) {
            this.noiSum += Number(this.body.return_measurement[key].noi)
            this.roiSum += Number(this.body.return_measurement[key].roi)
            this.total_ope_expensesSum += Number(this.body.return_measurement[key].total_ope_expenses)
            this.depr_and_amSum += Number(this.body.return_measurement[key].depr_and_am)
            this.taxSum += Number(this.body.return_measurement[key].tax)
            this.ebitdaSum += Number(this.body.return_measurement[key].ebitda)
          }
          // 销售所得分析
          for (let key in res.result.body.income_analysis) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.income_analysis[key].years) == Number(this.pmsList.year[index])) {
                this.body.income_analysis[index] = res.result.body.income_analysis[key]
              }
            }
          }
          // 贷款
          for (let key in res.result.body.land_loan) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.land_loan[key].years) == Number(this.pmsList.year[index])) {
                this.body.land_loan[index] = res.result.body.land_loan[key]
              }
            }
          }
          // 输出资本化率
          for (let key in res.result.body.output_capitalization_rate) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.output_capitalization_rate[key].years) == Number(this.pmsList.year[index])) {
                this.body.output_capitalization_rate[index] = res.result.body.output_capitalization_rate[key]
              }
            }
          }
          // 目标利润率
          for (let key in res.result.body.target_profit_margin) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.target_profit_margin[key].years) == Number(this.pmsList.year[index])) {
                this.body.target_profit_margin[index] = res.result.body.target_profit_margin[key]
              }
            }
          }
          // 折现率
          for (let key in res.result.body.discount_rate) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.discount_rate[key].years) == Number(this.pmsList.year[index])) {
                this.body.discount_rate[index] = res.result.body.discount_rate[key]
              }
            }
          }
          // 月份弹框
          // 总经营费用月份
          for (let key in res.result.body.total_ope_expenses_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.total_ope_expenses_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.total_ope_expenses_month[index] = res.result.body.total_ope_expenses_month[key]
              }
            }
          }
          // 折旧摊销月份
          for (let key in res.result.body.depr_and_am_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.depr_and_am_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.depr_and_am_month[index] = res.result.body.depr_and_am_month[key]
              }
            }
          }
          // 税月份
          for (let key in res.result.body.tax_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.tax_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.tax_month[index] = res.result.body.tax_month[key]
              }
            }
          }
          // 土地贷款还款额
          for (let key in res.result.body.land_loan_repayment_amount_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.land_loan_repayment_amount_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.land_loan_repayment_amount_month[index] = res.result.body.land_loan_repayment_amount_month[key]
              }
            }
          }
          // 土地贷款本金
          for (let key in res.result.body.land_loan_principal_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.land_loan_principal_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.land_loan_principal_month[index] = res.result.body.land_loan_principal_month[key]
              }
            }
          }
          // 土地贷款利息
          for (let key in res.result.body.land_loan_interest_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.land_loan_interest_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.land_loan_interest_month[index] = res.result.body.land_loan_interest_month[key]
              }
            }
          }
          // 月度目标利润率
          for (let key in res.result.body.target_profit_month) {
            for (let index in this.pmsList.year) {
              if (Number(res.result.body.target_profit_month[key].years) == Number(this.pmsList.year[index])) {
                this.body.target_profit_month[index] = res.result.body.target_profit_month[key]
              }
            }
          }
        }
      }
    },
    uploadFile(param) {
      console.log(param)
      let formData = new FormData()
      formData.append('flieName', param.file)
      formData.append('project_id', this.project_id)
      Prediction.importExcel(formData).then(res => {
          console.log("导入模板:",res)
          // this.$emit('close', {
          //   fast: false,
          //   reload: true
          // })
        })
    },
    beforeAvatarUpload(file) {
      // const Xls = file.name.split('.');
      const isLt2M = file.size / 1024 / 1024 < 500;
      // if(Xls[1] === 'xls'|| Xls[1] === 'xlsx'){
      //   return file;
      // }else{
      //   this.$message.error('上传文件只能是 xls/xlsx 格式')
      //   return false
      // }
      if(!isLt2M){
        this.$message.error('上传模板大小不能超过 500MB')
        return false;
      }
    },
    // 导出Excel
    downExcel() {
      const token = localStorage.getItem('ys_contract_token')
      if(this.id) {
        window.location.href = `../modelPrediction/export?plan_id=${this.id}&plan_type=${this.type}&token=${token}`
      } else {
        window.location.href = `../modelPrediction/down?token=${token}`
      }
      // window.location.href = process.env.API_PATH_DEV + '/upload/download?fileUrl='
      // Prediction.down().then(res => {
      //     console.log("下载示例模板:",res)
      //     // this.downFile(res.data)
      //     this.$emit('close', {
      //       fast: false,
      //       reload: true
      //     })
      //   })
    },
    downFile(data) {
      let blob = new Blob([data], {type: "application/vnd.ms-excel"})
      let objectUrl = URL.createObjectURL(blob)
      window.location.href = objectUrl
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@styles/common.scss';
span{
  font-size: 14px;
}
.dialog-close-icon{
  right: 1141px;
}
.detail{
  .fast-top-bar{
    padding: 0 20px;
    height: 74px;
    align-items: center;
    background-color: #F2F4F6;
    h3{
      font-size: 18px;
      color: #7A8FA4;
    }
    button {
      padding: 0;
      min-width: 80px;
      height: 32px;
      border-radius: 2px;
    }
  }
  ::v-deep .con{
    padding: 0 20px;
    height: calc(100vh - 74px);
    overflow-y: auto;
    >div{
      margin-bottom: 30px;
    }
    .min-title{
      margin-bottom: 20px;
    }
    .type-p p{
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color:#333;
      background-color: #DFE3E5;
      border-radius: 2px;
      padding-left: 21px;
    }
    .el-input__inner{
      height: 36px;
      border-color: transparent;
      background-color: #F2F4F6;
      border-radius: 2px;
    }
    .el-input__inner:focus{
      outline: none;
      border-color: #468CEB;
    }
    .el-select .el-input .el-select__caret{
      line-height: 36px;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #DFE3E5;
      color: #333;
    }
    .el-date-editor .el-input__icon{
      line-height: 36px;
    }
  }
  .d-min{
    >span{
      display: block;
      font-size: 14px;
      color: #98A9BC;
      margin-bottom: 10px;
    }
  }

}
</style>
<style>
.el-dialog__body {
  overflow-x: auto;
}
</style>
