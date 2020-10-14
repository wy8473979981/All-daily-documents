import request from '@/utils/request'

export function getStsToken() {
  return request({
    url: '/fontApi/oss/stsToken',
    method: 'get',
    params: {}
  })
}
 