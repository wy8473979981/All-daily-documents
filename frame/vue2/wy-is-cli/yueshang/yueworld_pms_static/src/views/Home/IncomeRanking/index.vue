<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 11:34:45
 * @LastEditors: fhj
-->
<template>
  <div class="app-page-main">
    <div class="max-area">
      <ysn-rankingData :rank-data="rankData" />
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
      <div style="margin-top: 6px; margin-bottom: 8px;height: 220px">
        <ysn-echartLine :echarts-radio-data="echartsRadioData" :echarts-options="echartsOptions" class="echart-line" @handelTabsRadioChange="handelTabsRadioChange" showPoint />
      </div>
      <!-- 列表 -->
      <ysn-table :data="tableData" :column="tableConfig" :checkbox="false" select-key="t0" full />
      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>

<script>
import { testApi } from '@/api'
const dataTmp = {
  t0: 1,
  t1: '杭州富阳',
  t2: '47.68',
  t3: '216.20',
  t4: '86.00',
  t5: '210.20',
  t6: '6',
  t7: '86.00',
  t8: '86.00',
  t9: '86.00',
  t10: '47.68',
  t11: '5',
  t12: '86.00',
  t13: '210.20',
  t14: '0.00',
  t15: '86.00',
  t16: '86.00',
  t17: '7',
  t18: '0.00',
  t19: '86.00',
  t20: '86.00',
  t21: '86.00',
  t22: '86.00',
  t23: '-45.90'
}
export default {
  name: 'CustomerFlowRank',
  data() {
    return {
      rankData: [
        { name: '年租金收缴率(权责)', value: '94.14' },
        { name: '年租金收缴率(合同)', value: '96.78' },
        { name: '年物管收缴率(权责)', value: '93.64' },
        { name: '年物管收缴率(合同)', value: '92.13' },
        { name: '年多经收缴率(合同)', value: '90.56' }
      ],
      searchForm: {
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      },
      // 搜索配置
      searchConfig: [
        {
          itemType: 'select',
          prop: 's1',
          label: '',
          width: '150px',
          placeholder: '经营类型',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('wuyeList')
        },
        {
          itemType: 'select',
          prop: 's2',
          label: '',
          width: '150px',
          placeholder: '费项',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('feeList')
        },
        {
          itemType: 'select',
          prop: 's3',
          label: '',
          width: '150px',
          placeholder: '区域/市区',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('areaList')
        },
        {
          itemType: 'datePicker',
          prop: 's4',
          label: '',
          width: '255px',
          isFirst: true,
          type: 'daterange'
        }
      ],
      echartsRadioData: [
        { label: 0, name: '收缴率(%)' },
        { label: 1, name: '合同口径' },
        { label: 2, name: '权责口径' }
      ],
      echartsOptions: {
        title: {
          subtext: '开业率(%)', // 副标题
          subtextStyle: {
            // 对应样式
            color: '#848382',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = '<span style="color:#050101;font-size:14px">' + params[0].name + '</span>'
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/><span style="color:#848382;font-size:12px">' +
                params[i].marker +
                params[i].seriesName +
                ' : ' +
                params[i].value +
                '%</span>'
            }
            return relVal
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '5px',
          right: '12px',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {}
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          axisLabel: {
            show: true,
            formatter: '{value}'
          },
          show: true
        },
        series: [
          {
            name: '2021',
            type: 'line',
            symbol: 'none',
            color: '#1C4C7F',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#1C4C7F',
                  width: 3
                }
              }
            },
            data: [52, 65, 68, 70, 59, 52, 65, 68, 70, 59, 52, 65]
          },
          {
            name: '2020',
            type: 'line',
            symbol: 'none',
            color: '#4AACD1',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#4AACD1',
                  width: 3
                }
              }
            },
            data: [42, 38, 62, 76, 61, 65, 68, 60, 81, 70, 80, 85]
          }
        ]
      },
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index', align: 'left' },
        { t1: '项目', width: '120px' },
        { t2: '合同口径(跨月显示多月)', labelCLass: 'borderBottom borderRight', tableList: [
          { t3: '2021年5月', tableList: [
            { t4: '应收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t5: '实收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t6: '收缴率', width: '120px', sortable: true, type: 'rate' },
            { t7: '同比', width: '120px', sortable: true, type: 'rate' }]
          },
          { t8: '2021年1月～2021年5月 ', tableList: [
            { t9: '应收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t10: '实收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t11: '收缴率', width: '120px', sortable: true, type: 'rate' },
            { t12: '同比', width: '120px', sortable: true, type: 'rate' }]
          }]
        },
        { t13: '权责口径(跨月显示多月)', tableList: [
          { t14: '2021年5月', tableList: [
            { t15: '应收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t16: '实收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t17: '收缴率', width: '120px', sortable: true, type: 'rate' },
            { t18: '同比', width: '120px', sortable: true, type: 'rate' }]
          },
          { t19: '2021年1月～2021年5月 ', tableList: [
            { t20: '应收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t21: '实收金额(元)', width: '140px', sortable: true, type: 'money' },
            { t22: '收缴率', width: '120px', sortable: true, type: 'rate' },
            { t23: '同比', width: '120px', sortable: true, type: 'rate' }]
          }]
        }
      ],
      tableData: [],
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 折线图radio切换
    handelTabsRadioChange(v) {
      console.log(v)
      // 在这里写折线图radio切换获取数据接口
      const radioItem = this.echartsRadioData.filter((item) => {
        return item.label === parseInt(v)
      })
      this.echartsOptions.title.subtext = radioItem[0].name
      this.echartsOptions.series[0].data = [50, 60, 68, 79, 59, 52, 65, 60, 70, 59, 52, 65]
    },
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
::v-deep .echart-line .el-radio-group {
		display: flex;
		align-items: center;
		.el-radio {
			span {
				vertical-align: middle;
			}
		}
}

::v-deep .ysn-table .el-table tr:not(:first-child) > th:first-child {
  padding-left: 0;
}
</style>
