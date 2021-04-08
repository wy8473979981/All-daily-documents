import { Validator, ValidatorRule } from '../type'

const telRE = /^1[3456789]\d{9}$/

// 手机
export const telValidator: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) return callback()
  if (telRE.test(value)) return callback()
  const defaultMsg = '请输入正确的手机号码'
  callback(new Error(rule?.message || defaultMsg))
}
