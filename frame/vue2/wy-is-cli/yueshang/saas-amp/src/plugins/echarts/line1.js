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
    grid:{
        // x:55,
        y:30,
        x2:15,
        y2:40,
        borderWidth:1
    },
    tooltip: {
        trigger: 'axis',
        triggerOn: 'mousemove|click',
        formatter: function (params) {
            let res1='<p>'+params[0].name + '月' +'</p>' 
            let res2 = '';
            params.forEach(item => {
              res2 += '<div style="display:inline-block;margin-right:20px;">'+ 
                      '<span>'+ item.seriesName +'</span>' + 
                      '<h4>'+ item.data + '%' +'</h4>' +
                      '</div>'
            })
            return res1 + res2;
        },
    },
    legend: {
        data: ['实际', '同比'],
        x2: 20,
        y: 0,
        textStyle: {color: '#94989c'},
        icon: 'circle',
        itemWidth: 20,
        itemHeight: 12,
        itemGap: 20
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
            boundaryGap: false,
            data: function() {
                var list = [];
                for (var i = 1; i < 13; i++) {
                    if (i <= 12) {
                        // list.push(i + '月');
                        list.push(i);
                    }
                }
                return list;
            } ()
        }
    ],
    yAxis: [
        {
            x: 'center',
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisLabel: {
                formatter: '{value} %',
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
            name: '实际',
            type: 'line',
            // symbol: 'none',
            smooth: true,
            data: option.data[0],
            itemStyle: {
                normal: {//颜色渐变
                    lineStyle:{
                        width:3//设置线条粗细
                    },
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#1dc6da'},
                            {offset: 1, color: '#05def9'}
                        ]
                    )
                }
            }
        },
        {
            name: '同比',
            type: 'line',
            // symbol: 'none',
            smooth: true,
            data: option.data[1],
            itemStyle: {
                normal: {//颜色渐变
                    lineStyle:{
                        width:3//设置线条粗细
                    },
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#7bd43c'},
                            {offset: 1, color: '#d2fe2e'}
                        ]
                    )
                }
            }
        },
    ]
};
}