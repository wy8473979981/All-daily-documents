/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'



// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    // { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { codeObject: '编码对象', sortable: true, isShow: true },
    { codeOutcome: '组成结果', sortable: true, isShow: true },
  ]
}


let mockData = [{

},]