import { Validator, ValidatorRule } from '../type'

// 社会信用码
export const creditCodeValidator: Validator<ValidatorRule> = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  const message = rule?.message || '请输入正确的社会信用代码'
  const patrn = /^[0-9A-Z]+$/
  // 18位校验及大写校验
  if ((value.length !== 18) || (patrn.test(value) === false)) {
    return callback(new Error(message))
  } else {
    let codeByte // 统一社会信用代码的每一个值
    let codeByteWeight // 统一社会信用代码每一个值的权重
    let total = 0
    const weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28] // 加权因子
    const str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    // 不用I、O、S、V、Z
    for (let i = 0; i < value.length - 1; i++) {
      codeByte = value.substring(i, i + 1)
      codeByteWeight = str.indexOf(codeByte)
      total = total + codeByteWeight * weightedfactors[i]
      // 权重与加权因子相乘之和
    }
    let logiccheckcode: number | string = 31 - total % 31
    if (logiccheckcode === 31) {
      logiccheckcode = 0
    }
    const range = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
    const rangeArr = range.split(',')
    logiccheckcode = rangeArr[logiccheckcode]
    const checkcode = value.substring(17, 18)
    if (logiccheckcode !== checkcode) {
      return callback(new Error(message))
    }
    return callback()
  }
}
