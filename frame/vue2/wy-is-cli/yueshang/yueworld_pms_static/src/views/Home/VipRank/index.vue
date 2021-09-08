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
      <div style="margin-top: 6px; margin-bottom: 8px;height: 220px" class="flex-ju-between">
        <div style="width: 528px">
          <ysn-echartLine :echarts-radio-data="echartsRadioData" :echarts-options="echartsOptions" showPoint />
        </div>
        <div style="width: 528px">
          <ysn-echartBar :echarts-radio-data="echartsRadioData2" :echarts-options="echartsOptions2" />
        </div>
      </div>
      <!-- 列表 -->
      <ysn-table :data="tableData" :column="tableConfig" :checkbox="false" select-key="t0" full />
      <ysn-page :page="page" :total="total" @change="pageChange" />
    </div>
  </div>
</template>

<script>
import { testApi } from '@/api'
// import YsnEchartBar from '../../components/ysn-echartBar/index'
const dataTmp = {
  t0: 1,
  t1: '宝杨项目',
  t2: '1.48',
  t3: '47.68',
  t4: '216.20',
  t5: '86.00',
  t6: '210.20',
  t7: '0.00',
  t8: '86.00'
}
export default {
  name: 'VipRank',
  // components: { YsnEchartBar },
  data() {
    return {
      rankData: [
        { name: '累计会员数(截至2021-05-04 23:59:59)', value: '4,370,405', unit: ' ' }
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
        { title: '累计会员数(万)' }
      ],
      echartsOptions: {
        title: {
          subtext: '累计会员数(万)', // 副标题
          subtextStyle: {
            // 对应样式
            color: '#848382',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/>' +
                params[i].marker +
                params[i].seriesName +
                ' : ' +
                params[i].value +
                '万'
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
            data: [42.12, 59.23, 62.33, 777, 999]
          }
        ]
      },
      echartsRadioData2: [
        { title: '会员属性统计(截至昨日23:59:59)' }
      ],
      echartsOptions2: {
        color: ['#4AACD1'],
        title: {
          text: '人(万)',
          top: 15,
          textStyle: {
            fontSize: '14',
            color: '#848382',
            fontWeight: 'normal'
          }

        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/>' +
                params[i].marker +
                params[i].seriesName +
                ' : ' +
                params[i].value +
                ''
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
          data: ['昨日新开会员卡', '活跃会员', '沉默会员', '流失会员']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 12,
          showBackground: false,
          itemStyle: {
            // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            emphasis: {
              barBorderRadius: 30
            },

            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [40, 40, 40, 40]

            }
          }

        }]
      },
      // 列表配置
      tableConfig: [
        { idx: '排名', type: 'index' },
        { t1: '项目', width: '120px' },
        { t2: '总会员数(万人)', width: '140px', type: 'money', align: 'left', sortable: true },
        { t3: '当月新增会员数(万人)', width: '190px', type: 'money', align: 'left', sortable: true },
        { t4: '当月消费会员数(万人)', width: '190px', type: 'money', align: 'left', sortable: true },
        { t5: '当月消费金额(万元)', width: '170px', type: 'money', sortable: true },
        { t6: '年累计新增会员(万人)', width: '190px', type: 'money', align: 'left', sortable: true },
        { t7: '年累计消费会员数(万人)', width: '200px', type: 'money', align: 'left', sortable: true },
        { t8: '年累计消费金额(万元)', width: '190px', type: 'money', sortable: true }
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
    handelTabsRadioChange() {

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

</style>
