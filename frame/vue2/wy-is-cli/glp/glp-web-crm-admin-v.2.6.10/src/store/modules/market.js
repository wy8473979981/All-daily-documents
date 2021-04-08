
const market = {
  state: {
    detailInfo: {p:1}

  },

  mutations: {
    setDetailInfo: (state, data) => {//设置市场活动详情
      state.detailInfo = data || {};
      
    }

  },

  actions: {

  }
}

export default market
