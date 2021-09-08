<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description: 合同变更-新增-固定租金
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
      <!-- 信息模块-->
      <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
    </el-form>
    <!-- 表格 -->
    <ysn-formTable
      v-model="currentFormData"
      class="mt-16"
      prop="tableList"
      :column="tableConfig"
      :show-operation="true"
      :first-row-add="true"
      add
      :show-slots="slotList"
      :span-method="arraySpanMethod"
    >
      <template #leaseArea>
        <div v-for="(item,index) in data.businessAffairs.leaseArea" :key="index">
          <div>{{ item }}</div>
        </div>
      </template>
      <template #standardUnitPrice>
        <div>{{ currentFormData.standardUnitPrice }}</div>
      </template>
      <template #rentYears="scope">
        <div>{{ rentYears(scope.row.period[0], scope.row.period[1], 'y年m个月d天') }}</div>
      </template>
      <template #unitPriceYieldRate="scope">
        <div>{{ calUnitPriceYieldRate(scope) }}</div>
      </template>
      <template #stageAmountWithoutTax="scope">
        <div>{{ claStage(scope, 'stageAmountWithoutTax') }}</div>
      </template>
      <template #stageCycleWithoutTax="scope">
        <div>{{ claStage(scope, 'stageCycleWithoutTax') }}</div>
      </template>
    </ysn-formTable>
  </div>
</template>

<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { spacingText } from '@utils'

