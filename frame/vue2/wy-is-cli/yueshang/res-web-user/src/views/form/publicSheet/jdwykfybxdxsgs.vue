<template>
  <!-- 酒店下属公司无预控费用报销单 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]">
    <el-row :gutter="24" class="top-row green-row">
      <dl-col :span="24" place="right">
          <d-radio-group-string
            v-model="form.bizEntityJson"
            :nameList="[{label:'自营酒店',name:'positionLevel3'},
                        {label:'委托酒店',name:'positionLevel4'}
                      ]"
          />
        </dl-col>

        <dl-col :span="24" place="right">
          <d-radio-group-string
            v-model="form.bizEntityJson"
            :nameList="[{label:'第一负责人',name:'positionLevel1'},
                        {label:'其他人员',name:'positionLevel2'}
                      ]"
          />
        </dl-col>

        <dl-col :span="24" :novalue="form.bizEntityJson.ctype1 != 'true' && form.bizEntityJson.ctype2 != 'true'">
          <d-radio-group-string
            v-model="form.bizEntityJson"
            :nameList="[{label:'个人费用',name:'ctype1'},
                        {label:'其他支出',name:'ctype2'}
                      ]"
          />
        </dl-col>
    </el-row>

    <el-row class="top-row margin-row blue-row">
        <dl-col :span="4" >
          <div class="explain-p">
            <p class="explain-p-one">*入账公司可自行切换</p>
          </div>
        </dl-col>

        <el-col :span="4" class="top-row">
          <div class="d-min">
            <el-checkbox v-model="form.bizEntityJson.strFrame" @change="strFrameChange" true-label="true" false-label="false">依据战略框架</el-checkbox>
          </div>
        </el-col>

        <dl-col v-if="form.bizEntityJson.strFrame == 'true'" :span="16" title="框架合同附件" place="right" :novalue="!form.bizEntityJson.strFrameId">
          <one-file :form="form" value="strFrameId" />
        </dl-col>

        <dl-col :span="16" v-else class="right-col">
          <div class="d-min">
          </div>
        </dl-col>

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
            <span>币种</span>
            <el-select :class="{'novalue': !form.bizEntityJson.currencyAmt, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.currencyAmt" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
              <el-option label="人民币" value="CNY"></el-option>
              <el-option label="美元" value="USD"></el-option>
              <el-option label="港元" value="HKD"></el-option>
              <el-option label="欧元" value="EUR"></el-option>
              <el-option label="新加坡币" value="SGD"></el-option>
              <el-option label="英镑" value="GBP"></el-option>
              <el-option label="澳门币" value="MOP"></el-option>
              <el-option label="日元" value="JPY"></el-option>
              <!-- <el-option
                v-for="item in currencyAmtOptions"
                :key="item.dictCd"
                :label="item.dictName"
                :value="item.dictCd">
              </el-option> -->
            </el-select>
          </div>
        </el-col>
        <el-col :span="12" class="right-col">
          <div class="d-min">
            <span v-if="form.bizEntityJson.currencyAmt != 'CNY'">汇率(保留5位小数)</span>
            <el-input v-if="form.bizEntityJson.currencyAmt != 'CNY'" :class="{'novalue': !form.bizEntityJson.rate, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.rate" v-limit-number="5" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
          </div>
        </el-col>

        <el-col :span="8" class="title-col">
          <h2>报销信息</h2>
        </el-col>
        <el-col :span="8">
          <div class="explain-p">
            <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled && form.bizEntityJson.billList.length < 20" class="explain-btn-add" @click="addList">添加</span></p>
          </div>
        </el-col>
        <el-col :span="8" class="right-col">
          <div class="explain-p">
            <p class="explain-p-one"><span v-if="!form.bizEntityJson.disabled" class="explain-btn-add" @click="findMoreBudgetUsedDetail">查询实时预算</span></p>
          </div>
        </el-col>
        <el-col :span="24" class="table-col right-col table-checkbox">
          <el-table ref="table" :data="form.bizEntityJson.billList" size="mini" border stripe header-row-class-name="table-header">
            <el-table-column label="费用承担部门" prop="fullPath">
              <template slot-scope="scope">
                <span class="show-print">{{ scope.row.fullPath }}</span>
                <el-input class="no-print" :class="{'novalue': !scope.row.fullPath, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.fullPath" @focus="showSearchOrg = true; selectIndex = scope.$index" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="场景" prop="sceneName" class-name="no-print">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.sceneName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.sceneName" @focus="showScene = true; trafficIndex = scope.$index" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column label="发票内容" prop="billContent">
              <template slot-scope="scope">
                <el-select v-if="form.psv.accountFlg" v-model="scope.row.billContent" @change="accountSubjectNameChange(scope.$index, $event)" @visible-change="findSubjectByOrgCd(scope.row, $event)" :loading="isLoading" filterable placeholder="请选择">
                  <el-option
                    v-for="item in accountSubjectNameOptions"
                    :key="item.accountSubjectName"
                    :label="item.accountSubjectName"
                    :value="item.accountSubjectName">
                  </el-option>
                </el-select>
                <span v-else>
                  <el-input :class="{'novalue': !scope.row.billContent, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.billContent" readonly></el-input>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="单据数" prop="billNum">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.billNum, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.billNum" v-limit-number="0" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="form.bizEntityJson.currencyAmt == 'CNY' ? '本次报销金额(A)(元)' : '本次报销金额(原币)(元)'" prop="currentAmt">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectName == '差旅费' || scope.row.subjectName == '市内交通费'" :class="{'novalue': !scope.row.currentAmt, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.currentAmt" @focus="showTrafficCostDetail = true; form.bizEntityJson.disabled ? reveal = true : reveal = false ; trafficIndex = scope.$index" :yykDisabled="form.bizEntityJson.disabled ? true : false"  readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                <el-input v-else :class="{'novalue': !scope.row.currentAmt, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.currentAmt" @change="currentAmtChange(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="form.bizEntityJson.currencyAmt == 'CNY'" min-width="90" label="增值税专用发票">
              <template slot-scope="scope">
                <div v-if="scope.row.subjectName == '差旅费' || scope.row.subjectName == '市内交通费'">
                  <span>/</span>
                </div>
                <div v-else :class="{'novalue': scope.row.isZzszyfp1 != 'true' && scope.row.isZzszyfp2 != 'true', 'required': !form.bizEntityJson.disabled}">
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
                <el-input v-if="scope.row.subjectName == '差旅费' || scope.row.subjectName == '市内交通费'" v-model="scope.row.currentAmt2" @focus="showTrafficCostDetail = true; form.bizEntityJson.disabled ? reveal = true : reveal = false ;trafficIndex = scope.$index" :yykDisabled="form.bizEntityJson.disabled ? true : false"  readonly :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                <div v-else>
                  <el-input v-if="scope.row.isZzszyfp1 == 'true'" :class="{'novalue': !scope.row.currentAmt2, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.currentAmt2" @change="currentAmt2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                  <el-input v-else v-model="scope.row.currentAmt2" @change="currentAmt2Change(scope.$index, $event)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="form.bizEntityJson.currencyAmt != 'CNY'" label="折本位币(预算扣减金额)" prop="standardMoney">
              <template slot-scope="scope">
                <el-input v-model="scope.row.standardMoney" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column label="说明" prop="billMemo">
              <template slot-scope="scope">
                <el-input v-model="scope.row.billMemo" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="会计核减金额" prop="accReduce">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectName == '差旅费' || scope.row.subjectName == '市内交通费'" v-model="scope.row.accReduce" @focus="showTrafficCostDetail2 = true" readonly :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
                <el-input v-else v-model="scope.row.accReduce" @change="accReduceChange(scope.$index)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.psv.accountFlg" :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="会计核减税额" prop="accReduce2">
              <template slot-scope="scope">
                <el-input v-if="scope.row.subjectName == '差旅费' || scope.row.subjectName == '市内交通费'" v-model="scope.row.accReduce2" @focus="showTrafficCostDetail2 = true" readonly :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
                <el-input v-else v-model="scope.row.accReduce2" @change="accReduce2Change(scope.$index)" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :readonly="!form.psv.accountFlg" :yykReadonly="form.psv.accountFlg ? true : false" :placeholder="form.psv.accountFlg ? '请输入' : ''"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="预算科目" prop="subjectName" class-name="no-print">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.subjectName, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.subjectName" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column label="费用实质" prop="realDesc" class-name="no-print">
              <template slot-scope="scope">
                <el-input :class="{'novalue': !scope.row.realDesc, 'required': !form.bizEntityJson.disabled}" v-model="scope.row.realDesc" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="70" v-if="!form.bizEntityJson.disabled">
              <template slot-scope="scope">
                <span v-if="scope.$index > 0" style="color: #EF2941; cursor: pointer;" @click="remove(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <dl-col :span="24" class="show-print" place="right">
          <p class="explain-p-one">价税合计(A+B)(元)　{{ form.bizEntityJson.totalAmt }}　(大写) {{ form.bizEntityJson.currency1 }}币 {{ form.bizEntityJson.totalAmt === '' || form.bizEntityJson.totalAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.totalAmt) }}</p>
        </dl-col>
        <el-col :span="12" class="no-print">
          <div class="d-min">
            <span>价税合计(A+B)(元)</span>
            <el-input v-model="form.bizEntityJson.totalAmt" readonly></el-input>
          </div>
        </el-col>
        <el-col :span="12" class="right-col no-print">
          <div class="d-min">
            <span style="display: flex;">
              (大写)
              <el-input v-model="form.bizEntityJson.currency1" style="margin: 0 10px;"></el-input>
              币
            </span>
            <el-input :value="form.bizEntityJson.totalAmt === '' || form.bizEntityJson.totalAmt === undefined ? '千 佰 拾 万 仟 佰 拾 元 角 分' : convertCurrency(form.bizEntityJson.totalAmt)" readonly></el-input>
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
            <el-input v-if="form.bizEntityJson.whethersLendAmt == 'true'" :class="{'novalue': !form.bizEntityJson.borrow, 'required': !form.bizEntityJson.disabled}" v-model="form.bizEntityJson.borrow" @focus="showSearchUser1 = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"></el-input>
          </div>
        </el-col>
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
        <dl-col :span="24" class="show-print" place="right" style="font-size:18px;">
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
                <p v-if="!form.bizEntityJson.disabled" class="explain-p-one" @click="del(index)"><span class="explain-btn-del">删除</span></p>
              </div>
            </el-col>
          </div>
        </div>
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
      <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" @close="closeSearhOrg"></search-org>
      <select-scene :open="showScene && !form.bizEntityJson.disabled" :plate="6" @close="closeScene"></select-scene>
      <search-user :key="1" :open="showSearchUser1 && !form.bizEntityJson.disabled" @close="closeSearhUser1"></search-user>
      <search-user :key="2" :open="showSearchUser2 && !form.bizEntityJson.disabled" @close="closeSearhUser2"></search-user>
      <trafficCostDetail :key="3" :open="showTrafficCostDetail" :detail="form.bizEntityJson.billList[this.trafficIndex]" :reveal="reveal" @close="closeTrafficCostDetail"></trafficCostDetail>
      <trafficCostDetail :key="4" :open="showTrafficCostDetail2 && form.psv.accountFlg" :detail="form.bizEntityJson.billList[this.trafficIndex]" :accountFlg="form.psv.accountFlg" :realAmt="form.bizEntityJson.realAmt" @close="closeTrafficCostDetail2"></trafficCostDetail>
      <select-bank :open="showSelectBank && !form.bizEntityJson.disabled" @close="closeSelectBank"></select-bank>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      fileDetail: null,
      isNoValue: false,
      showScene:false,
      showSearchOrg: false,
      showSearchUser1: false,
      showSearchUser2: false,
      showTrafficCostDetail: false,
      showTrafficCostDetail2: false,
      showSelectBank: false,
      loading: false,
      acctUnitNameOptions: [],
      currencyAmtOptions: [],
      accountSubjectNameOptions: [],
      assumeCompanyOptions: [],
      bankAccountList: [],
      wpIdOptions: [],
      receiveNameInOptions: [],
      repaymentAmountIndex: '',
      accReduceIndex: '',
      accReduce2Index: '',
      selectIndex: '',
      isYykCheck: true,
      isLoading: false,
      trafficIndex: '',
      userInfo: {},
      reveal: false,
    }
  },
  props: ['data'],
  computed: {
    totalAmt() {
      if (this.form.bizEntityJson.billList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.billList.length > 0) {
        console.log(this.form.bizEntityJson.billList)
        this.form.bizEntityJson.billList.forEach(item => {
          if (this.form.bizEntityJson.currencyAmt == 'CNY') {
            sum += ((item.currentAmt ? Number(item.currentAmt):0) + (item.currentAmt2 ? Number(item.currentAmt2):0))
          } else {
            sum += ((item.currentAmt ? Number(item.currentAmt):0) * Number(this.form.bizEntityJson.rate))
            item.standardMoney = ((item.currentAmt ? Number(item.currentAmt):0) * Number(this.form.bizEntityJson.rate)).toFixed(2)
          }
        })
      }
      return sum
    },
    lendAmt() {
      if (this.form.bizEntityJson.rdList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.rdList.length > 0) {
        this.form.bizEntityJson.rdList.forEach(item => {
          sum += Number(item.repaymentAmount)
        })
      }
      return sum
    },
    checkAmt() {
      if (!this.$route.query.id) return
      if (this.form.bizEntityJson.billList === undefined) return
      let sum = 0
      if (sum === NaN) sum = 0
      if (this.form.bizEntityJson.billList.length > 0) {
        this.form.bizEntityJson.billList.forEach(item => {
          sum += (Number(item.accReduce) + Number(item.accReduce2))
        })
      }
      return sum
    },
    realAmt() {
      if (this.form.bizEntityJson.totalAmt === undefined) return
      if (this.form.bizEntityJson.lendAmt === undefined) return
      if (this.form.bizEntityJson.checkAmt === undefined) return
      if (this.form.bizEntityJson.advanceAmt === undefined || isNaN(this.form.bizEntityJson.advanceAmt)) return
      return Number(this.form.bizEntityJson.totalAmt) - Number(this.form.bizEntityJson.lendAmt) - Number(this.form.bizEntityJson.checkAmt) - (this.form.bizEntityJson.advanceAmt)
    },
  },
	watch: {  
		data: {
			immediate: true,
			handler: function(val) {
				console.log(val)
				this.form = val;
			}
    },
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
      console.log(val)
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
      } else if (Number(this.form.bizEntityJson.checkAmt) > Number(val)) {
        this.$alert('会计核减不能比实付金额大,因为实付金额不能为负数', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (this.accReduceIndex < 0) {
              this.form.bizEntityJson.billList[this.accReduce2Index].accReduce2 = ''
            } else {
              this.form.bizEntityJson.billList[this.accReduceIndex].accReduce = ''
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
      if (this.form.bizEntityJson.billList === undefined) return
      if (this.form.bizEntityJson.billList.length > 0) {
        this.form.bizEntityJson.billList.forEach((item, index) => {
          if (this.form.bizEntityJson.currencyAmt != 'CNY') {
            item.standardMoney = ((item.currentAmt ? Number(item.currentAmt):0) * Number(val)).toFixed(2)
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
      this.$set(this.form.bizEntityJson, 'billList', [])
      this.selectSubjectBySceneId(this.$route.query.costBxSceneConfigId, 0)
      this.addList()
      this.$set(this.form.bizEntityJson, 'rdList', [])
      this.$set(this.form.bizEntityJson, 'personnelBoolean', '1')
      this.$set(this.form.bizEntityJson, 'receiveAcctNo', '')
      this.$set(this.form.bizEntityJson, 'receiveBank', '中国工商银行')
      this.$set(this.form.bizEntityJson, 'sysBankCode', '102290071634')
      this.$set(this.form.bizEntityJson, 'currency1', '人民')
      this.$set(this.form.bizEntityJson, 'currency2', '人民')
      this.$set(this.form.bizEntityJson, 'rate', 0.0.toFixed(5))
      this.$set(this.form.bizEntityJson, 'lendAmt', '')
      this.$set(this.form.bizEntityJson, 'checkAmt', '')
      this.$set(this.form.bizEntityJson, 'advanceAmt', '')
      this.$set(this.form.bizEntityJson, 'costBxSceneConfigId',this.$route.query.costBxSceneConfigId )
      this.$set(this.form, 'psv', {})
    } else {
      // 草稿或审批状态获取交通index
      if (this.form.bizEntityJson.billList.length < 1) return
      this.form.bizEntityJson.billList.forEach((item, index) => {
        // 记录费用名称为交通的index
        if (item.subjectName == '差旅费' || item.subjectName == '市内交通费') this.trafficIndex = index
      })
    }
    if (this.form.bizEntityJson.disabled) {
      this.findBusinessType()
    }
  },
  mounted() {
  },
  methods: {
    delFile(index) {
      if (index == 1) {
        this.fileDetail = ''
        this.form.bizEntityJson.fileId = ''
      } else {
        this.form.allEntityFileIds.fileId = []
        this.form.bizEntityJson.fileId = ''
      }
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file, 1)()
    },
    selectSubjectBySceneId(id, index){
      // if (!this.$route.query.costBxSceneConfigId && !id) return
      const param = {
        sceneConfigId: id
      }
      this.$approval.selectSubjectBySceneId(param).then(res => {
         if(res.code == 1 && res.data) {
          this.$set(this.form.bizEntityJson.billList[index], 'sceneName', res.data.sceneName)
          this.$set(this.form.bizEntityJson.billList[index], 'billContent', res.data.accountName)
          this.$set(this.form.bizEntityJson.billList[index], 'subjectName', res.data.subjectName)
          this.$set(this.form.bizEntityJson.billList[index], 'subjectId', res.data.finBudgetSubjectId)
          this.$set(this.form.bizEntityJson.billList[index], 'billItemId', res.data.finBudgetSubjectId)
         } else {
          this.$message.error(res.message)
        }
      })
    },
    findMoreBudgetUsedDetail(){
      var paramList = []
      var orgList = []
      var resultList = []
      this.form.bizEntityJson.billList.forEach(item => {
        orgList.push({
           orgCd: item.orgCd,
           subjectName: item.subjectName
        })
      })

      this.$approval.getSubjectCdByOrgCd(orgList).then(res => {
         if(res.code == 1 && res.data) {
           res.data.forEach(item => { 
              resultList.push(item)
           })

          this.form.bizEntityJson.billList.forEach((item,index) => {
                console.log(index)
                paramList.push({
                orgCd: item.orgCd,
                billAmount: (Number(item.currentAmt)) + (Number(item.currentAmt2)),
                subjectName: item.subjectName,
                subjectId: resultList[index]
              })
            })

            this.$approval.findMoreBudgetUsedDetail(paramList).then(res => {
                if(res.code == 1 && res.data) {
                    this.$alert(res.data.massage, {
                    confirmButtonText: '确定',
                  })
                }else {
                  this.$message.error(res.message)
                }
              })
         }else {
           this.$message.error('没有找到预算科目，请配置预算')
        }
      }) 
    },
    findCompanyByOrgCdInLoad() {
      this.$approval.findCompanyByOrgCdInLoad().then(res => {
        if(res.code == 1 && res.data) {
          this.$set(this.form.bizEntityJson, 'acctUnitName', res.data.companyName)
          this.$set(this.form.bizEntityJson, 'acctUnitCd', res.data.companyCode)
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
        authTypeCd:'JD_WYK_XSGS'
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
          value: query
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
        this.form.bizEntityJson.borrow = ''
        this.form.bizEntityJson.borrowCd = ''
      }
    },
    advanceAmtInput() {
      this.repaymentAmountIndex = -1
    },
    assumeCompanyChange(val) {
      let obj = this.assumeCompanyOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.assumeBukrs = obj ? obj.assumeBukrs : ''
    },
    wpIdChange(index, val) {
      if (val) {
        let obj = this.wpIdOptions.find(item => item.displayNo == val)
        this.form.bizEntityJson.rdList[index].balance = obj.balance
      } else {
        this.form.bizEntityJson.rdList[index].balance = ''
        this.form.bizEntityJson.rdList[index].repaymentAmount = ''
      }
    },
    receiveNameInChange(val) {
      let obj = this.receiveNameInOptions.find(item => item.assumeCompany == val)
      this.form.bizEntityJson.receiveCdIn = obj ? obj.assumeBukrs : ''
    },
    findBudgetUsedDetail(val) {
      this.$approval.findBudgetUsedDetail({orgCd: val.orgCd, subjectId: val.subjectId}).then(res => {
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
        let obj = this.accountSubjectNameOptions.find(item => item.billContent == val)
        this.form.bizEntityJson.billList[index].accountSubjectCode = obj.accountSubjectCode
        this.findBusinessType()
      } else {
        this.form.bizEntityJson.billList[index].billContent = ''
        this.form.bizEntityJson.billList[index].accountSubjectCode = ''
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
        if (Number(val) < Number(this.form.bizEntityJson.billList[index].currentAmt2)) {
          this.$alert('税额不能大于金额!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.form.bizEntityJson.billList[index].currentAmt2 = 0.00.toFixed(2)
            }
          })
        }
      }
    },
    currentAmt2Change(index, val) {
      if (Number(val) > Number(this.form.bizEntityJson.billList[index].currentAmt)) {
        this.$alert('税额不能大于金额!', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.billList[index].currentAmt2 = 0.00.toFixed(2)
          }
        })
      }
    },
    accReduceChange(index) {
      this.accReduceIndex = index
      this.accReduce2Index = -1
    },
    accReduce2Change(index) {
      this.accReduce2Index = index
      this.accReduceIndex = -1
    },
    addList() {
      var newData;
      if(this.form.bizEntityJson.billList.length >= 1) {
        newData = {
          fullPath: '',
          sceneName: this.form.bizEntityJson.billList[0].sceneName,
          billContent: this.form.bizEntityJson.billList[0].billContent,
          subjectName: this.form.bizEntityJson.billList[0].subjectName,
          subjectId:this.form.bizEntityJson.billList[0].subjectId,
          billItemId: this.form.bizEntityJson.billList[0].subjectId      
        } 
      }else{
        newData = {
          fullPath: '',
          sceneName:'',
          billContent:'',
          subjectName:'',
          billItemId:''
        }
      }
      this.form.bizEntityJson.billList.push(newData)
    },
    searchBudget(val) {
      console.log(val)
    },
    remove(index) {
      if (this.form.bizEntityJson.billList.length > 0) {
        this.form.bizEntityJson.billList.splice(index, 1)
      }
    },
    strFrameChange(val) {
      if (val != 'true') {
        this.form.bizEntityJson.fileId = ''
      }
    },
    whethersLendAmtChange(val) {
      if(!this.form.bizEntityJson.acctUnitName) {
        this.$alert('请先输入报销/入账公司', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.bizEntityJson.whethersLendAmt = 'false'
          }
        })
      }
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
    closeSearhOrg(val) {
      if (val) {
        this.$approval.getCenterParent({orgCd:val.id}).then(res => {
          if(res.code == 1 && res.data) {
            this.form.bizEntityJson.billList[this.selectIndex].fullPath = res.data
          }else{
            this.form.bizEntityJson.billList[this.selectIndex].fullPath = val.text
          }
        })

        this.form.bizEntityJson.billList[this.selectIndex].orgCd = val.id
        this.form.bizEntityJson.billList[this.selectIndex].costBearSectionId = val.id
      }
      this.showSearchOrg = false
    },
    closeSearhUser1(val) {
      if (val) {
        this.form.bizEntityJson.borrow = val.userName
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
        console.log(this.trafficIndex)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpTaxPrice = Number(val.zzszpTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpTaxNoPrice = Number(val.zzszpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpTaxRatePrice = Number(val.zzszpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpKjhjPrice = Number(val.zzszpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpKjhjTax = Number(val.zzszpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppTaxPrice = Number(val.zzsppTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppTaxNoPrice = Number(val.zzsppTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppTaxRatePrice = Number(val.zzsppTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppKjhjPrice = Number(val.zzsppKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppKjhjTax = Number(val.zzsppKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpTaxPrice = Number(val.jpTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpTaxNoPrice = Number(val.jpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpTaxRatePrice = Number(val.jpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpKjhjPrice = Number(val.jpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpKjhjTax = Number(val.jpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpTaxPrice = Number(val.hcpTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpTaxNoPrice = Number(val.hcpTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpTaxRatePrice = Number(val.hcpTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpKjhjPrice = Number(val.hcpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpKjhjTax = Number(val.hcpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glTaxPrice = Number(val.glTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glTaxNoPrice = Number(val.glTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glTaxRatePrice = Number(val.glTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glKjhjPrice = Number(val.glKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glKjhjTax = Number(val.glKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtTaxPrice = Number(val.qtTaxPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtTaxNoPrice = Number(val.qtTaxNoPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtTaxRatePrice = Number(val.qtTaxRatePrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtKjhjPrice = Number(val.qtKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtKjhjTax = Number(val.qtKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].sumTaxPrice = val.sumTaxPrice
        this.form.bizEntityJson.billList[this.trafficIndex].sumTaxNoPrice = val.sumTaxNoPrice
        this.form.bizEntityJson.billList[this.trafficIndex].sumTaxRatePrice = val.sumTaxRatePrice
        this.form.bizEntityJson.billList[this.trafficIndex].sumKjhjPrice = val.sumKjhjPrice
        this.form.bizEntityJson.billList[this.trafficIndex].sumKjhjTax = val.sumKjhjTax
        // 本次报销金额、税额赋值
        this.$set(this.form.bizEntityJson.billList[this.trafficIndex], 'currentAmt', val.sumTaxNoPrice)
        this.$set(this.form.bizEntityJson.billList[this.trafficIndex], 'currentAmt2', val.sumTaxRatePrice)
      }
      this.showTrafficCostDetail = false
    },
    closeTrafficCostDetail2(val) {
      if (val) {
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpKjhjPrice = Number(val.zzszpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzszpKjhjTax = Number(val.zzszpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppKjhjPrice = Number(val.zzsppKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].zzsppKjhjTax = Number(val.zzsppKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpKjhjPrice = Number(val.jpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].jpKjhjTax = Number(val.jpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpKjhjPrice = Number(val.hcpKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].hcpKjhjTax = Number(val.hcpKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glKjhjPrice = Number(val.glKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].glKjhjTax = Number(val.glKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtKjhjPrice = Number(val.qtKjhjPrice).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].qtKjhjTax = Number(val.qtKjhjTax).toFixed(2)
        this.form.bizEntityJson.billList[this.trafficIndex].sumKjhjPrice = val.sumKjhjPrice
        this.form.bizEntityJson.billList[this.trafficIndex].sumKjhjTax = val.sumKjhjTax
        // 会计核减金额、税额赋值
        this.$set(this.form.bizEntityJson.billList[this.trafficIndex], 'accReduce', val.sumKjhjPrice)
        this.$set(this.form.bizEntityJson.billList[this.trafficIndex], 'accReduce2', val.sumKjhjTax)
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
    add(index) {
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
    closeScene(val){
      console.log(val)
      if (val) {
        console.log(this.trafficIndex)
        this.form.bizEntityJson.billList[this.trafficIndex].sceneName = val.sceneName
        this.form.bizEntityJson.billList[this.trafficIndex].billContent = val.accountSubjectName
        this.form.bizEntityJson.billList[this.trafficIndex].subjectName = val.subjectName
        this.form.bizEntityJson.billList[this.trafficIndex].subjectId = val.subjectId
        this.form.bizEntityJson.billList[this.trafficIndex].billItemId = val.subjectId
      }
      this.showScene = false
    },
    // 页面发起时校验
    async yykCheck() {
      console.log(1111)
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
      
      // var orgList = []
      // var resultList = []
      // var paramList = []

      // /* start */
      // this.isYykCheck = true
      // console.log(this.form.bizEntityJson.billList)
      // this.form.bizEntityJson.billList.forEach(item => {
      //   orgList.push({
      //      orgCd: item.orgCd,
      //      subjectName: item.subjectName
      //   })
      // })

      // let res = await this.$approval.getSubjectCdByOrgCd(orgList)
      // if(res.code == 1 && res.data) {
      //     res.data.forEach(item => {
      //         resultList.push(item)
      //     })

      //     this.form.bizEntityJson.billList.forEach((item,index) => {
      //         console.log(index)
      //         paramList.push({
      //           orgCd: item.orgCd,
      //           billAmount: (Number(item.currentAmt)) + (Number(item.currentAmt2)),
      //           subjectName: item.subjectName,
      //           subjectId: resultList[index]
      //         })
      //     })

      //     await this.$approval.findMoreBudgetUsedDetail(paramList).then(res => {
      //         if(res.code == 1 && !res.data.isContinue) {
      //             this.$alert(res.data.massage, {
      //               confirmButtonText: '确定',
      //             })
      //             this.isYykCheck = false
      //         }
      //       })
      //   }else {
      //     this.$message.error('没有找到预算科目，请配置预算')
      //   }

      // 报销类型为其他时，价税合计需要数字类型通过后端校验
      this.form.bizEntityJson.totalAmt = Number(this.form.bizEntityJson.totalAmt)
      
      //BigDecimal类型，仅用作审批流表达式使用
      this.form.bizEntityJson.totalAmtDec = Number(this.form.bizEntityJson.totalAmt)
      this.form.bizEntityJson.billList.forEach(item => {
        item.billAmount = item.currentAmt
        item.billAmount2 = item.currentAmt2
      })
      if (!this.isYykCheck) {
        return false
      }
      
      /* end */
    },
    validate() {
      //BigDecimal类型，仅用作审批流表达式使用
      this.form.bizEntityJson.totalAmtDec = Number(this.form.bizEntityJson.totalAmt)
      this.form.bizEntityJson.billList.forEach(item => {
        if(!item.currentAmt2){
          item.currentAmt2 = '0'
        }

        if(this.form.bizEntityJson.currencyAmt != 'CNY'){
          item.currentAmt2 = '0'
        }
        item.billAmount = item.currentAmt
        item.billAmount2 = this.form.bizEntityJson.currencyAmt == 'CNY' ? item.currentAmt2 : '0'
        item.costBearSection = item.fullPath

      })
    },
  }
}
</script>
<style type="text/css" lang="scss">
@import './publicSheet.scss';
</style>
