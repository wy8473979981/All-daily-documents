import Big from 'big.js'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 下载文件
 * @param {url} 文件地址
 */
export const download = (url) => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (isChrome || isSafari) {
    var link = document.createElement('a')
    link.href = url
    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
      link.download = fileName
    }
    if (document.createEvent) {
      var e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }
  window.open(url, '_self')
  return true
}

/**
 * 随机数
 * @param {min} 最小值
 * @param {max} 最大值
 */
export const random = (min, max) => {
  return Math.floor(min + Math.random() * ((max + 1) - min))
}

/**
 * 将阿拉伯数字翻译成中文的大写数字
 * @param {num} 数字
 */
export const numberToChinese = (num) => {
  var AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  var BB = ['', '十', '百', '仟', '萬', '億', '点', '']
  var a = ('' + num).replace(/(^0*)/g, '').split('.')
  var k = 0
  var re = ''
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
          .test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) { re = AA[0] + re }
    if (a[0].charAt(i) !== 0) { re = AA[a[0].charAt(i)] + BB[k % 4] + re }
    k++
  }

  if (a.length > 1) {
    // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++) { re += AA[a[1].charAt(i)] }
  }
  if (re === '一十') { re = '十' }
  if (re.match(/^一/) && re.length === 3) { re = re.replace('一', '') }
  return re
}

/**
 * 金额用，隔开（千分位加逗号）
 * @param {string | number} num
 * @return { string } example:100,999,789.12313
 */
export function numFormat(num) {
  const newNumber = `${num}`
  const [integer, decimal] = newNumber.split('.')
  let formatterNumber = ''
  formatterNumber = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (decimal) {
    formatterNumber += `.${decimal}`
  }
  return formatterNumber
}

/**
 * 把数字按照需要的类型转换
 * @param {number|string} num 数字，或者字符串类型数字
 * @param {string} type ten-thousand 万为单位  rate 百分比为单位 默认是按照数字整数位三位增加一个逗号
 * @param {number} decimal 保留小数的位数 默认保留两位小数
 * @return { string }
 */
export function formatNumber(num, type, decimal) {
  const dec = typeof decimal === 'number' ? decimal : 2
  if (num === null || num === undefined) return '-'
  let newNum = num

  // 字符串处理
  if (typeof newNum === 'string') {
    newNum = newNum.replace(/\,/g, '')
    newNum = Number(newNum)
  }

  // NaN处理
  if (isNaN(newNum)) {
    return '-'
  }
  const newNumber = new Big(newNum)
  let formatNumber = ''

  if (type === 'ten-thousand') {
    formatNumber = numFormat(newNumber.toFixed(dec))
  } else if (type === 'rate') {
    formatNumber = numFormat(newNumber.toFixed(dec)) + '%'
  } else {
    formatNumber = numFormat(newNumber.toFixed(dec))
  }
  return formatNumber
}

/**
 * 去除特殊字符
 * @param {string} string字符串
 */
export function formatStr(val) {
  const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
  return val.replace(pattern, '')
}

/**
 * 日期比较新
 * @param start
 * @param end
 * @returns {start,end,year,month,day}
 */
export function compare(start, end) {
  let min = start
  let max = end
  if (new Date(min).getTime() > new Date(max).getTime()) {
    min = end
    max = start
  }

  const result = { start: min, end: max, year: '', month: '', day: '' }
  let year = format('yyyy', max) - format('yyyy', min)
  let month = format('MM', max) - format('MM', min) - 1 // 不算起止月
  let day = parseInt(format('dd', max)) + (parseInt(format('md', min)) - parseInt(format('dd', min)) + 1) // 起始月天数(=当月最大天数-当月已过天数+1)+截至月天数
  // 1.如果同年同月，则相差天数相减即为最后天数，month置为0
  if (year === 0 && month < 0) {
    month = 0
    day = parseInt(format('dd', max)) - parseInt(format('dd', min)) + 1
  } else if (parseInt(format('dd', max)) === parseInt(format('md', max))) {
    // 2.如果起始日为月初即parseInt(format("dd", min)==1，则月份加一，天数为截至月日期（与第一条互斥）
    month = month + 1
    day = parseInt(format('md', min)) - parseInt(format('dd', min)) + 1
  }
  // 3.day天数大于起始月总天数时，月份加一，多出天数为天数差
  if (day >= parseInt(format('md', min))) {
    month = month + 1
    day = day - parseInt(format('md', min))
  }
  // 4.如果月份相同 month==-1且day=0，则年数减一，月数=11
  if (month < 0) {
    month = (month + 12) % 12
    year--
  }
  if (month === 12) {
    year = year + 1
    month = 0
  }

  result.year = year
  result.month = month
  result.day = day
  result.totalDay = new Date(result.end).getTime() - new Date(result.start).getTime()
  console.log(result)
  return result
}
/**
 * date -> string
 * @param expr    表达式
 * @param date    日期
 * @returns {*}
 */
