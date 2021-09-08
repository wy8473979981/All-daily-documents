// import * as Echarts from 'echarts'
// // import cloneDeep from 'lodash/cloneDeep'

// // const init = cloneDeep(Echarts.init)

// const NEcharts = Echarts

// console.log('NEcharts', NEcharts)

// NEcharts.init = function(dom, ...args) {
//   console.log('Echarts', dom, ...args, Echarts, NEcharts)
//   return Echarts.init(dom, ...args)
// }

// export default NEcharts

export function resizeEchartContent(id, options) {
  const zoom = window.innerWidth < 1440 ? window.innerWidth / 1440 : 1
  if (zoom === 1) return
  const echartContent = document.querySelector(id)
  echartContent.style.zoom = 1 / zoom
  if (!options || options.width !== false) {
    echartContent.style.width = echartContent.offsetWidth * zoom + 'px'
  }
  if (!options || options.height !== false) {
    echartContent.style.height = echartContent.offsetHeight * zoom + 'px'
  }
}
