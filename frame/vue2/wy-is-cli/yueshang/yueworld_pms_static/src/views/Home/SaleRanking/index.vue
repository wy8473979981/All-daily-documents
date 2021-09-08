<!--
 * @Descripttion:
 * @Author: zhb
 * @Date: 2021-05-18 11:34:45
 * @LastEditors: fhj
-->
<template>
  <div class="app-page-main">
    <div class="max-area">
      <!-- <ysn-rankingData :rank-data="rankData" /> -->
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
  t3: '21.20',
  t4: '86.00',
  t5: '210.20',
  t6: '0.00',
  t7: '86.00',
  t8: '86.00',
  t9: '86.00',
  t10: '86.00',
  t11: '86.00'
}
export default {
  name: 'CustomerFlowRank',
  data() {
    return {
      rankData: [
        { name: '累计客流', value: '1345', unit: ' ' },
        { name: '客流密度', value: '63' }
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
          itemType: 'select',
          prop: 's3',
          label: '',
          width: '150px',
          placeholder: '请选择业务',
          isFirst: true,
          list: this.$PUBFN.getOptionsList('businessList')
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
        { label: 0, name: '平效' },
        { label: 1, name: '销售额' },
        { label: 2, name: '销售比' }
      ],
      sssechartsOptions: {
        title: {
          subtext: '平效', // 副标题
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
                '万元</span>'
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
            data: [521.12, 65.12, 68.23, 70.12, 59.45, 52.54, 65.44, 68.54, 70.32, 59.87, 52.23, 65.23]
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
            data: [42.12, 389.23, 62.33, 76.32, 61.34, 65.23, 68.12, 60.12, 81.12, 70.122, 80.12, 85.34]
          }
        ]
      },
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '日均平效', width: '130px', type: 'money', align: 'left', sortable: true },
        { t3: '销售比', width: '130px', type: 'rate', sortable: true },
        { t4: '销售额(万元)', width: '160px', type: 'money', sortable: true },
        { t5: '去年累计(万元)', width: '160px', type: 'money', sortable: true },
        { t6: '同比去年', width: '160px', type: 'rate', sortable: true },
        { t7: '日均销售(万元)', width: '160px', type: 'money', sortable: true },
        { t8: '日均指标', width: '130px', type: 'money', align: 'left', sortable: true },
        { t9: '达成率', width: '130px', type: 'rate', sortable: true },
        { t10: '工作日日均(万元)', width: '160px', type: 'money', sortable: true },
        { t11: '周末日均(万元)', width: '160px', type: 'money', sortable: true }
      ],
      tableData: [],
      page: {
        pageSize: 20,
        pageNo: 10
      },
      // 总数
      total: 0,
      currentTab: 0 // 图标选择
    }
  },
  computed: {
    echartsOptions() {
      const title = ['平效', '销售额(万元)', '销售比(%)']
      const unit = ['', '万元', '%']
      const that = this
      return {
        title: {
          subtext: title[this.currentTab], // 副标题
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
                params[i].value + unit[that.currentTab] +
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
            data: [21.12, 65.12, 68.23, 70.12, 59.45, 52.54, 65.44, 68.54, 70.32, 59.87, 52.23, 65.23]
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
            data: [42.12, 89.23, 62.33, 76.32, 61.34, 65.23, 68.12, 60.12, 81.12, 70.122, 80.12, 85.34]
          }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 折线图radio切换
    handelTabsRadioChange(v) {
      console.log(v)
      this.currentTab = v
      const title = ['平效', '销售额(万元)', '销售比(%)']
      // 在这里写折线图radio切换获取数据接口
      // const radioItem = this.echartsRadioData.filter((item) => {
      //   return item.label === parseInt(v)
      // })
      this.echartsOptions.title.subtext = title[v]
      this.currentTab && (this.echartsOptions.series[0].data = [50.33, 60.11, 68.52, 79.43, 59.17, 52.21, 65.67, 60.98, 70.99, 59.47, 52.87, 65.95])
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
</style>
