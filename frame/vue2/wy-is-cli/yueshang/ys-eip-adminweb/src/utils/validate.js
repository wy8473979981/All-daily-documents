/* 校验-匹配规则 By Sweet 2019-12-21 */

/* 匹配非空字符串*/
export function validateNonempty(str) {
  const reg = /^[^\s]+$/
  return reg.test(str)
}
 
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
 
/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
 
/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
 
/* 大小写字母 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
 
/* 名称 */
export function validateName(str) {
  const reg = /^[\u4e00-\u9fa5_A-Za-z0-9\-\_]{1,20}$/
  return reg.test(str)
}
 
/* 手机号码 */
export function validateMobile(str) {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  return reg.test(str)
}

/* 数字检验-小数 */
export function NumberCheck(num)
{
  const reg =/^\d*\.{0,1}\d{0,1}$/;
  return reg.exec(num) != null;
}

/* input-校验 By Sweet 2019-12-21 */

/* 必填项 */
export const validateNameInput = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('此项必填！'))
  } else {
    callback()
  }
}

/* 手机号 */
export const validateMobileInput = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号码必填！'))
  } else if (!validateMobile(value)) {
    return callback(new Error('请填写正确的手机号码格式！'))
  } else {
    callback()
  }
}
