export const searchList = [
  {
    label: "",
    key: "detail",
    selectedCode: 'rentMoney',
    values: [
      {
        name: "当月租金",
        code: "rentMoney",
        value: "rentMoney",
        unit: "万元",
      },
      {
        name: "当月物管",
        code: "managementMoney",
        value: "managementMoney",
        unit: "万",
      },
      {
        name: "上月销售",
        code: "sales",
        value: "sales",
        unit: "万",
      },
      {
        name: "月平效",
        code: "monthsEffect",
        value: "monthsEffect",
        unit: "元",
      },
      {
        name: "总欠费",
        code: "totalOwe",
        value: "totalOwe",
        unit: "万",
      },
      {
        name: "租售比",
        code: "rentRatio",
        value: "rentRatio",
        unit: "%",
      },
    ],
  }
];
export const options = {
  color: ['#EA6B00', '#1890FF', '#02DFFF', '#FFCE49', '#1EFBB8'],
  legend: {
    selectedMode: true,
    data: [],
    itemHeight: 12,
    y: 'bottom',
    bottom: '0',
    type: 'scroll'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      let res = '';

      if (params.length > 0) {
        res += params[0].axisValue + '\n<br/>';
      }

      for (var i = 0, l = params.length; i < l; i++) {
        if (!(params[i].value == null)) {
          res += params[i].seriesName + ' : ' + params[i].value + '\n<br/>';
        } else {
          res += params[i].seriesName + ' : -' + '\n<br/>';
        }
      }

      return res;
    },
    padding: [8, 10, 8, 10],
    borderColor: 'rgba(45, 159, 203, 1)',
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    textStyle: {
      color: '#333333',
      fontSize: 11
    }
  },
  grid: {
    right: '5%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisPointer: {
      type: 'shadow'
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: '12'
      },
      interval: 0
    },
    axisLine: {
      show: false
    },
    nameLocation: 'end' //坐标轴名称显示位置。

  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      //y轴刻度线
      show: false
    }
  },
  series: []
};