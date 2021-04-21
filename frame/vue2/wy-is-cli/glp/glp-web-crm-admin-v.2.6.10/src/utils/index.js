/**
 * Created by jiachenpan on 16/11/18.
 */

import { SelectionOptions } from "@/js/common/consts";
import regionOptions from './regionOptions'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
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

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
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
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

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
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

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

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
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

  return function (...args) {
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
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
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

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}



//随机生成字符串
const GUID = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

const getSuffix = (fileName) => {

  let len = fileName.lastIndexOf('.');

  let suffix = fileName.substr(len + 1);
  return suffix;

}


const timestampToTime = (timestamp, type) => {
  if (!timestamp) {
    return '-'
  }
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '';
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  // return Y + M + D;
  if (type == 1) {
    return Y + M + D;
  } else if (type == 2) {
    return Y + M + D + ' ' + h + m + s;
  } else {
    return ''
  }
}

const fetchChildrenPermission = (context, key) => {

  let path = context.$route.path

  let menuData = context.$store.state.user.menuData
  let hasPermission = false

  function getPermission(path, menuData, key) {
    for (let i = 0, len = menuData.length; i < len; i++) {
      let item = menuData[i]
      console.log(' item.children', item.pageUrl)
      if (item.pageUrl == path) {

        let children = item.children;
        if (children && children.length > 0) {
          for (let j = 0, len2 = children.length; j < len2; j++) {

            if (children[j].type == 2 && children[j].code == key) {
              hasPermission = true;
            }
            getPermission(path, children[j].children, key)
          }
        }
      } else {

        getPermission(path, item.children, key)
      }
    }
  }

  getPermission(path, menuData, key)

  return hasPermission

}

const dictTable = (type) => {
  // 字典
  let dictTable = JSON.parse(localStorage.getItem("dict_assemble"));
  return dictTable[type] || SelectionOptions[type]
}

const btnAuthority = (code) => {
  // 权限按钮
  let btnAuthority = JSON.parse(localStorage.getItem("btnAuthority"));
  let isShow = btnAuthority && btnAuthority.some(item => {
    return item.code == code
  })
  return isShow
}

// 列表，和数据权限有关的按钮
const permissionsButtonFunc = (row, currBtnType) => {
  try {
    let current = null;
    let buttonList = row.buttonList;
    buttonList.map(function (item, index, array) {
      if (item.buttonType == currBtnType) {
        current = item;
      }
    });
    return (current && current.enable) || false;
  } catch (e) {
    console.log(e);
  }
}

const provinces = {}

regionOptions.forEach(v => {
  provinces[v.provinceCode] = v.provinceName
})

const getCities = (provinceCode) => {
  if (!provinceCode) return {}
  const province = regionOptions.find(v => v.provinceCode === provinceCode)
  const ret = {}
  const cities = province && province.cities || []
  cities.forEach(v => {
    ret[v.cityCode] = v.cityName
  })
  return ret
}

const getCounties = (cityCode) => {
  if (!cityCode) return {}
  let city = null
  regionOptions.some(v => {
    const cities = v.cities || []
    return cities.some(w => {
      if (w.cityCode === cityCode) {
        city = w
        return true
      }
    })
  })
  const ret = {}
  const counties = city && city.counties || []
  counties.forEach((v) => {
    ret[v.countyCode] = v.countyName
  })
  return ret
}

const getDepartment = (code) => {
  switch (code) {
    case '01':
      return '物流事业部'
    case '02':
      return '冷链事业部'
    case '03':
      return '其他'
    case '04':
      return '跨境事业部'
    case '05':
      return '零售通路事业部'
    case '06':
      return '普云链事业部'
    case '07':
      return '市场部'
    case '08':
      return '财务部'
    default:
      return '-'
  }
}

const getStep = (code) => {
  switch (code) {
    case '01':
      return '物流事业部'
    case '02':
      return '冷链事业部'
    case '03':
      return '其他'
    case '04':
      return '跨境事业部'
    case '05':
      return '零售通路事业部'
    case '06':
      return '普云链事业部'
    case '07':
      return '市场部'
    case '08':
      return '财务部'
    default:
      return '-'
  }
}

const getLabel = (key, collection) => {
  let current = null;
  collection && collection.map(function (item) {
    if (item.key == key) {
      current = item;
    }
  });
  return (current && current.label) || "-";
}


// 筛选菜单
const filterRouterFunc = (data, path) => {
  let isExist = false;
  let fn = (data, path) => {
    let index = data.findIndex(item => {
      return (item.pageUrl && item.pageUrl == path)
    });
    if (index != -1) {
      isExist = true;
    } else {
      for (let i = 0, len = data.length; i < len; i++) {
        if (isExist == true) { break; }
        let item = data[i];
        if (item.children) {
          fn(item.children, path)
        }
      }
    }
  }
  if (data) {
    fn(data, path);
  }
  return isExist;
};

const deepCloneTofieldNull = (obj) => {
  var newObj = obj instanceof Array ? [] : {};
  if (typeof obj !== 'object') {
    return obj;
  } else {
    for (var i in obj) {
      if (typeof obj[i] === 'object' && Object.prototype.toString.call(obj[i]) != "[object Null]") {
        newObj[i] = deepCloneTofieldNull(obj[i])
      } else {
        if (!obj[i] || obj[i] == "") {
          newObj[i] = null;
        } else {
          newObj[i] = obj[i];
        }
      }
    }
  }
  return newObj;
}

// 千分位
// value金额，unit币种，precise小数位
const MicrometerLevel = (value, unit, precise) => {
  if (unit === void 0) { unit = ''; }
  if (precise === void 0) { precise = 2; }
  if (isNaN(value))
    return value;
  var text = Number(value).toFixed(precise);
  var bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'));
  var f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, function (_, c) { return _ + ','; }).split('').reverse().join('') + bit;
  return unit + f;
}


export const Utils = {
  GUID,
  provinces,
  MicrometerLevel,
  getCities,
  getCounties,
  filterRouterFunc,
  getSuffix,
  timestampToTime,
  dictTable,
  getLabel,
  btnAuthority,
  permissionsButtonFunc,
  fetchChildrenPermission,
  getDepartment,
  deepCloneTofieldNull,
  param2Obj
}