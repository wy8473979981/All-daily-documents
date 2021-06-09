/*
 * @Author: your name
 * @Date: 2021-05-21 15:06:54
 * @LastEditTime: 2021-05-21 15:27:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new-amp\src\api\base.js
 */
import { Api } from '@/utils/api'

export class BaseApi extends Api {
  // 获取城市
  getList = () => {
    return this.get(`/ws/district/v1/list`);
  }

  // 根据城市查找城市path
  search = (param) => {
    return this.get(`/ws/district/v1/search`, param);
  }

  // 根据经纬度 查找 城市
  getCityByLocation(param) {
    return this.get(`/ws/geocoder/v1`, param);
  }
}

export const baseApi = new BaseApi()