import Big from 'big.js'

/**
   * @description 打开新页面
   * @param {String} url 地址
   */
export const open = (url) => {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild((document).getElementById('link-temp'))
}

/**
 * 日期格式转换
 * @param {object | string | number} time
 * @param {string} cFormat
 */
export const parseTime = (time, cFormat) => {
  if (time === undefined) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
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
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 * 下载excel 数据流格式
 * @param {Blob} data 接口返回的原数据
 */
export const exportData = (data) => {
  const str = decodeURIComponent(data.headers['content-disposition'])
  const fileName = str.split('filename=')[1];
  const content = data.data;
  const blob = new Blob([content]);
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}

// export const exportExcel = (data) => {
//   var blob = new Blob([data.data], { type: "application/vnd.ms-excel" });
//   var objectUrl = URL.createObjectURL(blob);
//   var a = document.createElement('a');
//   document.body.appendChild(a);
//   a.setAttribute('style', 'display:none');
//   a.setAttribute('href', objectUrl);
//   var filename = sendData.excelName + ".xlsx";
//   a.setAttribute('download', filename);
//   a.click();
//   URL.revokeObjectURL(objectUrl);
// }

/**
 * 通过链接下载文件
 * @param {string} link
 */
export const downLoadByLink = (link) => {
  const CreateA = document.createElement('a');
  CreateA.href = link;
  CreateA.download = '';
  document.body.appendChild(CreateA);
  CreateA.click();
  document.body.removeChild(CreateA);
}

/**
 * 实现右键复制功能 使用时，copyTxt.call(this, txt)
 * @param {String| Number} txt 
 */
export function copyTxt(txt) {
  // console.log('data', data)
  let oInput = document.createElement('textarea');
  oInput.value = txt;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display = 'none';
  this.$message.success('复制成功');
}

/**
 * 金额用，隔开（千分位加逗号）
 * @param {string | number} num
 * @return { string } example:100,999,789.12313 
 */
export function numFormat(num) {
  const newNumber = `${num}`
  let [integer, decimal] = newNumber.split('.');
  let formatterNumber = ''
  formatterNumber = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (decimal) {
    formatterNumber += `.${decimal}`
  }
  return formatterNumber;
}


/**
 * 把数字按照需要的类型转换
 * @param {number|string} num 数字，或者字符串类型数字
 * @param {string} type ten-thousand 万为单位  rate 百分比为单位 默认是按照数字整数位三位增加一个逗号
 * @param {number} decimal 保留小数的位数 默认保留两位小数
 * @return { string } 
 */
export function formatNumber(num, type, decimal = 2) {
  if (num === null || num === undefined) return '-'
  const newNumber = new Big(num);
  let formatNumber = '';

  if (type === 'ten-thousand') {
    formatNumber = numFormat(newNumber.div(10000).toFixed(decimal));
  } else if (type === 'rate') {
    formatNumber = numFormat(newNumber.toFixed(decimal)) + '%';
  } else {
    formatNumber = numFormat(newNumber.toFixed(decimal));
  }

  return formatNumber
}

export function getSession(path) {
  return JSON.parse(window.sessionStorage.getItem(path)) || {};
}
export function setSession(path, fromData) {
  if (window.location.hash.includes('type=pd')) {
    parent.postMessage({ fromData, url: path }, '*')
  } else {
    window.sessionStorage.setItem(path, JSON.stringify(fromData));
    this.$router.push({ path })
  }
}

