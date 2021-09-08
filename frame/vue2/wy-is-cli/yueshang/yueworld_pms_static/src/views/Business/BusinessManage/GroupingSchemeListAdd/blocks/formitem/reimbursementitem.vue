<!--
 * @Author: zsj
 * @Date: 2021-07-06 09:09:42
 * @LastEditTime: 2021-09-06 14:12:27
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <ysn-dialog :title="isEdit.type? '编辑费项': '新增费项'" :is-show-dialog="isShowDialog" :external="isShowDialog" :width="'920'" @closeDialog="closeDialog">
      <template #contain>
        <el-form
          ref="ruleForm"
          :model="formData"
          label-position="top"
          :rules="rulesForm"
        >
          <ysn-formItem
            :form="formData"
            :config="configData"
            :column="4"
            clearable
          />
          <!-- 第一个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="typeRuleConfigData"
            :column="2"
            clearable
          />
          <ysn-formItem
            v-if="formData.discriminatorId!==1"
            :form="formData"
            :config="typeRuleConfigDatas"
            :column="2"
            clearable
          />
          <!-- 第二个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDataSeven"
            :column="4"
            clearable
          />
          <!-- 第三个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDatasce"
            :column="4"
            clearable
          />
          <!-- 第四个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDatathree"
            :column="4"
            clearable
          >
            <template #isRequireLabel>
              <el-tooltip placement="top">
                <div slot="content">在合同中生成的该费项<br>模块的字段是否为必填</div>
                <span>是否必填<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
              </el-tooltip>
            </template>
          </ysn-formItem>
          <!-- 增补 8.11 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDataTic"
            :column="4"
            clearable
          >
            <template #s1Label>
              <el-tooltip placement="top">
                <div slot="content">...</div>
                <span>提成超额分摊<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
              </el-tooltip>
            </template>
          </ysn-formItem>
          <!-- 第五个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDatafour"
            :column="4"
            clearable
          />
          <!-- 第六个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDatafive"
            :column="4"
            clearable
          />
          <!-- 第七个 -->
          <ysn-formItem
            v-if="formData.discriminatorId===1"
            :form="formData"
            :config="configDataSix"
            :column="4"
            clearable
          />
          <!-- 一次性--展示 -->
          <ysn-formItem
            v-if="formData.discriminatorId===2"
            :form="formData"
            :config="otherConfigData"
            :column="2"
            clearable
          >
            <template #isRequireLabel>
              <el-tooltip placement="top">
                <div slot="content">在合同中生成的该费项<br>模块的字段是否为必填</div>
                <span>是否必填<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
              </el-tooltip>
            </template>
          </ysn-formItem>
          <!-- 保证金展示 -->
          <ysn-formItem
            v-if="formData.discriminatorId===3"
            :form="formData"
            :config="otherConfigDatais"
            :column="2"
            clearable
          >
            <template #isRequireLabel>
              <el-tooltip placement="top">
                <div slot="content">在合同中生成的该费项<br>模块的字段是否为必填</div>
                <span>是否必填<el-image :src="require('@/assets/detail/de-blue.png')" class="verticalalign" /></span>
              </el-tooltip>
            </template>
          </ysn-formItem>
          <!-- 一次性保证金展示 -->
          <ysn-formItem
            v-if="formData.discriminatorId===2 || formData.discriminatorId===3"
            :form="formData"
            :config="configDataDob"
            :column="2"
            clearable
          />
        </el-form>
      </template>
      <template #btn>
        <div class="text-right" @click="preservation">
          <ysn-btn>保存</ysn-btn>
        </div>
      </template>

    </ysn-dialog>
  </div>
</template>