export default {
  name: 'FixedRent',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'fixedRent',
    event: 'change'
  },
  props: {
    fixedRent: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      spanArr: [],
      pos: [],
      slotList: [
        'leaseArea',
        'standardUnitPrice',
        'stageCycleWithoutTax',
        'rentYears',
        'unitPriceYieldRate',
        'stageAmountWithoutTax'
      ],
      rulesForm: {
        fixedPaymentCycleId: [{ required: true, message: '支付周期不能为空' }],
        cycleType: [{ required: true, message: '周期类型不能为空' }],
        collectId: [{ required: true, message: '账单模式不能为空' }],
        n: [{ required: true, message: 'N期不能为空' }],
        paymentUnitId: [{ required: true, message: '单价类型不能为空' }],
        latestpaymentDay: [{ required: true, message: '最迟缴费日不能为空' }],
        tax: [{ required: true, message: '税率不能为空' }],
        invoiceTypeId: [{ required: true, message: '票据类型不能为空' }]
      }
    }
  },
  computed: {
    tableConfig() {
      return [
        { leaseArea: '租赁区域', sortable: false, width: 130, hasSlot: true,
          disabled: !this.data.essentialData.contNo },
        { standardUnitPrice: '标准单价', itemType: 'text', sortable: false, hasSlot: true, width: 100, type: 'money',
          disabled: !this.data.essentialData.contNo },
        {
          period: '期间',
          sortable: false,
          itemType: 'datePicker',
          placeholder: '请选择',
          rangeSeparator: '~',
          type: 'daterange',
          width: 300,
          disabled: !this.data.essentialData.contNo
        },
        {
          isPromotional: '优惠期',
          sortable: false,
          itemType: 'select',
          list: this.$PUBFN.getOptionsList('setPromotional'),
          listName: 'label',
          listValue: 'value',
          width: 120,
          disabled: !this.data.essentialData.contNo
        },
        { rentYears: '租期', sortable: false, hasSlot: true, width: 130 },
        {
          unitPrice: '单价',
          type: 'money',
          sortable: false,
          itemType: 'input',
          placeholder: '请输入',
          width: 150,
          disabled: !this.data.essentialData.contNo
        },
        { unitPriceYieldRate: '单价达成率', sortable: false, hasSlot: true, width: 100, type: 'rate',
          disabled: !this.data.essentialData.contNo },
        { stageAmountWithoutTax: '月总额', sortable: false, hasSlot: true, width: 100, type: 'money',
          disabled: !this.data.essentialData.contNo },
        { stageCycleWithoutTax: '期总额', sortable: false, hasSlot: true, width: 100, type: 'money',
          disabled: !this.data.essentialData.contNo }
      ]
    },
    configData() {
      return [
        // 详情配置
        {
          itemType: 'select',
          prop: 'fixedPaymentCycleId',
          required: true,
          label: '支付周期',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('paymentCycle'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'cycleType',
          required: true,
          label: '周期类型',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('cycleType'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'collectId',
          required: true,
          label: '账单模式',
          placeholder: '请选择',
          list: [],
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'n',
          required: true,
          label: 'N期',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('n'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'paymentUnitId',
          required: true,
          label: '单价类型',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('unitPrice'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'latestpaymentDay',
          required: true,
          label: '最迟缴费日',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('receivable'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'tax',
          required: true,
          label: '税率',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('txd'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'select',
          prop: 'invoiceTypeId',
          required: true,
          label: '票据类型',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('billType'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          disabled: !this.data.essentialData.contNo
        }
      ]
    }
  },
  watch: {
    currentFormData: {
      deep: true,
      handler(val) {
        this.getSpanArr(val.tableList)
      }
    }
  },
  mounted() {
    this.getSpanArr(this.currentFormData.tableList)
  },
  methods: {
    // 单价达成率计算
    calUnitPriceYieldRate(scope) {
      const standardUnitPrice = this.currentFormData.standardUnitPrice
      const unitPrice = scope.row.unitPrice
      if (isNaN(standardUnitPrice) || isNaN(unitPrice)) {
        return '-'
      }
      return standardUnitPrice <= 0 ? '0%' : (Math.round((unitPrice / standardUnitPrice) * 10000) / 100.00 + '%')
    },
    // 单价月总额，期总额
    claStage(scope, type) {
      if (!this.data.businessAffairs.meterRentArea || !scope.row.unitPrice) {
        return 0
      }
      let amount = 0
      const stageCycleWithoutTaxFormula = this.currentFormData.stageCycleWithoutTaxFormula
      const meterRentArea = parseFloat(this.data.businessAffairs.meterRentArea.toString().replace(',', ''))
      const unitPrice = parseFloat(scope.row.unitPrice.toString().replace(',', ''))
      // 月总额
      if (type === 'stageAmountWithoutTax') {
        if (stageCycleWithoutTaxFormula === 1) {
          amount = unitPrice * meterRentArea * parseFloat(this.currentFormData.fixedYearDayNumberLabel) / 12
        }
        if (stageCycleWithoutTaxFormula === 2) {
          amount = unitPrice * meterRentArea * 365 / 12
        }
        if (stageCycleWithoutTaxFormula === 3) {
          amount = unitPrice * meterRentArea * 30
        }
        if (stageCycleWithoutTaxFormula === 4) {
          amount = unitPrice * meterRentArea * parseFloat(this.currentFormData.fixedMonthDayNumberLabel)
        }
      }
      if (type === 'stageCycleWithoutTax') {
        const start = new Date(scope.row.period[0]).getTime()
        const end = new Date(scope.row.period[1]).getTime()
        amount = unitPrice * meterRentArea * (end - start) / 24 / 60 / 60 / 1000
      }
      return amount
    },
    // 计算租期
    rentYears(start, end, format) {
      return spacingText(start, end, format)
    },
    // 数据处理
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.spanArr[rowIndex] > 0) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          }
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 合并规则
    getSpanArr(data, idx) {
      this.spanArr = []
      this.pos = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          // if (data[i].leaseArea === data[i - 1].leaseArea) {
          this.spanArr[this.pos] += 1
          this.spanArr.push(0)
          // } else {
          //   this.spanArr.push(1)
          //   this.pos = i
          // }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ysn-form {
  ::v-deep .el-input--medium .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
}

.operation {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.add-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC3klEQVRoBe1YPWgUURCeufMHDJdagmBjLCysDNhY2N2eIFikSnNgWpu0ooSIhY2NnVhc4VUpBMHsdbaCjSikiY0g0TYmJxjJjjO7e+Q49t7M2+xGQt42t7cz+33zzZv39r0BCFfIQMhAyEDIwGnOAFYlfnF18dzvb7u3ieBuAnANCeYIaE7wEXCbELYbAJuI8PbC5db79dX1/Sq4jyyg0+1cJDp4zGEuccCzlqBY0C8A6iM21zZ6Gz8t70zzKS0gehCdh114SJSsMPjMNALl+RCx8Rxa8DR+Ef9RfAvNpQSkWYfkDRHdLET1fIiIHxAa98qMhreA9nL7Ov6Fd1wulzzjdLpzWX3n0eiwiC9Oxwmjl4Cs3pOPVQc/iikXseAzErww2C6peZKyqTjz4+yCLRzp/Bo3OO7NArIJW03NO+KBdF7x4uDyGbeZSkhKJ6GDr/yi12oT9wYpV9Rtj3Na7ocNbF6xlJJpBLJ13i94S5QOn5mc0+GSmVQB8oWVj5SKVLkDLmXcbmBVQLo9MH5h3VR+Vp7Qs8KtvaUKkL2NBlKX3cKtCpCNWV0BargWblWA7Co1orrsFu4zGjnXolPAaKl04bh8XEusxi2c6gi4Aqvbxps80jjUEUgPI0BXpwG5MjjKvMtnGm76nOCH085GdQTkJKWB1GW3cKsC2GGzrgA1XAu3KkDOsBpRXXYLtypADuDZGbauMItxhVO4i62HT1UBWfeA+oevHNcd9S2dC1WAhCvdA/4ZHlfowpVzqpSm84CgRN1ojTsQj1TEChz4bPwk7sXcqtEv0wikMNz6kO6BDnk0j5SDuawo5hEQwBN9qBcBcsSjs3BHugfyv8pLMPO2ilenzl5CebSDV4PPTLRQZTkJlmD69oQkpGaZLG592tqbvzX/Gvdls0U3GIOPnaUuaS0+gxbej1/GO2UQvOZAEUE2L05gc3dSzP9qr0/GEf6HDIQMhAyEDJyuDPwD2MAF4UaQ6IgAAAAASUVORK5CYII=) no-repeat;
  background-size: contain;
}

.minus-icon {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAAC8klEQVRoBe1YzWsTURCf99J8lKIYJFVq9aBBwYInC72JVwXBc47eRURPopaCB1Gq+DfoWVA89yYBb0o9BS+Gqo2SWjU2jc1zZteFTcnbmd3uGkrfXnb3zbz5zW/e5wyAe1wEXARcBFwE9nIEVFrk52dmCu3Wx/OwBZcU9E8DqCkDMEX2EWQFwKwY0O8hBy/KlaNL88vLm2lg75jAzUrlcK/fvWPA1MCY/SKnlFpXoJ7ldXHhQav1WdTHopSYwJNqtfhhbfUWOn3dGDNhsR/ZrJT6BUotHj8wee9qo9GNVLYIExGgqG/2N56j83MWu/GalaoXdOlyktGITeDGZPlMb6v3CgxMx/OS0VbQ1GP5C4++tN8xmgPiWAT8yP9+k7rzgUtIoqDHZ+OMhA76cm+a8/60STnyYWAcVcIgrHBz1HcuShiWndJ/7uKcr4XbMvqeXut2TL3TXZLYF00hf6vcaCTdbSSOhHVod8rrUlUylURTyNvnE26VYcek3xQowpToswTohPUOKYm1FHUIk7A5kywB73ogPWE5tDhyxPSwmT4sAbrbMDayEwuwWQL+xSw7H6MsS7BZAnSrjALJVsZjj3EOBFdim97jbz9sIlH7tYP7rHocNnUUjIDVfuYCPKSQQ/TDjgAawUQETtrMREXQ1idG+ydOVzACBrOpUT08NkvASwNH5L8EmyVAOeyI/AcJNkuAEnBM+9b/OwnE9LAZYJYAVQ8oAWfspC4mTEnlgiVAnlH1wEvAU3dzuEH/Ol1cGC4dbBUlNK87nZ9zE6USJjTnBrtn86e0vr/4tf1SYl00AmSISh+4FuoSozvSQQwPS2hElJEFtnZ1Uk8kKMXL5/IXsVbYDEil9v5XVpGkkWFM8RQKOj1cbb+l0keq08krbI3Pxq0JkU+iRRw4H7xpUdeOHHtK1QOcg2exnU39gr7hN+02tGBPlA9dud1sfg/LpN+x1sAwo37FYhcWd7eTGVV5fbsf7t9FwEXARcBFYG9F4C9VRgmu28o3IAAAAABJRU5ErkJggg==) no-repeat;
  background-size: contain;
}
</style>

