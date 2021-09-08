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
  t1: '宝杨项目',
  t2: '0.6',
  t3: '21',
  t4: '4',
  t5: '4',
  t6: '0.10',
  t7: '5',
  t8: '3',
  t9: '6'
}
export default {
  name: 'CustomerFlowRank',
  data() {
    return {
      rankData: [
        { name: '累计客流', value: '1345.98', unit: ' ' },
        { name: '客流密度', value: '0.78', unit: ' ' }
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
        { label: 0, name: '累计客流' },
        { label: 1, name: '客流密度' }
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
          right: '24px',
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
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00'
          ]
        },
        yAxis: {
          type: 'value',
          // max: 100,
          // min: 0,
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
        // { t0: '排名', width: '100px' },
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '客流密度', width: '130px', type: 'money', align: 'left', sortable: true },
        { t3: '去年累计(万元)', width: '130px', type: 'money', sortable: true },
        { t4: '同比去年', width: '120px', type: 'rate', sortable: true },
        { t5: '日均(万人)', width: '120px', type: 'money', align: 'left', sortable: true },
        { t6: '日均指标', width: '120px', type: 'money', align: 'left', sortable: true },
        { t7: '达成率', width: '120px', type: 'rate', sortable: true },
        { t8: '工作日日均(万人)', width: '150px', type: 'money', align: 'left', sortable: true },
        { t9: '周末日均(万人)', width: '160px', type: 'money', align: 'left', sortable: true }
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
      v && (this.echartsOptions.series[0].data = [0.11, 0.24, 0.31, 0.12, 0.41, 0.31, 0.11, 0.11, 0.44, 0.33, 0.15, 0.71])
      v && (this.echartsOptions.series[1].data = [0.31, 0.11, 0.24, 0.31, 0.12, 0.41, 0.31, 0.11, 0.11, 0.44, 0.33, 0.15])
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
