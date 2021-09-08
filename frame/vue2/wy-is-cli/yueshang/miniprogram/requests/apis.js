import http from './http.js'
const { regeneratorRuntime } = global

// 服务催办
const urgeService = async params => {
  const res = await http({ url: 'merchantService_web/serviceAll/urge.htm', params })
  if (res.code === '0') {
    wx.showToast({
      title: '催办成功'
    })
  } else {
    wx.showToast({
      title: res.msg,
      icon: 'none'
    })
  }
  return res
}

export {
  urgeService
}