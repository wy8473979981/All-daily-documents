import { Validator, ValidatorRule } from '../type'

// 座机
export const phoneValidator: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  const message = rule?.message || '请输入正确的座机号码'

  if (/^0\d{2,3}-?\d{7,8}$/.test(value)) {
    return callback()
  } else {
    return callback(new Error(message))
  }
}
