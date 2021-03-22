import echarts from 'echarts'

export default function optionData (option) {
  option.color = option.color || ['#05def9', '#1dc6da']
  option.fontColor = option.fontColor || '#3085e7'
  return {
    backgroundColor: '#fff',
    color: option.color,
    title: {
      text: option.title,
      top: '6.5%',
      left: '1.5%',
      textStyle: {
        color: '#333',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 14
      }
      // subtext: '（万）'
    },
    grid: {
      x: 60,
      y: 30,
      x2: 15,
      y2: 40,
      borderWidth: 1
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#fff',
          fontSize: '26'
        }
      },
      // triggerOn: 'mousemove|click',
      formatter: function (params) {
        const res1 = '<p>' + params[0].name + '年' + '</p>'
        let res2 = ''
        params.forEach(item => {
          const unit = item.seriesIndex === 0 ? '(万元)' : '(m²)'
          res2 += '<div style="display:inline-block;margin-right:20px;">' +
                        '<span>' + item.seriesName + '</span>' +
                        '<h4>' + item.data + unit + '</h4>' +
                        '</div>'
        })
        return res1 + res2
      }
    },
    legend: {
      data: ['租金', '面积'],
      x2: 20,
      y: 0,
      textStyle: { color: '#94989c' },
      icon: 'circle',
      itemWidth: 20,
      itemHeight: 12,
      itemGap: 50
    },
    calculable: true,
    xAxis: [
      {
        axisLine: {
          lineStyle: {
            color: '#d4d4d4'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#94989c',
            fontSize: 12
          }
        },
        type: 'category',
        // boundaryGap: false,
        data: option.data[2]
        // data: function() {
        //     var list = [];
        //     for (var i = 1; i < 13; i++) {
        //         if (i <= 12) {
        //             // list.push(i + '月');
        //             list.push(i);
        //         }
        //     }
        //     return list;
        // } ()
      }
    ],
    yAxis: [
      {
        // x: 'center',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'transparent'
          }
        },
        axisLabel: {
          // formatter: '{value} %',
          show: true,
          textStyle: {
            color: '#94989c'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#e4e4e4'],
            width: 1,
            type: 'solid'
          }
        }
      }
    ],
    series: [
      {
        name: '租金',
        type: 'bar',
        barWidth: 8,
        data: option.data[0],
        barGap: '200%',
        label: {
          show: true, // 开启显示
          rotate: 0, // 旋转度
          position: 'top', // 在上方显示
          distance: 12, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
          verticalAlign: 'middle',
          textStyle: { // 数值样式
            color: '#000',
            fontSize: 12
          }
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: [10, 10, 10, 10]
          },
          normal: { // 颜色渐变
            barBorderRadius: [10, 10, 10, 10],
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#7BD43C' },
                { offset: 1, color: '#D2FE2E' }
              ]
            )
          }
        }
      },
      {
        name: '面积',
        type: 'bar',
        barWidth: 8,
        data: option.data[1],
        label: {
          show: true, // 开启显示
          rotate: 0, // 旋转度
          position: 'top', // 在上方显示
          distance: 12, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。
          verticalAlign: 'middle',
          textStyle: { // 数值样式
            color: '#000',
            fontSize: 12
          }
        },
        itemStyle: {
          emphasis: {
            barBorderRadius: [10, 10, 10, 10]
          },
          normal: {
            barBorderRadius: [10, 10, 10, 10],
            color: '#36A5E7'
          }
        }
      }
    ]
  }
}
