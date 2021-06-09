/* 判断对象所有属性是否均为空 */
const objectUtil = {
  has: (params) => {
    let flag = false
    for(var key in params){
      if(params[key]){
        flag = true
        break
      }
    }
    return flag;
  },
  hasAll: (params) => {
    let flag = true
    for(var key in params){
      if(params[key] != '0' && !params[key]){
        flag = false
      }
    }
    return flag;
  },
}
export default objectUtil
