<template>
  <div class="app-page-main">
    <div class="max-area">
      <div class="flex-ju-between">
        <!-- 高级搜索 -->
        <ysn-seniorSearch
          :form="searchForm"
          :config="searchConfig"
          clearable
          :column="4"
          class="flex1"
          @searchResult="getList"
        />
        <ysn-btn>导出</ysn-btn>
      </div>
      <div class="d-flex mb-16">
        <warning-circle-bar :circle-bar-data="circleBarData" />
        <div style="width: 137px" />
        <warning-circle-bar :circle-bar-data="circleBarData2" />
      </div>
      <!-- 列表 -->
      <ysn-table :data="tableData" :column="tableConfig" :checkbox="false" select-key="t0" full />
      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>
<script>
import WarningCircleBar from './component/circleBar'
import { testApi } from '@/api'
const dataTmp = {
  t0: 1,
  t1: '上海印力',
  t2: '47.68',
  t3: '216.20',
  t4: '86.00',
  t5: '210.20',
  t6: '0.00',
  t7: '86.00',
  t8: '86.00',
  t9: '86.00'
}
export default {
  name: 'EarlyWarning',
  components: {
    WarningCircleBar
  },
  props: {},
  data() {
    return {
      searchForm: {
        s1: '',
        s2: '',
        s3: ''
      },
      // 搜索配置
      searchConfig: [
        {
          itemType: 'select',
          prop: 's1',
          label: '',
          width: '194px',
          placeholder: '请选择经营类型',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('wuyeList')
        },
        {
          itemType: 'select',
          prop: 's2',
          label: '',
          width: '194px',
          placeholder: '请选择区域/市区',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('areaList')
        },
        {
          itemType: 'datePicker',
          prop: 's3',
          label: '',
          width: '255px',
          isFirst: true,
          type: 'daterange'
        }
      ],
      circleBarData: {
        title: '租约到期(3月内)',
        echartData: [
          {
            circleIndex: 0,
            name: '租户',
            value: '594',
            echartValues: 89,
            descText1: '到期品牌',
            descText2: '占比(3月内)'
          },
          {
            circleIndex: 1,
            name: '面积',
            value: '39229.18m²',
            echartValues: 90,
            descText1: '到期面积',
            descText2: '占比(3月内)'
          }
        ]
      },
      circleBarData2: {
        title: '押不抵租',
        echartData: [
          {
            circleIndex: 2,
            name: '累计差额',
            value: '-11711.84',
            nameColor: '#6F120C',
            echartValues: 97,
            descText1: '租不抵押',
            descText2: '品牌数占比'
          }
        ]
      },
      tableData: [],
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '到期品牌数量', align: 'center', tableList: [
          { t3: '3月内', width: '130px', type: 'number', sortable: true },
          { t4: '3~6月 ', width: '120px', type: 'number', sortable: true }]
        },
        { t5: '到期面积', align: 'center', tableList: [
          { t6: '3月内', width: '120px', type: 'money', align: 'left', sortable: true },
          { t7: '3~6月', width: '120px', type: 'money', align: 'left', sortable: true }]
        },
        { t8: '押不抵租 商户数占比(权责)', width: '220px', type: 'rate', sortable: true },
        { t9: '押不抵租 累计差额(万元)', width: '200px', type: 'money', sortable: true }
      ],
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表数据
    async getList() {
      const res = await testApi.getList(dataTmp)
      this.tableData = res.data
      this.total = res.total
    },
    // 分页切换
    pageChange(page) {
      this.page = { ...page }
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
