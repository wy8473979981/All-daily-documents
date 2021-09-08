/*
 * @Author: sdy
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-08-03 18:25:11
 */
import { Api } from '@/utils/api'
export class ProcessingApi extends Api {
  // 获取余额查询列表页
  balanceList=(param) => {
    return this.post('/mock/26/pms/FinancialManagement/balanceList/list', param)
  }
  // 获取余额查询详情页
  balanceDetails=(param) => {
    return this.post('/mock/26/pms/BalanceDetails', param)
  }
  // 获取列表页
  processing = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/processing/list', param)
  }
  // 获取新增页
  processingAdd = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/processingAdd/list', param)
  }
  // 获取详情页
  processingDetails = (param) => {
    return this.post('/mock/26/pms/FinancialManagement/processingDetails/list', param)
  }
  // 获取编辑页
  processingDialog = (param) => {
    return this.post('/mock/26/pms/processingDialog', param)
  }
  // 获取应收管理-应收账单-列表页
  receivable = (param) => {
    return this.post('/mock/26/pms/Receivable', param)
  }
  // 获取应收管理-应收账单-详情页
  receivableDetails = (param) => {
    return this.post('/mock/26/pms/ReceivableDetails', param)
  }
  // 获取暂收款管理-处理单-处理明细
  optionFee = (param) => {
    return this.post('/mock/26/pms/optionFee', param)
  }
   // 获取暂收款管理-转换单-列表页
   conversion = (param) => {
     return this.post('/mock/26/pms/Conversion', param)
   }
   // 获取暂收款管理-转换单-详情
   conversionDetails = (param) => {
     return this.post('/mock/26/pms//ConversionDetails', param)
   }
   // 获取暂收款管理-转换单-新增
   conversionAdd = (param) => {
     return this.post('/mock/26/pms/ConversionAdd', param)
   }
   // 获取暂收款管理-转换单-新增-冲抵核销明细
   writeOffset = (param) => {
     return this.post('/mock/26/pms/Writeoffset', param)
   }
     // 获取暂收款管理-转换单-新增-转换明细
     DialogtableAdd = (param) => {
       return this.post('/mock/26/pms/DialogtableAdd', param)
     }
}

export const processingApi = new ProcessingApi()
