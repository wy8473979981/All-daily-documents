<template>
  <div class="trend-container clearfix">
    <div class="trend-echarts trend-left fl">
      <CommonTop 
        width="528px"
        title="预算趋势图"
      />
      <div id="trend-charts"></div>
    </div>
    <div class="trend-echarts trend-right fl">
      <CommonTop
        width="528px"
        title="执行中预算"
      />
      <div class="progress-charts-content">
        <div class="progress-info-content clearfix">
          <div id="progress-echarts" class="fl"></div>
          <div class="progress-info fl">
            <div class="rental-income">
              <div class="rental-title">
                <span />
                <span>租金收入(万元)</span>
              </div>
              <div class="rental-info">28,784.01</div>
            </div>
            <div class="rental-fee">
              <div class="rental-title">
                <span />
                <span>租金包(万元)：</span>
                <span>8,783.87</span>
                <img src="@/assets/imges/111.png" alt="" width="15">
              </div>
              <div class="rental-fee">
                  <div class="rental-title">
                      <span></span>
                      <span>租金包(万元)：</span>
                      <span @click="handleShowDialog">
                        8,783.87
                      </span>
                      <span class="icon-btn" @click="isShowInfo">
                          <svg-icon icon-class="detail-blue" class="icon" />
                      </span>
                  </div>
                  <div class="reduce">
                      <span>差额：</span>
                      <span class="down">-722.00</span>
                  </div>
              </div>
          </div>
          <div class="progress-btn fl">
            <el-button
              type="primary"
              round>
              预算调整
            </el-button>
          </div>
        </div>
        <div class="progress-expense">
          <div class="income fl">
            <div class="title">收入(万元)</div>
            <div>28,784.00</div>
          </div>
          <div class="expend fl">
            <div class="title">费用支出(万元)</div>
            <div>8,783,722.00</div>
          </div>
          <div class="noi fl">
            <div class="title">NOI(万元)</div>
            <div>2,000.00</div>
          </div>
        </div>
      </div>
    </div>
    <DefineDialog
      ref="dialog"
      :width="dialogWidth"
      title="资管租金包分解">
      <div slot="dailogContent">
        <div class="dailog-table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              v-for="(item,index) in tableColumn"
              :key="index"
              :prop="item.prop"
              :label="item.name"
              :align="item.align"
              :width="item.width"
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </DefineDialog>
    <DefineDialog
      ref="dialog1"
      :width="dialogWidth1"
      title="资管租金包更新履历">
      <div slot="dailogContent">
        <div class="dailog-table">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              v-for="(item,index) in tableColumn1"
              :key="index"
              :prop="item.prop"
              :label="item.name"
              :align="item.align"
              :width="item.width"
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </DefineDialog>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import CommonTop from './component/commonTop'
import DefineDialog from '../projectHome/components/defineDialog'
export default {
  components: { CommonTop, DefineDialog },
  data() {
    return {
      tableColumn: [],
      tableData: [],
      tableColumn1: [],
      tableData1: [],
      dialogWidth: '',
      dialogWidth1: '',
      rentTableData: [
        { t1: '', t2: '合计', t3: '60,000,000.00', t4: '50,000,000.00' },
        { t1: '1', t2: '上海七宝宝龙广场', t3: '12,000,000.00', t4: '10,000,000.00' },
        { t1: '2', t2: '上海青浦宝龙广场', t3: '12,000,000.00', t4: '10,000,000.00' },
        { t1: '3', t2: '上海奉贤宝龙广场', t3: '12,000,000.00', t4: '10,000,000.00' },
        { t1: '4', t2: '上海宝杨宝龙广场', t3: '12,000,000.00', t4: '10,000,000.00' },
        { t1: '5', t2: '上海普陀宝龙广场', t3: '12,000,000.00', t4: '10,000,000.00' },
      ],
      rentTableColumn: [
        { name: '序号', width: '80', align: 'center', prop: 't1' },
        { name: '项目', align: 'left', prop: 't2' },
        { name: '租金包', align: 'left', prop: 't3' },
        { name: 'NOI', align: 'left', prop: 't4' }
      ],
      rentTableData1: [
        { t1: '1', t2: 'V 0.4', t3: '221,627.23', t4: '2021-01-30' },
        { t1: '2', t2: 'V 0.3', t3: '220,627.23', t4: '2021-01-21' },
        { t1: '3', t2: 'V 0.2', t3: '219,627.23', t4: '2021-01-15' },
        { t1: '4', t2: 'V 0.1', t3: '218,627.23', t4: '2021-01-02' }
      ],
      rentTableColumn1: [
        { name: '序号', width: '80', align: 'center', prop: 't1' },
        { name: '版本号', align: 'left', prop: 't2' },
        { name: '变更后金额(万元)', align: 'left', prop: 't3' },
        { name: '更新日期', align: 'left', prop: 't4' }
      ]
    }
  },
  mounted() {
    let chartDom = document.getElementById('trend-charts')
    let myChart = echarts.init(chartDom)
    let option

    option = {
        legend: [
            {
                show: false
            }
        ],
        tooltip: {},
        grid:{
            left:30,
            top:30,
            right:30,
            bottom:18
        },
        dataset: {
            source: [
                ['product', '2015', '2016'],
                ['总收入', 43.3, 85.8],
                ['费用支出', 83.1, 73.4],
                ['NOI', 86.4, 65.2],
                ['租金包', 72.4, 53.9]
            ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#1C4C7F',
                        barBorderRadius: [7, 7, 7 ,7],
                    }
                },
                barWidth: '12px'

            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#48A0C3',
                        barBorderRadius: [7, 7, 7 ,7],
                    }
                },
                barWidth: '12px'
            },
        ]
    };

    option && myChart.setOption(option)

    let myChart1 = echarts.init(document.getElementById('progress-echarts'))
    let option1 = {
        series: [{
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    color: [
                        [0.3, '#48A0C3'],
                        [1, '#16406D']
                    ]
                }
            },
              pointer: {
                itemStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            radius:'100%',
            
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
                value: 30,

            }],
            title: {
                fontSize: 14
            },
            detail: {
                show: false,
                fontSize: 18,
                color: '#050101',
                formatter: '{value}%'
            }
        }]
    }
    option1 && myChart1.setOption(option1)
  },
  methods: {
    handleShowDialog() {
      this.dialogWidth = '665px'
      this.tableColumn = this.rentTableColumn
      this.tableData = this.rentTableData
      this.diaTitle = '资管租金包分解'
      this.$refs.dialog.isShow = true
    },
    isShowInfo() {
      this.dialogWidth1 = '655px'
      this.tableColumn1 = this.rentTableColumn1
      this.tableData1 = this.rentTableData1
      this.$refs.dialog1.isShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.trend-left {
    margin-right: 56px;
}
#trend-charts,.progress-charts-content {
    width: 528px;
    height: 196px;
}
.progress-charts-content {
    margin-top: 16px;
}
.progress-info-content {
    #progress-echarts {
        width: 110px;
        height: 110px;
        margin-right: 62px;
    }
    .rental-income,.rental-fee {
        .rental-title{
            margin-bottom: 10px;
            img{
              vertical-align: middle;
                 margin-top: -2px;
            }
            span {
                &:nth-child(1) {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background-color: #1C4C7F;
                    margin-right: 4px;
                }
                &:nth-child(2) {
                    font-size: $font-base-size;
                    color: #848382;
                }
            }
        }
        .rental-info {
            font-size: $font-record-size;
            color: #1C4C7F;
            padding-left: 12px;
        }
    }
    .rental-fee {
        margin-top: 13px;
        .rental-title{
            span {
                &:nth-child(1) {
                    background-color: #48A0C3;
                }
                &:nth-child(3) {
                    color: #48A0C3;
                    text-decoration: underline;
                    font-size: $font-base-size;
                    cursor: pointer;
                }
            }
        }
        .reduce {
            span {
                &:nth-child(1) {
                    color: #848382;
                    padding-left: 12px;
                }
            }
        }
    }
    .progress-btn {
        margin-left: 74px;
    }
}
.progress-expense {
    margin-top: 26px;
    color: $font-word-color;
    font-size: $font-record-size;
    .title {
        font-size: $font-base-size;
        margin-bottom: 10px;
    }
    .expend {
        padding-left: 26px;
        padding-right: 32px;
        border-left: 1px solid #E5E2DE;
        border-right: 1px solid #E5E2DE;
        margin-left: 33px;
        margin-right: 24px;
    }
}
.icon-btn {
  cursor: pointer;
}
</style>
