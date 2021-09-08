<!--
 * @Author: qiuyw
 * @LastEditors: qiuyw
 * @Description:
-->
<template>
  <div>
    <ysn-formTable
      ref="rulesForm"
      v-model="currentFormData"
      :column="tableConfig"
      prop="tableData"
      :rules="formTableRules"
      :first-row-add="false"
    />
    <ysn-page :total="infoList.tableData.length" :page="page" />
  </div>
</template>
<script>
import PUBFN from '@/utils/pubFn'
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From1',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'infoList',
    event: 'change'
  },
  props: {
    infoList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      page: {
        pageNo: 1,
        pageSize: 10
      },
      tableConfig: [
        { standardYear: '年度', itemType: 'text', inputType: 'String', width: '68px' },
        { buildingName: '楼栋', itemType: 'text', inputType: 'String', width: '58px' },
        { floorName: '楼层', itemType: 'text', inputType: 'String', width: '48px' },
        { spaceName: '商铺名称', itemType: 'text', inputType: 'String', width: '100px' },
        // { leasableArea: '计租面积(m²)', itemType: 'text', inputType: 'String', width: '118px', type: 'area' },
        // { standardDeposit: '租赁保证金标准(元)', width: '151px', itemType: 'input', inputType: 'Number', required: true },
        // { standardDecorationDeposit: '装修保证金标准(元)', width: '151px', itemType: 'input', inputType: 'Number', required: true },
        // { standardRentFreePeriod: '免租期(天)', width: '100px', itemType: 'input', inputType: 'Number', required: true },
        { feeShow01: '租金',
          align: 'center',
          tableList: [
            { 'feeShow01standardFee': '费项标准(元/m²)', itemType: 'input', width: '150px', required: true },
            { 'feeShow01standardFeeTimeUnit': '费项时间单位', itemType: 'select', width: '140px', inputType: 'Number', list: PUBFN.getOptionsList('moneyTimeType'), required: true },
            { 'feeShow01standardFeeIncreasing': '递增率(%)', itemType: 'input', width: '110px', inputType: 'Number', required: true }
          ]
        },
        { feeShow02: '物管费',
          align: 'center',
          tableList: [
            { 'feeShow02standardFee': '费项标准(元/m²)', itemType: 'input', width: '150px', inputType: 'Number', required: true },
            { 'feeShow02standardFeeTimeUnit': '费项时间单位', itemType: 'select', width: '140px', inputType: 'Number', list: this.$PUBFN.getOptionsList('moneyTimeType'), required: true },
            { 'feeShow02standardFeeIncreasing': '递增率(%)', itemType: 'input', width: '110px', inputType: 'Number', required: true }
          ]
        },
        { feeShow03: '营运费',
          align: 'center',
          tableList: [
            { 'feeShow03standardFee': '费项标准(元/m²)', itemType: 'input', width: '150px', inputType: 'Number', required: true },
            { 'feeShow03standardFeeTimeUnit': '费项时间单位', itemType: 'select', width: '140px', inputType: 'Number', list: this.$PUBFN.getOptionsList('moneyTimeType'), required: true },
            { 'feeShow03standardFeeIncreasing': '递增率(%)', itemType: 'input', width: '110px', inputType: 'Number', required: true }
          ]
        },
        { feeShow04: 'XX费',
          align: 'center',
          tableList: [
            { 'feeShow04standardFee': '费项标准(元/m²)', itemType: 'input', width: '150px', inputType: 'Number', required: true },
            { 'feeShow04standardFeeTimeUnit': '费项时间单位', itemType: 'select', width: '140px', inputType: 'Number', list: this.$PUBFN.getOptionsList('moneyTimeType'), required: true },
            { 'feeShow04standardFeeIncreasing': '递增率(%)', itemType: 'input', width: '110px', inputType: 'Number', required: true }
          ]
        }
        // { feeShow02: '物管费', itemType: 'input', width: '110px', inputType: 'Number', required: true },
        // { feeShow03: '营运费', itemType: 'input', width: '110px', inputType: 'Number', required: true },
        // { feeShow04: 'XX费', itemType: 'input', width: '110px', inputType: 'Number', required: true }
      ],
      formTableRules: {
        // standardDeposit: [{ required: true, message: '' }],
        // standardDecorationDeposit: [{ required: true, message: '' }],
        // standardRentFreePeriod: [{ required: true, message: '' }],
        // feeShow04: [{ required: true, message: '' }],
        feeShow01standardFee: [{ required: true, message: '' }],
        feeShow01standardFeeTimeUnit: [{ required: true, message: '' }],
        feeShow01standardFeeIncreasing: [{ required: true, message: '' }],

        feeShow02standardFee: [{ required: true, message: '' }],
        feeShow02standardFeeTimeUnit: [{ required: true, message: '' }],
        feeShow02standardFeeIncreasing: [{ required: true, message: '' }],

        feeShow03standardFee: [{ required: true, message: '' }],
        feeShow03standardFeeTimeUnit: [{ required: true, message: '' }],
        feeShow03standardFeeIncreasing: [{ required: true, message: '' }],

        feeShow04standardFee: [{ required: true, message: '' }],
        feeShow04standardFeeTimeUnit: [{ required: true, message: '' }],
        feeShow04standardFeeIncreasing: [{ required: true, message: '' }]
      }
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {}
}
</script>
