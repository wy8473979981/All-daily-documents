import echarts from 'echarts'

export default function optionData (option) {
  option.color = option.color || ['#05def9', '#1dc6da']
  option.fontColor = option.fontColor || '#3085e7'
  return {
    backgroundColor: '#fff',
    graphic: [
      {　// 环形图中间添加文字
        type: 'text',　// 通过不同top值可以设置上下显示
        left: 'center',
        top: option.font_top || '38%',
        style: {
          text: option.name,
          textAlign: 'center',
          fill: '#333',　// 文字的颜色
          width: 30,
          height: 30,
          fontSize: 12,
          color: '#999'
        }
      },
      {　// 环形图中间添加文字
        type: 'text', // 通过不同top值可以设置上下显示
        left: 'center',
        top: '50%',
        style: {
          text: option.value + '%',
          textAlign: 'center',
          fill: option.fontColor, // 文字的颜色
          width: 30,
          height: 30,
          fontSize: 20,
          fontWeight: 500
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['70%', '80%'], // 设置内半径和外半径
        center: ['50%', '50%'], // 图的位置，距离左跟上的位置
        startAngle: 90, // 起始角度
        clockWise: false, // 默认逆时针
        avoidLabelOverlap: false, // 避免标注重叠
        hoverAnimation: false, // 移入放大
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: option.value,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: { // 颜色渐变
                color: new echarts.graphic.LinearGradient(
                  1, 0, 0, 0,
                  [
                    { offset: 0, color: option.color[1] },
                    { offset: 0.5, color: option.color[0] },
                    { offset: 1, color: option.color[1] }
                  ]
                )
              }
            }
          },
          {
            value: 100 - option.value <= 0 ? 0 : 100 - option.value,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: option.underColor || '#e0e0e0'
              }
            }
          }
        ]
      }
    ]
  }
}
