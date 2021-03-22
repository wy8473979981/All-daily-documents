Date.prototype.format = function (fmt) { // author: meizz
  // console.log(fmt, '---fmt')
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    // console.log(RegExp.$1, 'RegExp.$1')
    // console.log((this.getFullYear() + "").substr(4 - RegExp.$1.length), 'year')
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    // console.log('2019'.substr(1), 'fmt')
  }
  console.log(fmt, '---fmt1---')

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      console.log(RegExp.$1, RegExp.$1.length, o[k], '' + o[k], '匹配的')
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  console.log(fmt, '---fmt2---')
  return fmt
}

var parsed = null
var date1 = new Date(Date.now())
// parsed = date1.format('yyyy')
// console.log(parsed, 'yyyy') // 2018
parsed = date1.format('yy M dd')
console.log(parsed) // 2018 12 02
// parsed = date1.format('MM')
// console.log(parsed, 'MM') // 2018 12 02

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
