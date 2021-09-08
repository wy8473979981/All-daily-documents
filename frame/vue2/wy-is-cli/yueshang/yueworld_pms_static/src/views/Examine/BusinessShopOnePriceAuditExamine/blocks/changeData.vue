<!--
 * @Author: qiuyw
 * @LastEditors: qiuyw
 * @Description:
-->
<template>
  <div>
    <ysn-table
      :data="infoList.tableData"
      :column="tableConfig"
      :show-slots="showSlots"
      :checkbox="false"
    >
      <template v-for="item in showSlots" :slot="item" slot-scope="scope">
        <div :key="item" class="free-show-text">
          <p>
            {{ scope.row[item].standardFee }}元/m²/{{ scope.row[item].standardFeeTimeUnit }}
          </p>
<!--          <p>-->
<!--            递增率{{ scope.row[item].standardFeeIncreasing }}%-->
<!--          </p>-->
        </div>
      </template>
    </ysn-table>
    <ysn-page :total="infoList.tableData.length" :page="page" />
  </div>
</template>
<script>
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
      default: () => {
        return {
          tableData: []
        }
      }
    }
  },
  data() {
    return {
      page: {
        pageNo: 1,
        pageSize: 10
      },
      tableConfig: [
        { standardYear: '年度', width: '68px' },
        { buildingName: '楼栋', width: '58px' },
        { floorName: '楼层', width: '48px' },
        { diverseName: '多经名称', width: '88px' },
        { leasableArea: '计租面积(m²)', width: '118px', type: 'area' },
        // { standardDeposit: '租赁保证金标准(元)', width: '161px', type: 'money' },
        // { standardDecorationDeposit: '装修保证金标准(元)' },
        // { standardRentFreePeriod: '免租期(天)', width: '110px' },
        { feeShow01: '租金', width: '130px' },
        { feeShow02: '物管费', width: '130px' },
        { feeShow03: '营运费', width: '130px' },
        { feeShow04: 'XX费', width: '130px' }
      ],
      showSlots: ['feeShow01', 'feeShow02', 'feeShow03', 'feeShow04']
    }
  },
  mounted() {
    console.log(this.currentFormData)
  },
  methods: {}
}
</script>
