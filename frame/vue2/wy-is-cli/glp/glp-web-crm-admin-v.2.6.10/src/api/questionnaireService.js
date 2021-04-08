import { get, post } from './axiosConfig';
export default {
  // 验证码
  send: (data, header) => post('/glp-crm/intention/verification/code', data, header),

  //提交
  submit: (data, header) => post('/glp-crm/intention/submit', data, header),
  post: (url, data, header) => post(url, data, header),
  get: (url, header) => get(url, header)
}