export function format(expr, date) {
  date = new Date(date)
  const o = {
    'ms': date.getMilliseconds(), // 毫秒
    'md': new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), // 当月最后一天 MaxDay
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
  }
  if (/(y+)/.test(expr)) {
    expr = expr.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(expr)) {
      expr = expr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return expr
}
/**
 * 获取两个日期之间的间隔、文本描述
 * @param start 开始时间 yyyy-MM-dd
 * @param end 结束时间 yyyy-MM-dd
 * @param format   y年m个月d天
 */
export function spacingText(start, end, format) {
  if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
    return '0天'
  } else {
    const result = compare(start, end)
    // console.log(result)
    if (!format) {
      format = ''
      if (result.year > 0) {
        format = 'y年'
      }
      if (result.month > 0) {
        format += 'm个月'
      }
      if (result.day > 0) {
        format += 'd天'
      }
    }
    return format.replace('y', result.year).replace('m', result.month).replace('d', result.day)
  }
}

/**
 * 租金总金额计算、文本描述
 * @param obj
 */
// 整月应收
// value: 1, 日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*固定年天数/12'
// value: 2,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*自然年天数/12'
// value: 3,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*自然月天数'
// value: 4,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*固定月天数'
// 整月应收

// 非整月应收
// value: 1,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*12/固定年天数*实际发生天数'
// value: 2,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积*12/自然年天数*实际发生天数'
// value: 3,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积/自然月天数*实际发生天数'
// value: 4,日单价 月单价 月总额 年单价 年总价
// label: '申请租金*租赁面积/固定月天数*实际发生天数'
export function totalRent(obj) {
  console.log(obj)
  const objName = {
    '1': 'full1001Id',
    '2': 'full1002Id',
    '3': 'full1003Id',
    '4': 'full1004Id',
    '5': 'full1005Id'
  }
  console.log(objName[obj.label])
  const time = compare(obj.contEndDate, obj.contBeginDate)
  let whole = 0 // 整月的值
  let noWhole = 0 // 非整月的值
  let sum = 0 // 租金总金额的值
  const myDate = new Date() // 获取当前年份
  const tYear = myDate.getFullYear() // 年
  const tMonth = myDate.getMonth() // 月
  const year = tYear % 4 === 0 && tYear % 100 !== 0 || tYear % 400 === 0 ? 366 : 365 // // 自然年
  // console.log(year) // 自然年
  const month = new Date(tYear, tMonth, 0).getDate() // 自然月

  // if (obj.label === 1) {
  if (obj.formula.tableData[0][objName[obj.label]]) {
    if (obj.formula.tableData[0][objName[obj.label]] === 1) { // 整月公式
      // 申请租金*租赁面积*固定年天数/12'
      whole = obj.price * obj.meterRentArea * parseInt(obj.formula.fixedYearDayNumber) / 12 * (time.year * 12 + time.month)
      console.log(whole)
    }
    if (obj.formula.tableData[0][objName[obj.label]] === 2) { // 整月公式
      // '申请租金*租赁面积*自然年天数/12'
      whole = obj.price * obj.meterRentArea * year / 12 * (time.year * 12 + time.month)
      console.log(whole)
    }
    if (obj.formula.tableData[0][objName[obj.label]] === 3) { // 整月公式
      // '申请租金*租赁面积*自然月天数'
      whole = obj.price * obj.meterRentArea * year * (time.year * 12 + time.month)
      console.log(whole)
    }
    if (obj.formula.tableData[0][objName[obj.label]] === 4) { // 整月公式
      // '申请租金*租赁面积*固定月天数'
      whole = obj.price * obj.meterRentArea * parseInt(obj.formula.fixedYearDayNumber) * (time.year * 12 + time.month)
      console.log(whole)
    }
  }

  if (obj.formula.tableData[1][objName[obj.label]]) {
    if (obj.formula.tableData[1][objName[obj.label]] === 1) { // 非整月公式
      // '申请租金*租赁面积*12/固定年天数*实际发生天数'
      noWhole = obj.price * obj.meterRentArea * parseInt(obj.formula.fixedYearDayNumber) / 12 * time.day
      console.log(noWhole)
    }
    if (obj.formula.tableData[1][objName[obj.label]] === 2) { // 非整月公式
      // '申请租金*租赁面积*12/自然年天数*实际发生天数'
      noWhole = obj.price * obj.meterRentArea * 12 / year * time.day
      console.log(noWhole)
    }
    if (obj.formula.tableData[1][objName[obj.label]] === 3) { // 非整月公式
      // '申请租金*租赁面积/自然月天数*实际发生天数'
      noWhole = obj.price * obj.meterRentArea / month * time.day
      console.log(noWhole)
    }
    if (obj.formula.tableData[1][objName[obj.label]] === 4) { // 非整月公式
      // '申请租金*租赁面积/固定月天数*实际发生天数'
      noWhole = obj.price * obj.meterRentArea * parseInt(obj.formula.fixedMonthDayNumber) * time.day
      console.log(noWhole)
    }
  }
  sum = whole + noWhole
  sum = sum.toFixed(2)
  console.log(sum)
  return sum
  // }
}

