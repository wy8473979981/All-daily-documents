<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 11:34:45
 * @LastEditors: zhb
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
        <ysn-echartLine :echarts-radio-data="echartsRadioData" :echarts-options="echartsOptions" class="echart-line" showPoint />
      </div>
      <!-- 列表 -->
      <ysn-table :data="tableData" :column="tableConfig" :checkbox="false" show-summary select-key="t0" full />
      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>

<script>
import { testApi } from '@/api'
const dataTmp = {
  t0: 1,
  t1: '上海七宝',
  t2: '47.68',
  t3: '26.20',
  t4: '86.00',
  t5: '20.20'
}
export default {
  name: 'CustomerFlowRank',
  data() {
    return {
      rankData: [
        { name: '车流', value: '437.45', unit: ' ' }
      ],
      searchForm: {
        s1: '',
        s2: '',
        s3: '',
        s4: '0'
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
          type: 'daterange'
        },
        {
          itemType: 'radio',
          prop: 's4',
          label: '',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('typeList')
        }
      ],
      echartsRadioData: [
        { label: 0, name: '车流(万辆)' }
      ],
      echartsOptions: {
        title: {
          subtext: '车流(万辆)', // 副标题
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
               '万</span>'
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
            name: '21年度',
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
            data: [52.22, 65.33, 68.55, 70.66, 59.77, 52.88, 65.87, 68.54, 70.32, 59.43, 52.32, 65.11]
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
            data: [65.11, 52.22, 65.33, 68.55, 70.66, 59.77, 52.88, 65.87, 68.54, 70.32, 59.43, 52.32]
          }
        ]
      },
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目' },
        { t2: '当月车流', type: 'money', align: 'left', sortable: true },
        { t3: '昨日车流', type: 'money', align: 'left', sortable: true },
        { t4: '环比', type: 'rate', sortable: true },
        { t5: '周转率', type: 'rate', sortable: true }
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
</style>
