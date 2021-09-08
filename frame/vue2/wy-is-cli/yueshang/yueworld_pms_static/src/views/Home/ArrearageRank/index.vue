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
  t1: '上海印力广场',
  t2: '410.09',
  t3: '47.68',
  t4: '216.2',
  t5: '86.00',
  t6: '210.20'
}
export default {
  name: 'CustomerFlowRank',
  data() {
    return {
      rankData: [
        { name: '欠费合计(万元)', value: '457.19(其中租金:336.7 / 物管费:120.49)', unit: ' ' }
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
        { label: 0, name: '租金欠费' },
        { label: 1, name: '物管欠费' }
      ],
      echartsOptions: {
        title: {
          subtext: '租金欠费(万元)', // 副标题
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
            name: '欠费(权责)',
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
            data: [52.11, 65.22, 68.33, 70.44, 59.66, 52.77, 65.88, 68.99, 70.12, 59.17, 52.56, 65.11]
          }
        ]
      },
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '历史欠费(权责)', sortable: true, type: 'money' },
        { t3: '去年累计(合同)', sortable: true, type: 'money' },
        { t4: '累计欠费(权责)', sortable: true, type: 'money' },
        { t5: '累计欠费(合同)', sortable: true, type: 'money' },
        { t6: '清欠率(权责)', sortable: true, type: 'rate' }
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
      this.echartsOptions.title.subtext = radioItem[0].name + '(万元)'
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

.max-area {
  ::v-deep .ranking-data .data-bj div {
    font-size: 20px;
    color: #6F120C;
  }
}
</style>