<script>
import { getOptionsLabel } from '@/filters/index'
// import essentialVue from '../essential.vue'
export default {
  name: 'Reimbursementitem',
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    rowData: { type: Object, default: () => {
      return {}
    } },
    isEdit: { type: Object, default: () => {
      return {}
    } }
  },
  data() {
    return {
      id_: 1002,
      disabled_: false,
      formData: { // 表单数据
        OverApportion: '',
        apportionFeeName: [],
        name: '', // 序号
        discriminatorId: '', // 费项性质
        conFeeType: '', // 合同费项名称
        feeName: '', // 费项类型
        receivableRuleId: '', // 应收规则
        taxs: [], // 税率范围
        tax: [], // 税率
        n: '', // 数
        isRequire: 1, // 是否必填
        feeState: 1, // 费项状态
        invoiceTypeId: '', // 票据类型
        sequence: '', // 排列编号
        algorithmIds: [], // 收费方式范围
        algorithmId: '', // 收费方式
        paymentUnitIds: [], // 单价范围
        paymentUnitId: '', // 单价
        fixedPaymentCycleIds: [], // 固定付周期范围
        fixedPaymentCycleId: '', // 固定支付周期
        deductPaymentCycleIds: [], // 提成付周期范围
        deductPaymentCycleId: '', // 提成支付周期
        latestPaymentDateIds: [], // 最迟缴费日范围
        latestPaymentDateId: '', // 最迟缴费日期
        setPromotional: '', // 最迟缴费日范围
        isStatisticsTotalAmount: 1, // 是否统计总额
        isJoinFree: '', // 是否免租
        isCalcFree: '', // 免租期是否参与计算
        // isShowStandardUnitPrice: '', // 是否显示标准单价
        isShowUnitPriceYieldRate: 1, // 是否显示单价达成率
        isDefaultFold: 1, // 费项是否默认折叠展示
        isShowTotalAmount: 1, // 是否显示总金额
        salesTypeId: '', // 销售额类型
        decimalRules: 1, // 小数取值规则
        calculatePlanType: ''
      },
      rulesForm: { // 表单验证
        discriminatorId: [{ required: true, message: '请输入必填项' }],
        conFeeType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        feeName: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        receivableRuleId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        taxs: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isRequire: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        feeState: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        invoiceTypeId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        sequence: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isStatisticsTotalAmount: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        decimalRules: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        algorithmIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        paymentUnitIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        fixedPaymentCycleIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        deductPaymentCycleIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        latestPaymentDateIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        setPromotional: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isJoinFree: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isCalcFree: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isShowStandardUnitPrice: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isShowUnitPriceYieldRate: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        isShowTotalAmount: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        areaType: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        n: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        salesTypeId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        OverApportion: [{ required: true, message: '请选择必填项', trigger: 'change' }],
        apportionFeeName: [{ required: true, message: '请选择必填项', trigger: 'change' }],
        s3: [{ required: true, message: '请选择必填项', trigger: 'change' }],
        s4: [{ required: true, message: '请选择必填项', trigger: 'change' }],
        s5: [{ required: true, message: '请选择必填项', trigger: 'change' }]
      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 'discriminatorId', label: '费项性质', span: 4, width: '200px', placeholder: '请选择', list: this.$PUBFN.getOptionsList('discriminatorId'), listName: 'label', listValue: 'value', change: this.text }
      ],
      typeRuleConfigData: [
        { itemType: 'select', prop: 'feeName', label: '费项类型', width: '225px', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeName'), listName: 'label', listValue: 'value', isFirst: true },
        { itemType: 'select', prop: 'receivableRuleId', label: '应收规则', width: '225px', placeholder: '请选择', list: this.$PUBFN.getOptionsList('receivableRule'), listName: 'label', listValue: 'value', isFirst: true }
      ],
      typeRuleConfigDatas: [
        { itemType: 'select', prop: 'feeName', label: '费项类型', width: '225px', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeName'), listName: 'label', listValue: 'value', isFirst: true }
      ],
      otherConfigData: [
        { itemType: 'selectDialog', prop: 'taxs', label: '税率范围', placeholder: '请选择', list: this.$PUBFN.getOptionsList('taxs'), listName: 'label', listValue: 'value', change: this.getFor },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请选择', list: this.$PUBFN.getOptionsList('tax'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isRequire', label: '', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isRequire'), listName: 'label', listValue: 'value', hasLabelSlot: true },
        { itemType: 'select', prop: 'feeState', label: '费项状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeState'), listName: 'label', listValue: 'value' }
        // { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('invoiceType'), listName: 'label', listValue: 'value' },
        // { itemType: 'input', prop: 'sequence', label: '排列编号', placeholder: '请选择', listName: 'label', listValue: 'value' },
        // { itemType: 'select', prop: 'isStatisticsTotalAmount', label: '是否统计总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' },
        // { itemType: 'select', prop: 'decimalRules', label: '小数取值规则', placeholder: '请选择', list: this.$PUBFN.getOptionsList('decimalRules'), listName: 'label', listValue: 'value' }
      ],
      otherConfigDatais: [
        { itemType: 'select', prop: 'isRequire', label: '', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isRequire'), listName: 'label', listValue: 'value', hasLabelSlot: true },
        { itemType: 'select', prop: 'feeState', label: '费项状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeState'), listName: 'label', listValue: 'value' }
      ],
      configDatasce: [
        { itemType: 'selectDialog', prop: 'algorithmIds', label: '收费方式范围', placeholder: '可以定制收费方式的选择范围', list: this.$PUBFN.getOptionsList('algorithm'), change: this.getFanW },
        { itemType: 'select', prop: 'algorithmId', label: '收费方式', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('algorithmKind'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'paymentUnitIds', label: '单价范围', placeholder: '可以定制单价的选择范围', list: this.$PUBFN.getOptionsList('paymentUnitIds'), change: this.getDJ, listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'paymentUnitId', label: '单价', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('default_'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'fixedPaymentCycleIds', label: '固定付周期范围', placeholder: '可以定制固定支付周期的选择范围', change: this.getZF, list: this.$PUBFN.getOptionsList('fixedPaymentCycleIds'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'fixedPaymentCycleId', label: '固定支付周期', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('default_'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'deductPaymentCycleIds', label: '提成付周期范围', placeholder: '可以定制固定支付周期的选择范围', change: this.getTC, list: this.$PUBFN.getOptionsList('deductPaymentCycleIds'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'deductPaymentCycleId', label: '提成支付周期', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('default_'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'latestPaymentDateIds', label: '最迟缴费日范围', placeholder: '可以定制最迟缴费日的选择范围', change: this.getZC, list: this.$PUBFN.getOptionsList('latestPaymentDateIds'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'latestPaymentDateId', label: '最迟缴费日期', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('default_'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'taxs', label: '税率范围', placeholder: '请选择', list: this.$PUBFN.getOptionsList('taxIds'), listName: 'label', listValue: 'value', change: this.getFor },
        { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请选择初始默认值', list: this.$PUBFN.getOptionsList('default_'), listName: 'label', listValue: 'value' }
      ],
      configDatathree: [
        { itemType: 'select', prop: 'setPromotional', label: '优惠期', placeholder: '请选择', list: this.$PUBFN.getOptionsList('setPromotional'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isJoinFree', label: '是否免租', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isJoinFree'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isRequire', label: '是否必填', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isRequire'), listName: 'label', listValue: 'value', hasLabelSlot: true },
        { itemType: 'select', prop: 'isCalcFree', label: '免租期是否参与计算', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isCalcFree'), listName: 'label', listValue: 'value' }

      ], // 表单配置
      configDatafour: [
        // { itemType: 'select', prop: 'isShowStandardUnitPrice', label: '是否显示标准单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowUnitPriceYieldRate', label: '是否显示单价达成率', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowUnitPriceYieldRate'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowTotalAmount', label: '是否显示总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' }
      ], // 表单配置
      configDatafive: [
        { itemType: 'select', prop: 'feeState', label: '费项状态', placeholder: '请选择', list: this.$PUBFN.getOptionsList('feeState'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isDefaultFold', label: '费项是否默认折叠展示', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isDefaultFold'), listName: 'label', listValue: 'value' }
      ], // 表单配置
      configDataSix: [
        { itemType: 'select', prop: 'salesTypeId', label: '销售额类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('salesTypeId'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请选择', list: this.$PUBFN.getOptionsList('invoiceTypeId'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'sequence', label: '排列编号', placeholder: '请输入', listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isStatisticsTotalAmount', label: '是否统计总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isStatisticsTotalAmount'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'decimalRules', label: '小数取值规则', placeholder: '请选择', list: this.$PUBFN.getOptionsList('decimalRules'), listName: 'label', listValue: 'value' }
      ],
      configDataTic: [
        { itemType: 'select', prop: 'OverApportion', label: '提成超额分摊', placeholder: '请选择', hasLabelSlot: true, list: this.$PUBFN.getOptionsList('OverApportion'), listName: 'label', listValue: 'value', change: this.tcDo },
        { itemType: 'selectDialog', prop: 'apportionFeeName', label: '分摊费项', placeholder: '请选择', list: this.$PUBFN.getOptionsList('apportionFeeName'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'feeNamePercentage', label: '费项一比例(%)', placeholder: '请输入', listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 's4', label: '费项二比例(%)', placeholder: '请输入', listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 's5', label: '费项三比例(%)', placeholder: '请输入', listName: 'label', listValue: 'value' }
      ],
      // 一次性保证金展示
      configDataDob: [
        { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请选择', disabled: false, list: this.$PUBFN.getOptionsList('invoiceTypeId'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'sequence', label: '排列编号', placeholder: '请输入', listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isStatisticsTotalAmount', label: '是否统计总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isStatisticsTotalAmount'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'decimalRules', label: '小数取值规则', placeholder: '请选择', list: this.$PUBFN.getOptionsList('decimalRules'), listName: 'label', listValue: 'value' }
      ],
      configDataSeven: [
        { itemType: 'select', prop: 'calculatePlanType', label: '尾差计算公式', placeholder: '请选择', list: this.$PUBFN.getOptionsList('calculatePlanType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'collectId', label: '账期模式', placeholder: '请选择', list: this.$PUBFN.getOptionsList('collectId'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'n', label: 'N', placeholder: '请选择', list: this.$PUBFN.getOptionsList('N'), listName: 'label', listValue: 'value' }
      ]

    }
  },
  updated() {
    for (let k in this.formData) {
      for (let key in this.rowData) {
        if (k === key) {
          this.formData[k] = this.rowData[key]
        }
      }
    }
  },
  methods: {
    text(e) {
      const that = this
      if (that.formData.discriminatorId === 3) {
        this.formData.invoiceTypeId = 1
        this.configDataDob = [
          { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请选择', disabled: true, list: this.$PUBFN.getOptionsList('invoiceTypeId'), listName: 'label', listValue: 'value' },
          { itemType: 'input', prop: 'sequence', label: '排列编号', placeholder: '请输入', listName: 'label', listValue: 'value' },
          { itemType: 'select', prop: 'isStatisticsTotalAmount', label: '是否统计总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' },
          { itemType: 'select', prop: 'decimalRules', label: '小数取值规则', placeholder: '请选择', list: this.$PUBFN.getOptionsList('decimalRules'), listName: 'label', listValue: 'value' }
        ]
      } else {
        this.formData.invoiceTypeId = ''
        this.configDataDob = [
          { itemType: 'select', prop: 'invoiceTypeId', label: '票据类型', placeholder: '请选择', disabled: false, list: this.$PUBFN.getOptionsList('invoiceTypeId'), listName: 'label', listValue: 'value' },
          { itemType: 'input', prop: 'sequence', label: '排列编号', placeholder: '请输入', listName: 'label', listValue: 'value' },
          { itemType: 'select', prop: 'isStatisticsTotalAmount', label: '是否统计总金额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' },
          { itemType: 'select', prop: 'decimalRules', label: '小数取值规则', placeholder: '请选择', list: this.$PUBFN.getOptionsList('decimalRules'), listName: 'label', listValue: 'value' }
        ]
      }
    },
    tcDo(e) {
      console.log(this.formData.OverApportion)
      if (this.formData.OverApportion === 2) {
        this.configDataTic = [
          { itemType: 'select', prop: 'OverApportion', label: '提成超额分摊', placeholder: '请选择', list: this.$PUBFN.getOptionsList('OverApportion'), listName: 'label', listValue: 'value', change: this.tcDo }
        ]
      } else {
        this.configDataTic = [
          { itemType: 'select', prop: 'OverApportion', label: '提成超额分摊', placeholder: '请选择', list: this.$PUBFN.getOptionsList('OverApportion'), listName: 'label', listValue: 'value', change: this.tcDo },
          { itemType: 'selectDialog', prop: 'apportionFeeName', label: '分摊费项', placeholder: '请选择', list: this.$PUBFN.getOptionsList('apportionFeeName'), listName: 'label', listValue: 'value' },
          { itemType: 'input', prop: 's3', label: '费项一比例', placeholder: '请输入', listName: 'label', listValue: 'value' },
          { itemType: 'input', prop: 's4', label: '费项二比例', placeholder: '请输入', listName: 'label', listValue: 'value' },
          { itemType: 'input', prop: 's5', label: '费项三比例', placeholder: '请输入', listName: 'label', listValue: 'value' }
        ]
      }
    },
    // 费项性质
    // discriminatorIdBox() {
    //   const that = this
    //   const type = that.formData.discriminatorId
    //   switch (type) {
    //     case 3:
    //       break
    //     case 2:
    //       this.otherConfigData.forEach((item, index) => {
    //         if (item.prop === 'taxs' || item.prop === 'tax') {
    //           that.otherConfigData.splice(index, 2)
    //         }
    //       })
    //       break
    //     default:
    //       // eslint-disable-next-line no-case-declarations
    //       const inds = -1
    //       this.otherConfigData.forEach((item, index) => {
    //         if (item.prop === 'taxs' || item.prop === 'tax') {
    //           // eslint-disable-next-line no-const-assign
    //           inds = index
    //         }
    //       })
    //       if (inds === -1) {
    //         const taxsObj = { itemType: 'select', prop: 'taxs', label: '税率范围', placeholder: '请选择', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', isFirst: true }
    //         const taxObj = { itemType: 'select', prop: 'tax', label: '税率', placeholder: '请选择', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
    //         this.otherConfigData.unshift(taxsObj, taxObj)
    //       }
    //       break
    //   }
    // },
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 提交表单
    preservation() {
      this.$refs.ruleForm.validate((valid, failedObj) => {
        if (valid) {
          // 在这里添加提交代码
          let datas_ = JSON.parse(JSON.stringify(this.formData))
          for (var k in datas_) {
            datas_[k] = getOptionsLabel(datas_[k], k)
          }
          if (!this.isEdit.type) {
            this.id_++
            datas_['name'] = this.id_
          } else {
            datas_['name'] = this.isEdit.name
          }
          this.$emit('closeDialog', datas_)
          this.$message({
            message: '不要忘记保存计租方案哦',
            type: 'success'
          })
        } else {
          // 光标定位在以一个校验不通过项
          setTimeout(() => {
            var isError = document.getElementsByClassName('is-error')
            isError[0].querySelector('input').focus()
          }, 100)
        }
      })
    },
    getFor(e) {
      this.formData.tax = e.taxs
    },
    getFanW(e) {
      this.formData.algorithmId = e.algorithmIds
    },
    getDJ(e) {
      this.formData.paymentUnitId = e.paymentUnitIds
    },
    getZF(e) {
      this.formData.fixedPaymentCycleId = e.fixedPaymentCycleIds
    },
    getTC(e) {
      this.formData.deductPaymentCycleId = e.deductPaymentCycleIds
    },
    getZC(e) {
      this.formData.latestPaymentDateId = e.latestPaymentDateIds
    }
  }
}
</script>
