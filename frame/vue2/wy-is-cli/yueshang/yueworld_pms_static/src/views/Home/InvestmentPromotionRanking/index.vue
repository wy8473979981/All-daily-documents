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
      <div class="ranking-echarts" style="margin-top: 6px; margin-bottom: 8px;">
        <ysn-echartLine :echarts-radio-data="echartsRadioData" :echarts-options="optionEchart" class="echart-line" @handelTabsRadioChange="handelTabsRadioChange" showPoint />
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
  t0: '1',
  t1: '青岛印力广场',
  t2: '27,774.02',
  t3: '24,996.62',
  t4: 100,
  t5: 100,
  t6: 100,
  t7: 100,
  t8: '131.77',
  t9: '126.65',
  t10: '133.89'
}
export default {
  name: 'InvestmentPromotionRanking',
  props: {},
  data() {
    return {
      rankData: [
        { name: '全场开业率', value: '63.58' },
        { name: '考核开业率', value: '63.58' },
        { name: '全场出租率', value: '63.58' },
        { name: '考核出租率', value: '63.58' },
        { name: '平均租金(元/㎡)', value: '63.58', unit: '元' }
      ],
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
          width: '150px',
          placeholder: '请选择经营类型',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('wuyeList')
        },
        {
          itemType: 'select',
          prop: 's2',
          label: '',
          width: '150px',
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
          type: 'daterange',
          span: 2
        }
      ],
      select: '',
      monthValue: '',
      tableDataCopy: null,
      lists: {},
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '计租面积(㎡)', width: '130px', sortable: true, type: 'money', align: 'left' },
        { t3: '考核面积(㎡)', width: '130px', sortable: true, type: 'money', align: 'left' },
        { t4: '全场开业率', width: '120px', sortable: true, type: 'rate' },
        { t5: '考核开业率', width: '120px', sortable: true, type: 'rate' },
        { t6: '全场出租率', width: '120px', sortable: true, type: 'rate' },
        { t7: '考核出租率', width: '120px', sortable: true, type: 'rate' },
        { t8: '平均租金(元/㎡)', width: '150px', sortable: true, type: 'money' },
        { t9: '平均租金(主力店)', width: '160px', sortable: true, type: 'money' },
        { t10: '平均租金(非主力店)', width: '170px', sortable: true, type: 'money' }
      ],
      tableData: [],
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0,
      echartsRadioData: [
        { label: 0, name: '开业率(%)' },
        { label: 1, name: '出租率(%)' },
        { label: 2, name: '平均租金' }
      ],
      echartsRadioIndex: 0,
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
            debugger
            var relVal = '<span style="color:#050101;font-size:14px">' + params[0].name + '</span>'
            for (var i = 0, l = params.length; i < l; i++) {
              debugger
              relVal +=
								'<br/><span style="color:#848382;font-size:12px">' +
								params[i].marker +
								params[i].seriesName +
								' : ' +
								params[i].value +
								'</span>'
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
            data: [52.12, 65.32, 68.44, 70.55, 59.66, 52.77, 65.88, 68.99, 70.44, 59.22, 52.22, 65.44]
          },
          {
            name: '同比',
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
            data: [42.12, 38.15, 62.21, 76.34, 61.54, 65.63, 68.31, 60.58, 81.19, 70.91, 80.21, 85.41]
          }
        ]
      }
    }
  },
  computed: {
    optionEchart: function() {
      const that = this
      return {
        ...that.echartsOptions,
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = '<span style="color:#050101;font-size:14px">' + params[0].name + '</span>'
            for (var i = 0, l = params.length; i < l; i++) {
              if (that.echartsRadioIndex === 2) {
                relVal +=
                  '<br/><span style="color:#848382;font-size:12px">' +
                  params[i].marker +
                  params[i].seriesName +
                  ' : ' +
                  params[i].value +
                  '万</span>'
              } else {
                relVal +=
                  '<br/><span style="color:#848382;font-size:12px">' +
                  params[i].marker +
                  params[i].seriesName +
                  ' : ' +
                  params[i].value +
                  '%</span>'
              }
            }
            return relVal
          }
        }
      }
    }
  },
  watch: {},
  created() {},
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
      this.echartsRadioIndex = parseInt(v)
      this.echartsOptions.title.subtext = radioItem[0].name
      // this.echartsOptions.series[0].data = [50, 60, 68, 79, 59, 52, 65, 60, 70, 59, 52, 65]
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
@import "./index.scss";
::v-deep .echart-line .el-radio-group {
		display: flex;
		align-items: center;
		.el-radio {
			span {
				vertical-align: middle;
			}
		}
}

::v-deep .el-range-separator {
  color: $font-word-color;
}
</style>
