<template>
  <!-- 营销费用支付审批表 -->
  <div :class="['public-box',{'disabled': form.bizEntityJson.disabled}]" class="red-box-fix">
    <el-row>
      <dl-col :span="24" title="区域" place="top right">
        <d-radio-group-string
          v-model="form.bizEntityJson"
          :nameList="[{label:'事业一部',name:'isSH'},
                      {label:'事业二部',name:'isOuter'},
                      {label:'置地',name:'isHome'},
                      {label:'浙江事业部',name:'isZJ'},
                      {label:'事业三部',name:'isThree'},
                      {label:'广东事业部',name:'isGD'}
                    ]"
        />
      </dl-col>
      <dl-col :span="24" place="right">
        <d-radio-group-string
          v-model="form.bizEntityJson"
          @change="typeChange"
          :nameList="[{label:'全员营销',name:'type1'},
                      {label:'渠道、人员费用（自主）',name:'type2'},
                      {label:'直销公司代理费',name:'type4'},
                      {label:'非直销公司代理费',name:'type6'},
                      {label:'其他',name:'type3'}
                    ]"
        />
      </dl-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.type3 == 'true'" class="padding-row">
      <dl-col :span="12" title="付款公司名称" place="top" :novalue="!form.bizEntityJson.companyName">
        <el-input v-model="form.bizEntityJson.companyName" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="项目名称" place="top right" :novalue="!form.bizEntityJson.projectName">
        <el-input v-model="form.bizEntityJson.projectName" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="12" title="合同编号" :novalue="!form.bizEntityJson.contractNo">
        <el-select
          v-model="form.bizEntityJson.contractNo"
          filterable
          remote
          clearable
          @change="contractNoChange"
          :remote-method="remoteMethod3"
          :loading="loading"
          :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
          :disabled="form.bizEntityJson.disabled">
          <el-option
            v-for="item in contractNoOptions"
            :key="item.contNo"
            :label="item.contNo"
            :value="item.contNo">
            <el-row :gutter="24">
              <el-col :span="6">
                <span>{{ item.contNo }}</span>
              </el-col>
              <el-col :span="18">
                <span>{{ item.contName }}</span>
              </el-col>
            </el-row>
          </el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" title="合同名称" place="right" :novalue="!form.bizEntityJson.contractName">
        <el-input v-model="form.bizEntityJson.contractName" readonly />
      </dl-col>
      <dl-col :span="12" title="最后一笔" :novalue="form.bizEntityJson.isLastBill != 'true' && form.bizEntityJson.notLastBill != 'true'">
        <d-radio-group-string
          v-model="form.bizEntityJson"
          :nameList="[{label:'是',name:'isLastBill'},
                      {label:'否',name:'notLastBill'}
                    ]"
        />
      </dl-col>
      <dl-col :span="12" title="此单是否缺票" place="right">
        <d-radio-group-string
          v-model="form.bizEntityJson"
          :nameList="[{label:'是',name:'isMissingTicket'},
                      {label:'否',name:'notMissingTicket'}
                    ]"
        />
      </dl-col>
      <dl-col :span="4" place="title" />
      <dl-col :span="5" place="title">
        <h2>含税</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税率(%)</h2>
      </dl-col>
      <dl-col :span="5" place="title">
        <h2>税额</h2>
      </dl-col>
      <dl-col :span="5" place="title right">
        <h2>不含税</h2>
      </dl-col>
      <dl-col :span="4" title="原合同总价" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.beforeTotalPrice[0].taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.beforeTotalPrice[0].taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.beforeTotalPrice[0].taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.beforeTotalPrice[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已确认合同总价（结算前）" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.updateTotalPrice[0].taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.updateTotalPrice[0].taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.updateTotalPrice[0].taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.updateTotalPrice[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已结算合同总价（含税预估）" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.clearPrices[0].taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.clearPrices[0].taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.clearPrices[0].taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.clearPrices[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="已审批总额" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.spMoney[0].taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.spMoney[0].taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.spMoney[0].taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.spMoney[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="财务付款总额" place="title-auto" />
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.sfMoney[0].taxPrice" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.sfMoney[0].taxRate" readonly />
      </dl-col>
      <dl-col :span="5">
        <el-input v-model="form.bizEntityJson.sfMoney[0].taxRatePrice" readonly />
      </dl-col>
      <dl-col :span="5" place="right">
        <el-input v-model="form.bizEntityJson.sfMoney[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col :span="4" title="本次付款申请金额" place="title-auto" />
      <dl-col :span="5" :novalue="!form.bizEntityJson.applyAmountPrice[0].taxPrice">
        <el-input v-model="form.bizEntityJson.applyAmountPrice[0].taxPrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur($event); applyAmountPriceTaxPriceBlur()" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="5" :novalue="!form.bizEntityJson.applyAmountPrice[0].taxRate">
        <el-select v-model="form.bizEntityJson.applyAmountPrice[0].taxRate" @change="applyAmountPriceTaxPriceBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option v-if="applyAmountPriceTaxRate" label="" :value="null"></el-option>
          <el-option v-if="applyAmountPriceTaxRate" :label="applyAmountPriceTaxRate + '%'" :value="applyAmountPriceTaxRate"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="5" :novalue="!form.bizEntityJson.applyAmountPrice[0].taxRatePrice">
        <el-input v-model="form.bizEntityJson.applyAmountPrice[0].taxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" />
      </dl-col>
      <dl-col :span="5" place="right" :novalue="!form.bizEntityJson.applyAmountPrice[0].noTaxPrice">
        <el-input v-model="form.bizEntityJson.applyAmountPrice[0].noTaxPrice" readonly />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.isMissingTicket == 'true'" :span="12" title="缺票金额" :novalue="!form.bizEntityJson.missingTicketAmount">
        <el-input v-model="form.bizEntityJson.missingTicketAmount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.isMissingTicket == 'true'" :span="12" title="预计归还日期" place="right" :novalue="!form.bizEntityJson.giveBackDate">
        <el-date-picker v-model="form.bizEntityJson.giveBackDate" value-format="yyyy-MM-dd" clearable :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled" />
      </dl-col>
      <dl-col :span="12" title="收款人名称" :novalue="!form.bizEntityJson.payer">
        <el-input v-model="form.bizEntityJson.payer" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="收款人开户行" place="right" :novalue="!form.bizEntityJson.payeeBank">
        <el-input v-model="form.bizEntityJson.payeeBank" readonly />
      </dl-col>
      <dl-col :span="12" title="收款人账号" :novalue="!form.bizEntityJson.payeeAccount">
        <el-input v-model="form.bizEntityJson.payeeAccount" readonly />
      </dl-col>
      <dl-col :span="12" place="right" />
      <dl-col :span="24" title="需说明事项" place="height-auto right" :novalue="!form.bizEntityJson.contentDesc">
        <el-input v-model="form.bizEntityJson.contentDesc" type="textarea" :autosize="{ minRows: 3}" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <el-row v-else class="padding-row">
      <dl-col :span="12" title="项目名称" place="top" :novalue="!form.bizEntityJson.projectName1">
        <el-input v-model="form.bizEntityJson.projectName1" @focus="showSearchOrg = true" readonly :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" />
      </dl-col>
      <dl-col :span="12" title="代扣个人所得税" place="top right">
        <el-input v-model="form.bizEntityJson.personalIncomeTax" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="公司名称" :novalue="!form.bizEntityJson.companyName">
        <el-select
          v-model="form.bizEntityJson.companyName"
          filterable
          remote
          clearable
          :remote-method="remoteMethod"
          :loading="loading"
          :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
          :disabled="form.bizEntityJson.disabled">
          <el-option
            v-for="item in companyNameOptions"
            :key="item.companyCode"
            :label="item.companyName"
            :value="item.companyName">
          </el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" place="right" />
      <dl-col :span="12" title="发票金额" :novalue="!form.bizEntityJson.payTaxprice">
        <el-input v-model="form.bizEntityJson.payTaxprice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="税率" place="right" :novalue="!form.bizEntityJson.payTaxRate">
        <el-select v-model="form.bizEntityJson.payTaxRate" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="0%" value="0"></el-option>
          <el-option label="1%" value="1"></el-option>
          <el-option label="3%" value="3"></el-option>
          <el-option label="5%" value="5"></el-option>
          <el-option label="6%" value="6"></el-option>
          <el-option label="9%" value="9"></el-option>
          <el-option label="10%" value="10"></el-option>
          <el-option label="11%" value="11"></el-option>
          <el-option label="13%" value="13"></el-option>
          <el-option label="16%" value="16"></el-option>
          <el-option label="17%" value="17"></el-option>
          <el-option label="20%" value="20"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" title="发票类型" :novalue="!form.bizEntityJson.invoiceType">
        <el-select v-model="form.bizEntityJson.invoiceType" :placeholder="form.bizEntityJson.disabled ? '' : '请选择'" :disabled="form.bizEntityJson.disabled">
          <el-option label="增值税普通发票" value="1"></el-option>
          <el-option label="增值税专项发票" value="2"></el-option>
        </el-select>
      </dl-col>
      <dl-col :span="12" title="税额" place="right" :novalue="!form.bizEntityJson.payTaxRatePrice">
        <el-input v-model="form.bizEntityJson.payTaxRatePrice" maxlength="15" v-limit-number="2" @focus="toFixedFocus" @blur="toFixedBlur" />
      </dl-col>
      <dl-col :span="12" title="未含税价" :novalue="!form.bizEntityJson.payNoTaxPrice">
        <el-input v-model="form.bizEntityJson.payNoTaxPrice" readonly />
      </dl-col>
      <dl-col :span="12" title="收款人" place="right" :novalue="!form.bizEntityJson.payee">
        <el-input v-model="form.bizEntityJson.payee" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="收款人开户行" :novalue="!form.bizEntityJson.payeeBank">
        <el-input v-model="form.bizEntityJson.payeeBank" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
      <dl-col :span="12" title="收款人账号" place="right" :novalue="!form.bizEntityJson.payeeAccount">
        <el-input v-model="form.bizEntityJson.payeeAccount" :placeholder="form.bizEntityJson.disabled ? '' : '请输入'" />
      </dl-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.type1 == 'true' || form.bizEntityJson.type2 == 'true' || form.bizEntityJson.type4 == 'true' || form.bizEntityJson.type6 == 'true'" class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>相关文件上传照片（照片至少上传3张）</h2>
      </dl-col>
      <dl-col :span="24" title="附件1" place="right" :novalue="!form.bizEntityJson.acceptancePic1">
        <one-file :form="form" value="acceptancePic1" />
      </dl-col>
      <dl-col :span="24" title="附件2" place="right" :novalue="!form.bizEntityJson.acceptancePic2">
        <one-file :form="form" value="acceptancePic2" />
      </dl-col>
      <dl-col :span="24" title="附件3" place="right" :novalue="!form.bizEntityJson.acceptancePic3">
        <one-file :form="form" value="acceptancePic3" />
      </dl-col>
      <dl-col v-if="form.bizEntityJson.type2 == 'true'" :span="12" title="单项营销方案编号" place="url" :novalue="!form.bizEntityJson.individualMarketDisPlayNo">
        <el-select
          v-if="!form.bizEntityJson.disabled"
          v-model="form.bizEntityJson.individualMarketDisPlayNo"
          filterable
          remote
          clearable
          @change="individualMarketDisPlayNoChange"
          :remote-method="remoteMethod2"
          :loading="loading"
          :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
          :disabled="form.bizEntityJson.disabled">
          <el-option
            v-for="item in individualMarketDisPlayNoOptions"
            :key="item.approveNo"
            :label="item.approveNo"
            :value="item.approveNo">
            <el-row :gutter="24">
              <el-col :span="6">
                <span>{{ item.approveNo }}</span>
              </el-col>
              <el-col :span="18">
                <span>{{ item.processName }}</span>
              </el-col>
            </el-row>
          </el-option>
        </el-select>
        <p v-else class="openUrl-p" @click="openUrl">{{ form.bizEntityJson.individualMarketDisPlayNo }}</p>
      </dl-col>
      <dl-col v-if="form.bizEntityJson.type2 == 'true'" :span="12" place="right" />
    </el-row>
    <el-row v-if="form.bizEntityJson.type1 == 'true' || form.bizEntityJson.type2 == 'true' || form.bizEntityJson.type4 == 'true' || form.bizEntityJson.type6 == 'true'" class="padding-row">
      <dl-col :span="24" place="table height-auto top right">
        <el-table ref="table" :data="form.bizEntityJson.objMarketingCommissions" size="mini" border stripe header-row-class-name="table-header">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结佣凭证网批号" min-width="90" prop="resDisplayNo">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.resDisplayNo"
                filterable
                remote
                clearable
                @change="resDisplayNoChange(scope.$index, $event)"
                :remote-method="remoteMethod4"
                :loading="loading"
                :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                :disabled="form.bizEntityJson.disabled">
                <el-option
                  v-for="item in resDisplayNoOptions"
                  :key="item.approveCd"
                  :label="item.approveCd"
                  :value="item.approveCd">
                  <el-row :gutter="24">
                    <el-col :span="6">
                      <span>{{ item.approveCd }}</span>
                    </el-col>
                    <el-col :span="18">
                      <span>{{ item.projectName }}</span>
                    </el-col>
                  </el-row>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="项目" prop="projectName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.projectName" readonly />
            </template>
          </el-table-column>
          <el-table-column label="房号" prop="roomNumber">
            <template slot-scope="scope">
              <el-input v-model="scope.row.roomNumber" readonly />
            </template>
          </el-table-column>
          <el-table-column label="成交客户" prop="customerName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.customerName" readonly />
            </template>
          </el-table-column>
          <el-table-column label="中介公司" prop="agentCompanyName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.agentCompanyName" readonly />
            </template>
          </el-table-column>
          <el-table-column label="置业顾问" prop="salesName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.salesName" readonly />
            </template>
          </el-table-column>
          <el-table-column label="签约价" prop="signPrice">
            <template slot-scope="scope">
              <el-input v-model="scope.row.signPrice" readonly />
            </template>
          </el-table-column>
          <el-table-column label="是否有飞单预警" min-width="90" prop="isFlyBill">
            <template slot-scope="scope">
              <span v-if="scope.row.isFlyBill == 'true'">有飞单预警</span>
              <span v-if="scope.row.isFlyBill == 'false'">无</span>
            </template>
          </el-table-column>
          <el-table-column label="风险类型" prop="flyTypeName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.flyTypeName" readonly />
            </template>
          </el-table-column>
          <el-table-column label="网批结束如期" prop="resCompletedDate">
            <template slot-scope="scope">
              <el-input v-model="scope.row.resCompletedDate" readonly />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="70" align="center" v-if="!$route.query.id">
            <template slot-scope="scope">
              <el-button v-if="scope.$index == 0" type="text" size="mini" style="padding-left: 0 !important;" @click="addList">新增</el-button>
              <el-button v-if="scope.$index > 0" type="text" size="mini" style="color: #EF2941; margin-left: 0;padding-left: 0 !important;" @click="remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dl-col>
    </el-row>
    <el-row v-if="form.bizEntityJson.disabled" class="padding-row">
      <dl-col :span="24" place="title top right">
        <h2>会计信息</h2>
      </dl-col>
      <dl-col :span="12" title="业务类型">
        <el-input v-model="form.bizEntityJson.businessType" readonly />
      </dl-col>
      <dl-col :span="12" place="right">
        <el-checkbox v-model="form.bizEntityJson.isMissingTicket" @change="isMissingTicketChange" true-label="true" false-label="false" :name="form.mapEdit.isMissingTicket ? 'yykReadonly' : ''">缺票</el-checkbox>
      </dl-col>
      <div v-if="form.bizEntityJson.isMissingTicket == 'true'">
        <dl-col :span="12" title="缺票金额">
          <el-input :value="form.bizEntityJson.payTaxprice" readonly />
        </dl-col>
        <dl-col :span="12" title="预计归还日期" place="right">
          <el-date-picker v-model="form.bizEntityJson.giveBackDate" value-format="yyyy-MM-dd" clearable placeholder="请选择" :name="form.mapEdit.isMissingTicket ? 'yykReadonly' : ''" />
        </dl-col>
      </div>
    </el-row>
    <search-org :open="showSearchOrg && !form.bizEntityJson.disabled" :checkedVal="form.bizEntityJson.projectCd" @close="closeSearhOrg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // 本地form声明，不需要复制到模板内容配置
      // form: data, // 线上form声明，需要复制到模板内容配置
      loading: false,
      companyNameOptions: [],
      individualMarketDisPlayNoOptions: [],
      contractNoOptions: [],
      resDisplayNoOptions: [],
      applyAmountPriceTaxRate: '',
      contLedgerId: '',
      showSearchOrg: false,
    }
  },
  /* 本地模板编译需要的数据回传，不需要上传到后台 start */
  props: ['data'],
  computed: {
    payTaxRatePrice() {
      if (this.form.bizEntityJson.payTaxprice === undefined) return
      if (this.form.bizEntityJson.payTaxRate === undefined) return
      if (this.form.bizEntityJson.payTaxRate === '0') {
        // 税率为0，不变时不经过watch事件
        this.$set(this.form.bizEntityJson, 'payTaxRatePrice', 0.00.toFixed(2))
        this.$set(this.form.bizEntityJson, 'payNoTaxPrice', Number(this.form.bizEntityJson.payTaxprice).toFixed(2))
      } else {
        return Number(this.form.bizEntityJson.payTaxprice) / (1 + Number(this.form.bizEntityJson.payTaxRate) / 100) * Number(this.form.bizEntityJson.payTaxRate) / 100
      }
    },
    applyAmountPriceTaxRatePrice() {
      if (this.form.bizEntityJson.applyAmountPrice === undefined) return
      if (this.form.bizEntityJson.applyAmountPrice[0].taxPrice === '') return
      if (this.form.bizEntityJson.applyAmountPrice[0].taxRate === '' || this.form.bizEntityJson.applyAmountPrice[0].taxRate === '0') {
        // 税率为0，不变时不经过watch事件
        this.form.bizEntityJson.applyAmountPrice[0].taxRatePrice = 0.00.toFixed(2)
        this.form.bizEntityJson.applyAmountPrice[0].noTaxPrice = Number(this.form.bizEntityJson.applyAmountPrice[0].taxPrice).toFixed(2)
      } else {
        return Number(this.form.bizEntityJson.applyAmountPrice[0].taxPrice) / (1 + Number(this.form.bizEntityJson.applyAmountPrice[0].taxRate) / 100) * Number(this.form.bizEntityJson.applyAmountPrice[0].taxRate) / 100
      }
    }
  },
	watch: {
		data: {
			immediate: true,
			handler: function(val) {
				this.form = val
			}
    },
    payTaxRatePrice(val) {
      this.$set(this.form.bizEntityJson, 'payTaxRatePrice', val.toFixed(2))
      this.$set(this.form.bizEntityJson, 'payNoTaxPrice', Number(this.form.bizEntityJson.payTaxprice - val).toFixed(2))
    },
    'form.bizEntityJson.payTaxRatePrice'(val) {
      this.$set(this.form.bizEntityJson, 'payNoTaxPrice', (Number(this.form.bizEntityJson.payTaxprice === undefined ? 0 : this.form.bizEntityJson.payTaxprice) - Number(this.form.bizEntityJson.payTaxRatePrice)).toFixed(2))
    },
    applyAmountPriceTaxRatePrice(val) {
      this.form.bizEntityJson.applyAmountPrice[0].taxRatePrice = val.toFixed(2)
      this.form.bizEntityJson.applyAmountPrice[0].noTaxPrice = Number(this.form.bizEntityJson.applyAmountPrice[0].taxPrice - val).toFixed(2)
    },
    // 数组的变化深度监听
    'form.bizEntityJson.applyAmountPrice': {
      handler(val) {
        if (!this.form.bizEntityJson.applyAmountPrice[0].taxPrice && !this.form.bizEntityJson.applyAmountPrice[0].taxRatePrice) {
          this.form.bizEntityJson.applyAmountPrice[0].noTaxPrice = ''
        } else {
          this.form.bizEntityJson.applyAmountPrice[0].noTaxPrice = (Number(this.form.bizEntityJson.applyAmountPrice[0].taxPrice === undefined ? 0 : this.form.bizEntityJson.applyAmountPrice[0].taxPrice) - Number(this.form.bizEntityJson.applyAmountPrice[0].taxRatePrice)).toFixed(2)
        }
      },
      deep: true
    }
  },
  /* end */
  created() {
    if (!this.$route.query.id) {
      this.$set(this.form.bizEntityJson, 'notMissingTicket', 'true')
      this.$set(this.form.bizEntityJson, 'beforeTotalPrice', [])
      this.$set(this.form.bizEntityJson, 'updateTotalPrice', [])
      this.$set(this.form.bizEntityJson, 'clearPrices', [])
      this.$set(this.form.bizEntityJson, 'spMoney', [])
      this.$set(this.form.bizEntityJson, 'sfMoney', [])
      this.$set(this.form.bizEntityJson, 'applyAmountPrice', [])
      this.addTaxList()
      this.$set(this.form.bizEntityJson, 'payTaxRate', '0')
      this.$set(this.form.bizEntityJson, 'objMarketingCommissions', [])
      this.addList()
      this.$set(this.form.bizEntityJson, 'businessType', 'E08-004')
    }
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true
        this.$approval.getLoadCompanies({value: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.companyNameOptions = res.data
            } else {
              this.companyNameOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.companyNameOptions = []
      }
    },
    remoteMethod2(query) {
      if (query) {
        this.loading = true
        const param = {
          approveNo: query,
          processCode: 'YXGL_YXCL_40',
          status: '2'
        }
        this.$approval.findEsApprove(param).then(res => {
          if(res.code == 1) {
            if (res.data.content.length > 0) {
              this.individualMarketDisPlayNoOptions = res.data.content
            } else {
              this.individualMarketDisPlayNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.individualMarketDisPlayNoOptions = []
      }
    },
    individualMarketDisPlayNoChange(val) {
      let obj = this.individualMarketDisPlayNoOptions.find(item => item.approveNo == val)
      this.$set(this.form.bizEntityJson, 'adjustApproveId', obj ? obj.approveId : '')
      this.$set(this.form.bizEntityJson, 'adjustProcessId', obj ? obj.processId : '')
    },
    openUrl() {
      if (window.location.href.search(/resdev/) != -1) {
        if (this.form.bizEntityJson.individualMarketDisPlayNo.substr(0, 1) != 9) {
          this.$message.closeAll()
          this.$message.error('无对应老网批环境')
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else if (window.location.href.search(/resdemo/) != -1) {
        if (this.form.bizEntityJson.individualMarketDisPlayNo.substr(0, 1) != 9) {
          window.open(`http://demo.powerlong.com/PowerDesk/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      } else {
        if (this.form.bizEntityJson.individualMarketDisPlayNo.substr(0, 1) != 9) {
          window.open(`http://pd.powerlong.com/res/res-approve-info.action?id=${this.form.bizEntityJson.adjustApproveId}`)
        } else {
          let routeData = this.$router.resolve({path:'detail',query: {id: this.form.bizEntityJson.adjustApproveId, processId: this.form.bizEntityJson.adjustProcessId}})
          window.open(routeData.href, this.form.bizEntityJson.adjustApproveId)
        }
      }
    },
    remoteMethod3(query) {
      if (query) {
        this.loading = true
        this.$approval.quickSearchCont({value: query}).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.contractNoOptions = res.data
            } else {
              this.contractNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.contractNoOptions = []
      }
    },
    contractNoChange(val) {
      let obj = this.contractNoOptions.find(item => item.contNo == val)
      this.form.bizEntityJson.projectName = obj ? obj.projectName : ''
      this.form.bizEntityJson.projectCd = obj ? obj.projectCd : ''
      this.form.bizEntityJson.contractName = obj ? obj.contName : ''
      this.form.bizEntityJson.payeeBank = obj ? obj.payeeOpenBankNo : ''
      this.form.bizEntityJson.payeeAccount = obj ? obj.payeeAccountNo : ''
      this.form.bizEntityJson.beforeTotalPrice[0].taxPrice = obj ? obj.newTotalPrice : ''
      this.form.bizEntityJson.beforeTotalPrice[0].taxRate = obj ? obj.newTotalPriceTaxRate : ''
      this.form.bizEntityJson.beforeTotalPrice[0].taxRatePrice = obj ? obj.newTotalPriceTaxPrice : ''
      this.form.bizEntityJson.beforeTotalPrice[0].noTaxPrice = obj ? obj.noTaxTotalPrice : ''
      this.form.bizEntityJson.updateTotalPrice[0].taxPrice = obj ? obj.confirmedTotal : ''
      this.form.bizEntityJson.updateTotalPrice[0].taxRate = obj ? obj.confirmedTotalTaxRate : ''
      this.form.bizEntityJson.updateTotalPrice[0].taxRatePrice = obj ? obj.confirmedTotalTaxPrice : ''
      this.form.bizEntityJson.updateTotalPrice[0].noTaxPrice = obj ? obj.noTaxUpdateTotal : ''
      this.form.bizEntityJson.clearPrices[0].taxPrice = obj ? obj.taxPriceClearPrice : ''
      this.form.bizEntityJson.clearPrices[0].taxRate = obj ? obj.taxRateClearPrice : ''
      this.form.bizEntityJson.clearPrices[0].taxRatePrice = obj ? obj.taxRatePriceClearPrice : ''
      this.form.bizEntityJson.clearPrices[0].noTaxPrice = obj ? obj.noTaxClearPrice : ''
      this.form.bizEntityJson.spMoney[0].taxPrice = obj ? obj.taxSpMoney : ''
      this.form.bizEntityJson.spMoney[0].taxRate = obj ? obj.taxRateSpMoney : ''
      this.form.bizEntityJson.spMoney[0].taxRatePrice = obj ? obj.taxRatePriceSpMoney : ''
      this.form.bizEntityJson.spMoney[0].noTaxPrice = obj ? obj.noTaxSpMoney : ''
      this.form.bizEntityJson.sfMoney[0].taxPrice = obj ? obj.taxSfMoney : ''
      this.form.bizEntityJson.sfMoney[0].taxRate = obj ? obj.taxRateSfMoney : ''
      this.form.bizEntityJson.sfMoney[0].taxRatePrice = obj ? obj.taxRatePriceSfMoney : ''
      this.form.bizEntityJson.sfMoney[0].noTaxPrice = obj ? obj.noTaxSfMoney : ''
      this.applyAmountPriceTaxRate = obj ? obj.taxRate : ''
      this.contLedgerId = obj ? obj.contLedgerId : ''
    },
    applyAmountPriceTaxPriceBlur() {
      if (this.form.bizEntityJson.applyAmountPrice[0].taxRate == this.applyAmountPriceTaxRate) {
        if (this.contLedgerId) {
          this.$approval.getRemainAmount({contLedgerId: this.contLedgerId}).then(res => {
            if(res.code == 1) {
              if (!res.data) return
              if (res.data.remainAmount != 0) {
                this.$alert('合同未分配税率不含税价未分配完成，请先进行税率分配调整后再进行付款', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.form.bizEntityJson.applyAmountPrice[0].taxPrice = null
                  }
                })
              }
              if (res.data.manualPayNum === null) {
                this.$alert('合同累计实际支付款未分配税率，请先进行税率分配调整后再进行付款', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.form.bizEntityJson.applyAmountPrice[0].taxPrice = null
                  }
                })
              }
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    },
    remoteMethod4(query) {
      if (query) {
        this.loading = true
        const param = {
          value: query,
          filedNames: 'resId,resDisplayNo,projectName,roomNumber,customerName,agentCompanyName,salesName,signPrice,isFlyBill,flyTypeName,resCompletedDate,isPayed',
          statusCd: '2'
        }
        this.$approval.searchResApproveContentByResDisplyNo(param).then(res => {
          if(res.code == 1) {
            if (res.data.length > 0) {
              this.resDisplayNoOptions = res.data
            } else {
              this.resDisplayNoOptions = []
            }
          } else {
            this.$message.error(res.message)
          }
          this.loading = false
        })
      } else {
        this.resDisplayNoOptions = []
      }
    },
    resDisplayNoChange(index, val) {
      let obj = this.resDisplayNoOptions.find(item => item.approveCd == val)
      this.form.bizEntityJson.objMarketingCommissions[index].projectName = obj ? obj.projectName : ''
      this.form.bizEntityJson.objMarketingCommissions[index].roomNumber = obj ? obj.roomNumber : ''
      this.form.bizEntityJson.objMarketingCommissions[index].customerName = obj ? obj.customerName : ''
      this.form.bizEntityJson.objMarketingCommissions[index].agentCompanyName = obj ? obj.agentCompanyName : ''
      this.form.bizEntityJson.objMarketingCommissions[index].salesName = obj ? obj.salesName : ''
      this.form.bizEntityJson.objMarketingCommissions[index].signPrice = obj ? obj.signPrice : ''
      this.form.bizEntityJson.objMarketingCommissions[index].isFlyBill = obj ? obj.isFlyBill : ''
      this.form.bizEntityJson.objMarketingCommissions[index].flyTypeName = obj ? obj.flyTypeName : ''
      this.form.bizEntityJson.objMarketingCommissions[index].resCompletedDate = obj ? obj.resCompletedDate : ''
    },
    typeChange() {
      if (this.form.bizEntityJson.type3 == 'true') {
        this.form.bizEntityJson.companyName = ''
        this.form.bizEntityJson.projectName = ''
        this.form.bizEntityJson.projectCd = ''
        this.form.bizEntityJson.payeeBank = ''
        this.form.bizEntityJson.payeeAccount = ''
      }
    },
    // 关闭中心组建回调
    closeSearhOrg(val) {
      if (val) {
        if (val.deptType != 2) {
          this.$alert('项目名称不应该选择部门，请选择项目！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(val.text)
            }
          })
        } else {
          this.form.bizEntityJson.projectName = val.text
          this.form.bizEntityJson.projectCd = val.id
          this.form.bizEntityJson.projectName1 = val.text
          this.form.bizEntityJson.projectCd1 = val.id
        }
      }
      this.showSearchOrg = false
    },
    handleRemove(file, fileList) {
      this.handleRemoveGlobal.bind(this, file)()
    },
    handleSuccess(res, file, fileList) {
      this.handleSuccessGlobal.bind(this, res, file)()
    },
    addTaxList() {
      this.form.bizEntityJson.beforeTotalPrice.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
      this.form.bizEntityJson.updateTotalPrice.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
      this.form.bizEntityJson.clearPrices.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
      this.form.bizEntityJson.spMoney.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
      this.form.bizEntityJson.sfMoney.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
      this.form.bizEntityJson.applyAmountPrice.push({
        taxPrice: '',
        taxRate: '',
        taxRatePrice: '',
        noTaxPrice: ''
      })
    },
    // 添加table行数据
    addList() {
      let newData = {
        resDisplayNo: '',
        projectName: '',
        roomNumber: '',
        customerName: '',
        agentCompanyName: '',
        salesName: '',
        signPrice: '',
        isFlyBill: '',
        flyTypeName: '',
        resCompletedDate: ''
      }
      this.form.bizEntityJson.objMarketingCommissions.push(newData)
    },
    // 删除
    remove(index) {
      if (this.form.bizEntityJson.objMarketingCommissions.length > 0) {
        this.form.bizEntityJson.objMarketingCommissions.splice(index, 1)
      }
    },
    isMissingTicketChange(val) {
      if (val == 'true') {
        // 缺票金额
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', this.form.bizEntityJson.payTaxprice)
      } else {
        this.$set(this.form.bizEntityJson, 'missingTicketAmount', '')
        this.form.bizEntityJson.giveBackDate = ''
      }
    },
    // 页面发起时校验
    async yykCheck() {
      var isGo = true
      if (this.form.bizEntityJson.type3 != 'true') {
        await this.$approval.findCostQuarBudgetAmt({projectCd: this.form.bizEntityJson.projectCd1}).then(res => {
          if(res.code == 1) {
            if (res.data) {
              if (res.data.budgetAmt && res.data.cumuFixedAmt) {
                var budgetAmt = parseFloat((res.data.budgetAmt).replace(/,/g, ''))
                var cumuFixedAmt = parseFloat((res.data.cumuFixedAmt).replace(/,/g, ''))
                if (budgetAmt - cumuFixedAmt < Number(this.form.bizEntityJson.payTaxprice)) {
                  var balance = Math.round(budgetAmt - cumuFixedAmt).toFixed(2)
                    this.$alert("不能发起【费用预算不足,请重新填写支付金额】,【剩余可用余额：" + balance + "】", '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      console.log(res.data)
                    }
                  })
                  isGo = false
                }
              } else {
                this.$alert('不能发起【当前项目当前季度在营销季度预算维护没有,请重新选择】', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    console.log(res.data)
                  }
                })
                isGo = false
              }
            } else {
              this.$alert('不能发起【当前项目当前季度在营销季度预算维护没有,请重新选择】', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  console.log(res.data)
                }
              })
              isGo = false
            }
          } else {
            this.$message.error(res.message)
            isGo = false
          }
        })
      } else {
        // 本次付款申请金额不含税 + 已审批总额不含税 > 已确认合同总价（结算前）不含税, 不能发起
        var noTaxSpMoney = parseFloat((this.form.bizEntityJson.spMoney[0].noTaxPrice).replace(/,/g, ''))
        var noTaxUpdateTotal = parseFloat((this.form.bizEntityJson.updateTotalPrice[0].noTaxPrice).replace(/,/g, ''))
        if (Number(this.form.bizEntityJson.applyAmountPrice[0].noTaxPrice) + noTaxSpMoney > noTaxUpdateTotal) {
          this.$alert('已确认合同总价（结算前）不含税大于本次付款申请金额不含税加已审批总额不含税', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(res.data)
            }
          })
          isGo = false
        }
      }
      this.form.bizEntityJson.paymentAmountTax = this.form.bizEntityJson.applyAmountPrice[0].taxPrice || ''
      if (!isGo) return false
    },
  }
}
</script>
/* 本地模板编译需要的css，不需要上传到后台 */
<style type="text/css" lang="scss">
@import '../publicSheet/publicSheet.scss';
</style>
