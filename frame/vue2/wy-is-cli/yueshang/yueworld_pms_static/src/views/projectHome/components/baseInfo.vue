<template>
  <div class="project-base-info">
    <div class="general-info">
      <div class="title"><span class="pb pl-16 border-b1">整体概况</span></div>
      <div class="d-flex info-box pt-4 pl-16">
        <div v-for="(item,index) in infoList" :key="index" class="item">
          <div class="text-14">{{ item.name }}</div>
          <div class="text-24">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="general-info flex-ju-al-between flex-wrap">
      <data-analysis v-for="(item,index) in list" :key="index" :item="item" :modal-index="index" @radioChange="radioChange" />
      <!--会员-->
      <div class="detail-info pb-20">
        <div class="title flex-ju-al-between">
          <span class="pb pl-16 border-b1">租约到期</span>
        </div>
        <div class="pt-4 pl-16 info-box flex-ju-between">
          <div>
            <div class="text-14">3个月内到期租户数(个)</div>
            <div class="text-24 d-flex">135</div>
          </div>
          <div>
            <div class="text-14">到期总面积(m²)</div>
            <div class="text-24 d-flex">6,986</div>
          </div>
        </div>
        <div class="title flex-ju-al-between mt-20">
          <span class="pb pl-16 nomal">押不抵租</span>
        </div>
        <div class="flex-ju-between mt-8">
          <div class="investment-echarts-container">
            <div id="echarts-huiyuan" class="investment-left-echarts2" />
            <div class="investment-info">
              <div>累计比例</div>
            </div>
            <!--<div class="position-svg" v-if="item3.up">
              <svg-icon icon-class="up" class="icon" />
              <span class="up">%</span>
            </div>-->
          </div>
          <div class="info-box">
            <div class="text-14">累计差额(万元)</div>
            <div class="text-24 d-flex">302</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dataList1 = [
  {
    title: '招商',
    statisticalData: [
      {
        name: '平均租金(元/m²/月)',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '考核',
        t2: '出租率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '考核',
        t2: '开业率',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '开业率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '租金收入(万元)',
    statisticalData: [
      {
        name: '租金包',
        num: '100',
        up: 0
      },
      {
        name: '预算',
        num: '105',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '预算',
        t2: '开业率',
        num: '80',
        up: '1.6'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '租金收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '物管费收入(万元)',
    titleRadiosOption: [{ label: '1', name: '当月' }, { label: '2', name: '当年' }],
    titleRadio: '2',
    statisticalData: [
      {
        name: '租金包',
        num: '50',
        up: 0
      },
      {
        name: '预算',
        num: '52.2',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '预算',
        t2: '开业率',
        num: '80',
        up: '1.6'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '物管费收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '多经收入(万元)',
    statisticalData: [
      {
        name: '租金包',
        num: '50',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '多经收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '销售(万元)',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '300,000',
        up: 0
      },
      {
        name: '月平效',
        num: '2,400',
        up: 0
      }
    ],
    seriesInfo: {
      title: '平效(元/m²)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '客流(万人)',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '30',
        up: 0
      },
      {
        name: '月平效',
        num: '140',
        up: 0
      }
    ],
    seriesInfo: {
      title: '客流(万人)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '车流',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '48',
        up: 0
      }
    ],
    seriesInfo: {
      title: '车流量(万)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '欠费(万元)',
    statisticalData: [
      {
        name: '当月清欠率',
        num: '9.8%',
        up: 0
      },
      {
        name: '历史欠费',
        num: '80',
        up: 0
      },
      {
        name: '年累计欠费',
        num: '40',
        up: 0
      }
    ],
    seriesInfo: {
      title: '欠费(万元)',
      x1: '2021',
      x2: '2020',
      titleRadiosOption: [{ label: '1', name: '租金' }, { label: '2', name: '物管费' }],
      titleRadio: '2'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '会员',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '300,000',
        up: 0
      },
      {
        name: '月平效',
        num: '2,400',
        up: 0
      }
    ],
    seriesInfo: {
      title: '新增会员',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  }
]

const dataList2 = [
  {
    title: '招商',
    statisticalData: [
      {
        name: '平均租金(元/m²/月)',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '考核',
        t2: '出租率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '考核',
        t2: '开业率',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '开业率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '租金收入(万元)',
    statisticalData: [
      {
        name: '租金包',
        num: '100',
        up: 0
      },
      {
        name: '预算',
        num: '105',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '预算',
        t2: '开业率',
        num: '80',
        up: '1.6'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '租金收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '物管费收入(万元)',
    titleRadiosOption: [{ label: '1', name: '当月' }, { label: '2', name: '当年' }],
    titleRadio: '2',
    statisticalData: [
      {
        name: '租金包',
        num: '50',
        up: 0
      },
      {
        name: '预算',
        num: '52.2',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '预算',
        t2: '开业率',
        num: '80',
        up: '1.6'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '物管费收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '多经收入(万元)',
    statisticalData: [
      {
        name: '租金包',
        num: '50',
        up: 0
      },
      {
        name: '实际',
        num: '15,000',
        up: '0.8'
      }
    ],
    circleData: [
      {
        t1: '租金包',
        t2: '达成率',
        num: '89',
        up: '1.2'
      },
      {
        t1: '收缴率',
        t2: '',
        num: '80',
        up: '1.6'
      }
    ],
    seriesInfo: {
      title: '多经收缴率(%)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '销售(万元)',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '300,000',
        up: 0
      },
      {
        name: '月平效',
        num: '2,400',
        up: 0
      }
    ],
    seriesInfo: {
      title: '平效(元/m²)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '客流(万人)',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '30',
        up: 0
      },
      {
        name: '月平效',
        num: '140',
        up: 0
      }
    ],
    seriesInfo: {
      title: '客流(万人)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '车流',
    statisticalData: [
      {
        name: '昨日',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '15,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '48',
        up: 0
      }
    ],
    seriesInfo: {
      title: '车流量(万)',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '欠费(万元)',
    statisticalData: [
      {
        name: '当月清欠率',
        num: '9.8%',
        up: 0
      },
      {
        name: '历史欠费',
        num: '80',
        up: 0
      },
      {
        name: '年累计欠费',
        num: '40',
        up: 0
      }
    ],
    seriesInfo: {
      title: '欠费(万元)',
      x1: '2021',
      x2: '2020',
      titleRadiosOption: [{ label: '1', name: '租金' }, { label: '2', name: '物管费' }],
      titleRadio: '2'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [20, 30, 50, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 182, 221, 234, 291, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  },
  {
    title: '会员',
    statisticalData: [
      {
        name: '昨日',
        num: '12,000',
        up: '0.8'
      },
      {
        name: '当月',
        num: '12,000',
        up: '0.8'
      },
      {
        name: '当年',
        num: '330,000',
        up: 0
      },
      {
        name: '月平效',
        num: '2,500',
        up: 0
      }
    ],
    seriesInfo: {
      title: '新增会员',
      x1: '2021',
      x2: '2020'
    },
    series: [
      {
        name: '2021',
        type: 'line',
        stack: '总量',
        data: [10, 30, 40, 100, 200, 150]
      },
      {
        name: '2020',
        type: 'line',
        stack: '总量',
        data: [220, 122, 191, 234, 290, 330, 310, 100, 120, 20, 100, 300]
      }
    ]
  }
]
import * as echarts from 'echarts'
import DataAnalysis from './dataAnalysis'
export default {
  name: 'ProjectBaseInfo',
  components: { DataAnalysis },
  data() {
    return {
      infoList: [
        { name: '计租面积(万m²)', num: '15,000' },
        { name: '计租铺位(个)', num: '120' },
        { name: '考核铺位(个)', num: '32' },
        { name: '开业时间', num: '2016-09-09' },
        { name: '总建筑面积(m²)', num: '180,000' }
      ],
      list: dataList2,
      dataList1,
      dataList2,
      showData: true
    }
  },
  mounted() {
    const option = {
      series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        itemStyle: {
          normal: {
            color: '#1C4C7F'
          }
        },
        radius: '100%',
        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: false,
          itemStyle: {
            borderWidth: 1
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [
              [1, '#E5E2DE']
            ]
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [{
          value: 18,
          detail: {
            offsetCenter: ['0%', '0%']
          }
        }],
        title: {
          fontSize: 14
        },
        detail: {
          fontSize: 18,
          color: '#050101',
          formatter: '{value}%'
        }
      }]
    }
    const myChart = echarts.init(document.getElementById('echarts-huiyuan'))
    myChart.setOption(option)
  },
  methods: {
    radioChange(e) {
      this.list = this['dataList' + e]
    }
  }
}
</script>

<style scoped lang="scss">
.general-info{
  margin-top: 20px;
  align-items: stretch;
  .title{
    font-size: 16px;
    font-weight: bold;
    color: #050101;
    line-height: 24px;
    border-bottom: 1px solid #D1CEC9;
    .border-b1{
      position: relative;
      display: inline-block;
      min-width: 140px;
      /*border-bottom:1px solid #050101;*/
    }
    .border-b1::after {
      height: 1px;
      width: 100%;
      transform: scaleY(0.5);
      left: 0;
      content: '';
      position: absolute;
      background-color: #050101;
      bottom: -1px;
    }
  }
  .nomal{
    font-weight: normal;
  }
  .info-box{
    .text-24{
      font-size: 24px;
      color: #050101;
      line-height: 36px;
    }
    .item{
      margin-right: 80px;
    }
    .font-10{
      font-size: 10px;
    }
    .font-14{
      font-size: 14px;
    }
  }
  .detail-info{
    width: 537px;
  }
  .investment-echarts-container,.incom--echarts-container {
    position: relative;
    .position-svg {
      position: absolute;
      top: 47px;
      left: 19px;
      span {
        font-size: 10px;
      }
    }
  }
  .investment-echarts-container {
    .investment-info {
      font-size: $font-base-size;
      color: $font-word-color;
      width: 80px;
      text-align: center;
      padding-bottom: 16px;
    }
    .investment-left-echarts,.investment-left-echarts2 {
      margin-top: 8px;
      margin-bottom: 4px;
      width: 82px;
      height: 82px;
    }
  }
  .zhexiantu-box{
    .title{
      height: 24px;
      background: #E0DFDD;
      border-radius: 12px;
    }
    .point1{
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: #4AACD1;
    }
    .point2{
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: #1C4C7F;
    }
    .echarts-zhexiantu{
      height: 170px;
    }
  }
}
</style>
