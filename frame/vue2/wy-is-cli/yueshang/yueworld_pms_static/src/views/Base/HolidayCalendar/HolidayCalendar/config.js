/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:节假日日历
*/
import PUBFN from '@/utils/pubFn'

export const configData = () => {
  return [
    { itemType: 'select', placeholder: '请选择', prop: 'programName', label: '', width: '200px', list: PUBFN.getOptionsList('programName') },
    { itemType: 'datePicker', prop: 'date', label: '', placeholder: '', width: '200px', valueFormat: 'yyyy-MM', type: 'month' }
  ]
}
