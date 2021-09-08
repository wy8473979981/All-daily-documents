f<template>
  <!-- 城市公司有预控费用报销单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row green-row">
      <el-col :span="12" class="red-box-fix">
        <div class="d-min">
          <span>报销类别</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.preType1 != 'true' && form.bizEntityJson.preType2 != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group
                v-model="form.bizEntityJson"
                :nameList="[{label:'出差申请单',name:'preType1'},
                          {label:'其他',name:'preType2'}]"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="red-box-fix right-col">
        <div class="d-min d-checkbox">
          <div v-if="form.bizEntityJson.preType1 == 'true'" style="width: 100%;">
            <div v-if="form.bizEntityJson.positionLevel1 == 'true' || form.bizEntityJson.positionLevel2 == 'true'" class="d-red"
                 :class="{'novalue': form.bizEntityJson.positionLevel1 != 'true' && form.bizEntityJson.positionLevel2 != 'true', 'required': !form.bizEntityJson.disabled}">
              <d-radio-group
                  v-model="form.bizEntityJson"
                  :nameList="[{label:'总经理',name:'positionLevel1'},
                            {label:'其他人员',name:'positionLevel2'}]"
              />
            </div>
            <div v-else class="d-red" :class="{'novalue': form.bizEntityJson.newPositionLevel1 != 'true' && form.bizEntityJson.newPositionLevel2 != 'true' && form.bizEntityJson.newPositionLevel3 != 'true', 'required': !form.bizEntityJson.disabled}">
              <d-radio-group
                  v-model="form.bizEntityJson"
                  :nameList="[{label:'城市公司总经理',name:'newPositionLevel1'},
                            {label:'其他M序列',name:'newPositionLevel2'},
                            {label:'其他P序列',name:'newPositionLevel3'}]"
              />
            </div>
          </div>
        </div>
      </el-col>

      <el-col v-if="isListingFees || (form.bizEntityJson.disabled && (form.bizEntityJson.attachPhoto == 'true'
                              || form.bizEntityJson.resourceDepartment == 'true'))" :span="24" class="red-box-fix">
        <div class="d-min">
          <span>上市费用责任归属</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.attachPhoto != 'true'
                              && form.bizEntityJson.resourceDepartment != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group
                v-model="form.bizEntityJson"
                :nameList="[{label:'董秘办',name:'attachPhoto'},
                          {label:'资本部',name:'resourceDepartment'}]"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="margin-row top-row blue-row">
      <el-col :span="24" class="title-col right-col">
        <h2>报销信息</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>
            报销/入账公司
            <el-tooltip class="item" effect="dark" content="入账公司可自行切换" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </span>
          <el-select
              :class="{'novalue': !form.bizEntityJson.acctUnitName, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.acctUnitName"
              filterable
              remote
              clearable
              @change="acctUnitNameChange"
              :remote-method="remoteMethod"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in acctUnitNameOptions"
                :key="item.companyCode"
                :label="item.companyName"
                :value="item.companyName">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-input :class="{'required': !form.bizEntityJson.disabled}" :value="form.bizEntityJson.orgParentName + '-' + form.bizEntityJson.centerOrgName" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>网批查询号</span>
          <el-select
              v-if="!form.bizEntityJson.disabled"
              popper-class="select-header"
              :class="{'novalue': !form.bizEntityJson.preResDisplayNo, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.preResDisplayNo"
              filterable
              remote
              clearable
              @change="preResDisplayNoChange"
              :remote-method="remoteMethod2"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in preResDisplayNoOptions"
                :key="item.resDisplayNo"
                :label="item.resDisplayNo"
                :value="item.resDisplayNo">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span>{{ item.resDisplayNo }}</span>
                </el-col>
                <el-col :span="17">
                  <span>{{ item.billName }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
          <p v-else class="openUrl-p" @click="openUrlGlobal(form.bizEntityJson.preResDisplayNo, form.bizEntityJson.feeApproveInfoId)">{{ form.bizEntityJson.preResDisplayNo }}</p>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>表单名称</span>
          <el-input :class="{'novalue': !form.bizEntityJson.preBillName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.preBillName" readonly></el-input>
        </div>
      </el-col>
      <div v-if="isShowContractNo">
        <el-col :span="12">
          <div class="d-min">
            <span>合同评审编号</span>
            <el-input :class="{'novalue': !form.bizEntityJson.contractReviewNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.contractReviewNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
          </div>
        </el-col>
      </div>
      <el-col :span="12" class="red-box-fix">
        <div class="d-min">
          <span>最后一单</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.lastBillFlgYes != 'true' && form.bizEntityJson.lastBillFlgNo != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group
                v-model="form.bizEntityJson"
                :nameList="[{label:'是',name:'lastBillFlgYes'},
                          {label:'否',name:'lastBillFlgNo'}]"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="explain-p">
          <p v-if="form.bizEntityJson.lastBillFlgYes == 'true'" class="explain-p-one no-print">最后一单报销完成后，预控申请即作废，您确认当前是最后一单报销吗？</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>币种</span>
          <el-select :disabled="disableCurrency || form.bizEntityJson.disabled" :class="{'novalue': !form.bizEntityJson.currencyAmt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.currencyAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'">
            <el-option label="人民币" value="CNY"></el-option>
            <el-option label="美元" value="USD"></el-option>
            <el-option label="港元" value="HKD"></el-option>
            <el-option label="欧元" value="EUR"></el-option>
            <el-option label="新加坡币" value="SGD"></el-option>
            <el-option label="英镑" value="GBP"></el-option>
            <el-option label="澳门币" value="MOP"></el-option>
            <el-option label="日元" value="JPY"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.currencyAmt != 'CNY'">汇率(保留5位小数)</span>
          <el-input v-if="form.bizEntityJson.currencyAmt != 'CNY'" :class="{'novalue': !form.bizEntityJson.rate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rate" v-limit-number="5" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col v-if="isShowWorkNo" :span="24" class="right-col">
        <div class="d-min">
          <span>办公资产入库单</span>
          <el-select
              popper-class="select-header"
              :class="{'novalue': !form.bizEntityJson.preWorkAssetNo, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.preWorkAssetNo"
              filterable
              remote
              clearable
              @change="preWorkAssetNoChange"
              :remote-method="remoteMethod3"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in preWorkAssetNoOptions"
                :key="item.displayNo"
                :label="item.displayNo"
                :value="item.displayNo">
              <el-row :gutter="24">
                <el-col :span="7">
                  <span>{{ item.displayNo }}</span>
                </el-col>
                <el-col :span="17">
                  <span>{{ item.userName }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="24" class="table-col right-col table-checkbox">
        <el-table ref="table" :data="form.bizEntityJson.detailList" :span-method="spanMethod" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="序号" width="50" prop="feeName">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用中心">
            <template slot-scope="scope">
              <span style="color: #468CEB; cursor: pointer;" @click="findBudgetUsedDetail(scope.row)">{{ scope.row.fullPath }}</span>
            </template>
          </el-table-column>
          <el-table-column label="费用名称" prop="displayName" />
          <el-table-column label="发票内容" prop="accountSubjectName">
            <template slot-scope="scope">
              <el-select v-if="form.psv.accountFlg" v-model="scope.row.accountSubjectName" @change="accountSubjectNameChange(scope.$index, $event)" @visible-change="findSubjectByOrgCd(scope.row, $event)" :loading="isLoading" filterable placeholder="请选择" :disabled="scope.row.subjectName == '业务招待费' && scope.row.displayName == '住宿'">
                <el-option
                    v-for="item in accountSubjectNameOptions"
                    :key="item.accountSubjectName"
                    :label="item.accountSubjectName"
                    :value="item.accountSubjectName">
                </el-option>
              </el-select>
              <span v-else>{{ scope.row.accountSubjectName }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="showRatio" label="包干比例" prop="ratio" />
          <el-table-column label="申请预算金额(元)" prop="budgetAmt" align="right" />
          <el-table-column label="已报销金额(元)" prop="agreeAmt" align="right" />
          <el-table-column :label="form.bizEntityJson.currencyAmt == 'CNY' ? '本次报销金额(A)(元)' : '本次报销金额(原币)(元)'" prop="currentAmt">
            <template slot-scope="scope">
              <el-input v-if="scope.row.displayName == '交通'" v-model="scope.row.currentAmt" @focus="showTrafficCostDetail = true; form.bizEntityJson.disabled ? reveal = true : reveal = false ;trafficIndex = scope.$index" :yykDisabled="form.bizEntityJson.disabled ? true : false" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              <el-input v-else v-model="scope.row.currentAmt" @change="currentAmtChange(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="form.bizEntityJson.currencyAmt == 'CNY'" label="增值税专用发票">
            <template slot-scope="scope">
              <div v-if="scope.row.displayName == '交通'">
                <span>/</span>
              </div>
              <div v-else class="d-red" :class="{'novalue': scope.row.isZzszyfp1 != 'true' && scope.row.isZzszyfp2 != 'true', 'required': !form.bizEntityJson.disabled}">
                <d-radio-group
                    v-model="scope.row"
                    :nameList="[{label:'是',name:'isZzszyfp1'},
                              {label:'否',name:'isZzszyfp2'}]"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="form.bizEntityJson.currencyAmt == 'CNY'" label="本次报销税额(B)(元)" prop="currentAmt2">
            <template slot-scope="scope">
              <el-input v-if="scope.row.displayName == '交通'" v-model="scope.row.currentAmt2" @focus="showTrafficCostDetail = true; form.bizEntityJson.disabled ? reveal = true : reveal = false ;trafficIndex = scope.$index" :yykDisabled="form.bizEntityJson.disabled ? true : false" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              <div v-else>
                <el-input v-if="scope.row.isZzszyfp1 == 'true'" :class="{'novalue': Number(scope.row.currentAmt2) <= 0, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.currentAmt2" @change="currentAmt2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                <el-input v-else v-model="scope.row.currentAmt2" @change="currentAmt2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="form.bizEntityJson.currencyAmt != 'CNY'" label="折本位币(预算扣减金额)" prop="standardMoney">
            <template slot-scope="scope">
              <el-input v-model="scope.row.standardMoney" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="会计核减金额" prop="accReduce">
            <template slot-scope="scope">
              <el-input v-if="scope.row.displayName == '交通' && form.psv.accountFlg" v-model="scope.row.accReduce" @focus="showTrafficCostDetail2 = true;trafficIndex = scope.$index" readonly :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
              <el-input v-else v-model="scope.row.accReduce" @change="accReduceChange(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.psv.accountFlg" :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="会计核减税额" prop="accReduce2">
            <template slot-scope="scope">
              <el-input v-if="scope.row.displayName == '交通' && form.psv.accountFlg" v-model="scope.row.accReduce2" @focus="showTrafficCostDetail2 = true;trafficIndex = scope.$index" readonly :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
              <el-input v-else v-model="scope.row.accReduce2" @change="accReduce2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.psv.accountFlg" :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="margin-row blue-row">
      <el-col :span="24" class="topRight-col">
        <div class="d-min">
          <span>价税合计(A+B)(元)</span>
          <el-input v-model="form.bizEntityJson.totalAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <el-checkbox v-model="form.bizEntityJson.whethersLendAmt" @change="whethersLendAmtChange" true-label="true" false-label="false">是否冲预借款</el-checkbox>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.whethersLendAmt == 'true'">借款人</span>
          <el-input v-if="form.bizEntityJson.whethersLendAmt == 'true'" :class="{'novalue': !form.bizEntityJson.borrower, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.borrower" @focus="showSearchUser1 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col no-print">
        <div class="d-min">
          <span class="span-auto">备注</span>
          <t-textarea class="t-textarea-auto" v-model="form.bizEntityJson.remark" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled"></t-textarea>
        </div>
      </el-col>
      <div v-if="form.bizEntityJson.whethersLendAmt == 'true'">
        <el-col :span="7" class="title-col">
          <h2>还款明细</h2>
        </el-col>
        <el-col :span="17" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="add">添加</span>提醒：请务必关联【借款人】的借款网批，否则会导致财务无法入账</p>
          </div>
        </el-col>
        <div v-for="(item, index) in form.bizEntityJson.rdList" :key="index">
          <el-col :span="7">
            <div class="d-min">
              <span>借款网批查询号</span>
              <el-select
                  v-if="!form.bizEntityJson.disabled"
                  popper-class="select-header"
                  :class="{'novalue': !item.wpId, 'required': !form.bizEntityJson.disabled}"
                  v-model="item.wpId"
                  filterable
                  remote
                  clearable
                  @change="wpIdChange(index, $event)"
                  :remote-method="remoteMethod5"
                  :loading="loading"
                  :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                  :disabled="form.bizEntityJson.disabled">
                <el-option
                    v-for="itemm in wpIdOptions"
                    :key="itemm.displayNo"
                    :label="itemm.displayNo"
                    :value="itemm.displayNo">
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <span>{{ itemm.displayNo }}</span>
                    </el-col>
                    <el-col :span="12">
                      <span>{{ itemm.balance }}</span>
                    </el-col>
                  </el-row>
                </el-option>
              </el-select>
              <p v-else class="openUrl-p" @click="openUrlGlobal(item.wpId, item.rdApproveInfoId)">{{ item.wpId }}</p>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>剩余还款金额(元)</span>
              <el-input v-model="item.balance" readonly></el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="d-min">
              <span>本次还款金额(元)</span>
              <el-input :class="{'novalue': !item.repaymentAmount, 'required': !form.bizEntityJson.disabled}" v-model="item.repaymentAmount" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @change="repaymentAmountChange(item, index)" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
            </div>
          </el-col>
          <el-col :span="3" class="right-col">
            <div class="explain-p">
              <p v-if="!form.bizEntityJson.disabled && index != 0" class="explain-p-one" @click="del(index)"><span class="explain-btn-del">删除</span></p>
            </div>
          </el-col>
        </div>
      </div>
    </el-row>
    <el-row :gutter="24" class="margin-row blue-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>付款信息</h2>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <div class="d-red" :class="{'novalue': !form.bizEntityJson.personnelBoolean, 'required': !form.bizEntityJson.disabled}">
            <el-radio-group v-model="form.bizEntityJson.personnelBoolean">
              <el-radio label="1">员工</el-radio>
              <el-radio label="0">外部单位</el-radio>
              <el-radio label="2">内部单位</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="right-col">
        <div class="d-min">
          <span>付款方式</span>
          <div class="d-red" :class="{'novalue': form.bizEntityJson.type1 != 'true' && form.bizEntityJson.type2 != 'true' && form.bizEntityJson.type3 != 'true' && form.bizEntityJson.type4 != 'true' && form.bizEntityJson.type5 != 'true' && form.bizEntityJson.type9 != 'true', 'required': !form.bizEntityJson.disabled}">
            <d-radio-group
                v-model="form.bizEntityJson"
                :nameList="[{label:'现金',name:'type1'},
                          {label:'电汇',name:'type2'},
                          {label:'信用证',name:'type3'},
                          {label:'转账',name:'type4'},
                          {label:'票汇',name:'type5'},
                          {label:'其他',name:'type9'},]"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>收款人</span>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 1" :class="{'novalue': !form.bizEntityJson.receiveNameTrue, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveNameTrue" @focus="showSearchUser2 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
          <el-input v-if="form.bizEntityJson.personnelBoolean == 0" :class="{'novalue': !form.bizEntityJson.receiveName, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          <el-select
              v-if="form.bizEntityJson.personnelBoolean == 2"
              v-model="form.bizEntityJson.receiveNameIn"
              filterable
              remote
              clearable
              @change="receiveNameInChange"
              :remote-method="remoteMethod6"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in receiveNameInOptions"
                :key="item.assumeBukrs"
                :label="item.assumeCompany"
                :value="item.assumeCompany">
              <el-row :gutter="24">
                <el-col :span="5">
                  <span>{{ item.assumeBukrs }}</span>
                </el-col>
                <el-col :span="19">
                  <span>{{ item.assumeCompany }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.whethersLendAmt == 'true'">冲预借款(元)</span>
          <el-input v-if="form.bizEntityJson.whethersLendAmt == 'true'" v-model="form.bizEntityJson.lendAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" style="height: 37px !important;">
        <div class="d-min">
          <span>
            <el-checkbox v-if="form.bizEntityJson.personnelBoolean == 1" v-model="form.bizEntityJson.isManual" true-label="true" false-label="false">手工录入</el-checkbox>
            账号
          </span>
          <el-select v-if="form.bizEntityJson.personnelBoolean == 1 && form.bizEntityJson.isManual != 'true'" :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in bankAccountList"
                :key="item.accountNum"
                :label="item.accountNum"
                :value="item.accountNum">
            </el-option>
          </el-select>
          <el-input v-else :class="{'novalue': !form.bizEntityJson.receiveAcctNo, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveAcctNo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>会计核减(元)</span>
          <el-input v-model="form.bizEntityJson.checkAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>开户行</span>
          <el-input :class="{'novalue': !form.bizEntityJson.receiveBank, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.receiveBank" @focus="showSelectBank = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span>公司已预付(元)</span>
          <el-input v-model="form.bizEntityJson.advanceAmt" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" @input="advanceAmtInput" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
        </div>
      </el-col>
      <el-col :span="24" class="right-col no-print">
        <div class="explain-p">
          <p>注意事项：当左边选择员工时，员工账户会自动带出，若带出的账号不对或者您想选择其它账号，请点击手工录入。</p>
          <p>开户行默认为中国工商银行，若您的开户行为其它银行，请点击框体进行修改。</p>
        </div>
      </el-col>
      <dl-col :span="24" class="show-print" place="right"  style="font-size:18px">
        <p class="explain-p-one">实付金额(元)　{{ form.bizEntityJson.realAmt }}　(大写) {{ form.bizEntityJson.currency2 }}币 {{ form.bizEntityJson.realAmt === '' || form.bizEntityJson.realAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.realAmt) }}</p>
      </dl-col>
      <el-col :span="12" class="no-print">
        <div class="d-min">
          <span>实付金额(元)</span>
          <el-input v-model="form.bizEntityJson.realAmt" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col no-print">
        <div class="d-min">
          <span style="display: flex;">
            (大写)
            <el-input v-model="form.bizEntityJson.currency2" style="margin: 0 10px;"></el-input>
            币
          </span>
          <el-input :value="form.bizEntityJson.realAmt === '' || form.bizEntityJson.realAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.realAmt)" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>代付信息</span>
          <el-checkbox v-model="form.bizEntityJson.isReplacePay" true-label="true" false-label="false">是否代付</el-checkbox>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <span v-if="form.bizEntityJson.isReplacePay == 'true'">代支付公司</span>
          <el-select
              v-if="form.bizEntityJson.isReplacePay == 'true'"
              :class="{'novalue': !form.bizEntityJson.assumeCompany, 'required': !form.bizEntityJson.disabled}"
              v-model="form.bizEntityJson.assumeCompany"
              filterable
              remote
              clearable
              @change="assumeCompanyChange"
              :remote-method="remoteMethod4"
              :loading="loading"
              :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
              :disabled="form.bizEntityJson.disabled">
            <el-option
                v-for="item in assumeCompanyOptions"
                :key="item.assumeBukrs"
                :label="item.assumeCompany"
                :value="item.assumeCompany">
              <el-row :gutter="24">
                <el-col :span="5">
                  <span>{{ item.assumeBukrs }}</span>
                </el-col>
                <el-col :span="19">
                  <span>{{ item.assumeCompany }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.disabled" :gutter="24" class="margin-row blue-row">
      <el-col :span="24" class="title-col topRight-col">
        <h2>会计信息</h2>
      </el-col>
      <el-col :span="12">
        <div class="d-min">
          <span>业务类型</span>
          <el-input v-model="form.bizEntityJson.businessType" readonly></el-input>
        </div>
      </el-col>
      <el-col :span="12" class="right-col">
        <div class="d-min">
          <el-checkbox v-model="form.bizEntityJson.isMissingTicket" @change="isMissingTicketChange" true-label="true" false-label="false" :name="form.psv.accountFlg ? 'yykReadonly' : ''">缺票</el-checkbox>
        </div>
      </el-col>
      <div v-if="form.bizEntityJson.isMissingTicket == 'true'">
        <el-col :span="12">
          <div class="d-min">
            <span>缺票金额</span>
            <el-input :value="form.bizEntityJson.realAmt" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span>预计归还日期</span>
            <el-date-picker
                v-model="form.bizEntityJson.giveBackDate"
                value-format="yyyy-MM-dd"
                clearable
                placeholder="请选择"
                :name="form.psv.accountFlg ? 'yykReadonly' : ''">
            </el-date-picker>
          </div>
        </el-col>
      </div>
    </el-row>
    <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
    <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
    <trafficCostDetail :key="3" :open="showTrafficCostDetail" :detail="form.bizEntityJson.detailList[this.trafficIndex]" :reveal="reveal" @close="closeTrafficCostDetail"></trafficCostDetail>
    <trafficCostDetail :key="4" :open="showTrafficCostDetail2 && form.psv.accountFlg" :detail="form.bizEntityJson.detailList[this.trafficIndex]" :accountFlg="form.psv.accountFlg" :realAmt="form.bizEntityJson.realAmt" @close="closeTrafficCostDetail2"></trafficCostDetail>
    <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
</template>

<script>
export default {
  data: function() {
    return{
      form: data,
      disabled: true,
      isNoValue: false,
      showSearchUser1: false,
      showSearchUser2: false,
      showTrafficCostDetail: false,
      showTrafficCostDetail2: false,
      showSelectBank: false,
      loading: false,
      isShowWorkNo: false,
      isShowContractNo: false,
      acctUnitNameOptions: [],
      preResDisplayNoOptions: [],
      currencyAmtOptions: [],
      preWorkAssetNoOptions: [],
      accountSubjectNameOptions: [],
      assumeCompanyOptions: [],
      bankAccountList: [],
      wpIdOptions: [],
      receiveNameInOptions: [],
      repaymentAmountIndex: '',
      accReduceIndex: '',
      accReduce2Index: '',
      isYykCheck: true,
      isLoading: false,
      trafficIndex: '',
      reveal: false,
      showRatio: true, // 是否处理包干比例逻辑
      disableCurrency: false, // 是否禁用币种选择
      isListingFees: false // 显示上市费用责任归属
    }
  },
  computed: {
    totalAmt() {
      if (this.form.bizEntityJson.detailList === undefined) return
      let sum = 0
      if (this.form.bizEntityJson.detailList.length > 0) {
        this.form.bizEntityJson.detailList.forEach(item => {
          if (this.form.bizEntityJson.currencyAmt == 'CNY') {
            sum += (Number(item.currentAmt) + Number(item.currentAmt2))
          } else {
            sum += Number(item.currentAmt) * Number(this.form.bizEntityJson.rate)
            item.standardMoney = (Number(item.currentAmt) * Number(this.form.bizEntityJson.rate)).toFixed(2)
          }
        })
      }
      if(isNaN(sum)) sum = 0
      return sum
    },
    lendAmt() {
      if (this.form.bizEntityJson.rdList === undefined) return
      let sum = 0
      if (this.form.bizEntityJson.rdList.length > 0) {
        this.form.bizEntityJson.rdList.forEach(item => {
          sum += Number(item.repaymentAmount)
        })
      }
      if(isNaN(sum)) sum = 0
      return sum
    },
    checkAmt() {
      if (!this.$route.query.id) return
      if (this.form.bizEntityJson.detailList === undefined) return
      let sum = 0
      if (this.form.bizEntityJson.detailList.length > 0) {
        this.form.bizEntityJson.detailList.forEach(item => {
          sum += (Number(item.accReduce) + Number(item.accReduce2))
        })
      }
      if(isNaN(sum)) sum = 0
      return sum
    },
    realAmt() {
      if (this.form.bizEntityJson.totalAmt === undefined) return
      if (this.form.bizEntityJson.lendAmt === undefined) return
      if (this.form.bizEntityJson.checkAmt === undefined) return
      if (this.form.bizEntityJson.advanceAmt === undefined || isNaN(this.form.bizEntityJson.advanceAmt)) return
      return Number(this.form.bizEntityJson.totalAmt) - Number(this.form.bizEntityJson.lendAmt) - Number(this.form.bizEntityJson.checkAmt) - (this.form.bizEntityJson.advanceAmt)
    }
  },
  watch: {
    totalAmt(val) {
      this.$set(this.form.bizEntityJson, 'totalAmt', val.toFixed(2))
    },
    lendAmt(val) {
      this.$set(this.form.bizEntityJson, 'lendAmt', val.toFixed(2))
    },
    checkAmt(val) {
      this.$set(this.form.bizEntityJson, 'checkAmt', val.toFixed(2))
    },
    realAmt(val) {
      if (Number(this.form.bizEntityJson.lendAmt) + Number(this.form.bizEntityJson.advanceAmt) > Number(this.form.bizEntityJson.totalAmt)) {
        this.$alert('冲抵借款不能比报销金额大,因为实付金额不能为负数', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (this.repaymentAmountIndex < 0) {
              this.form.bizEntityJson.advanceAmt = ''
            } else {
              this.form.bizEntityJson.rdList[this.repaymentAmountIndex].repaymentAmount = ''
            }
          }
        })
      } else {
        this.$set(this.form.bizEntityJson, 'realAmt', val.toFixed(2))
        // 缺票金额
        if (this.form.psv.accountFlg) this.$set(this.form.bizEntityJson, 'missingTicketAmount', val.toFixed(2))
      }
    },
    'form.bizEntityJson.rate'(val) {
      if (this.form.bizEntityJson.detailList === undefined) return
      if (this.form.bizEntityJson.detailList.length > 0) {
        this.form.bizEntityJson.detailList.forEach((item, index) => {
          if (this.form.bizEntityJson.currencyAmt != 'CNY') {
            item.standardMoney = (Number(item.currentAmt) * Number(val)).toFixed(2)
          }
        })
      }
    }
  },
  created() {
    if (!this.$route.query.id) {
      this.findCompanyByOrgCdInLoad()
      // this.findByDictTypeCd()
      this.userInfo = JSON.parse(localStorage.getItem('ys_contract_token'))
      this.$set(this.form.bizEntityJson, 'orgParentName', this.userInfo.centerOrgName)
      this.$set(this.form.bizEntityJson, 'centerOrgName', this.userInfo.orgName)
      this.$set(this.form.bizEntityJson, 'currencyAmt', 'CNY')
      this.$set(this.form.bizEntityJson, 'detailList', [])
      this.$set(this.form.bizEntityJson, 'rdList', [])
      this.$set(this.form.bizEntityJson, 'personnelBoolean', '1')
      this.$set(this.form.bizEntityJson, 'receiveAcctNo', '')
      this.$set(this.form.bizEntityJson, 'receiveBank', '中国工商银行')
      this.$set(this.form.bizEntityJson, 'sysBankCode', '102290071634')
      this.$set(this.form.bizEntityJson, 'currency2', '人民')
      this.$set(this.form.bizEntityJson, 'rate', 0.0.toFixed(5))
      this.$set(this.form.bizEntityJson, 'lendAmt', '')
      this.$set(this.form.bizEntityJson, 'checkAmt', '')
      this.$set(this.form.bizEntityJson, 'advanceAmt', '')
      this.$set(this.form, 'psv', {})
    } else {
      // 草稿或审批状态获取交通index
      if (this.form.bizEntityJson.detailList.length < 1) return
      this.form.bizEntityJson.detailList.forEach((item, index) => {
        // 记录费用名称为交通的index
        if (item.displayName == '交通') this.trafficIndex = index
      })
      // 办公资产入库单草稿和审批状态赋值
      if (this.form.bizEntityJson.preWorkAssetNo) {
        this.isShowWorkNo = true
      }
      // 合同评审编号草稿和审批状态赋值
      if (this.form.bizEntityJson.contractReviewNo) {
        this.isShowContractNo = true
      }
    }
    if (this.form.bizEntityJson.disabled) {
      this.findBusinessType()
    }
  },
  methods: {
    flitterData(arr) {
      let spanOneArr = [],
          spanTwoArr = [],
          concatOne = 0,
          concatTwo = 0
      arr.forEach((item, index) => {
        if(index === 0){
          spanOneArr.push(1)
          spanTwoArr.push(1)
        }else{
          // 费用中心需合并相同内容的判断条件
          if (item.fullPath === arr[index - 1].fullPath) {
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
          // 发票内容需合并相同内容的判断条件
          // if (item.accountSubjectName === arr[index - 1].accountSubjectName) {
          //   spanTwoArr[concatTwo] += 1
          //   spanTwoArr.push(0)
          // } else {
          //   spanTwoArr.push(1)
          //   concatTwo = index
          // }
        }
      })
      return  {
        one: spanOneArr,
        two: spanTwoArr
      }
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = (this.flitterData(this.form.bizEntityJson.detailList).one)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      // if (columnIndex === 3) {
      //   const _row = (this.flitterData(this.form.bizEntityJson.detailList).two)[rowIndex]
      //   const _col = _row > 0 ? 1 : 0
      //   return {
      //     rowspan: _row,
      //     colspan: _col
      //   }
      // }
    },
    findCompanyByOrgCdInLoad() {
      this.$approval.findCompanyByOrgCdInLoad().then(res => {
        if(res.code == 1 && res.message == 'success') {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'acctUnitName', res.data.companyName)
            this.$set(this.form.bizEntityJson, 'acctUnitCd', res.data.companyCode)
          } else {
            this.$set(this.form.bizEntityJson, 'acctUnitName', '')
            this.$set(this.form.bizEntityJson, 'acctUnitCd', '')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    findByDictTypeCd() {
      const param = {
        companyId: 1,
        dictTypeCdList: ['FIN_BZ']
      }
      this.$approval.findByDictTypeCd(param).then(res => {
        if(res.code == 1 && res.data) {
          this.currencyAmtOptions = res.data.FIN_BZ
          this.$set(this.form.bizEntityJson, 'currencyAmt', res.data.FIN_BZ[0].dictCd)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    findBusinessType() {
      const param = {
        approveId:this.$route.query.id,
        authTypeCd:'TEST_BX_YYK_10'
      }
      this.$approval.getFieldsByAuthTypeCd(param).then(res => {
        if(res.code == 1) {
          if (res.data) {
            this.$set(this.form.bizEntityJson, 'businessType', res.data.businessType)
          } else {
            this.$set(this.form.bizEntityJson, 'businessType', '')
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.postFindCompanyList({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.acctUnitNameOptions = res.data
            } else {
              this.acctUnitNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.acctUnitNameOptions = []
      }
    },
    remoteMethod2(query) {
      if (query) {
        this.loading = true
        this.$approval.quickSearchPreBill({resDisplayNo: query.replace(/\s*/g, '')}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.preResDisplayNoOptions = res.data
              this.preResDisplayNoOptions.unshift({
                resDisplayNo: '网批查询号',
                billName: '表单名称'
              })
              // feeCenter 费用中心
              // subjectDispName 费用名称
              // accountSubjectName 发票内容
              // preBudgetAmt 申请预算金额
              // budgetAgreeAmt 已报销金额
              // currentAmt 本次报销金额
              // isZzszyfp1 isZzszyfp2 增值税专用发票 是和否
              // currentAmt2 本次报销税额
              // accReduce 会计核减金额
              // accReduce2 会计核减税额
              // standardMoney 折本位币
            } else {
              this.preResDisplayNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.preResDisplayNoOptions = []
      }
    },
    remoteMethod3(query) {
      if (query) {
        this.loading = true
        this.$approval.findOfficeAssetEntryList({resDisplayNo: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.preWorkAssetNoOptions = res.data
              this.preWorkAssetNoOptions.unshift({
                displayNo: '网批号',
                userName: '发起人'
              })
            } else {
              // 查询数据中心
              this.$approval.findEsApprove(Object.assign({
                approveNo: query,
                processCode: 'XZRL_XZGL_150',
                status: '2'
              })).then(res => {
                if(res.code == 1) {
                  if (res.data.content.length > 0) {
                    res.data.content.forEach(item => {
                      this.preWorkAssetNoOptions = [];
                      this.preWorkAssetNoOptions.push(Object.assign({
                        displayNo:item.approveNo,
                        userName:item.startUserName
                      }))
                    })
                    this.preWorkAssetNoOptions.unshift({
                      displayNo: '网批号',
                      userName: '发起人'
                    })
                  } else {
                    this.preWorkAssetNoOptions = []
                  }
                } else {
                  this.$message.error(res.message)
                }
              })
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.preWorkAssetNoOptions = []
      }
    },
    remoteMethod4(query) {
      if (query) {
        this.loading = true
        this.$approval.findSapSup({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.assumeCompanyOptions = res.data
            } else {
              this.assumeCompanyOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.assumeCompanyOptions = []
      }
    },
    remoteMethod5(query) {
      if (query) {
        this.loading = true
        const param = {
          acctUnitName: this.form.bizEntityJson.acctUnitName,
          value: query.replace(/\s*/g, '')
        }
        this.$approval.quickSearchWithDisplayNo(param).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.wpIdOptions = res.data
              this.wpIdOptions.unshift({
                displayNo: '借款网批查询号',
                balance: '剩余还款金额(元)'
              })
            } else {
              this.wpIdOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.wpIdOptions = []
      }
    },
    remoteMethod6(query) {
      if (query) {
        this.loading = true
        this.$approval.findSapSup({companyName: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.receiveNameInOptions = res.data
            } else {
              this.receiveNameInOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.receiveNameInOptions = []
      }
    },
    acctUnitNameChange(val) {
      let obj = this.acctUnitNameOptions.find(item => item.companyName == val)
      this.form.bizEntityJson.acctUnitCd = obj ? obj.companyCode : ''
      this.form.bizEntityJson.rdList = []
      this.wpIdOptions = []
      if (!val) {
        this.form.bizEntityJson.whethersLendAmt = 'false'
        this.form.bizEntityJson.borrower = ''
        this.form.bizEntityJson.borrowCd = ''
      }
    },
    preResDisplayNoChange(val) {
      if (!val) return
      let obj = this.preResDisplayNoOptions.find(item => item.resDisplayNo == val)
      this.form.bizEntityJson.preBillName = obj ? obj.billName : ''
      this.form.bizEntityJson.feeApproveInfoId = obj ? obj.resApproveInfoId : ''
      this.form.bizEntityJson.detailList = []
      this.$approval.quickSearchPreBillDetail({resDisplayNo: val}).then(res => {
        this.isListingFees = false
        if(res.code == 1){
          if (res.data.isReimburse == 1) {
            this.form.bizEntityJson.detailList = res.data.detailList
            this.form.bizEntityJson.detailList.forEach((item, index) => {
              if(!this.showRatio){
                // 不处理包干比例逻辑则把ration设置成空，老pd后台不会走包干逻辑重新设置包干前金额和当前报销金额
                item.ratio = ""
              }else{
                if(item.isRatio != '' && item.isRatio == '1'){
                  item.ratioType = 'on'; // 老pd先判断ratio是否为空，再根据on设置isRatio=1
                }
                if(item.isRatio != null && item.isRatio != ''){
                    // 预算金额显示成包干前金额
                    item.budgetAmt = item.ratioAmt
                }
              }
              // 上市费用需要选择董秘办或者资本部
              if(item.displayName == '上市费用'){
                this.isListingFees = true
              }
              this.$set(this.form.bizEntityJson.detailList[index], 'currentAmt', 0.00.toFixed(2))
              this.$set(this.form.bizEntityJson.detailList[index], 'currentAmt2', 0.00.toFixed(2))
              // 提前插入折本位币修改汇率时进行实时计算
              this.$set(this.form.bizEntityJson.detailList[index], 'standardMoney', 0.00.toFixed(2))
              // 记录费用名称为交通的index
              if (item.displayName == '交通') this.trafficIndex = index
            })
            if (res.data.workAssetStatus == 1) {
              this.isShowWorkNo = true
            }else{
              this.isShowWorkNo = false
            }
            if (res.data.contractReview == 1) {
              this.isShowContractNo = true
            }else{
              this.isShowContractNo = false
            }
          } else {
            this.$message.error(res.data.noReimburseReason)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    preWorkAssetNoChange(val) {
      let obj = this.preWorkAssetNoOptions.find(item => item.displayNo == val)
      this.form.bizEntityJson.preUserName = obj ? obj.userName : ''
    },
    advanceAmtInput() {
      this.repaymentAmountIndex = -1
    },
    assumeCompanyChange(val) {
      let obj = this.assumeCompanyOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.assumeBukrs = obj ? obj.assumeBukrs : ''
      console.log(this.form.bizEntityJson.assumeBukrs)
    },
    wpIdChange(index, val) {
      if (val) {
        let obj = this.wpIdOptions.find(item => item.displayNo == val.trim())
        this.form.bizEntityJson.rdList[index].balance = obj.balance
        this.form.bizEntityJson.rdList[index].rdApproveInfoId = obj.resApproveInfoId
      } else {
        this.form.bizEntityJson.rdList[index].balance = ''
        this.form.bizEntityJson.rdList[index].repaymentAmount = ''
        this.form.bizEntityJson.rdList[index].rdApproveInfoId = ''
      }
    },
    receiveNameInChange(val) {
      let obj = this.receiveNameInOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.receiveCdIn = obj ? obj.assumeBukrs : ''
    },
    findBudgetUsedDetail(val) {
      this.$approval.findBudgetUsedDetail({orgCd: val.orgCd, subjectId: val. subjectId}).then(res => {
        if(res.code == 1){
          this.$alert(res.data.message, {
            confirmButtonText: '确定',
            callback: action => {
              console.log(res.data)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    accountSubjectNameChange(index, val) {
      if (val) {
        let obj = this.accountSubjectNameOptions.find(item => item.accountSubjectName == val)
        this.form.bizEntityJson.detailList[index].accountSubjectCode = obj.accountSubjectCode
        this.findBusinessType()
      } else {
        this.form.bizEntityJson.detailList[index].accountSubjectName = ''
        this.form.bizEntityJson.detailList[index].accountSubjectCode = ''
      }
    },
    findSubjectByOrgCd(val, status) {
      if (status) {
        this.isLoading = true
        this.$approval.findSubjectByOrgCd({orgCd: val.orgCd}).then(res => {
          if(res.code == 1){
            setTimeout(() => {
              this.isLoading = false
              this.accountSubjectNameOptions = res.data
            }, 500)
          } else {
            this.isLoading = false
            this.$message.error(res.message)
          }
        })
      }
    },
    currentAmtChange(index, val) {
      if (this.form.bizEntityJson.currencyAmt == 'CNY') {
        if (Number(val) < Number(this.form.bizEntityJson.detailList[index].currentAmt2)) {
          this.$alert('税额不能大于金额!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.form.bizEntityJson.detailList[index].currentAmt2 = 0.00.toFixed(2)
            }
          })
        }
      }
    },
    currentAmt2Change(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.detailList[index].currentAmt)) {
        this.$alert('税额不能大于金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.detailList[index].currentAmt2 = 0.00.toFixed(2)
          }
        })
      }
    },
    accReduceChange(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.detailList[index].currentAmt)) {
        this.$alert('核减金额不能大于报销金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.detailList[index].accReduce = 0.00.toFixed(2)
          }
        })
      }
      this.accReduceIndex = index
      this.accReduce2Index = -1
    },
    accReduce2Change(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.detailList[index].currentAmt2)) {
        this.$alert('核减税额不能大于报销税额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.detailList[index].accReduce2 = 0.00.toFixed(2)
          }
        })
      }
      this.accReduce2Index = index
      this.accReduceIndex = -1
    },
    whethersLendAmtChange(val) {
      if(!this.form.bizEntityJson.acctUnitName) {
        this.$alert('请先输入报销/入账公司', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.whethersLendAmt = 'false'
          }
        })
      } else {
        this.add()
      }
      if (val == 'false') this.form.bizEntityJson.rdList = []
    },
    repaymentAmountChange(item, index) {
      this.repaymentAmountIndex = index
      if(!item.wpId) {
        this.$alert('请先选择您的借款网批号，再输入还款金额！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            item.repaymentAmount = ''
          }
        })
      } else if(Number(item.repaymentAmount) > Number(item.balance)) {
        this.$alert('温馨提示，还款金额不能大于剩余应还金额......', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            item.repaymentAmount = ''
          }
        })
      }
    },
    isMissingTicketChange(val) {
      if (val == 'true') {
        // 缺票金额
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', this.form.bizEntityJson.realAmt)
      } else {
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', '')
        this.form.bizEntityJson.giveBackDate = ''
      }
    },
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.borrower = val.userName
        this.form.bizEntityJson.borrowCd = val.userCd
      }
      this.showSearchUser1 = false
    },
    closeSearhUser2(val) {
      if (val) {
        this.form.bizEntityJson.receiveAcctNo = ''
        this.form.bizEntityJson.receiveNameTrue = val.userName
        this.form.bizEntityJson.receiveCd = val.userCd
        this.$approval.findBankAccountByUserId({userId: val.userCd}).then(res => {
          if(res.code == 1){
            this.bankAccountList = res.data || []
            if (res.data[0]) this.form.bizEntityJson.receiveAcctNo = this.bankAccountList[0].accountNum
          } else {
            this.$message.error(res.message)
          }
        })
      }
      this.showSearchUser2 = false
    },
    closeTrafficCostDetail(val) {
      if (val) {
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpTaxPrice = Number(val.zzszpTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpTaxNoPrice = Number(val.zzszpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpTaxRatePrice = Number(val.zzszpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpKjhjPrice = Number(val.zzszpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpKjhjTax = Number(val.zzszpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppTaxPrice = Number(val.zzsppTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppTaxNoPrice = Number(val.zzsppTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppTaxRatePrice = Number(val.zzsppTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppKjhjPrice = Number(val.zzsppKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppKjhjTax = Number(val.zzsppKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpTaxPrice = Number(val.jpTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpTaxNoPrice = Number(val.jpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpTaxRatePrice = Number(val.jpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpKjhjPrice = Number(val.jpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpKjhjTax = Number(val.jpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpTaxPrice = Number(val.hcpTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpTaxNoPrice = Number(val.hcpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpTaxRatePrice = Number(val.hcpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpKjhjPrice = Number(val.hcpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpKjhjTax = Number(val.hcpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glTaxPrice = Number(val.glTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glTaxNoPrice = Number(val.glTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glTaxRatePrice = Number(val.glTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glKjhjPrice = Number(val.glKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glKjhjTax = Number(val.glKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtTaxPrice = Number(val.qtTaxPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtTaxNoPrice = Number(val.qtTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtTaxRatePrice = Number(val.qtTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtKjhjPrice = Number(val.qtKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtKjhjTax = Number(val.qtKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].sumTaxPrice = val.sumTaxPrice
        this.form.bizEntityJson.detailList[this.trafficIndex].sumTaxNoPrice = val.sumTaxNoPrice
        this.form.bizEntityJson.detailList[this.trafficIndex].sumTaxRatePrice = val.sumTaxRatePrice
        this.form.bizEntityJson.detailList[this.trafficIndex].sumKjhjPrice = val.sumKjhjPrice
        this.form.bizEntityJson.detailList[this.trafficIndex].sumKjhjTax = val.sumKjhjTax
        // 本次报销金额、税额赋值
        this.$set(this.form.bizEntityJson.detailList[this.trafficIndex], 'currentAmt', val.sumTaxNoPrice)
        this.$set(this.form.bizEntityJson.detailList[this.trafficIndex], 'currentAmt2', val.sumTaxRatePrice)
      }
      console.log( this.form.bizEntityJson.detailList)
      this.showTrafficCostDetail = false
    },
    closeTrafficCostDetail2(val) {
      if (val) {
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpKjhjPrice = Number(val.zzszpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzszpKjhjTax = Number(val.zzszpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppKjhjPrice = Number(val.zzsppKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].zzsppKjhjTax = Number(val.zzsppKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpKjhjPrice = Number(val.jpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].jpKjhjTax = Number(val.jpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpKjhjPrice = Number(val.hcpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].hcpKjhjTax = Number(val.hcpKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glKjhjPrice = Number(val.glKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].glKjhjTax = Number(val.glKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtKjhjPrice = Number(val.qtKjhjPrice).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].qtKjhjTax = Number(val.qtKjhjTax).toFixed(2)
        this.form.bizEntityJson.detailList[this.trafficIndex].sumKjhjPrice = val.sumKjhjPrice
        this.form.bizEntityJson.detailList[this.trafficIndex].sumKjhjTax = val.sumKjhjTax
        // 会计核减金额、税额赋值
        this.$set(this.form.bizEntityJson.detailList[this.trafficIndex], 'accReduce', val.sumKjhjPrice)
        this.$set(this.form.bizEntityJson.detailList[this.trafficIndex], 'accReduce2', val.sumKjhjTax)
      }
      this.showTrafficCostDetail2 = false
    },
    closeSelectBank(val) {
      if (val) {
        this.form.bizEntityJson.receiveBank = val.bankName
        this.form.bizEntityJson.sysBankCode = val.bankCode
      }
      this.showSelectBank = false
    },
    add() {
      const newData = {
        wpId: '',
        balance: '',
        repaymentAmount: ''
      }
      this.form.bizEntityJson.rdList.push(newData)
    },
    del(index) {
      this.form.bizEntityJson.rdList.splice(index, 1)
    },
    // 页面发起时校验
    async yykCheck() {
      if (Number(this.form.bizEntityJson.totalAmt) == 0) {
        this.$message.closeAll()
        this.$message.error('价税合计不能为0')
        return false
      }
      if (this.form.bizEntityJson.rdList[0]) {
        const ids = this.form.bizEntityJson.rdList.map(item => item.wpId)
        const idsSet = new Set(ids)
        if (idsSet.size != ids.length) {
          this.$message.closeAll()
          this.$message.error('还款明细不能重复使用同一个借款网批号')
          return false
        }
      }
      this.isYykCheck = true
      // 包干比例校验
      let orgCds =[];
      this.form.bizEntityJson.detailList.forEach(item => {
        if(orgCds.indexOf(item.orgCd) == -1){
          orgCds.push(item.orgCd)
        }
      })
      let resOrgCd = await this.$approval.checkRatioByOrgCds(orgCds)
      if(resOrgCd.code == 1) {
        if (resOrgCd.data && resOrgCd.data != '') {
          this.$alert(resOrgCd.data, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false
            }
          })
          this.isYykCheck = false
        }
      } else {
        this.$message.closeAll()
        this.$message.error(resOrgCd.message)
        this.isYykCheck = false
      }
      // 发起时获取已报销金额和申请预算金额校验输入值是否符合情况
      let res = await this.$approval.quickSearchPreBillDetail({resDisplayNo: this.form.bizEntityJson.preResDisplayNo})
      if(res.code == 1){
        if (!res.data) return this.isYykCheck = false
        // 可以报销
        if (res.data.isReimburse == 1) {
          if (res.data.checkPlateResult == 1) {
            var nameLength = ''
            if (this.form.bizEntityJson.personnelBoolean == 1) {
              nameLength = this.form.bizEntityJson.receiveNameTrue.replace(/[^x00-xFF]/g, '**').length
            } else if (this.form.bizEntityJson.personnelBoolean == 0) {
              nameLength = this.form.bizEntityJson.receiveName.replace(/[^x00-xFF]/g, '**').length
            } else {
              nameLength = this.form.bizEntityJson.receiveNameIn.replace(/[^x00-xFF]/g, '**').length
            }
            if (nameLength > 0 && nameLength <= 8) {
              this.$message.closeAll()
              this.$message.error('报销协议单位接待费，收款人不能填写个人姓名！')
              this.isYykCheck = false
            }
          }
          for(let index in res.data.detailList) {
            // 2045 待摊,168 决策层,当费用承担部门是这两个时,不控预算
            if (res.data.detailList[index].orgCd == 168 || res.data.detailList[index].orgCd == 2045) return
            let ratio = 100;
            if(this.showRatio){
              ratio = this.form.bizEntityJson.detailList[index].ratio
            }
            // 包干比例系数，没有就是1
            let ratioValue = (Number(ratio)/100)
            // 实报实销
            if (res.data.detailList[index].realExecFlg == 1) {
              await this.$approval.findBudgetUsedDetail({orgCd: res.data.detailList[index].orgCd, subjectId: res.data.detailList[index].subjectId}).then(res => {
                if(res.code == 1){
                  if (this.form.bizEntityJson.currencyAmt == 'CNY') {
                    // 本次报销金额+本次报销税额不能大于剩余预算
                    if (Number(ratioValue * (Number(this.form.bizEntityJson.detailList[index].currentAmt) + Number(this.form.bizEntityJson.detailList[index].currentAmt2))).toFixed(2) > Number(res.data.remainderBudget)) {
                      this.$alert(`预算不够请检查，预算可用为：${res.data.remainderBudget}元`, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                          return false
                        }
                      })
                      this.isYykCheck = false
                    }
                  } else {
                    // 折本位币不能大于剩余预算
                    if (Number(ratioValue * (Number(this.form.bizEntityJson.detailList[index].standardMoney))).toFixed(2) > Number(res.data.remainderBudget)) {
                      this.$alert(`预算不够请检查，预算可用为：${res.data.remainderBudget}元`, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                          return false
                        }
                      })
                      this.isYykCheck = false
                    }
                  }
                } else {
                  this.$message.closeAll()
                  this.$message.error(res.message)
                  this.isYykCheck = false
                }
              })
            } else {
              if (this.form.bizEntityJson.currencyAmt == 'CNY') {
                if (res.data.detailList[index].displayName != '交通') {
				  // 发起时获取接口已报销金额+本次报销金额+本次报销税额不能大于发起时获取接口申请预算金额
                  if (Number(res.data.detailList[index].agreeAmt) + Number(Number(ratioValue * (Number(this.form.bizEntityJson.detailList[index].currentAmt) + Number(this.form.bizEntityJson.detailList[index].currentAmt2))).toFixed(2)) > Number(res.data.detailList[index].budgetAmt)) {
                    this.$message.closeAll()
                    this.$message.error('本次【'+res.data.detailList[index].displayName+'】报销金额超过申请预算金额，请确认!')
                    this.isYykCheck = false
                  }
                }
              } else {
                if (res.data.detailList[index].displayName != '交通') {
                  // 发起时获取接口已报销金额+折本位币不能大于发起时获取接口申请预算金额
                  if (Number(res.data.detailList[index].agreeAmt) + Number(Number(ratioValue * (Number(this.form.bizEntityJson.detailList[index].standardMoney))).toFixed(2)) > Number(res.data.detailList[index].budgetAmt)) {
                    this.$message.closeAll()
                    this.$message.error('本次【'+res.data.detailList[index].displayName+'】报销金额超过申请预算金额，请确认!')
                    this.isYykCheck = false
                  }
                }
              }
            }
          }
        } else {
          this.$message.closeAll()
          this.$message.error(res.data.noReimburseReason)
          this.isYykCheck = false
        }
      } else {
        this.$message.closeAll()
        this.$message.error(res.message)
        this.isYykCheck = false
      }
      // 报销类型为其他时，价税合计需要数字类型通过后端校验
      this.form.bizEntityJson.totalAmt = Number(this.form.bizEntityJson.totalAmt)
      if (!this.isYykCheck) {
        return false
      }
    },
    validate() {
      this.form.bizEntityJson.detailList.forEach(item => {
        if(!item.accReduce){
          item.accReduce = '0'
        }
        if(this.form.bizEntityJson.currencyAmt != 'CNY'){
          item.currentAmt2 = '0'
        }
        if (this.form.bizEntityJson.currencyAmt == 'CNY') {
          if (item.currentAmt.indexOf('.') == - 1) {
            item.currentAmt = item.currentAmt + '.00'
          } else {
            if (item.currentAmt.charAt(item.currentAmt.length - 2) == '.') {
              item.currentAmt = item.currentAmt + '0'
            }
          }
          if (item.currentAmt2.indexOf('.') == - 1) {
            item.currentAmt2 = item.currentAmt2 + '.00'
          } else {
            if (item.currentAmt2.charAt(item.currentAmt2.length - 2) == '.') {
              item.currentAmt2 = item.currentAmt2 + '0'
            }
          }
        }
      })
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
