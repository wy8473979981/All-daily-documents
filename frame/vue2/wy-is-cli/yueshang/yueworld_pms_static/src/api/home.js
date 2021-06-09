/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: api接口示例
 */
import request from '@/utils/request'
export function homeData(data) {
  return request({
    url: '/pms/target/getList',
    method: 'post',
    data
  })
}
