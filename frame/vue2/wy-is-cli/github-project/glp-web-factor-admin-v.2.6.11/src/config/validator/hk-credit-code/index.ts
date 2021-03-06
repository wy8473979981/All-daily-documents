import { Validator, ValidatorRule } from '../type'

// 社会信用码
export const hkCreditCodeValidator: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  const message = rule?.message || '请输入正确的HK社会信用码'

  const patern = /^[0-9]{7}$/
  if (!value) {
    return callback(new Error(message))
  }
  if (patern.test(value)) {
    return callback()
  } else {
    return callback(new Error(message))
  }
}
