Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt
}

// 获取距今天day天的日期字符串(-1 代表昨天，-7代表最近7天，-30代表最近一月)
Date.prototype.getDateSpan = function (day) {
  var today = new Date(new Date().toLocaleDateString())
  var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetdayMilliseconds) // 注意，这行是关键代码
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = ((month) => {
    return month.toString().length === 1 ? '0' + month : month // 日期单个数字补0
  })(tMonth + 1)
  tDate = ((month) => {
    return month.toString().length === 1 ? '0' + month : month
  })(tDate)
  return tYear + '/' + tMonth + '/' + tDate
}
// 秒数时间转换成00:00:00格式
Date.prototype.timeFormat = function (times) {
  var result = '00:00:00'
  var hour, minute, second
  if (times > 0) {
    hour = Math.floor(times / 3600)
    if (hour < 10) {
      hour = '0' + hour
    }
    minute = Math.floor((times - 3600 * hour) / 60)
    if (minute < 10) {
      minute = '0' + minute
    }

    second = Math.floor((times - 3600 * hour - 60 * minute) % 60)
    if (second < 10) {
      second = '0' + second
    }
    result = hour + ':' + minute + ':' + second
  }
  return result
}
