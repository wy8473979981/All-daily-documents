import Vuex from 'vuex'
export default new Vuex.Store({
  state: {
    roseDetailId: 'roseChartDetail', // 更多详细id
    roseCheckInfo: {}, // 坐标信息
    position: 'right' // 右侧信息
  },
  mutations: {
    'REST_ROSE_CHECK_INFO': function(state, payload) {
      state.roseCheckInfo = {}
    },
    'SET_ROSE_CHECK_INFO': function(state, payload) {
      state.roseCheckInfo[`${payload.seriesIndex}-${payload.dataIndex}`] = payload
    },
    'SET_POSITION': function(state, payload) {
      state.position = payload
    },
    'SHOW_MORE': function(state) {
      console.log('SHOW_MORE', document.getElementById(state.roseDetailId))
      const element = document.getElementById(state.roseDetailId)
      if (element) {
        element.style.display = 'block'
      }
    },
    'HIDE_MORE': function(state) {
      console.log('SHOW_MORE', document.getElementById(state.roseDetailId))
      const element = document.getElementById(state.roseDetailId)
      if (element) {
        element.style.display = 'none'
      }
    }
  }
})
