import { Message } from 'element-ui'
const stringToEntity = (str) => {
  str = str.replace(/&lt;/g, '<')
  str = str.replace(/&gt;/g, '>')
  return str
}

const getDataType = (data) => {
  return Object.prototype.toString.call(data)
}

const getItemLength = data => {
  let obj = {}
  data.forEach(item => {
    if (!obj[item]) {
      obj[item] = 1
    } else {
      obj[item]++
    }
  })
  return obj
}

/**
  返回前N项和
  输入 [1,2,3,4,5]
  返回 [1,3,6,10,15]
 */

const getForePartSum = data => {
  let arr = []
  for (let i = 0; i < data.length; i++) {
    const arrSub = data.slice(0, i + 1)
    const sum = arrSub.reduce((a, c) => a + c, 0)
    arr.push(sum)
  }
  return arr
}
// const filterDuplicate = () => {

// }

// 数字处理：每三位添加,
const toThousands = (number) => {
  // let num = (number || 0).toString(), result = '';
  // while (num.length > 3) {
  //   result = ',' + num.slice(-3) + result;
  //   num = num.slice(0, num.length - 3);
  // }
  // if (num) { result = num + result; }
  // return result;
  if (!isNaN(Number(number))) {
    return (Number(number).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }
}
// 去除px单位获取数字
const removePx = (str) => {
  return str ? new Number(str.replace(/px/g, '')) : 0
}
// 获取元素margin与padding高度和
const mpHeight = (el, pd) => {
  // el 为class 查询
  const obj = el
  var pageStyle = null
  if (window.getComputedStyle) {
    pageStyle = getComputedStyle(obj, null)
  } else {
    pageStyle = obj.currentStyle;//兼容IE的写法
  }
  // offsetHeight = height + padding + border
  if (pd) {
    // 如有必要获取padding值
    return removePx(pageStyle.marginTop) + removePx(pageStyle.marginBottom) + removePx(pageStyle.paddingTop) + removePx(pageStyle.paddingBottom)
  }
  return removePx(pageStyle.marginTop) + removePx(pageStyle.marginBottom)
}

// 动态获取table高度
const getTableHeight = () => {
  let part = 0
  try {
    // 获取顶部Header高度 默认44
    var header = document.getElementsByClassName("el-header")[0]
    // console.log("获取顶部Header高度 默认44：header=",header.offsetHeight )
    // 获取筛选条件控件高度 默认 87/49；获取padding与margin 默认padding-bottom=10
    var tool = document.getElementsByClassName("tool-bar")
    // console.log("获取筛选条件控件高度 默认 87/49：tool=",tool[1].offsetHeight )
    // console.log("获取筛选条件控件 padding与margin 默认padding-bottom=10：tool=",mpHeight(tool[1]))
    // 获取容器page的padding与margin：默认padding=20
    var page = document.getElementsByClassName("list-page")
    // console.log("获取容器page的padding与margin：默认padding=20 margin=0: page=" + mpHeight(page[0]))
    // 获取分页控件高度默认 32；获取分页控件padding与margin 默认margin-top=10
    var paginator = document.getElementsByClassName("paginator-wrapper")
    // console.log("获取分页控件高度默认 32:paginator===" + paginator[0].offsetHeight)
    // console.log("获取分页控件padding与margin 默认margin-top=10 :paginator===" + mpHeight(paginator[0]))
    part = header.offsetHeight + tool[1].offsetHeight + mpHeight(page[0], 1) + paginator[0].offsetHeight + mpHeight(paginator[0])
    // 获取page-title 导入数据、下载模板高度；获取padding与margin  如果有
    var title = document.getElementsByClassName("page-title")
    if (title.length > 0) {
      part += title[0].offsetHeight + mpHeight(title[0])
    }
    // 获取status-buttons 状态与操作按钮高度；获取padding与margin  如果有
    var buttons = document.getElementsByClassName("status-buttons")
    if (buttons.length > 0) {
      part += buttons[0].offsetHeight + mpHeight(buttons[0])
    }
    // 判断el-main是否出现x轴滚动条，并获取滚动条高度
    const main = document.getElementsByClassName("el-main")[0]
    if (main.scrollWidth > (main.innerWidth || main.clientWidth)) {
      part += main.offsetHeight - main.clientHeight
    }
    // console.log("动态非表格高度为："+part)
  } catch (e) {
    return 220
  }
  return document.documentElement.clientHeight - part - 60
}

const computedTableHeight = () => {
  try {
    return document.documentElement.offsetHeight - document.querySelector('.el-table').offsetTop - 70
  } catch (e) {
    console.log(e)
  }
}

const getDynamicTableHeight = (event) => {
  window.onresize = () => {

    return event.$store.commit("saveTableHeight", computedTableHeight())
  }
  return event.$store.commit("saveTableHeight", computedTableHeight())
}

const numberFormat = (value, options = { precision: 2, unit: '', type: false }) => {
  //value:number | string,//options:{ precision: number, unit: string, type: Boolean }
  if (isNaN(value) || ['', null, undefined].includes(value)) {
    return '-';
  }
  if (options.type) {
    // 万元为单位
    value = value / 10000;
  }
  const newValue = value.toString().replace(/[^\d.-]/g, '');

  const text = Number(newValue).toFixed(options.precision);
  const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
  const format = text.replace(/\..*$/, '').split('').reverse().join('').replace(/\d{3}\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('');

  return `${format}${bit}${options.unit || ''}`;
}
const successFc = (msg) => {
  Message.success(msg)
}
const errorFc = (msg) => {
  Message.error(msg)
}

const rTime = (date) => {
  if (!date) {
    return '-' // 建议返回'', 调用者获取返回结果再次判断，除非项目统一使用'-'
  }
  // 2020-01-01T00:00:00.000000Z 日期格式转换
  const myDate = new Date(date).toJSON()
  return new Date(new Date(myDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

const getLabel = (value, key, label, collection) => {
  let current = null;
  collection && collection.map(function (item) {
    if (item[key] == value) {
      current = item;
    }
  });
  return (current && current[label]) || "-";
}

export default {
  getLabel,
  rTime,
  getForePartSum,
  stringToEntity,
  getDataType,
  getItemLength,
  toThousands,
  mpHeight,
  numberFormat,
  getDynamicTableHeight,
  successFc,
  errorFc
}
