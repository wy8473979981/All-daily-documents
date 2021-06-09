import echarts from 'echarts';

export default function optionData(option) {
  option.color = option.color || ['#05def9','#1dc6da'];
  option.fontColor = option.fontColor || '#3085e7';
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
            fontSize: 14,
        },
        // subtext: '（万）'
    },
    grid: {
        left: '10',
        right: '10',
        bottom: '10',
        containLabel: true
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
            let res1='<p>'+params[0].name +'</p>' 
            let res2 = '';
            params.forEach(item => {
                // let unit = item.seriesIndex === 0? '(万)' : '(m²)'
                let unit = ''
                if (item.seriesName === '销售额' || item.seriesName === '销售额同比') {
                    unit = '万元'
                }
                if (item.seriesName === '客流' || item.seriesName === '客流同比') {
                    unit = '万人'
                }
                if (item.seriesName === '车流' || item.seriesName === '车流同比') {
                    unit = '万'
                }
                res2 += '<div style="display:inline-block;margin-right:20px;">'+ 
                        '<span>'+ item.seriesName +'</span>' + 
                        '<h4>'+ item.data + unit + '</h4>' +
                        '</div>'
            })
            return res1 + res2;
        },
    },
    legend: {
        data: ['销售额','销售额同比','客流','客流同比','车流','车流同比'],
        x2: 20,
        y: 0,
        textStyle: {color: '#94989c'},
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
            // data: option.data[4],
            data: function() {
                var list = [];
                for (var i = 1; i < 13; i++) {
                    if (i <= 12) {
                        list.push(i + '月');
                        // list.push(i);
                    }
                }
                return list;
            } ()
        }
    ],
    yAxis: [
        {
            // x: 'center',
            name: '销售额(万元)',
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
                lineStyle:{
                  color: ['#e4e4e4'],
                  width: 1,
                  type: 'solid'
              }
        　　}
        },
        {
            // x: 'center',
            name: '客流/车流',
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
                lineStyle:{
                  color: ['#e4e4e4'],
                  width: 1,
                  type: 'solid'
              }
        　　}
        }
    ],
    series: [
        {
            name: '销售额',
            type: 'line',
            smooth: true,
            data: option.data[0],
            lineStyle: {
                type: 'dashed',
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#005DAA'},
                        {offset: 1, color: '#4BB4FF'}
                    ]
                )
            },
        },
        {
            name: '销售额同比',
            type: 'line',
            smooth: true,
            data: option.data[1],
            lineStyle: {
                type: 'dashed',
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#40E5EF'},
                        {offset: 1, color: '#1EC7DB'}
                    ]
                )
            },
        },
        {
            name: '客流',
            type: 'bar',
            barWidth: 8,
            data: option.data[0],
            barGap: '200%',
            itemStyle: {
                emphasis: {
                    barBorderRadius: [10, 10, 10, 10]
                },
                normal: {//颜色渐变
                    barBorderRadius:[10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#7BD43C'},
                            {offset: 1, color: '#D2FE2E'}
                        ]
                    )
                }
            }
        },
        {
            name: '客流同比',
            type: 'bar',
            barWidth: 8,
            data: option.data[1],
            itemStyle: {
                emphasis: {
                    barBorderRadius: [10, 10, 10, 10]
                },
                normal: {
                    barBorderRadius:[10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#C9E1B8'},
                            {offset: 1, color: '#B2BF83'}
                        ]
                    )
                }
            }
        },
        {
            name: '车流',
            type: 'bar',
            barWidth: 8,
            data: option.data[2],
            itemStyle: {
                emphasis: {
                    barBorderRadius: [10, 10, 10, 10]
                },
                normal: {
                    barBorderRadius:[10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#1DBADA'},
                            {offset: 1, color: '#3DF6F3'}
                        ]
                    )
                }
            }
        },
        {
            name: '车流同比',
            type: 'bar',
            barWidth: 8,
            data: option.data[3],
            itemStyle: {
                emphasis: {
                    barBorderRadius: [10, 10, 10, 10]
                },
                normal: {
                    barBorderRadius:[10, 10, 10, 10],
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#8BBBB1'},
                            {offset: 1, color: '#BDE6E5'}
                        ]
                    )
                }
            }
        },
    ]
  };
}