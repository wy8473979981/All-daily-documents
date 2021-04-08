import { Validator, ValidatorRule } from '../type'

export interface EmailValidatorRule extends ValidatorRule {
  sep?: string; // 多邮箱分隔符， 若指定该属性，意为多个邮箱
}

// const emailRE = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
const emailRE = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i

export const emailValidator: Validator<EmailValidatorRule> = (rule, value, callback) => {
  if (!value) return callback()
  const ret = rule.sep ? value.split(rule.sep) : [value]
  const message = rule?.message || '请输入正确的邮箱地址'
  const hasError = ret.some((v: any) => !emailRE.test(v))
  if (hasError) {
    callback(new Error(message))
  } else {
    callback()
  }
}
