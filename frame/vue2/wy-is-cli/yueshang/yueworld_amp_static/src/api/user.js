/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: api接口示例
 */
import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/pms/target/income',
    method: 'get',
    data
  })
}
