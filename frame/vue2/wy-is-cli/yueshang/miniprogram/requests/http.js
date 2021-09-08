import main_config from "../config.js"

function http({
  url, params = {}, method = 'POST'
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${main_config.baseUrl}${url}`,
      method,
      data: {
        "version": "1.0",
        "timestamp": new Date().getTime(),
        "sign": main_config.sign,
        ...params
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export default http