/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 首页api
 */

import request from '@/utils/request'
export function getHomeData(data) {
  return request({
    url: '/amp/home/getData',
    method: 'post',
    data
  })
}
