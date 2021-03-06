import { Validator, ValidatorRule } from '../type'

// 银行卡号
export const bankNoValidator: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  const message = rule?.message || '请输入正确的银行卡号'
  if (/^[1-9]\d{1,29}$/i.test(value)) {
    return callback()
  } else {
    return callback(new Error(message))
  }
}
