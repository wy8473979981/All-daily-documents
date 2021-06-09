import main_config from "../config.js"
console.log(main_config, 'main config')

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = parseInt(time / 3600, 10)
  time %= 3600
  const minute = parseInt(time / 60, 10)
  time = parseInt(time % 60, 10)
  const second = time

  return ([hour, minute, second]).map(function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function fib(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

// let isProcessing = false
function ysRequest({
  url,
  method = 'post',
  params = {},
  succ,
  fail,
  complete
}) {
  // console.log(url, '-----------公共请求')
  // console.log(isProcessing, '----是否进行中')
  // if (isProcessing) return
  // isProcessing = true
  wx.showLoading({
    title: '加载中'
  })
  wx.request({
    url: `${main_config.baseUrl}${url}`,
    method,
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    data: {
      "version": "1.0",
      "timestamp": new Date().getTime(),
      "sign": main_config.sign,
      "params": params
    },
    success(res) {
      wx.hideLoading()
      succ && succ(res.data)
    },
    fail(err) {
      wx.hideLoading()
      fail && fail(err)
    },
    complete(res) {
      complete && complete(res)
      
      // isProcessing = false
    }
  })
}

function getType(obj) {
  return Object.prototype.toString.call(obj)
}

function getUnviewCount(index, clerkOpenId) {
  console.log(index, '------------index un read')
  ysRequest({
    url: 'merchantOpen_web/MessageNotifyAndNeed/unReadMessNum.htm',
    method: 'post',
    params: { clerkOpenId },
    succ(res) {
      const count = res.params
      console.log(count, '----未读数')
      if (count > 0) {
        wx.setTabBarBadge({
          index: 3,
          text: count > 99 ? '99+' : res.params + ''
        })
      } else {
        wx.removeTabBarBadge({
          index: 3
        })
      }
    }
  })
}

function isExpire(date) {
  if (!date) {
    return date
  } else {
    const now = Date.now()
    return now > date
  }
}

const subActivityStatus = {
  '1': 'success',
  '2': 'info',
  '3': 'info',
  '4': 'warning'
}
module.exports = {
  isExpire,
  formatTime,
  formatLocation,
  fib,
  ysRequest,
  getType,
  subActivityStatus,
  getUnviewCount
}