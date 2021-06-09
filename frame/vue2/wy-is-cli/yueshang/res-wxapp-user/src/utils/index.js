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
  if(!isNaN(Number(number))) {
    return (Number(number).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }
}

export {
  getForePartSum,
  stringToEntity,
  getDataType,
  getItemLength,
  toThousands
}
