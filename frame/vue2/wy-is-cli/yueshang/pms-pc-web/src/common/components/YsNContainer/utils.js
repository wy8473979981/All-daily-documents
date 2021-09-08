/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
 */

import { getSession } from 'utils/utils'
import store from '@/store'

const enumKeys = store.getters.enumKeys

// 获取初始formData
export function GetInitFormData(pathKey, data) {
  let formData = {};

  for (const [key, value] of Object.entries(data)) {
    let val = getSession(pathKey)[key] || value;
    formData[key] = val;
  }

  return formData
}

// 接受老项目跳转传值后重新修改formData
export function GetQueryDataAddModify(data) {
  let formData = {};
  for (const [key, value] of Object.entries(data)) {
    let val = value;
    if (enumKeys.includes(key) && value === '') {
      val = 'empty';
    }
    formData[key] = val;
  }

  return formData;
}

// 请求前修改formData
export function BeforeSearchModifyFormData(data) {
  let formData = {};
  for (const [key, value] of Object.entries(data)) {
    let val = value;
    if (enumKeys.includes(key) && value === 'empty') {
      val = '';
    }
    formData[key] = val;
  }
  return formData;
}