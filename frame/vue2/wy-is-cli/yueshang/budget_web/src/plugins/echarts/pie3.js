import echarts from 'echarts'

export default function optionData (option) {
  // option.color = option.color || ['#05def9', '#1dc6da'];
  // option.fontColor = option.fontColor || '#3085e7';
  const colors = ['#ffdc28', '#36c17e', '#4a9af7', '#ef4e59']
  var data = [{
    value: option.data[3],
    name: '高于租金包商家面积'
  },
  {
    value: option.data[2],
    name: '低于租金包商家面积'
  },
  {
    value: option.data[1],
    name: '免租期商家面积'
  },
  {
    value: option.data[0],
    name: '空铺商家面积'
  }
  ].sort(function (a, b) {
    return a.value > b.value
  })
  const seriesBar = []
  data.forEach((d, i) => {
    seriesBar.push({
      value: d.value,
      itemStyle: {
        color: colors[i]
      }
    })
  })
  return {
    polar: {
      center: ['50%', '60%'],
      radius: '80%'
    },
    angleAxis: {
      show: false,
      min: function (value) {
        return 0
      },
      max: function (value) {
        return value.max * 2
      }
    },
    radiusAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        color: '#909090',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      splitLine: {
        show: false
      },
      data: [...data.map(d => d.name)]
    },
    series: [{
      type: 'bar',
      coordinateSystem: 'polar',
      itemStyle: {
        color: '#41a0ff'
      },
      data: seriesBar
    },
    {
      type: 'custom',
      coordinateSystem: 'polar',
      stack: 'a',
      renderItem: function (params, api) {
        var values = [api.value(0), api.value(1)]
        var coord = api.coord(values)
        return {
          type: 'text',
          position: [3 * Math.sin(coord[3]), 3 * Math.cos(coord[3])],
          rotation: coord[3] + Math.PI / 2,
          origin: [coord[0], coord[1]],
          style: {
            text: api.value(1),
            fill: '#333',
            fontSize: 12,
            textAlign: 'right',
            textVerticalAlign: 'middle',
            x: coord[0],
            y: coord[1]
          }
        }
      },
      data: data
    }]
  }
}
