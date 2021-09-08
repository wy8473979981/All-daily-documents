/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 测试接口
 */
import { Api } from '@/utils/api'

const listFn = (obj) => {
  return new Promise(resolve => {
    const newList = []
    for (let i = 0; i < 20; i++) {
      if (getNum() >= 0) {
        newList.push(getNewObj(obj))
      }
    }
    resolve({
      data: newList,
      total: getNum(1000)
    })
  })
}

const getNum = (num = 10) => {
  return Math.floor(Math.random() * num)
}
const getNewObj = obj => {
  const newObj = {}
  for (const k in obj) {
    const objValue = obj[k]
    let value = ''
    if (typeof objValue === 'string') {
      value = objValue + getNum(10)
    }
    if (typeof objValue === 'number') {
      value = getNum(100)
    }
    newObj[k] = value
  }
  return newObj
}

export class TestApi extends Api {
  // 获取列表数据
  getList = (data) => {
    return listFn(data)
  }
}

export const testApi = new TestApi()
