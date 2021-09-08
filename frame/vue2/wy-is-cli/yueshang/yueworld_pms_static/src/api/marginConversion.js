/*
 * @Author: xza
 * @LastEditors: Please set LastEditors
 * @Description: api接口示例
 * @Description: 保证金-保证金转换单
 */
import { Api } from '@/utils/api'

export class MarginConversionApi extends Api {
  // 列表
  marginConversionList = (param) => {
    return this.post(`/mock/26/pms/MarginModules/MarginConversion/list`, param)
  }
  // 详情
  marginConversionDetails = (param) => {
    return this.post('/mock/26/pms/MarginModules/MarginConversion/details', param)
  }
  // 删除
  marginConversionDelete = (param) => {
    return this.post('/mock/26/pms/MarginModules/MarginConversion/delete', param)
  }
  // 保存
  marginConversionSave = (param) => {
    return this.post('/mock/26/pms/MarginModules/MarginConversion/save', param)
  }
}

export const marginConversionApi = new MarginConversionApi()
